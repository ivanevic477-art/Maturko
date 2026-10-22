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
  { slug: 'engleski', group: 'obavezni', name: 'Engleski jezik', icon: '🇬🇧', flag: '/flags/gb.svg', exams: [], lessons: makeLessons() },
  { slug: 'pig', group: 'izborni', name: 'Politika i gospodarstvo', icon: '🏛️', exams: [], lessons: makeLessons() },
  {
    slug: 'hrvatski',
    group: 'obavezni',
    name: 'Hrvatski jezik',
    icon: '🇭🇷',
    flag: '/flags/hr.svg',
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
  { slug: 'matematika', group: 'obavezni', name: 'Matematika', icon: '➗', exams: [], lessons: makeLessons() },
  { slug: 'geografija', group: 'izborni', name: 'Geografija', icon: '🌍', exams: [], lessons: makeLessons() },
  { slug: 'povijest', group: 'izborni', name: 'Povijest', icon: '🏺', exams: [], lessons: makeLessons() },
  { slug: 'likovna-umjetnost', group: 'izborni', name: 'Likovna umjetnost', icon: '🎨', exams: [], lessons: makeLessons() },
  { slug: 'fizika', group: 'izborni', name: 'Fizika', icon: '⚛️', exams: [], lessons: makeLessons() },
  { slug: 'kemija', group: 'izborni', name: 'Kemija', icon: '🧪', exams: [], lessons: makeLessons() },
  { slug: 'biologija', group: 'izborni', name: 'Biologija', icon: '🧬', exams: [], lessons: makeLessons() },
  { slug: 'spanjolski', group: 'izborni', name: 'Španjolski jezik', icon: '🇪🇸', flag: '/flags/es.svg', exams: [], lessons: makeLessons() },
  { slug: 'talijanski', group: 'izborni', name: 'Talijanski jezik', icon: '🇮🇹', flag: '/flags/it.svg', exams: [], lessons: makeLessons() },
  { slug: 'latinski', group: 'izborni', name: 'Latinski jezik', icon: '🏛️', flag: '/flags/la.svg', exams: [], lessons: makeLessons() },
  { slug: 'njemacki', group: 'izborni', name: 'Njemački jezik', icon: '🇩🇪', flag: '/flags/de.svg', exams: [], lessons: makeLessons() },
]
