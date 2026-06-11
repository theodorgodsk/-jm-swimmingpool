import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, animate } from 'framer-motion'
import { Link } from 'react-router-dom'

export const ease = [0.22, 1, 0.36, 1]

// Farver – ét sted, så hele siden er konsistent
export const C = {
  navy: '#0a1828',
  deep: '#0a2540',
  sky: '#38bdf8',
  sand: '#f4f1ea',
  slate: '#5b6b7a',
}

// Tekst der afsløres ord-for-ord
export function RevealWords({ text, style, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <span ref={ref} style={{ display: 'inline-block', ...style }}>
      {text.split(' ').map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
          <motion.span
            style={{ display: 'inline-block', paddingRight: '0.25em' }}
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : { y: '110%' }}
            transition={{ duration: 0.8, delay: delay + i * 0.05, ease }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// Tal der tæller op
export function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2, ease, onUpdate: v => setVal(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>{val}{suffix}</span>
}

// Blok der fader op ved scroll
export function Reveal({ children, y = 60, delay = 0, style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref} style={style}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

// Billede med wipe-reveal + langsom zoom
export function ImageReveal({ src, alt, height = '70vh', radius = 24, objectPosition = 'center', noParallax = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1])
  return (
    <div ref={ref} style={{ position: 'relative', height, overflow: 'hidden', borderRadius: radius }}>
      <motion.img src={src} alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition, scale: noParallax ? 1 : scale }} />
      <motion.div
        initial={{ scaleX: 1 }}
        animate={inView ? { scaleX: 0 } : {}}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        style={{ position: 'absolute', inset: 0, background: C.deep, transformOrigin: 'right' }} />
    </div>
  )
}

// Rent telefon-ikon der arver tekstfarven
export function PhoneIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ verticalAlign: '-2px', marginRight: 9 }} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

// Knap i husstil
export function Btn({ to, href, children, light, sky, outline, dark, width, onClick }) {
  const base = {
    display: 'inline-block', padding: '16px 38px', borderRadius: 14,
    fontSize: 15, fontWeight: 600, textDecoration: 'none', letterSpacing: '0.01em',
    cursor: 'pointer', fontFamily: 'Inter, sans-serif',
    ...(width ? { width, textAlign: 'center', boxSizing: 'border-box' } : {})
  }
  const style = dark
    ? { ...base, background: C.deep, color: '#fff', border: 'none' }
    : outline
    ? { ...base, background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.5)' }
    : sky
    ? { ...base, background: C.sky, color: '#fff', border: 'none' }
    : light
    ? { ...base, background: '#fff', color: C.deep, border: 'none' }
    : { ...base, background: C.deep, color: '#fff', border: 'none' }
  if (to) {
    const MLink = motion(Link)
    return (
      <MLink to={to} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} style={style}>
        {children}
      </MLink>
    )
  }
  return (
    <motion.a href={href} onClick={onClick} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} style={style}>
      {children}
    </motion.a>
  )
}
