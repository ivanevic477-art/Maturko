import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import MenuButton from './MenuButton'

export default function Layout() {
  const { user, logOut } = useAuth()
  const { pathname } = useLocation()
  return (
    <>
      <header className="topbar">
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
              <button type="button" className="btn outline" onClick={logOut}>Odjava</button>
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
      {pathname !== '/pocetna' && (
        <footer className="footer">
          <div>Made by Sindr</div>
          <div>© 2026 Maturko</div>
        </footer>
      )}
    </>
  )
}
