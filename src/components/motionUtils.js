import { useEffect } from 'react'

// Zajednički efekti za Landing i Početnu: animacija pri skrolanju, 3D naginjanje i brojač.
export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Elementi s [data-reveal] unutar root dobivaju klasu "in" kad uđu u vidno polje.
export function useReveal(root) {
  useEffect(() => {
    const els = root.current?.querySelectorAll('[data-reveal]') ?? []
    if (reducedMotion() || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'))
      return undefined
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      }),
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [root])
}
