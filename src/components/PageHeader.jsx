import { Link } from 'react-router-dom'

export default function PageHeader({ title, subtitle, trail }) {
  return (
    <div className="page-banner">
      <div className="crumbs">
        <Link to="/pocetna">Početna</Link>
        {trail.map((c) => (
          <span key={c.label}>
            {' › '}
            {c.to ? <Link to={c.to}>{c.label}</Link> : c.label}
          </span>
        ))}
      </div>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}
