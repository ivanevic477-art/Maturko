import { useEffect, useRef, useState } from 'react'
import { reducedMotion } from './motionUtils'

// Kutija koja se 3D naginje prema pokazivaču, s odsjajem koji ga prati.
export function Tilt({ as: Tag = 'div', className = '', max = 10, children, ...rest }) {
  const ref = useRef(null)
  function onMove(e) {
    if (e.pointerType !== 'mouse' || reducedMotion()) return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--rx', `${(0.5 - y) * max}deg`)
    el.style.setProperty('--ry', `${(x - 0.5) * max}deg`)
    el.style.setProperty('--gx', `${x * 100}%`)
    el.style.setProperty('--gy', `${y * 100}%`)
    el.classList.add('tilting')
  }
  function onLeave() {
    const el = ref.current
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.classList.remove('tilting')
  }
  return (
    <Tag ref={ref} className={`tilt ${className}`} onPointerMove={onMove} onPointerLeave={onLeave} {...rest}>
      {children}
      <span className="glare" aria-hidden="true" />
    </Tag>
  )
}

// Broj koji se odbroji do vrijednosti kad postane vidljiv.
export function CountUp({ to }) {
  const ref = useRef(null)
  const [animate] = useState(() => !reducedMotion() && 'IntersectionObserver' in window)
  const [n, setN] = useState(animate ? 0 : to)
  useEffect(() => {
    if (!animate) return undefined
    let frame = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (t) => {
        const k = Math.min(1, (t - start) / 1100)
        setN(Math.round(to * (1 - (1 - k) ** 3)))
        if (k < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    })
    io.observe(ref.current)
    return () => { io.disconnect(); cancelAnimationFrame(frame) }
  }, [to, animate])
  return <span ref={ref}>{n}</span>
}
