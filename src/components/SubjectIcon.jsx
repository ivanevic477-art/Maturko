import { Atom, Dna, Earth, FlaskConical, Hourglass, Landmark, Palette, Sigma, BookOpen } from 'lucide-react'

// Ikone predmeta (data/subjects.js -> icon). Jezici s polja "flag" prikazuju sliku zastave.
const ICONS = { landmark: Landmark, sigma: Sigma, earth: Earth, hourglass: Hourglass, palette: Palette, atom: Atom, flask: FlaskConical, dna: Dna }

export default function SubjectIcon({ subject, size = '1em' }) {
  if (subject.flag) return <img className="flag" src={subject.flag} alt="" />
  const Icon = ICONS[subject.icon] ?? BookOpen
  return <Icon className="ic" size={size} aria-hidden="true" />
}
