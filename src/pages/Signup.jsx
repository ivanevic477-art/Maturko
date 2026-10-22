import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

export default function Signup() {
  const { user, signUp } = useAuth()
  const location = useLocation()
  const from = location.state?.from ?? '/'
  const [form, setForm] = useState({ name: '', email: '', password: '', repeat: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (user) return <Navigate to={from} replace />

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    if (!form.name.trim()) return setError('Upiši ime i prezime.')
    if (form.password.length < 6) return setError('Lozinka mora imati najmanje 6 znakova.')
    if (form.password !== form.repeat) return setError('Lozinke se ne podudaraju.')
    setBusy(true)
    try {
      await signUp(form)
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  return (
    <section className="auth-wrap">
      <form className="auth-card" onSubmit={submit}>
        <h1>Izradi svoj račun</h1>
        {location.state?.from && <p className="notice">Gradivo i probni ispiti dostupni su nakon registracije.</p>}
        <label className="field">Ime i prezime
          <input value={form.name} onChange={set('name')} autoComplete="name" required />
        </label>
        <label className="field">E-adresa
          <input type="email" value={form.email} onChange={set('email')} autoComplete="email" required />
        </label>
        <label className="field">Lozinka
          <input type="password" value={form.password} onChange={set('password')} autoComplete="new-password" required />
        </label>
        <label className="field">Ponovi lozinku
          <input type="password" value={form.repeat} onChange={set('repeat')} autoComplete="new-password" required />
        </label>
        <div className="error" role="alert">{error}</div>
        <button type="submit" className="btn wide" disabled={busy}>Registriraj se</button>
        <p className="switch">Već imaš račun? <Link to="/prijava">Prijavi se</Link></p>
      </form>
    </section>
  )
}
