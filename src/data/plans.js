import { SUBJECTS } from './subjects'

// Pretplatni planovi. Cijene su tekst da se točno prikažu (hrvatski zapis: 19,99 €).
export const PLANS = [
  {
    id: 'individual',
    name: 'Individual',
    tagline: 'Plaćaš samo predmete koje ti trebaju.',
    price: '19,99 €',
    period: 'mjesečno po predmetu',
    features: [
      'Odaberi koliko god predmeta želiš',
      'Svaki predmet košta 19,99 € mjesečno',
      'Lekcije i probni ispiti odabranih predmeta',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    tagline: 'Tri glavna predmeta i dva izborna po tvom izboru.',
    price: '199,99 €',
    period: 'godišnje',
    features: [
      'Engleski jezik, Hrvatski jezik i Matematika',
      '+ 2 izborna predmeta po tvom izboru',
      'Lekcije i probni ispiti za svih pet predmeta',
      'Plaćanje jednom godišnje',
    ],
  },
  {
    id: 'ultimate',
    name: 'Ultimate',
    tagline: 'Sve otključano.',
    price: '599,99 €',
    period: 'godišnje',
    features: [
      `Svih ${SUBJECTS.length} predmeta otključano`,
      'Lekcije i probni ispiti za sve predmete',
      'Plaćanje jednom godišnje',
    ],
  },
]
