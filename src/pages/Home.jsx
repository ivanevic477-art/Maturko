import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, BookOpenCheck, FileKey, FileText, GraduationCap, Hand, Library, ListChecks, NotebookPen, Sparkles, TrendingUp,
} from 'lucide-react'
import { useAuth } from '../auth/useAuth'
import { SUBJECTS } from '../data/subjects'
import { useProgress } from '../progress/useProgress'
import SubjectIcon from '../components/SubjectIcon'
import ProgressRing from '../components/ProgressRing'
import { CountUp, Tilt } from '../components/motion'
import { useReveal } from '../components/motionUtils'
import './Landing.css'
import './Home.css'

const CARDS = [
  { icon: Library, title: 'Učionice po predmetima', text: 'Lekcije i podlekcije za svaki predmet.', to: '/ucionice' },
  { icon: NotebookPen, title: 'Probni ispiti', text: 'Ispiti iz prijašnjih godina s ključem za odgovore.', to: '/probni-ispiti' },
  { icon: TrendingUp, title: 'Moj napredak', text: 'Prati što si naučio/naučila i gdje trebaš više vježbe.', to: '/napredak' },
]

// Svi probni ispiti (s PDF datotekama) iz data/subjects.js.
const EXAMS = SUBJECTS.flatMap((s) => s.exams.map((e) => ({ ...e, subject: s })))

export default function Home() {
  const { user } = useAuth()
  const { subjectProgress } = useProgress()
  const root = useRef(null)
  useReveal(root)

  const rows = SUBJECTS.map((s) => {
    const p = subjectProgress(s)
    return { subject: s, ...p, lessonsDone: p.lessons.filter((l) => l.done === l.total).length }
  })
  const started = rows.filter((r) => r.done > 0).sort((a, b) => Number(a.completed) - Number(b.completed) || b.percent - a.percent)
  const next = started.find((r) => !r.completed)
  const avg = started.length ? Math.round(started.reduce((n, r) => n + r.percent, 0) / started.length) : 0
  const lessonsDone = rows.reduce((n, r) => n + r.lessonsDone, 0)
  const itemsDone = rows.reduce((n, r) => n + r.done, 0)
  const coursesDone = rows.filter((r) => r.completed).length
  const firstName = user.name.split(' ')[0]

  return (
    <div className="landing home" ref={root}>
      <section className="l-hero h-hero">
        <div className="l-bg" aria-hidden="true">
          <span className="blob b1" /><span className="blob b2" /><span className="blob b3" />
          <span className="grid" />
        </div>
        <div className="l-hero-inner h-hero-inner">
          <div className="l-hero-copy">
            <div className="l-badge" data-reveal><Sparkles size={16} aria-hidden="true" /> Tvoja učionica</div>
            <h1 data-reveal style={{ '--d': '80ms' }}>
              Bok, <span className="grad">{firstName}</span>! <Hand className="ic wave-hand" aria-hidden="true" />
            </h1>
            <p data-reveal style={{ '--d': '160ms' }}>
              {next
                ? <>Spreman/spremna za nastavak? Na predmetu <strong>{next.subject.name}</strong> si na {next.percent}%.</>
                : 'Što želiš danas raditi? Odaberi predmet i kreni s prvom lekcijom.'}
            </p>
            <div className="l-actions" data-reveal style={{ '--d': '240ms' }}>
              {next
                ? <Link to={`/ucionice/${next.subject.slug}`} className="l-btn primary">Nastavi: {next.subject.name} <ArrowRight size={18} aria-hidden="true" /></Link>
                : <Link to="/ucionice" className="l-btn primary">Odaberi predmet <ArrowRight size={18} aria-hidden="true" /></Link>}
              <Link to="/napredak" className="l-btn glass">Moj napredak</Link>
            </div>
          </div>

          <div data-reveal style={{ '--d': '200ms' }}>
            <Tilt className="h-ring-card" max={10}>
              <div className="h-ring-wrap">
                <ProgressRing percent={avg} />
                <div className="h-ring-label"><strong>{avg}%</strong><span>prosjek započetih</span></div>
              </div>
              <ul className="h-ring-list">
                {started.length === 0 && <li className="muted-row">Još nisi započeo/započela nijedan predmet.</li>}
                {started.slice(0, 3).map((r) => (
                  <li key={r.subject.slug}>
                    <span className="h-mini-icon"><SubjectIcon subject={r.subject} /></span>
                    <span className="h-mini-name">{r.subject.name}</span>
                    <span className="h-mini-bar"><span style={{ width: `${r.percent}%` }} /></span>
                    <span className="h-mini-pct">{r.percent}%</span>
                  </li>
                ))}
              </ul>
            </Tilt>
          </div>
        </div>
      </section>

      <section className="l-stats" data-reveal>
        <div className="stat"><strong><CountUp to={started.length} /></strong><span>započetih predmeta</span></div>
        <div className="stat"><strong><CountUp to={lessonsDone} /></strong><span>dovršenih lekcija</span></div>
        <div className="stat"><strong><CountUp to={itemsDone} /></strong><span>označenih stavki</span></div>
        <div className="stat"><strong><CountUp to={coursesDone} /></strong><span>završenih tečajeva</span></div>
      </section>

      <section className="l-section">
        <div className="l-head" data-reveal>
          <span className="eyebrow">Brzi pristup</span>
          <h2>Što želiš danas raditi?</h2>
        </div>
        <div className="h-actions">
          {CARDS.map((c, i) => (
            <Tilt as={Link} key={c.title} to={c.to} className="box h-action" data-reveal style={{ '--d': `${i * 90}ms` }}>
              <div className="box-icon"><c.icon size={24} aria-hidden="true" /></div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <span className="h-go">Otvori <ArrowRight size={16} aria-hidden="true" /></span>
            </Tilt>
          ))}
        </div>
      </section>

      {started.length > 0 && (
        <section className="l-section">
          <div className="l-head" data-reveal>
            <span className="eyebrow">Nastavi učiti</span>
            <h2>Tvoji predmeti</h2>
          </div>
          <div className="h-progress">
            {started.map((r, i) => (
              <Tilt as={Link} key={r.subject.slug} to={`/ucionice/${r.subject.slug}`} className="box h-prog" max={8} data-reveal style={{ '--d': `${(i % 3) * 80}ms` }}>
                <div className="h-prog-head">
                  <span className="subj-icon"><SubjectIcon subject={r.subject} /></span>
                  <div className="h-prog-title">
                    <strong>{r.subject.name}</strong>
                    <span>{r.lessonsDone} / {r.lessons.length} lekcija</span>
                  </div>
                  {r.completed
                    ? <GraduationCap className="h-prog-done" size={26} aria-label="Završeno" />
                    : <span className="h-prog-pct">{r.percent}%</span>}
                </div>
                <div className="panel-bar"><div style={{ width: `${r.percent}%` }} /></div>
                <div className="panel-cols">
                  {r.lessons.map((l) => <span key={l.title} title={`${l.title}: ${l.done}/${l.total}`} style={{ '--h': `${(l.done / l.total) * 100}%` }} />)}
                </div>
              </Tilt>
            ))}
          </div>
        </section>
      )}

      {EXAMS.length > 0 && (
        <section className="l-section">
          <div className="l-head" data-reveal>
            <span className="eyebrow">Probni ispiti</span>
            <h2>Vježbaj na pravim ispitima</h2>
            <p>Ispiti iz prijašnjih godina, s ključem za odgovore.</p>
          </div>
          <div className="h-exams">
            {EXAMS.map((e, i) => (
              <Tilt key={`${e.subject.slug}-${e.title}`} className="box h-exam" max={6} data-reveal style={{ '--d': `${i * 90}ms` }}>
                <div className="h-exam-head">
                  <span className="subj-icon"><SubjectIcon subject={e.subject} /></span>
                  <div>
                    <div className="h-exam-subject">{e.subject.name}</div>
                    <strong>{e.title}</strong>
                    <div className="h-exam-sub">{e.subtitle}</div>
                  </div>
                </div>
                <div className="h-files">
                  {e.files.map((f) => (
                    <a key={f.href} className={`h-file ${f.solution ? 'key' : ''}`} href={f.href} target="_blank" rel="noopener noreferrer">
                      {f.solution ? <FileKey size={18} aria-hidden="true" /> : <FileText size={18} aria-hidden="true" />}
                      <span>{f.label}</span>
                      <em>PDF</em>
                    </a>
                  ))}
                </div>
              </Tilt>
            ))}
          </div>
          <div className="h-more" data-reveal>
            <Link to="/probni-ispiti" className="l-btn glass">Svi probni ispiti <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </section>
      )}

      <section className="l-section">
        <div className="l-head" data-reveal>
          <span className="eyebrow">Učionice</span>
          <h2>Svi predmeti</h2>
          <p>Svaki predmet ima 10 lekcija, kvizove i završni ispit.</p>
        </div>
        <div className="l-subjects">
          {rows.map((r, i) => (
            <Tilt as={Link} key={r.subject.slug} to={`/ucionice/${r.subject.slug}`} className="subj" max={16} data-reveal style={{ '--d': `${(i % 7) * 50}ms` }}>
              <span className="subj-icon"><SubjectIcon subject={r.subject} /></span>
              <span className="subj-name">{r.subject.name}</span>
              {r.completed
                ? <BookOpenCheck className="subj-done" size={18} aria-label="Završeno" />
                : r.done > 0
                  ? <span className="subj-pct">{r.percent}%</span>
                  : <ArrowRight className="subj-go" size={16} aria-hidden="true" />}
            </Tilt>
          ))}
        </div>
        <div className="h-more" data-reveal>
          <Link to="/napredak" className="l-btn glass"><ListChecks size={18} aria-hidden="true" /> Detaljan napredak</Link>
        </div>
      </section>
    </div>
  )
}
