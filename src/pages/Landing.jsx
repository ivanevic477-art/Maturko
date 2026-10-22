import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { SUBJECTS } from '../data/subjects'
import SubjectIcon from '../components/SubjectIcon'

const WHY = [
  {
    icon: '🎓',
    title: 'Izrađeno uz pomoć licenciranih profesora',
    text: 'Lekcije i zadatke izrađujemo uz pomoć licenciranih profesora koji znaju što se traži na maturi.',
  },
  {
    icon: '🧩',
    title: 'Jasno i korak po korak',
    text: 'Svaki predmet podijeljen je na 10 lekcija, a svaka lekcija na manje, lako savladive cjeline.',
  },
  {
    icon: '📈',
    title: 'Vidi svoj napredak',
    text: 'Označi što si naučio/naučila i odmah vidi gdje si jak/jaka, a gdje trebaš više vježbe.',
  },
  {
    icon: '📝',
    title: 'Vježbaj na pravim ispitima',
    text: 'Ispiti iz prijašnjih godina s ključem za odgovore, da znaš što te čeka.',
  },
]

const STEPS = [
  { title: 'Registriraj se', text: 'Izradi račun za samo minutu.' },
  { title: 'Odaberi predmet', text: 'Otvori učionicu predmeta koji ti treba.' },
  { title: 'Uči svojim tempom', text: 'Prolazi lekcije, rješavaj ispite i prati napredak.' },
]

export default function Landing() {
  const { user } = useAuth()
  if (user) return <Navigate to="/pocetna" replace />

  return (
    <>
      <section className="hero">
        <div className="badge">🎓 Izrađeno uz pomoć licenciranih profesora</div>
        <h1>Matura ne mora biti stresna.</h1>
        <p>
          Uči jasno i korak po korak, uz gradivo izrađeno uz pomoć licenciranih profesora.
          Mi ti pomažemo, ti samo kreni.
        </p>
        <div className="hero-actions">
          <Link to="/registracija" className="btn">Započni danas</Link>
          <Link to="/prijava" className="btn ghost-light">Već imam račun</Link>
        </div>
        <svg className="wave" viewBox="0 0 1440 50" preserveAspectRatio="none" aria-hidden="true">
          <path fill="#fff" d="M0 30C240 60 480 0 720 20s480 40 720 0V50H0z" />
        </svg>
      </section>

      <section className="trust">
        <div className="trust-item"><strong>{SUBJECTS.length}</strong><span>predmeta</span></div>
        <div className="trust-item"><strong>10</strong><span>lekcija po predmetu</span></div>
        <div className="trust-item"><strong>🎓</strong><span>izrađeno uz pomoć licenciranih profesora</span></div>
      </section>

      <section className="section">
        <h2>Zašto Maturko?</h2>
        <p className="lead">Sve što ti treba za mirnu i uspješnu pripremu, na jednome mjestu.</p>
        <div className="cards">
          {WHY.map((w) => (
            <div className="card" key={w.title}>
              <div className="icon">{w.icon}</div>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Odaberi svoj predmet</h2>
        <p className="lead">Za svaki predmet imaš učionicu s lekcijama i probnim ispitima.</p>
        <div className="subject-pills">
          {SUBJECTS.map((s) => (
            <Link key={s.slug} to={`/ucionice/${s.slug}`} className="pill">
              <span><SubjectIcon subject={s} /></span> {s.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Kako to funkcionira?</h2>
        <div className="steps">
          {STEPS.map((s) => (
            <div className="step" key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="cta">
          <h2>Spreman/spremna za početak? 🎓</h2>
          <p className="lead">Pridruži se i pripremi se za maturu uz profesore kojima možeš vjerovati.</p>
          <Link to="/registracija" className="btn">Registriraj se</Link>
        </div>
      </section>
    </>
  )
}
