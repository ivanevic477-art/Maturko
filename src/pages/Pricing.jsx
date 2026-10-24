import { Link } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import { PLANS } from '../data/plans'

export default function Pricing() {
  const { user } = useAuth()
  return (
    <>
      <div className="page-banner">
        <h1>Pretplata</h1>
        <p>Odaberi plan koji ti odgovara.</p>
      </div>
      <section className="section">
        <div className="plans">
          {PLANS.map((p) => (
            <div className="plan" key={p.id}>
              <h2>{p.name}</h2>
              <p className="muted">{p.tagline}</p>
              <div className="plan-price">
                <strong>{p.price}</strong>
                <span>{p.period}</span>
              </div>
              <ul>
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              {user
                ? <button type="button" className="btn wide" disabled>Plaćanje uskoro</button>
                : <Link to="/registracija" className="btn wide">Registriraj se</Link>}
            </div>
          ))}
        </div>
        <p className="muted plans-note">Plaćanje još nije aktivno. Planovi i cijene bit će dostupni uskoro.</p>
      </section>
    </>
  )
}
