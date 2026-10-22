// DEMO autentifikacija: korisnici se spremaju u localStorage ovog preglednika.
// Račun napravljen na jednom uređaju ne postoji na drugima. Kad se odabere backend
// (npr. Firebase/Supabase), zamijenite samo ovu datoteku – ostatak aplikacije ostaje isti.
const USERS_KEY = 'maturko_users'
const SESSION_KEY = 'maturko_session'

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}

async function hash(password, salt) {
  const data = new TextEncoder().encode(salt + password)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

const publicUser = (u) => ({ name: u.name, email: u.email })

export function getSession() {
  const email = localStorage.getItem(SESSION_KEY)
  const user = readUsers().find((u) => u.email === email)
  return user ? publicUser(user) : null
}

export async function signUp({ name, email, password }) {
  email = email.trim().toLowerCase()
  const users = readUsers()
  if (users.some((u) => u.email === email)) {
    throw new Error('Račun s ovom e-adresom već postoji.')
  }
  const salt = crypto.randomUUID()
  const user = { name: name.trim(), email, salt, passwordHash: await hash(password, salt) }
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]))
  localStorage.setItem(SESSION_KEY, email)
  return publicUser(user)
}

export async function logIn({ email, password }) {
  email = email.trim().toLowerCase()
  const user = readUsers().find((u) => u.email === email)
  if (!user || (await hash(password, user.salt)) !== user.passwordHash) {
    throw new Error('Pogrešna e-adresa ili lozinka.')
  }
  localStorage.setItem(SESSION_KEY, email)
  return publicUser(user)
}

export function logOut() {
  localStorage.removeItem(SESSION_KEY)
}
