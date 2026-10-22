// Dodajte sadržaj ovdje, po predmetu.
// exams:     { title: 'Probni ispit 1', subtitle: '2025./2026.', files: [{ label: 'Ispitna knjižica', href: '/ispiti/...pdf' }] }
// lessons:   10 lekcija po predmetu, svaka s 5 podlekcija. Promijenite naslove ili dodajte poveznicu: { title: '1.1 Naslov', link: 'https://...' }
// Privremeni nazivi: 10 lekcija × 5 podlekcija. Zamijenite ih pravim naslovima.
const makeLessons = () =>
  Array.from({ length: 10 }, (_, i) => ({
    title: `Lekcija ${i + 1}`,
    sublessons: Array.from({ length: 5 }, (_, j) => ({ title: `Podlekcija ${i + 1}.${j + 1}`, link: '' })),
  }))

export const SUBJECTS = [
  { slug: 'engleski', name: 'Engleski jezik', icon: '🇬🇧', exams: [], lessons: makeLessons() },
  { slug: 'pig', name: 'Politika i gospodarstvo', icon: '🏛️', exams: [], lessons: makeLessons() },
  {
    slug: 'hrvatski',
    name: 'Hrvatski jezik',
    icon: '📖',
    exams: [
      {
        title: 'Državna matura – 1. rok',
        subtitle: 'Školska godina 2025./2026.',
        files: [
          { label: 'Esejski zadatak', href: '/ispiti/hrvatski/2025-2026-1-rok/esejski-zadatak.pdf' },
          { label: 'List za odgovore', href: '/ispiti/hrvatski/2025-2026-1-rok/list-za-odgovore.pdf' },
          { label: 'Ključ za odgovore', href: '/ispiti/hrvatski/2025-2026-1-rok/kljuc-za-odgovore.pdf', solution: true },
        ],
      },
    ],
    lessons: makeLessons(),
  },
  { slug: 'matematika', name: 'Matematika', icon: '➗', exams: [], lessons: makeLessons() },
  { slug: 'geografija', name: 'Geografija', icon: '🌍', exams: [], lessons: makeLessons() },
]
