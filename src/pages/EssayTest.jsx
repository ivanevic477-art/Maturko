import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { useAuth } from '../auth/useAuth'
import { SUBJECTS, essayTestOf } from '../data/subjects'
import { gradeEssay } from '../essay/gradeEssay'
import { useProgress } from '../progress/useProgress'

const countWords = (text) => text.trim().split(/\s+/).filter((w) => /[a-z0-9]/i.test(w)).length

const draftKey = (email, slug) => `maturko_essay_draft_${email}_${slug}`

function loadDraft(email, slug) {
  try {
    return JSON.parse(localStorage.getItem(draftKey(email, slug)))
  } catch {
    return null
  }
}

function saveDraft(email, slug, draft) {
  try {
    localStorage.setItem(draftKey(email, slug), JSON.stringify(draft))
  } catch {
    // privatni način rada: nacrt se jednostavno ne sprema
  }
}

const randomPrompt = (test, except) => {
  const options = test.prompts.map((_, i) => i).filter((i) => i !== except)
  return options[Math.floor(Math.random() * options.length)] ?? 0
}

// Ispit iz eseja: /ucionice/:slug/esej
export default function EssayTest() {
  const { slug } = useParams()
  const subject = SUBJECTS.find((s) => s.slug === slug)
  const test = subject ? essayTestOf(subject) : null
  if (!test) return <Navigate to={subject ? `/ucionice/${slug}` : '/ucionice'} replace />
  return <EssayRun key={slug} subject={subject} test={test} />
}

function EssayRun({ subject, test }) {
  const { user } = useAuth()
  const { recordEssay } = useProgress()
  const slug = subject.slug
  const [draft] = useState(() => loadDraft(user.email, slug))
  const [promptIndex, setPromptIndex] = useState(() =>
    draft && test.prompts[draft.prompt] ? draft.prompt : randomPrompt(test))
  const [text, setText] = useState(draft?.text ?? '')
  const [result, setResult] = useState(null)

  const prompt = test.prompts[promptIndex]
  const words = countWords(text)
  const back = `/ucionice/${slug}`
  const trail = [
    { label: 'Učionice po predmetima', to: '/ucionice' },
    { label: subject.name, to: back },
    { label: 'Ispit iz eseja' },
  ]

  function change(value) {
    setText(value)
    saveDraft(user.email, slug, { prompt: promptIndex, text: value })
  }

  function newTopic() {
    const next = randomPrompt(test, promptIndex)
    setPromptIndex(next)
    setText('')
    setResult(null)
    saveDraft(user.email, slug, { prompt: next, text: '' })
    window.scrollTo(0, 0)
  }

  function submit() {
    const graded = gradeEssay(text, prompt, test)
    // Esej koji pada zbog duljine, teme ili prepisivanja ne smije se računati kao položen, bez obzira na bodove.
    recordEssay(slug, graded.passed ? graded.percent : Math.min(graded.percent, test.passPercent - 1))
    setResult(graded)
    window.scrollTo(0, 0)
  }

  const header = <PageHeader title={test.title} subtitle={subject.name} trail={trail} />

  if (result) {
    return (
      <>
        {header}
        <section className="content">
          <div className={`quiz-result ${result.passed ? 'pass' : 'fail'}`}>
            <div className="quiz-score">{result.percent} / 100</div>
            <div>{result.wordCount} riječi</div>
            <strong>
              {result.passed
                ? 'Položeno! Dio Esej je dovršen. ✍️'
                : `Za prolaz je potrebno ${test.passPercent} bodova bez ikakvih upozorenja. Popravi esej ili napiši novi.`}
            </strong>
            {result.failReasons.map((r) => <div key={r} className="essay-warning">⚠️ {r}</div>)}
            <div className="quiz-actions">
              <button type="button" className="btn" onClick={() => { setResult(null); window.scrollTo(0, 0) }}>Popravi esej</button>
              <button type="button" className="btn outline" onClick={newTopic}>Nova tema</button>
              <Link to={back} className="btn outline">Natrag na vodič</Link>
            </div>
          </div>

          <h2 className="topic">Ocjena po kriterijima</h2>
          {result.criteria.map((c) => (
            <div key={c.id} className="criterion">
              <div className="criterion-head">
                <strong>{c.label}</strong>
                <span>{c.points} / {c.max}</span>
              </div>
              <div className="bar"><div className="bar-fill" style={{ width: `${(c.points / c.max) * 100}%` }} /></div>
              {c.notes.map((n) => <p key={n} className="muted">{n}</p>)}
            </div>
          ))}
          {result.constructions.length > 0 && (
            <p className="muted">Prepoznate jezične konstrukcije: {result.constructions.join('; ')}.</p>
          )}
          <p className="muted essay-disclaimer">
            Ovo je automatska procjena prema kriterijima iz vodiča (struktura, duljina, fraze i jezične konstrukcije).
            Ne provjerava ispravnost gramatike niti kvalitetu argumenata.
          </p>
        </section>
      </>
    )
  }

  const tone = words === 0 ? '' : words < test.minWords ? 'short' : words <= test.maxWords ? 'ok' : 'long'
  return (
    <>
      {header}
      <section className="content">
        <div className="a-task">
          <div className="a-task-label">Tema</div>
          <strong lang="en">{prompt.title}</strong>
          <em lang="en">{test.instruction}</em>
        </div>
        <p className="muted">
          Napiši esej na engleskom jeziku (200–250 riječi) u četiri odlomka: uvod, argumenti „za“, argumenti „protiv“ i
          zaključak. Svaki odlomak započni u novom retku. Ako zapneš, otvori <Link to={back}>vodič</Link>.
        </p>
        <textarea
          className="essay-input"
          lang="en"
          value={text}
          onChange={(e) => change(e.target.value)}
          placeholder="Start writing your essay here…"
          rows={16}
          spellCheck
        />
        <div className={`word-count ${tone}`}>
          {words} riječi {tone === 'short' && `(najmanje ${test.minWords})`}{tone === 'long' && '(predugo – cilj je 200–250)'}
        </div>
        <div className="quiz-actions left">
          <button type="button" className="btn" disabled={words === 0} onClick={submit}>Predaj esej</button>
          <button type="button" className="btn outline" onClick={newTopic}>Druga tema</button>
        </div>
      </section>
    </>
  )
}
