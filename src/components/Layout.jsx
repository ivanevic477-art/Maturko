import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

export default function Layout() {
  const { user, logOut } = useAuth()
  return (
    <>
      <header className="topbar">
        <Link to="/" className="brand" aria-label="Maturko – početna">
          <img src="/maturko-logo.png" alt="Maturko" />
        </Link>
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
      <footer className="footer">© 2026 Maturko</footer>
    </>
  )
}
