import { Navigate, useParams } from 'react-router-dom'
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
    </details>
    )
  })
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
      </section>
    </>
  )
}
