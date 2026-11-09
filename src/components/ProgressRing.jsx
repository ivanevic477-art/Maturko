import { useId } from 'react'

// Kružni prikaz napretka (Početna, Moj napredak). Popunjava se animacijom pri učitavanju.
export default function ProgressRing({ percent, label = 'Ukupni napredak' }) {
  const id = useId()
  const r = 52
  const c = 2 * Math.PI * r
  return (
    <svg className="ring" viewBox="0 0 120 120" role="img" aria-label={`${label} ${percent}%`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9b5cff" />
          <stop offset="100%" stopColor="#3d33d9" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r={r} className="ring-track" />
      <circle cx="60" cy="60" r={r} className="ring-fill" stroke={`url(#${id})`} style={{ '--c': c, '--off': c * (1 - percent / 100) }} />
    </svg>
  )
}
