import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { SUBJECTS } from '../data/subjects'

const SECTIONS = {
  ucionice: { title: 'Učionice po predmetima', subtitle: 'Odaberi predmet i otvori gradivo.' },
  'probni-ispiti': { title: 'Probni ispiti', subtitle: 'Odaberi predmet i otvori probne ispite.' },
}

export default function SubjectList({ section }) {
  const s = SECTIONS[section]
  return (
    <>
      <PageHeader title={s.title} subtitle={s.subtitle} trail={[{ label: s.title }]} />
      <section className="section">
        <div className="cards">
          {SUBJECTS.map((subj) => (
            <Link key={subj.slug} to={`/${section}/${subj.slug}`} className="card link-card">
              <div className="icon">{subj.icon}</div>
              <h3>{subj.name}</h3>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
