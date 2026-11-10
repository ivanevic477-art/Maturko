// Podnožje stranice: društvene mreže i pravne stranice.
// TODO: zamijenite poveznice pravim profilima Maturka (prazan "href" sakriva ikonu).
export const SOCIALS = [
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/' },
  { id: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/' },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/' },
  { id: 'email', label: 'E-pošta', href: '' }, // npr. 'mailto:info@maturko.hr'
]

// Pravne stranice: otvaraju se na /<path> (pages/Info.jsx). Tekst dodajte u "text" kad ga pripremite.
export const LEGAL_PAGES = [
  { path: 'uvjeti-koristenja', label: 'Uvjeti korištenja', title: 'Uvjeti korištenja', subtitle: 'Pravila korištenja Maturka.' },
  { path: 'privatnost', label: 'Politika privatnosti', title: 'Politika privatnosti', subtitle: 'Kako prikupljamo, koristimo i štitimo tvoje podatke.' },
  { path: 'kolacici', label: 'Politika kolačića', title: 'Politika kolačića', subtitle: 'Koje kolačiće koristimo i zašto.' },
]
