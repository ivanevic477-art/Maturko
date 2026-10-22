import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './useAuth'

// Prikazuje ugniježđene rute samo prijavljenim korisnicima; ostale šalje na registraciju.
export default function RequireAuth() {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/registracija" replace state={{ from: location.pathname }} />
  return <Outlet />
}
