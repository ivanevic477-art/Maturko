import { Link } from 'react-router-dom'
import { ArrowUp, Mail } from 'lucide-react'
import { INFO_PAGES } from '../data/infoPages'
import { LEGAL_PAGES, SOCIALS } from '../data/footer'

// Logotipi društvenih mreža (lucide nema ikone brendova).
const BRAND = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
    </svg>
  ),
  email: <Mail strokeWidth={2} />,
}

const YEAR = new Date().getFullYear()

const LEARN = [
  { to: '/ucionice', label: 'Učionice' },
  { to: '/probni-ispiti', label: 'Probni ispiti' },
  { to: '/napredak', label: 'Moj napredak' },
]

export default function Footer() {
  const socials = SOCIALS.filter((s) => s.href)
  return (
    <footer className="site-footer">
      <div className="sf-glow" aria-hidden="true" />
      <div className="sf-inner">
        <div className="sf-brand">
          <Link to="/" className="sf-logo" aria-label="Maturko – početna">
            <img src="/maturko-logo.png" alt="Maturko" />
          </Link>
          <p>Priprema za državnu maturu, jasno i korak po korak, uz gradivo izrađeno uz pomoć licenciranih profesora.</p>
          {socials.length > 0 && (
            <ul className="sf-social" aria-label="Društvene mreže">
              {socials.map((s) => (
                <li key={s.id}>
                  <a href={s.href} aria-label={s.label} title={s.label} {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {BRAND[s.id]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav className="sf-col" aria-label="Učenje">
          <h3>Učenje</h3>
          {LEARN.map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
        </nav>
        <nav className="sf-col" aria-label="Maturko">
          <h3>Maturko</h3>
          {INFO_PAGES.map((p) => <Link key={p.path} to={`/${p.path}`}>{p.label}</Link>)}
        </nav>
        <nav className="sf-col" aria-label="Pravne informacije">
          <h3>Pravno</h3>
          {LEGAL_PAGES.map((p) => <Link key={p.path} to={`/${p.path}`}>{p.label}</Link>)}
        </nav>
      </div>

      <div className="sf-bottom">
        <span>© {YEAR} Maturko. Sva prava pridržana.</span>
        <span className="sf-made">Made by Sindr</span>
        <button type="button" className="sf-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Na vrh <ArrowUp size={16} aria-hidden="true" />
        </button>
      </div>
    </footer>
  )
}
