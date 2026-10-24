import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from './PageHeader'
import { buildQuiz, scoreQuiz } from '../quiz/quizUtils'

// Zajednički prikaz kviza (kviz lekcije i završni ispit): jedno pitanje po ekranu, na kraju rezultat i pregled.
// Pri svakom novom pokušaju pitanja se ponovno nasumično biraju iz banke pitanja (pool).
export default function QuizRunner({ title, subtitle, trail, pool, count, passPercent, passMessage, back, onFinish }) {
  const [questions, setQuestions] = useState(() => buildQuiz(pool, count))
  const [answers, setAnswers] = useState([])
  const [current, setCurrent] = useState(0)
  const [result, setResult] = useState(null)

  const header = <PageHeader title={title} subtitle={subtitle} trail={trail} />

  if (questions.length === 0) {
    return (
      <>
        {header}
        <section className="content">
          <div className="empty">Pitanja za ovaj kviz uskoro stižu.</div>
          <Link to={back} className="btn outline">Natrag</Link>
        </section>
      </>
    )
  }

  function restart() {
    setQuestions(buildQuiz(pool, count))
    setAnswers([])
    setCurrent(0)
    setResult(null)
    window.scrollTo(0, 0)
  }

  function next() {
    if (current + 1 < questions.length) {
      setCurrent(current + 1)
      return
    }
    const score = scoreQuiz(questions, answers, passPercent)
    onFinish(score.percent)
    setResult(score)
    window.scrollTo(0, 0)
  }

  if (result) {
    return (
      <>
        {header}
        <section className="content">
          <div className={`quiz-result ${result.passed ? 'pass' : 'fail'}`}>
            <div className="quiz-score">{result.correct} / {result.total}</div>
            <div>{result.percent}% točnih odgovora</div>
            <strong>
              {result.passed
                ? passMessage
                : `Za prolaz je potrebno ${passPercent}%. Pokušaj ponovo – pitanja će biti drugačija.`}
            </strong>
            <div className="quiz-actions">
              <button type="button" className="btn" onClick={restart}>Pokušaj ponovo</button>
              <Link to={back} className="btn outline">Natrag na lekcije</Link>
            </div>
          </div>

          <h2 className="topic">Pregled odgovora</h2>
          {questions.map((q, i) => {
            const ok = answers[i] === q.correct
            return (
              <div key={q.q} className={`review ${ok ? 'ok' : 'bad'}`}>
                <strong>{i + 1}. {q.q}</strong>
                <div>Tvoj odgovor: {q.options[answers[i]]} {ok ? '✓' : '✗'}</div>
                {!ok && <div>Točan odgovor: <strong>{q.options[q.correct]}</strong></div>}
              </div>
            )
          })}
        </section>
      </>
    )
  }

  const q = questions[current]
  const chosen = answers[current]
  return (
    <>
      {header}
      <section className="content">
        <div className="quiz-progress">
          <span>Pitanje {current + 1} od {questions.length}</span>
          <div className="bar"><div className="bar-fill" style={{ width: `${(current / questions.length) * 100}%` }} /></div>
        </div>
        <fieldset className="question" key={current}>
          <legend>{q.q}</legend>
          {q.options.map((opt, k) => (
            <label key={opt} className={`option ${chosen === k ? 'chosen' : ''}`}>
              <input
                type="radio"
                name="answer"
                checked={chosen === k}
                onChange={() => { const a = [...answers]; a[current] = k; setAnswers(a) }}
              />
              <span>{opt}</span>
            </label>
          ))}
        </fieldset>
        <button type="button" className="btn" disabled={chosen === undefined} onClick={next}>
          {current + 1 === questions.length ? 'Završi kviz' : 'Dalje'}
        </button>
      </section>
    </>
  )
}
