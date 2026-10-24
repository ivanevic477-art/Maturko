import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { INFO_PAGES } from '../data/infoPages'

// Hamburger izbornik pored logotipa: otvara se klikom, zatvara klikom vani, tipkom Esc ili odabirom stavke.
export default function MenuButton() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const onClick = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="menu" ref={ref}>
      <button
        type="button"
        className="menu-button"
        aria-label="Izbornik"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen(!open)}
      >
        <span /><span /><span />
      </button>
      {open && (
        <nav id="site-menu" className="menu-list">
          {INFO_PAGES.map((p) => (
            <Link key={p.path} to={`/${p.path}`} onClick={() => setOpen(false)}>{p.label}</Link>
          ))}
        </nav>
      )}
    </div>
  )
}
