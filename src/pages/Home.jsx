import { Link } from 'react-router-dom'

const FEATURES = [
  { icon: '📚', title: 'Učionice po predmetima', text: 'Lekcije, datoteke i videozapisi za svaki predmet.', to: '/ucionice' },
  { icon: '📝', title: 'Probni ispiti', text: 'Ispiti iz prijašnjih godina i vježbe za uvježbavanje.', to: '/probni-ispiti' },
  { icon: '📢', title: 'Obavijesti', text: 'Budi u tijeku s novim gradivom i savjetima za ispit.' },
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <h1>Položi maturu bez stresa</h1>
        <p>
          Lekcije, probni ispiti i ispiti iz prijašnjih godina za svaki predmet,
          na jednome mjestu.
        </p>
        <Link to="/ucionice" className="btn">Započni</Link>
        <svg className="wave" viewBox="0 0 1440 50" preserveAspectRatio="none" aria-hidden="true">
          <path fill="#fff" d="M0 30C240 60 480 0 720 20s480 40 720 0V50H0z" />
        </svg>
      </section>

      <section className="section">
        <h2>Sve što ti treba na jednome mjestu</h2>
        <div className="cards">
          {FEATURES.map((f) => {
            const body = (
              <>
                <div className="icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </>
            )
            return f.to
              ? <Link key={f.title} to={f.to} className="card link-card">{body}</Link>
              : <div key={f.title} className="card">{body}</div>
          })}
        </div>
      </section>
    </>
  )
}
