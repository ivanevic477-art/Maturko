import { ArrowRight, BicepsFlexed, BookOpenCheck, GraduationCap, Layers, Pin } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { SUBJECTS } from '../data/subjects'
import SubjectIcon from '../components/SubjectIcon'
import { useProgress } from '../progress/useProgress'
import ProgressRing from '../components/ProgressRing'
import { Tilt } from '../components/motion'

const GROUPS = [
  { id: 'obavezni', title: 'Obavezni predmeti' },
  { id: 'izborni', title: 'Izborni predmeti' },
]

const ratio = (l) => l.done / l.total

function Card({ subject }) {
  const { subjectProgress } = useProgress()
  const { lessons, done, total, percent, completed } = subjectProgress(subject)
  const started = done > 0
  const strongest = started ? lessons.reduce((a, b) => (ratio(b) > ratio(a) ? b : a)) : null
  const weakest = started ? lessons.reduce((a, b) => (ratio(b) < ratio(a) ? b : a)) : null

  return (
    <Tilt className={`progress-card ${completed ? 'is-complete' : ''}`} max={6}>
      <div className="pc-head">
        <span className="pc-icon"><SubjectIcon subject={subject} /></span>
        <h3>{subject.name}</h3>
        <span className="pc-percent">{completed ? <GraduationCap aria-label="Završeno" /> : `${percent}%`}</span>
      </div>
      <div
        className="bar"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Napredak: ${subject.name}`}
      >
        <div className="bar-fill" style={{ width: `${percent}%` }} />
      </div>
      <div className="muted pc-count">{completed ? 'Tečaj završen' : `${done} / ${total} dovršenih stavki`}</div>

      <div className="segments" aria-label="Napredak po lekcijama">
        {lessons.map((l) => (
          <div key={l.title} className="segment" title={`${l.title}: ${l.done}/${l.total}`}>
            <div style={{ height: `${ratio(l) * 100}%` }} />
          </div>
        ))}
      </div>

      {started && (
        <div className="pc-notes">
          <div><BicepsFlexed className="ic" aria-hidden="true" /> Najjače: <strong>{strongest.title}</strong></div>
          {weakest.title !== strongest.title && <div><Pin className="ic" aria-hidden="true" /> Treba vježbu: <strong>{weakest.title}</strong></div>}
        </div>
      )}
      <Link to={`/ucionice/${subject.slug}`} className="btn small">
        {started ? 'Nastavi učiti' : 'Započni'}
      </Link>
    </Tilt>
  )
}

// Pregled na vrhu: prosjek započetih predmeta i ukupni brojevi.
function Overview() {
  const { subjectProgress } = useProgress()
  const rows = SUBJECTS.map((s) => subjectProgress(s))
  const started = rows.filter((r) => r.done > 0)
  const avg = started.length ? Math.round(started.reduce((n, r) => n + r.percent, 0) / started.length) : 0
  const lessonsDone = rows.reduce((n, r) => n + r.lessons.filter((l) => l.done === l.total).length, 0)
  const lessonsTotal = rows.reduce((n, r) => n + r.lessons.length, 0)
  const courses = rows.filter((r) => r.completed).length
  const stats = [
    { icon: Layers, value: `${started.length} / ${SUBJECTS.length}`, label: 'započetih predmeta' },
    { icon: BookOpenCheck, value: `${lessonsDone} / ${lessonsTotal}`, label: 'dovršenih lekcija' },
    { icon: GraduationCap, value: courses, label: 'završenih tečajeva' },
  ]
  return (
    <div className="pg-overview">
      <div className="pg-ring">
        <ProgressRing percent={avg} label="Prosjek započetih predmeta" />
        <div className="pg-ring-label"><strong>{avg}%</strong><span>prosjek započetih</span></div>
      </div>
      <div className="pg-stats">
        {stats.map((st) => (
          <div className="pg-stat" key={st.label}>
            <span className="pg-stat-icon"><st.icon size={20} aria-hidden="true" /></span>
            <div><strong>{st.value}</strong><span>{st.label}</span></div>
          </div>
        ))}
        <Link to="/ucionice" className="btn pg-cta">Otvori učionice <ArrowRight className="ic" aria-hidden="true" /></Link>
      </div>
    </div>
  )
}

export default function Progress() {
  return (
    <>
      <PageHeader
        title="Moj napredak"
        subtitle="Označi podlekcije koje si naučio/naučila i prati gdje si jak/jaka, a gdje trebaš više vježbe."
        trail={[{ label: 'Moj napredak' }]}
      />
      <section className="content wide">
        <Overview />
        {GROUPS.map((g) => (
          <div key={g.id}>
            <h2 className="topic">{g.title}</h2>
            <div className="progress-grid">
              {SUBJECTS.filter((s) => s.group === g.id).map((s) => <Card key={s.slug} subject={s} />)}
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
