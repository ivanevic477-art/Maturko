import { useEffect } from 'react'

// Elementi koji se pojavljuju (fade + slide) pri skrolanju na svim stranicama.
// Landing ima vlastite animacije ([data-reveal]), pa se ovdje preskače.
const SELECTOR = [
  '.page-banner > *', '.card', '.item', '.lesson', '.progress-card', '.plan', '.lesson-quiz', '.final-exam',
  '.auth-card', '.topic', '.criterion', '.review', '.quiz-result', '.empty', '.plans-note',
  '.sf-brand', '.sf-col', '.sf-bottom',
].join(',')

const STAGGER_MS = 70
const MAX_STAGGER = 6

export function useScrollReveal(key) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return undefined

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return
        e.target.classList.add('sr-in')
        io.unobserve(e.target)
      }),
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' },
    )

    const watched = new WeakSet()
    const scan = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (watched.has(el) || el.classList.contains('sr-in') || el.closest('.landing')) return
        watched.add(el)
        // Kratko kašnjenje po redu među susjedima, da se kartice pojavljuju jedna za drugom.
        const siblings = [...el.parentElement.children].filter((c) => c.matches(SELECTOR))
        const i = Math.min(siblings.indexOf(el), MAX_STAGGER)
        el.style.setProperty('--sr-d', `${i * STAGGER_MS}ms`)
        el.classList.add('sr')
        io.observe(el)
      })
    }

    scan()
    // Novi sadržaj (otvorene lekcije, rezultati kviza...) dobiva animaciju kad se pojavi.
    let frame = 0
    const mo = new MutationObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(scan) })
    mo.observe(document.getElementById('root'), { childList: true, subtree: true })

    return () => { io.disconnect(); mo.disconnect(); cancelAnimationFrame(frame) }
  }, [key])
}
