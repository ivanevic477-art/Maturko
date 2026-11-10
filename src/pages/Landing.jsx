import { useEffect, useRef } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {
  ArrowRight, BookOpen, Check, GraduationCap, NotebookPen, Puzzle, Rocket, ShieldCheck, Sparkles, Target, TrendingUp, UserPlus,
} from 'lucide-react'
import { useAuth } from '../auth/useAuth'
import { SUBJECTS } from '../data/subjects'
import SubjectIcon from '../components/SubjectIcon'
import { CountUp, Tilt } from '../components/motion'
import { reducedMotion, useReveal } from '../components/motionUtils'
import './Landing.css'

const WHY = [
  {
    icon: GraduationCap,
    title: 'Izrađeno uz pomoć licenciranih profesora',
    text: 'Lekcije i zadatke izrađujemo uz pomoć licenciranih profesora koji znaju što se traži na maturi.',
  },
  {
    icon: Puzzle,
    title: 'Jasno i korak po korak',
    text: 'Svaki predmet podijeljen je na 10 lekcija, a svaka lekcija na manje, lako savladive cjeline.',
  },
  {
    icon: TrendingUp,
    title: 'Vidi svoj napredak',
    text: 'Označi što si naučio/naučila i odmah vidi gdje si jak/jaka, a gdje trebaš više vježbe.',
  },
  {
    icon: NotebookPen,
    title: 'Vježbaj na pravim ispitima',
    text: 'Ispiti iz prijašnjih godina s ključem za odgovore, da znaš što te čeka.',
  },
]

const STEPS = [
  { icon: UserPlus, title: 'Registriraj se', text: 'Izradi račun za samo minutu.' },
  { icon: BookOpen, title: 'Odaberi predmet', text: 'Otvori učionicu predmeta koji ti treba.' },
  { icon: Rocket, title: 'Uči svojim tempom', text: 'Prolazi lekcije, rješavaj ispite i prati napredak.' },
]

// Paralaksa: --scroll (0..1) dok se hero odskrola.
function useHeroScroll(hero) {
  useEffect(() => {
    if (reducedMotion()) return undefined
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const h = hero.current
        if (!h) return
        const p = Math.min(1, Math.max(0, window.scrollY / h.offsetHeight))
        h.style.setProperty('--scroll', p.toFixed(3))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll) }
  }, [hero])
}

// Ilustracija u heroju: složene staklene kartice u 3D prostoru.
function HeroScene() {
  return (
    <Tilt className="scene" max={14} aria-hidden="true">
      <div className="panel panel-back">
        <div className="panel-title"><BookOpen size={16} /> Lekcija 3 · Funkcije</div>
        <div className="skeleton w80" /><div className="skeleton w60" /><div className="skeleton w70" />
      </div>
      <div className="panel panel-main">
        <div className="panel-head">
          <span className="panel-icon"><SubjectIcon subject={SUBJECTS.find((s) => s.slug === 'matematika')} /></span>
          <div><strong>Matematika</strong><div className="panel-sub">7 / 10 lekcija</div></div>
          <span className="panel-pct">72%</span>
        </div>
        <div className="panel-bar"><div /></div>
        <div className="panel-cols">
          {[90, 100, 80, 100, 65, 100, 40, 0, 0, 0].map((h, i) => <span key={i} style={{ '--h': `${h}%` }} />)}
        </div>
      </div>
      <div className="panel panel-quiz">
        <div className="panel-title"><Target size={16} /> Kviz · pitanje 4/10</div>
        <div className="opt">a) f(x) = 2x + 1</div>
        <div className="opt chosen"><Check size={15} /> b) f(x) = x² − 4</div>
        <div className="opt">c) f(x) = 3</div>
      </div>
      <div className="chip chip-pass"><Sparkles size={15} /> Kviz položen · 100%</div>
      <div className="chip chip-streak"><ShieldCheck size={15} /> Provjereno od profesora</div>
    </Tilt>
  )
}

export default function Landing() {
  const { user } = useAuth()
  const root = useRef(null)
  const hero = useRef(null)
  useReveal(root)
  useHeroScroll(hero)

  if (user) return <Navigate to="/pocetna" replace />

  return (
    <div className="landing" ref={root}>
      <section className="l-hero" ref={hero}>
        <div className="l-bg" aria-hidden="true">
          <span className="blob b1" /><span className="blob b2" /><span className="blob b3" />
          <span className="grid" />
        </div>

        <div className="l-hero-inner">
          <div className="l-hero-copy">
            <div className="l-badge" data-reveal><GraduationCap size={16} aria-hidden="true" /> Izrađeno uz pomoć licenciranih profesora</div>
            <h1 data-reveal style={{ '--d': '80ms' }}>Matura <span className="grad">ne mora</span> biti stresna.</h1>
            <p data-reveal style={{ '--d': '160ms' }}>
              Uči jasno i korak po korak, uz gradivo izrađeno uz pomoć licenciranih profesora.
              Mi ti pomažemo, ti samo kreni.
            </p>
            <div className="l-actions" data-reveal style={{ '--d': '240ms' }}>
              <Link to="/registracija" className="l-btn primary">Započni danas <ArrowRight size={18} aria-hidden="true" /></Link>
              <Link to="/prijava" className="l-btn glass">Već imam račun</Link>
            </div>
            <ul className="l-ticks" data-reveal style={{ '--d': '320ms' }}>
              <li><Check size={16} aria-hidden="true" /> {SUBJECTS.length} predmeta</li>
              <li><Check size={16} aria-hidden="true" /> Pravi ispiti s ključem</li>
              <li><Check size={16} aria-hidden="true" /> Praćenje napretka</li>
            </ul>
          </div>
          <div className="l-hero-visual" data-reveal style={{ '--d': '200ms' }}>
            <HeroScene />
          </div>
        </div>
      </section>

      <section className="l-stats" data-reveal>
        <div className="stat"><strong><CountUp to={SUBJECTS.length} /></strong><span>predmeta</span></div>
        <div className="stat"><strong><CountUp to={10} /></strong><span>lekcija po predmetu</span></div>
        <div className="stat"><strong><CountUp to={SUBJECTS.length * 50} />+</strong><span>podlekcija</span></div>
        <div className="stat"><strong className="stat-icon"><GraduationCap size={30} aria-hidden="true" /></strong><span>uz licencirane profesore</span></div>
      </section>

      <section className="l-section">
        <div className="l-head" data-reveal>
          <span className="eyebrow">Zašto Maturko</span>
          <h2>Sve što ti treba, na jednome mjestu.</h2>
          <p>Za mirnu i uspješnu pripremu, bez gubljenja vremena.</p>
        </div>
        <div className="l-why">
          {WHY.map((w, i) => (
            <Tilt key={w.title} className="box" data-reveal style={{ '--d': `${i * 90}ms` }}>
              <div className="box-icon"><w.icon size={24} aria-hidden="true" /></div>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </Tilt>
          ))}
        </div>
      </section>

      <section className="l-section">
        <div className="l-head" data-reveal>
          <span className="eyebrow">Predmeti</span>
          <h2>Odaberi svoj predmet</h2>
          <p>Za svaki predmet imaš učionicu s lekcijama i probnim ispitima.</p>
        </div>
        <div className="l-subjects">
          {SUBJECTS.map((s, i) => (
            <Tilt as={Link} key={s.slug} to={`/ucionice/${s.slug}`} className="subj" max={16} data-reveal style={{ '--d': `${(i % 7) * 50}ms` }}>
              <span className="subj-icon"><SubjectIcon subject={s} /></span>
              <span className="subj-name">{s.name}</span>
              <ArrowRight className="subj-go" size={16} aria-hidden="true" />
            </Tilt>
          ))}
        </div>
      </section>

      <section className="l-section">
        <div className="l-head" data-reveal>
          <span className="eyebrow">Kako to funkcionira</span>
          <h2>Tri koraka do spremne mature</h2>
        </div>
        <ol className="l-steps">
          {STEPS.map((s, i) => (
            <li key={s.title} data-reveal style={{ '--d': `${i * 120}ms` }}>
              <div className="cube" aria-hidden="true">
                <span className="cube-face"><s.icon size={24} /></span>
                <span className="cube-num">{i + 1}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="l-section">
        <Tilt className="l-cta" max={4} data-reveal>
          <span className="cta-glow" aria-hidden="true" />
          <h2>Spreman/spremna za početak?</h2>
          <p>Pridruži se i pripremi se za maturu uz profesore kojima možeš vjerovati.</p>
          <Link to="/registracija" className="l-btn lime">Registriraj se <ArrowRight size={18} aria-hidden="true" /></Link>
        </Tilt>
      </section>
    </div>
  )
}
