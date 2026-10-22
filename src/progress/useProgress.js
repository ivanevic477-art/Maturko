import { useState } from 'react'
import { useAuth } from '../auth/useAuth'

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

  const isDone = (slug, i, j) => Boolean(data[slug]?.[`${i}-${j}`])

  function toggle(slug, i, j) {
    const next = { ...data, [slug]: { ...data[slug], [`${i}-${j}`]: !isDone(slug, i, j) } }
    setData(next)
    localStorage.setItem(storageKey(user.email), JSON.stringify(next))
  }

  const lessonProgress = (subject) =>
    subject.lessons.map((lesson, i) => ({
      title: lesson.title,
      done: lesson.sublessons.filter((_, j) => isDone(subject.slug, i, j)).length,
      total: lesson.sublessons.length,
    }))

  function subjectProgress(subject) {
    const lessons = lessonProgress(subject)
    const done = lessons.reduce((n, l) => n + l.done, 0)
    const total = lessons.reduce((n, l) => n + l.total, 0)
    return { lessons, done, total, percent: total ? Math.round((done / total) * 100) : 0 }
  }

  return { isDone, toggle, lessonProgress, subjectProgress }
}
