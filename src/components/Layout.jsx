import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import MenuButton from './MenuButton'
import Footer from './Footer'
import { useScrollReveal } from './useScrollReveal'

export default function Layout() {
  const { user, logOut } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const header = useRef(null)
  useScrollReveal(pathname)
  const [scrolled, setScrolled] = useState(false)

  // Ljepljivo zaglavlje: postaje stakleno nakon skrolanja i prikazuje traku napretka čitanja.
  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        setScrolled(window.scrollY > 8)
        header.current?.style.setProperty('--read', max > 0 ? (window.scrollY / max).toFixed(4) : '0')
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll) }
  }, [pathname])

  // Odjava vraća na landing stranicu (navigate prije odjave, da zaštićene stranice ne preusmjere na registraciju)
  function handleLogOut() {
    navigate('/')
    logOut()
  }
  return (
    <>
      <header ref={header} className={`topbar ${scrolled ? 'scrolled' : ''} ${pathname === '/' || pathname === '/pocetna' ? 'on-landing' : ''}`}>
        <div className="brand-group">
          <Link to={user ? '/pocetna' : '/'} className="brand" aria-label="Maturko – početna">
            <img src="/maturko-logo.png" alt="Maturko" />
          </Link>
          <MenuButton />
        </div>
        <div className="actions">
          {user ? (
            <>
              <span className="greeting">Bok, {user.name.split(' ')[0]}!</span>
              <button type="button" className="btn outline" onClick={handleLogOut}>Odjava</button>
            </>
          ) : (
            <>
              <Link to="/prijava" className="btn outline">Prijava</Link>
              <Link to="/registracija" className="btn">Registracija</Link>
            </>
          )}
        </div>
      </header>
      <Outlet />
      {pathname !== '/pocetna' && <Footer />}
    </>
  )
}
