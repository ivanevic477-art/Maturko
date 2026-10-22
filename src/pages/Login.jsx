import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

export default function Login() {
  const { user, logIn } = useAuth()
  const location = useLocation()
  const from = location.state?.from ?? '/'
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (user) return <Navigate to={from} replace />

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    try {
      await logIn(form)
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  return (
    <section className="auth-wrap">
      <form className="auth-card" onSubmit={submit}>
        <h1>Prijava</h1>
        {location.state?.from && <p className="notice">Prijavi se za pristup gradivu i probnim ispitima.</p>}
        <label className="field">E-adresa
          <input type="email" value={form.email} onChange={set('email')} autoComplete="email" required />
        </label>
        <label className="field">Lozinka
          <input type="password" value={form.password} onChange={set('password')} autoComplete="current-password" required />
        </label>
        <div className="error" role="alert">{error}</div>
        <button type="submit" className="btn wide" disabled={busy}>Prijavi se</button>
        <p className="switch">Prvi put ovdje? <Link to="/registracija">Registriraj se</Link></p>
      </form>
    </section>
  )
}
