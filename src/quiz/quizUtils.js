// Kviz na kraju svake lekcije: 20 nasumičnih pitanja iz banke pitanja te lekcije.
// Pitanja se dodaju u lekciju (polje "quiz" u data/subjects.js):
//   { q: 'Tekst pitanja', options: ['A', 'B', 'C', 'D'], answer: 0 }   // answer = redni broj točnog odgovora (od 0)
export const QUIZ_QUESTIONS = 20
// Postotak točnih odgovora potreban da se kviz računa kao položen (a time i lekcija kao dovršena).
export const PASS_PERCENT = 70

// Završni ispit (otključava se kad su sve lekcije položene): nasumična pitanja iz svih lekcija predmeta.
// Ispit je obavezan za završetak tečaja, a polaže se s najmanje FINAL_PASS_PERCENT točnih odgovora.
export const FINAL_QUESTIONS = 40
export const FINAL_PASS_PERCENT = 50

export function shuffle(items, random = Math.random) {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Nasumično odabire do `count` pitanja i miješa redoslijed ponuđenih odgovora.
// Vraća pitanja oblika { q, options, correct } gdje je correct redni broj točnog odgovora u pomiješanom popisu.
export function buildQuiz(pool, count = QUIZ_QUESTIONS, random = Math.random) {
  return shuffle(pool, random)
    .slice(0, count)
    .map((item) => {
      const order = shuffle(item.options.map((_, i) => i), random)
      return { q: item.q, options: order.map((i) => item.options[i]), correct: order.indexOf(item.answer) }
    })
}

export function scoreQuiz(questions, answers, passPercent = PASS_PERCENT) {
  const correct = questions.filter((q, i) => answers[i] === q.correct).length
  const percent = questions.length ? Math.round((correct / questions.length) * 100) : 0
  return { correct, total: questions.length, percent, passed: percent >= passPercent }
}
