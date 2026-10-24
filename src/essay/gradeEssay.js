// Automatsko ocjenjivanje eseja prema kriterijima iz vodiča (data/essayTest.js).
// Procjenjuje STRUKTURU i upotrebu traženih elemenata; ne može ocijeniti ispravnost gramatike ni kvalitetu argumenata.
import { ESSAY_GUIDE } from '../data/essayMatura'

// Malim slovima, bez interpunkcije (zadržava apostrofe i crtice unutar riječi).
const normalize = (text) =>
  text.toLowerCase().replace(/[‘’`]/g, "'").replace(/[^a-z0-9'\-\s]/g, ' ').replace(/\s+/g, ' ').trim()

const words = (text) => normalize(text).split(' ').filter(Boolean)
const hasPhrase = (norm, phrase) => ` ${norm} `.includes(` ${phrase} `)

const sentencesOf = (text) => text.split(/(?<=[.!?])\s+/).filter((s) => /[a-z]/i.test(s))

// Jezične konstrukcije iz vodiča (pojednostavljena provjera uzorcima; pokriva najčešće oblike).
const PHRASAL = [
  '(?:grow|grows|grew|grown|growing) up', '(?:take|takes|took|taken|taking) care of', '(?:give|gives|gave|given|giving) up',
  '(?:look|looks|looked|looking) (?:for|after|forward to|up to)', '(?:carry|carries|carried|carrying) out',
  '(?:find|finds|found|finding) out', '(?:turn|turns|turned|turning) (?:out|into|down|up)', '(?:set|sets|setting) up',
  '(?:put|puts|putting) up with', '(?:deal|deals|dealt|dealing) with', '(?:come|comes|came|coming) up with',
  '(?:end|ends|ended|ending) up', '(?:bring|brings|brought|bringing) up', '(?:break|breaks|broke|broken|breaking) down',
  '(?:get|gets|got|gotten|getting) (?:along|on|over|used to)', '(?:cut|cuts|cutting) down', '(?:work|works|worked|working) out',
  '(?:figure|figures|figured|figuring) out', '(?:point|points|pointed|pointing) out', '(?:rely|relies|relied|relying) on',
  '(?:depend|depends|depended|depending) on', '(?:move|moves|moved|moving) (?:out|in|away)', '(?:start|starts|started|starting) off',
  '(?:fall|falls|fell|fallen|falling) behind', '(?:keep|keeps|kept|keeping) up with', '(?:make|makes|made|making) up',
  '(?:pick|picks|picked|picking) up', '(?:sum|sums|summed|summing) up', '(?:stand|stands|stood|standing) out', '(?:miss|misses|missed|missing) out',
]

const CONSTRUCTIONS = [
  {
    id: 'passive',
    label: 'Pasiv (Passive)',
    test: /\b(?:is|are|was|were|be|been|being)\s+(?:\w+ed|made|done|given|taken|seen|known|written|built|found|used|chosen|shown|held|paid|told|thought|lost|kept|left|sent|spent|taught|born|forced|expected|required)\b/i,
  },
  { id: 'modal', label: 'Modalni glagoli vjerojatnosti (might, may, could, must, can\'t)', test: /\b(?:might|may|could|must|can't|cannot)\b/i },
  {
    id: 'conditional',
    label: 'Uvjetne rečenice (Conditional clauses)',
    test: /\bif\b[^.!?]*?\b(?:will|would|could|might|'ll|'d)\b|\bunless\b|\bwould\b[^.!?]*?\bif\b/i,
  },
  {
    id: 'participle',
    label: 'Participske rečenice (Participle clauses)',
    test: /(?:^|[.!?]\s+)(?:(?:while|when|after|before|by|on|upon)\s+)?(?:\w+ing|having\s+\w+)\b[^.!?,]*,/i,
  },
  { id: 'phrasal', label: 'Frazalni glagoli (Phrasal verbs)', test: new RegExp(`\\b(?:${PHRASAL.join('|')})\\b`, 'i') },
  {
    id: 'conjunction',
    label: 'Složeni veznici (as long as, not only…but also, either…or…)',
    test: /\b(?:as long as|not only\b[^.!?]*?\bbut also|either\b[^.!?]*?\bor|neither\b[^.!?]*?\bnor|whereas|although|even though|provided that|so that|despite|in spite of)\b/i,
  },
  { id: 'relative', label: 'Odnosne rečenice (Relative clauses)', test: /\b(?:who|whom|whose|which|where)\b|\b\w+\s+that\s+(?:is|are|was|were|has|have|can|will|makes|helps)\b/i },
]

// 4-grami riječi iz primjera eseja u vodiču: služe za otkrivanje prepisivanja primjera.
const gramsOf = (list, n = 4) => {
  const out = new Set()
  for (let i = 0; i + n <= list.length; i++) out.add(list.slice(i, i + n).join(' '))
  return out
}
const SAMPLE_GRAMS = gramsOf(words(ESSAY_GUIDE.blocks.find((b) => b.type === 'essay').paragraphs.join(' ')))

function distinctMatches(norm, phrases) {
  return phrases.filter((p) => hasPhrase(norm, p))
}

export function gradeEssay(text, prompt, test) {
  const { phrases } = test
  const paragraphs = text.split(/\n+/).map((p) => p.trim()).filter((p) => /[a-z]/i.test(p))
  const wordCount = words(text).length
  const norm = normalize(text)

  const intro = paragraphs[0] ?? ''
  const conclusion = paragraphs.length > 1 ? paragraphs[paragraphs.length - 1] : ''
  const middle = paragraphs.slice(1, -1)
  const forPara = middle[0] ?? ''
  const againstPara = middle[1] ?? ''

  const criteria = []
  const add = (id, label, max, points, notes) => criteria.push({ id, label, max, points, notes })

  // 1. Duljina (15)
  const lenPoints = wordCount < test.minWords ? 0 : wordCount <= test.maxWords ? 15 : wordCount <= 300 ? 10 : wordCount <= 400 ? 5 : 0
  add('length', 'Duljina eseja', 15, lenPoints, [
    wordCount < test.minWords
      ? `Esej ima ${wordCount} riječi. Ispod ${test.minWords} riječi esej automatski pada – cilj je 200–250 riječi.`
      : wordCount <= test.maxWords
        ? `${wordCount} riječi – odlična duljina (cilj 200–250).`
        : `${wordCount} riječi – predugo. Budi precizan/precizna i ne ponavljaj iste stvari (cilj 200–250).`,
  ])

  // 2. Struktura: četiri odlomka (15)
  const n = paragraphs.length
  const structPoints = n === 4 ? 15 : n === 5 ? 10 : n === 3 ? 8 : n === 2 ? 4 : 0
  add('structure', 'Struktura (4 odlomka)', 15, structPoints, [
    n === 4
      ? 'Imaš četiri odlomka: uvod, argumenti „za“, argumenti „protiv“ i zaključak.'
      : `Imaš ${n} odlomaka, a trebaju ih biti četiri: uvod, argumenti „za“, argumenti „protiv“ i zaključak (svaki u novom retku).`,
  ])

  // 3. Uvod (10)
  const introNotes = []
  const introSentences = sentencesOf(intro).length
  let introPoints = 0
  if (introSentences >= 2) introPoints += 5
  else introNotes.push('Uvod treba imati općeniti uvod (general introduction) i konkretan uvod u temu (specific introduction).')
  const introNorm = normalize(intro)
  const introHits = prompt.keywords.filter((k) => introNorm.includes(k)).length
  if (introHits >= 2) introPoints += 5
  else if (introHits === 1) { introPoints += 3; introNotes.push('U uvodu jasnije predstavi temu zadanu naslovom (preformuliraj ga vlastitim riječima).') }
  else introNotes.push('U uvodu predstavi temu zadanu naslovom (preformuliraj ga, ne prepisuj).')
  if (!introNotes.length) introNotes.push('Uvod uvodi temu i čitatelja usmjerava na ono što slijedi.')
  add('intro', 'Uvod', 10, introPoints, introNotes)

  // 4. Argumenti „za“ (15)
  const forFound = distinctMatches(normalize(forPara), phrases.argument)
  const forPoints = forFound.length >= 2 ? 15 : forFound.length === 1 ? 8 : 0
  add('for', 'Argumenti „za“', 15, forPoints, [
    forFound.length >= 2
      ? `Argumenti su uvedeni frazama: ${forFound.join(', ')}.`
      : 'Svaki argument mora biti uveden uvodnom frazom (npr. Firstly, Secondly, Moreover, Furthermore, In addition to that…). Treba ti barem dva argumenta.',
  ])

  // 5. Argumenti „protiv“ (15): topic sentence + argumenti uvedeni drugačijim frazama nego u odlomku „za“
  const againstNorm = normalize(againstPara)
  const firstSentence = normalize(sentencesOf(againstPara)[0] ?? '')
  const contrast = distinctMatches(firstSentence, phrases.contrast).length > 0
  const againstFound = distinctMatches(againstNorm, phrases.argument).filter((p) => !forFound.includes(p))
  const againstPoints = (contrast ? 5 : 0) + (againstFound.length >= 2 ? 10 : againstFound.length === 1 ? 5 : 0)
  const againstNotes = []
  if (!contrast) againstNotes.push('Odlomak „protiv“ započni riječju koja pokazuje suprotnost (However, Nevertheless, On the other hand, In contrast to that…).')
  if (againstFound.length < 2) againstNotes.push('Argumente „protiv“ uvedi barem dvjema različitim frazama koje nisi koristio/koristila u odlomku „za“.')
  if (!againstNotes.length) againstNotes.push('Odlomak „protiv“ ima suprotni topic sentence i argumente uvedene drugim frazama.')
  add('against', 'Argumenti „protiv“', 15, againstPoints, againstNotes)

  // 6. Zaključak (15)
  const conclNorm = normalize(conclusion)
  const sums = distinctMatches(conclNorm, phrases.summing).length > 0
  const opinion = distinctMatches(conclNorm, phrases.opinion).length > 0
  const conclNotes = []
  if (!sums) conclNotes.push('Zaključak započni sažimanjem argumenata (Summing it all up, To sum it all up, In conclusion…).')
  if (!opinion) conclNotes.push('Završi vlastitim mišljenjem i objasni ga (In my opinion, My personal opinion is, I personally believe/think…).')
  if (!conclNotes.length) conclNotes.push('Zaključak sažima argumente i završava obrazloženim osobnim mišljenjem.')
  add('conclusion', 'Zaključak', 15, (sums ? 7 : 0) + (opinion ? 8 : 0), conclNotes)

  // 7. Jezične konstrukcije (15). Fraze za povezivanje se uklanjaju da ne bi davale bodove (npr. "Summing it all up,").
  let stripped = ` ${text.toLowerCase()} `
  for (const p of [...phrases.summing, ...phrases.argument, ...phrases.contrast]) stripped = stripped.split(p).join(' ')
  const found = CONSTRUCTIONS.filter((c) => c.test.test(stripped.trim()))
  const langPoints = found.length >= 4 ? 15 : found.length === 3 ? 11 : found.length === 2 ? 7 : found.length === 1 ? 3 : 0
  add('language', 'Jezične konstrukcije', 15, langPoints, [
    found.length >= 4
      ? 'Odlično, koristiš raznolike jezične konstrukcije.'
      : 'Pokušaj upotrijebiti više konstrukcija: pasiv, modalne glagole vjerojatnosti, uvjetne, participske i odnosne rečenice, frazalne glagole, složene veznike. Za puni broj bodova treba ih barem četiri vrste.',
  ])

  const total = criteria.reduce((s, c) => s + c.points, 0)

  // Uvjeti koji znače pad bez obzira na bodove
  const stems = prompt.keywords.filter((k) => norm.includes(k)).length
  const offTopic = stems < Math.min(3, prompt.keywords.length)
  const myGrams = gramsOf(words(text))
  let shared = 0
  for (const g of myGrams) if (SAMPLE_GRAMS.has(g)) shared++
  const copied = myGrams.size > 0 && shared / myGrams.size >= 0.3
  const tooShort = wordCount < test.minWords

  const percent = Math.round(total)
  const failReasons = []
  if (tooShort) failReasons.push(`Esej ima manje od ${test.minWords} riječi.`)
  if (offTopic) failReasons.push('Esej ne odgovara zadanoj temi (promašena tema znači pad).')
  if (copied) failReasons.push('Esej je prepisan iz primjera u vodiču. Napiši vlastiti esej o zadanoj temi.')
  const passed = percent >= test.passPercent && failReasons.length === 0

  return {
    percent, passed, wordCount, criteria, failReasons,
    constructions: found.map((c) => c.label),
  }
}
