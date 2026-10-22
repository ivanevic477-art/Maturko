import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

const CARDS = [
  { icon: '📚', title: 'Učionice po predmetima', text: 'Lekcije i podlekcije za svaki predmet.', to: '/ucionice' },
  { icon: '📝', title: 'Probni ispiti', text: 'Ispiti iz prijašnjih godina s ključem za odgovore.', to: '/probni-ispiti' },
  { icon: '📈', title: 'Moj napredak', text: 'Prati što si naučio/naučila i gdje trebaš više vježbe.', to: '/napredak' },
]

export default function Home() {
  const { user } = useAuth()
  return (
    <>
      <div className="page-banner">
        <h1>Bok, {user.name.split(' ')[0]}! 👋</h1>
        <p>Što želiš danas raditi?</p>
      </div>
      <section className="section">
        <div className="cards">
          {CARDS.map((c) => (
            <Link key={c.title} to={c.to} className="card link-card">
              <div className="icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
