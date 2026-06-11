import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { C, Reveal, RevealWords, Counter, ImageReveal, Btn, PhoneIcon } from '../shared'
import { serviceList, seasons, team } from '../data'

const serviceIcons = {
  'ny-pool': (color) => <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0"/><path d="M4 27c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0"/><rect x="10" y="6" width="12" height="11" rx="6"/></svg>,
  'renovering': (color) => <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M26 8a5 5 0 0 0-7 7L7 27a2 2 0 0 0 0 3 2 2 0 0 0 3 0l12-12a5 5 0 0 0 7-7l-3 3-2-1-1-2 3-3z"/></svg>,
  'poolservice': (color) => <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="16" cy="16" r="11"/><path d="M11 16l3.5 3.5L21 12"/></svg>,
  'pooltag': (color) => <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14L16 5l12 9"/><path d="M8 14v12h16V14"/><path d="M13 26v-7h6v7"/></svg>,
  'folieskifte': (color) => <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="5" width="22" height="22" rx="3"/><path d="M5 13h22M5 21h22M13 5v22M21 5v22"/></svg>,
  'anlaeg-og-stoeb': (color) => <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="18" width="11" height="9" rx="1"/><rect x="17" y="18" width="11" height="9" rx="1"/><rect x="10" y="9" width="12" height="9" rx="1"/><path d="M16 5v4"/></svg>,
}

const bentoItems = [
  { id: 1, src: '/images/Grid/673557676_122176442258834200_2856297286862387627_n.jpg', gc: '1 / 2', gr: '1 / 3' },
  { id: 2, src: '/images/Grid/673755461_122176443998834200_4137770673414433820_n.jpg', gc: '2 / 3', gr: '1 / 2' },
  { id: 3, src: '/images/Grid/674252766_122176444010834200_318399295788282912_n.jpg', gc: '3 / 4', gr: '1 / 2' },
  { id: 4, src: '/images/Grid/674413901_122176443926834200_4822449720085042029_n.jpg', gc: '2 / 3', gr: '2 / 3' },
  { id: 5, src: '/images/Grid/492536534_122117632058834200_383838615155733452_n.jpg', gc: '3 / 4', gr: '2 / 3' },
  { id: 6, src: '/images/Grid/536278253_122140827230834200_6242253636433914991_n.jpg', gc: '1 / 3', gr: '3 / 5' },
  { id: 7, src: '/images/Grid/532586190_122138857754834200_5641994139839619396_n.jpg', gc: '3 / 4', gr: '3 / 5' },
  { id: 8, src: '/images/Grid/538618921_122140826726834200_2090236261370858742_n.jpg', gc: '1 / 2', gr: '5 / 6' },
  { id: 9, src: '/images/Grid/673792872_122176443860834200_4532747504136624281_n.jpg', gc: '2 / 4', gr: '5 / 6' },
]

function BentoGallery() {
  const [selectedIdx, setSelectedIdx] = useState(null)

  const close = useCallback(() => setSelectedIdx(null), [])
  const prev = useCallback(() => setSelectedIdx(i => (i - 1 + bentoItems.length) % bentoItems.length), [])
  const next = useCallback(() => setSelectedIdx(i => (i + 1) % bentoItems.length), [])

  useEffect(() => {
    if (selectedIdx === null) return
    const handler = e => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selectedIdx, close, prev, next])

  const selected = selectedIdx !== null ? bentoItems[selectedIdx] : null

  return (
    <section className="bento-section" style={{ background: C.navy, padding: '100px 5vw 80px' }}>
      <Reveal>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <p style={{ color: C.sky, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 14 }}>JM Swimmingpool</p>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
            Tidligere projekter
          </h2>
        </div>
      </Reveal>

      <div className="bento-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(5, 200px)', gap: 12 }}>
        {bentoItems.map((item, index) => (
          <motion.div key={item.id}
            onClick={() => setSelectedIdx(index)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02, zIndex: 2 }}
            style={{ gridColumn: item.gc, gridRow: item.gr, borderRadius: 16, overflow: 'hidden', cursor: 'pointer', position: 'relative' }}>
            <img src={item.src} alt="JM Swimmingpool" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}
              style={{ position: 'absolute', inset: 0, background: 'rgba(10,24,40,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, opacity: 0.9 }}>Se billede</span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(5,14,26,0.95)', backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={close}>

            {/* Prev */}
            <motion.button
              onClick={e => { e.stopPropagation(); prev() }}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              style={{ position: 'absolute', left: 24, zIndex: 10, width: 52, height: 52, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ←
            </motion.button>

            {/* Billede */}
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              style={{ position: 'relative', maxWidth: 'min(90vw, 1000px)', maxHeight: '88vh', borderRadius: 20, overflow: 'hidden', boxShadow: '0 60px 140px rgba(0,0,0,0.7)' }}>
              <img src={selected.src} alt="JM Swimmingpool" style={{ width: '100%', maxHeight: '88vh', objectFit: 'contain', display: 'block' }} />
              <div style={{ position: 'absolute', bottom: 16, right: 16, background: 'rgba(10,24,40,0.6)', backdropFilter: 'blur(8px)', borderRadius: 8, padding: '6px 12px', color: 'rgba(255,255,255,0.6)', fontSize: 12, letterSpacing: '0.08em' }}>
                {selectedIdx + 1} / {bentoItems.length}
              </div>
            </motion.div>

            {/* Next */}
            <motion.button
              onClick={e => { e.stopPropagation(); next() }}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              style={{ position: 'absolute', right: 24, zIndex: 10, width: 52, height: 52, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              →
            </motion.button>

            {/* Luk */}
            <motion.button
              onClick={close}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              style={{ position: 'absolute', top: 20, right: 20, zIndex: 10, width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ✕
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default function Home() {
  const heroRef = useRef(null)
  const isMobile = window.innerWidth <= 820
  const alreadySeen = sessionStorage.getItem('jm-intro')
  const [loaded, setLoaded] = useState(!!alreadySeen)
  const videoReady = useRef(false)
  const timerDone = useRef(false)
  useEffect(() => {
    if (alreadySeen) return
    const t = setTimeout(() => {
      timerDone.current = true
      if (videoReady.current) { sessionStorage.setItem('jm-intro', '1'); setLoaded(true) }
    }, 1500)
    return () => clearTimeout(t)
  }, [])
  const { scrollYProgress: hp } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const titleY = useTransform(hp, [0, 1], isMobile ? [0, 0] : [0, -150])
  const titleOpacity = useTransform(hp, [0, 0.7], isMobile ? [1, 1] : [1, 0])
  const shaderScale = useTransform(hp, [0, 1], isMobile ? [1, 1] : [1, 1.3])

  return (
    <div>
      {/* LOADING SCREEN */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: '#0a1828',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: 24,
            }}
          >
            <motion.img
              src="/images/JMS-logo-farve300-tekst-under.png"
              alt="JM Swimmingpool"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: 80, width: 'auto' }}
            />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              style={{ width: 48, height: 2, background: '#38bdf8', transformOrigin: 'left', borderRadius: 2 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section ref={heroRef} className="hero-section" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <motion.div style={{ position: 'absolute', inset: 0, ...(isMobile ? {} : { scale: shaderScale }) }}>
          <video autoPlay muted loop playsInline
            onCanPlay={() => {
              videoReady.current = true
              if (timerDone.current) { sessionStorage.setItem('jm-intro', '1'); setLoaded(true) }
            }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
            <source src="/videos/pool-1280-720.mp4" type="video/mp4" />
          </video>
          {/* Mørkt overlay så teksten kan læses */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,24,40,0.45) 0%, rgba(10,37,64,0.40) 50%, rgba(10,24,40,0.60) 100%)' }} />
        </motion.div>
        <motion.div className="hero-content" style={{
          position: 'relative', height: '100%', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center', textAlign: 'center',
          ...(isMobile ? {} : { y: titleY, opacity: titleOpacity }),
          padding: '0 5vw'
        }}>
          <motion.p className="hero-kicker" initial={{ opacity: 0, letterSpacing: '0.5em' }} animate={{ opacity: 0.9, letterSpacing: '0.3em' }}
            transition={{ duration: 1.2, delay: 0.4 }}
            style={{ color: '#fff', fontSize: 13, textTransform: 'uppercase', marginBottom: 30 }}>
            Landsdækkende pool-specialister
          </motion.p>
          <h1 className="hero-h1" style={{ fontSize: 'clamp(52px, 10vw, 140px)', lineHeight: 0.92, color: '#fff', fontWeight: 700, letterSpacing: '-0.04em', margin: 0 }}>
            {['SOMMER', 'HELE ÅRET'].map((line, li) => (
              <span key={li} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.08em' }}>
                <motion.span style={{ display: 'inline-block' }} initial={{ y: '110%' }} animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.5 + li * 0.12, ease: [0.22, 1, 0.36, 1] }}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }}
            className="hero-btns" style={{ marginTop: 48, display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Btn to="/ny-pool" sky>Byg min drømmepool</Btn>
            <Btn to="/kontakt">Få et gratis tilbud</Btn>
          </motion.div>

          {/* TRUST-BAR i hero */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.3 }}
            className="trust-bar" style={{
              maxWidth: 720, width: '100%', marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', overflow: 'hidden',
              background: 'rgba(10,24,40,0.35)', border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 18, padding: '24px 12px', backdropFilter: 'blur(12px)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.3)'
            }}>
            {[
              { big: 'Din vision', sub: 'Skræddersyede løsninger' },
              { big: 'Grønt', sub: 'Miljøbevidst tilgang' },
              { big: '15 år', sub: 'Erfaring i poolbranchen' },
            ].map((s, i) => (
              <div key={s.big} style={{ textAlign: 'center', padding: '0 12px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.18)' : 'none' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(18px, 2.4vw, 26px)', fontWeight: 700, color: C.sky, lineHeight: 1.1 }}>{s.big}</div>
                <div style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginTop: 7 }}>{s.sub}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.7)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2 }}>Scroll</motion.span>
        </motion.div>
      </section>


      {/* INTRO — editorial showcase */}
      <section className="advise-section" style={{ background: C.sand, padding: '150px 5vw', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
          <div className="advise-grid" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1.45fr', alignItems: 'center', gap: 0 }}>

            {/* Venstre: hvidt tekstkort der overlapper billedet */}
            <Reveal style={{ position: 'relative', zIndex: 3 }}>
              <div className="advise-card" style={{
                background: '#fff', borderRadius: 24, padding: 'clamp(32px, 4vw, 56px)',
                boxShadow: '0 40px 90px rgba(10,37,64,0.14)', marginRight: isMobile ? 0 : '-12%', marginTop: isMobile ? 0 : '38%', position: 'relative', zIndex: 2
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
                  <span style={{ width: 36, height: 2, background: C.sky, display: 'inline-block' }} />
                  <p style={{ color: C.sky, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>JM Swimmingpool</p>
                </div>
                <h2 style={{ fontSize: 'clamp(24px, 2.8vw, 40px)', fontWeight: 700, color: C.deep, marginBottom: 16, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                  Vi bygger ikke bare pools.
                </h2>
                <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', fontSize: 'clamp(18px, 1.8vw, 24px)', color: C.sky, lineHeight: 1.3, marginBottom: 22 }}>
                  Vi bygger feriestemning derhjemme.
                </p>
                <p className="advise-text-desktop" style={{ color: C.slate, fontSize: 17, lineHeight: 1.85, marginBottom: 32 }}>
                  Hos JM Swimmingpool får du en swimmingpool udført af specialister med kendskab til pool- og byggebranchen. Vi kan tilbyde dig en komplet swimmingpool entreprise til konkurrencedygtige priser, og igennem en meget bekvemmelig og bekymringsfri proces. Vi påtager os nemlig hele entreprisen, fra start til slut. Det eneste du skal gøre er at kontakte os, så tager vi med glæde en snak om dine muligheder og ønsker.
                </p>
                <p className="advise-text-mobile" style={{ color: C.slate, fontSize: 17, lineHeight: 1.85, marginBottom: 32, display: 'none' }}>
                  Hos JM Swimmingpool får du en swimmingpool udført af specialister med kendskab til pool- og byggebranchen. Vi tilbyder en komplet entreprise til konkurrencedygtige priser — en bekvemmelig og bekymringsfri proces fra start til slut. Kontakt os, så tager vi en snak om dine muligheder.
                </p>
                <Btn to="/ny-pool">Læs mere</Btn>
              </div>
            </Reveal>

            {/* Højre: stort billede */}
            <div className="advise-img" style={{ position: 'relative', borderRadius: 24, boxShadow: '0 40px 90px rgba(10,37,64,0.22)' }}>
              <ImageReveal src="/images/Sek-2---pool.jpg" alt="Pool med feriestemning" height="78vh" objectPosition="center 40%" noParallax />
              <motion.div className="stat-badge"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute', bottom: 28, right: 28, background: 'rgba(10,24,40,0.55)',
                  backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: 16, padding: '16px 22px', color: '#fff', textAlign: 'center'
                }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 700, lineHeight: 1 }}>200+</div>
                <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.8, marginTop: 4 }}>Pools bygget</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO GALLERI */}
      <BentoGallery />

      {/* SERVICES kort */}
      <section id="services" style={{ background: C.sand, padding: '150px 5vw' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <Reveal>
            <div className="services-header" style={{ marginBottom: 80, textAlign: 'center' }}>
              <p style={{ color: C.sky, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>JM Swimmingpool</p>
              <h2 style={{ fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: 700, color: C.deep, letterSpacing: '-0.03em', lineHeight: 1 }}>Vores ydelser</h2>
            </div>
          </Reveal>
          <div className="service-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {serviceList.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.07} style={{ height: 380, width: '100%' }}>
                <Link to={`/${s.slug}`} className="service-card-link" style={{ textDecoration: 'none', display: 'flex', height: '100%', width: '100%' }}>
                  <motion.div
                    className="service-card-inner"
                    whileHover={{ y: -8, boxShadow: '0 40px 80px rgba(10,37,64,0.16)' }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      background: (i === 2 ? C.deep : i === 3 ? '#fff' : (i === 2 ? true : i === 3 ? false : i % 2 === 1) ? C.deep : '#fff'),
                      borderRadius: 28,
                      padding: 'clamp(32px, 3.5vw, 52px)',
                      height: '100%',
                      boxShadow: '0 12px 40px rgba(10,37,64,0.09)',
                      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                      marginTop: 0,
                    }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', color: (i === 2 ? true : i === 3 ? false : i % 2 === 1) ? 'rgba(255,255,255,0.4)' : 'rgba(10,37,64,0.3)', textTransform: 'uppercase' }}>{s.n}</span>
                        <motion.div
                          whileHover={{ rotate: -45 }}
                          style={{ width: 40, height: 40, borderRadius: '50%', border: `1.5px solid ${(i === 2 ? true : i === 3 ? false : i % 2 === 1) ? 'rgba(255,255,255,0.2)' : 'rgba(10,37,64,0.15)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: (i === 2 ? true : i === 3 ? false : i % 2 === 1) ? '#fff' : C.deep, fontSize: 18 }}>
                          →
                        </motion.div>
                      </div>
                      <div style={{ marginBottom: 12, textAlign: 'center' }}>{serviceIcons[s.slug]?.((i === 2 ? true : i === 3 ? false : i % 2 === 1) ? '#fff' : '#0A2540')}</div>
                      <h3 style={{ fontSize: 'clamp(24px, 2.5vw, 34px)', fontWeight: 700, color: (i === 2 ? true : i === 3 ? false : i % 2 === 1) ? '#fff' : C.deep, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 16, textAlign: 'center' }}>{s.title}</h3>
                      <p style={{ fontSize: 15, lineHeight: 1.75, color: (i === 2 ? true : i === 3 ? false : i % 2 === 1) ? 'rgba(255,255,255,0.6)' : C.slate, textAlign: 'center' }}>{s.desc}</p>
                    </div>
                    <div style={{ marginTop: 40, height: 2, width: 40, background: (i === 2 ? true : i === 3 ? false : i % 2 === 1) ? C.sky : C.sky, borderRadius: 2 }} />
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OM OS teaser */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 600, padding: 0 }} className="split">
        <ImageReveal src="/images/pool-steps-318330_1280-800x600.jpg" alt="Pool" height="100%" radius={0} noParallax />
        <div className="split-text" style={{ background: C.navy, display: 'flex', alignItems: 'center', padding: '90px 6vw' }}>
          <Reveal>
            <p style={{ color: C.sky, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>JM Swimmingpool</p>
            <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', color: '#fff', marginBottom: 24, lineHeight: 1.15, letterSpacing: '-0.02em' }}>Få hjælp til opsætning</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: 16, marginBottom: 36 }}>
              JM Swimmingpool leverer komplette poolløsninger, hvor vi står for hele entreprisen fra idé til færdigt resultat. Med vores erfaring inden for både pool- og byggebranchen sikrer vi et professionelt og problemfrit forløb. Kontakt os, og hør mere om mulighederne for din nye swimmingpool.
            </p>
            <Btn to="/ny-pool" outline>Læs mere</Btn>
          </Reveal>
        </div>
      </section>

      {/* SÆSONSERVICE */}
      <section className="season-section" style={{ background: C.sand, padding: '150px 5vw' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div className="season-header" style={{ marginBottom: 80, textAlign: 'center' }}>
              <p style={{ color: C.sky, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>Sæsonservice</p>
              <h2 style={{ fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: 700, color: C.deep, letterSpacing: '-0.03em', lineHeight: 1 }}>Åbning og lukning af din pool</h2>
            </div>
          </Reveal>
          <div className="season-cards" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {seasons.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.12}>
                <div style={{
                  borderTop: `1px solid rgba(10,37,64,0.15)`,
                  paddingTop: 48, paddingBottom: 48,
                  paddingRight: i === 0 ? 60 : 0,
                  paddingLeft: i === 1 ? 60 : 0,
                  borderLeft: i === 1 ? '1px solid rgba(10,37,64,0.15)' : 'none',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 12, color: C.sky, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 24 }}>0{i + 1}</div>
                  <h3 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 700, color: C.deep, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 24 }}>{s.title}</h3>
                  <p style={{ color: C.slate, fontSize: 16, lineHeight: 1.8, marginBottom: 40, maxWidth: 420, margin: '0 auto 40px' }}>{s.desc}</p>
                  <Btn to="/kontakt">Book her</Btn>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}
