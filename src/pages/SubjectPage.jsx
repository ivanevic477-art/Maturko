import { Link, Navigate, useParams } from 'react-router-dom'
import { FINAL_PASS_PERCENT, FINAL_QUESTIONS, PASS_PERCENT, QUIZ_QUESTIONS } from '../quiz/quizUtils'
import PageHeader from '../components/PageHeader'
import Article from '../components/Article'
import { SUBJECTS, lessonsOf } from '../data/subjects'
import { useProgress } from '../progress/useProgress'

function Exams({ subject }) {
  return subject.exams.map((e) => (
    <div className="item exam" key={e.title}>
      <div className="dot">📝</div>
      <div className="info">
        <strong>{e.title}</strong>
        <div className="muted">{e.subtitle}</div>
        <div className="files">
          {e.files.map((f) => (
            <a
              key={f.href}
              className={`btn small ${f.solution ? '' : 'outline'}`}
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {f.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  ))
}

// offset = broj lekcija u prethodnim odjeljcima (ključ napretka je redni broj lekcije u cijelom predmetu)
function Lessons({ subject, lessons, offset = 0 }) {
  const { isDone, toggle, lessonProgress } = useProgress()
  const progress = lessonProgress(subject)
  return lessons.map((lesson, n) => {
    const i = offset + n
    return (
    <details className="lesson" key={lesson.title}>
      <summary>
        <span className="num">{n + 1}</span>
        {lesson.title}
        <span className="lesson-count">{progress[i].done}/{progress[i].total}</span>
      </summary>
      <ul>
        {lesson.sublessons.map((sub, j) => (
          <li key={sub.title}>
            <label className="check">
              <input
                type="checkbox"
                checked={isDone(subject.slug, i, j)}
                onChange={() => toggle(subject.slug, i, j)}
                aria-label={`Označi kao naučeno: ${sub.title}`}
              />
            </label>
            {sub.link
              ? <a href={sub.link} target="_blank" rel="noopener noreferrer">{sub.title}</a>
              : <span className="soon">{sub.title}</span>}
          </li>
        ))}
      </ul>
      <LessonQuiz subject={subject} index={i} quiz={progress[i].quiz} />
    </details>
    )
  })
}

// Obavezni kviz na kraju lekcije (20 nasumičnih pitanja iz lekcije, može se rješavati koliko god puta).
function LessonQuiz({ subject, index, quiz }) {
  if (!quiz) {
    return (
      <div className="lesson-quiz">
        <strong>Kviz</strong>
        <span className="muted">Pitanja uskoro stižu.</span>
      </div>
    )
  }
  const count = Math.min(QUIZ_QUESTIONS, quiz.questions)
  return (
    <div className={`lesson-quiz ${quiz.passed ? 'passed' : ''}`}>
      <div>
        <strong>Kviz (obavezan)</strong>
        <div className="muted">
          {count} nasumičnih pitanja iz ove lekcije · za prolaz {PASS_PERCENT}%
          {quiz.best !== null && ` · najbolji rezultat: ${quiz.best}%${quiz.passed ? ' ✓' : ''}`}
        </div>
      </div>
      <Link to={`/ucionice/${subject.slug}/kviz/${index}`} className="btn small">
        {quiz.best === null ? 'Započni kviz' : 'Ponovi kviz'}
      </Link>
    </div>
  )
}

// Obavezni završni ispit koji završava tečaj: otključava se kad su sve lekcije položene.
function FinalExamCard({ subject }) {
  const { subjectProgress } = useProgress()
  const { lessons, final, completed } = subjectProgress(subject)
  if (!final) {
    return (
      <div className="final-exam">
        <div><strong>🎓 Završni ispit</strong><div className="muted">Pitanja uskoro stižu.</div></div>
      </div>
    )
  }
  const lessonsDone = lessons.filter((l) => l.done === l.total).length
  const count = Math.min(FINAL_QUESTIONS, final.questions)
  return (
    <div className={`final-exam ${completed ? 'passed' : ''}`}>
      <div>
        <strong>{completed ? '🎓 Tečaj završen!' : '🎓 Završni ispit (obavezan)'}</strong>
        <div className="muted">
          {final.unlocked
            ? `${count} nasumičnih pitanja iz svih lekcija · za prolaz ${FINAL_PASS_PERCENT}%`
            : `Otključava se kad dovršiš sve lekcije (${lessonsDone}/${lessons.length})`}
          {final.best !== null && ` · najbolji rezultat: ${final.best}%${final.passed ? ' ✓' : ''}`}
        </div>
      </div>
      {final.unlocked
        ? <Link to={`/ucionice/${subject.slug}/zavrsni`} className="btn small">{final.best === null ? 'Započni ispit' : 'Ponovi ispit'}</Link>
        : <button type="button" className="btn small" disabled>🔒 Zaključano</button>}
    </div>
  )
}

// Obavezni ispit iz eseja: student piše esej, a ocjenjuje se prema kriterijima iz vodiča.
function EssayTestCard({ subject, test }) {
  const { subjectProgress } = useProgress()
  const { essay } = subjectProgress(subject)
  return (
    <div className={`final-exam ${essay?.passed ? 'passed' : ''}`}>
      <div>
        <strong>{essay?.passed ? '✍️ Esej položen!' : '✍️ Ispit iz eseja (obavezan)'}</strong>
        <div className="muted">
          Napiši esej na zadanu temu · ocjenjuje se prema kriterijima iz vodiča · za prolaz {test.passPercent}%
          {essay?.best != null && ` · najbolji rezultat: ${essay.best}%${essay.passed ? ' ✓' : ''}`}
        </div>
      </div>
      <Link to={`/ucionice/${subject.slug}/esej`} className="btn small">{essay?.best == null ? 'Započni esej' : 'Napiši novi esej'}</Link>
    </div>
  )
}

// Predmeti s odjeljcima (npr. Teorija, Esej): svaki se odjeljak otvara klikom.
function Sections({ subject }) {
  let offset = 0
  return subject.sections.map((section) => {
    const start = offset
    offset += section.lessons.length
    return (
      <details className="lesson section-group" key={section.title}>
        <summary>{section.title}</summary>
        <div className="section-body">
          {section.lessons.length === 0 && !section.articles?.length && <div className="empty">Sadržaj uskoro stiže.</div>}
          {section.articles?.map((a) => <Article key={a.title} article={a} />)}
          {section.essayTest && <EssayTestCard subject={subject} test={section.essayTest} />}
          {section.lessons.length > 0 && <Lessons subject={subject} lessons={section.lessons} offset={start} />}
        </div>
      </details>
    )
  })
}

// kind: "ucionice" (gradivo) ili "probni-ispiti"
export default function SubjectPage({ kind }) {
  const { slug } = useParams()
  const subject = SUBJECTS.find((s) => s.slug === slug)
  if (!subject) return <Navigate to={`/${kind}`} replace />

  const isExams = kind === 'probni-ispiti'
  const list = isExams ? subject.exams : lessonsOf(subject)
  const hasSections = !isExams && Boolean(subject.sections)
  return (
    <>
      <PageHeader
        title={`${subject.name} – ${isExams ? 'probni ispiti' : 'gradivo'}`}
        subtitle={isExams ? 'Rješavaj ispite u uvjetima sličnima stvarnoj maturi.' : 'Odaberi lekciju i otvori njezine podlekcije.'}
        trail={[{ label: isExams ? 'Probni ispiti' : 'Učionice po predmetima', to: `/${kind}` }, { label: subject.name }]}
      />
      <section className="content">
        {hasSections ? <Sections subject={subject} />
          : list.length === 0 ? <div className="empty">Sadržaj uskoro stiže.</div>
          : isExams ? <Exams subject={subject} /> : <Lessons subject={subject} lessons={list} />}
        {!isExams && list.length > 0 && <FinalExamCard subject={subject} />}
      </section>
    </>
  )
}
