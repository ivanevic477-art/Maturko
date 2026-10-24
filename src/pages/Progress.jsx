import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { SUBJECTS } from '../data/subjects'
import SubjectIcon from '../components/SubjectIcon'
import { useProgress } from '../progress/useProgress'

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
    <div className="progress-card">
      <div className="pc-head">
        <span className="pc-icon"><SubjectIcon subject={subject} /></span>
        <h3>{subject.name}</h3>
        <span className="pc-percent">{completed ? '🎓' : `${percent}%`}</span>
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
          <div>💪 Najjače: <strong>{strongest.title}</strong></div>
          {weakest.title !== strongest.title && <div>📌 Treba vježbu: <strong>{weakest.title}</strong></div>}
        </div>
      )}
      <Link to={`/ucionice/${subject.slug}`} className="btn small">
        {started ? 'Nastavi učiti' : 'Započni'}
      </Link>
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
