import { useState } from 'react'
import { useAuth } from '../auth/useAuth'
import { essayTestOf, lessonsOf } from '../data/subjects'
import { FINAL_PASS_PERCENT, PASS_PERCENT } from '../quiz/quizUtils'

// DEMO: napredak se sprema u localStorage ovog preglednika, odvojeno po korisniku.
const storageKey = (email) => `maturko_progress_${email}`

function load(email) {
  try {
    return JSON.parse(localStorage.getItem(storageKey(email))) || {}
  } catch {
    return {}
  }
}

export function useProgress() {
  const { user } = useAuth()
  const [data, setData] = useState(() => load(user?.email))

  function save(next) {
    setData(next)
    localStorage.setItem(storageKey(user.email), JSON.stringify(next))
  }

  const isDone = (slug, i, j) => Boolean(data[slug]?.[`${i}-${j}`])

  const toggle = (slug, i, j) =>
    save({ ...data, [slug]: { ...data[slug], [`${i}-${j}`]: !isDone(slug, i, j) } })

  // Najbolji rezultat kviza lekcije u postocima (null ako kviz još nije riješen).
  const quizBest = (slug, i) => data[slug]?.[`quiz-${i}`] ?? null

  const recordQuiz = (slug, i, percent) =>
    save({ ...data, [slug]: { ...data[slug], [`quiz-${i}`]: Math.max(percent, quizBest(slug, i) ?? 0) } })

  // Najbolji rezultat završnog ispita predmeta u postocima (null ako još nije riješen).
  const finalBest = (slug) => data[slug]?.final ?? null

  const recordFinal = (slug, percent) =>
    save({ ...data, [slug]: { ...data[slug], final: Math.max(percent, finalBest(slug) ?? 0) } })

  // Najbolji rezultat ispita iz eseja u postocima (null ako esej još nije predan).
  const essayBest = (slug) => data[slug]?.essay ?? null

  const recordEssay = (slug, percent) =>
    save({ ...data, [slug]: { ...data[slug], essay: Math.max(percent, essayBest(slug) ?? 0) } })

  // Kviz je obavezan dio lekcije: lekcija se računa kao dovršena tek kad su sve podlekcije označene i kviz položen.
  const lessonProgress = (subject) =>
    lessonsOf(subject).map((lesson, i) => {
      const hasQuiz = Boolean(lesson.quiz?.length)
      const best = quizBest(subject.slug, i)
      const quizPassed = hasQuiz && best !== null && best >= PASS_PERCENT
      return {
        title: lesson.title,
        done: lesson.sublessons.filter((_, j) => isDone(subject.slug, i, j)).length + (quizPassed ? 1 : 0),
        total: lesson.sublessons.length + (hasQuiz ? 1 : 0),
        quiz: hasQuiz ? { best, passed: quizPassed, questions: lesson.quiz.length } : null,
      }
    })

  // Završni ispit je obavezan za završetak tečaja: otključava se kad su sve lekcije dovršene, a polaže se s FINAL_PASS_PERCENT.
  // Ako predmet još nema nijedno pitanje, završni ispit ne postoji (final je null) i ne blokira završetak.
  function subjectProgress(subject) {
    const lessons = lessonProgress(subject)
    const questions = lessonsOf(subject).reduce((n, l) => n + (l.quiz?.length ?? 0), 0)
    const best = finalBest(subject.slug)
    const passed = best !== null && best >= FINAL_PASS_PERCENT
    const final = questions > 0
      ? { questions, best, passed, unlocked: lessons.length > 0 && lessons.every((l) => l.done === l.total) }
      : null
    // Ispit iz eseja (npr. Engleski → Esej) obavezan je za završetak tečaja.
    const essayTest = essayTestOf(subject)
    const essayScore = essayBest(subject.slug)
    const essay = essayTest ? { best: essayScore, passed: essayScore !== null && essayScore >= essayTest.passPercent } : null
    const done = lessons.reduce((n, l) => n + l.done, 0) + (final && passed ? 1 : 0) + (essay?.passed ? 1 : 0)
    const total = lessons.reduce((n, l) => n + l.total, 0) + (final ? 1 : 0) + (essay ? 1 : 0)
    return {
      lessons, final, essay, done, total,
      percent: total ? Math.round((done / total) * 100) : 0,
      completed: total > 0 && done === total,
    }
  }

  return { isDone, toggle, quizBest, recordQuiz, finalBest, recordFinal, essayBest, recordEssay, lessonProgress, subjectProgress }
}
