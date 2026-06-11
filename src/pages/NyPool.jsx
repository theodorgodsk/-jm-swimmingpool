import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { C, Reveal, ImageReveal, Btn, PhoneIcon } from '../shared'

const phases = [
  { t: 'Gravearbejde', d: 'Vores eget mandskab graver ud og forbereder terrænet med millimeterpræcision.' },
  { t: 'Støbearbejde', d: 'Fundament og kanter støbes solidt — grundlaget for en pool der holder i generationer.' },
  { t: 'Rørtræk fra pool til teknik', d: 'Alle rør føres skjult og korrekt fra poolen til teknikrummet.' },
  { t: 'Opstilling af teknik', d: 'Pumpe, filter og varme installeres af specialister med kendskab til både pool og byggeri.' },
  { t: 'Finpudsning af overflade', d: 'Hver overflade gennemgås, så finishen er perfekt før folien lægges.' },
  { t: 'Montering af folie', d: 'Liner i din ønskede farve monteres stramt og elegant.' },
  { t: 'Vandpåfyldning', d: 'Poolen fyldes, og formerne tager liv for første gang.' },
  { t: 'Vandbalance og kalibrering', d: 'Kemi og anlæg kalibreres til krystalklart, badeklart vand.' },
  { t: 'Indkøring af anlæg', d: 'Vi kører anlægget ind, finjusterer og evaluerer løbende i tæt dialog med dig.' },
]

function Phase({ p, i }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-45% 0px -45% 0px' })
  return (
    <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 28, paddingBottom: 64, position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <motion.div
          animate={inView ? { scale: 1, background: C.sky, color: C.deep } : { scale: 0.85, background: C.navy, color: 'rgba(255,255,255,0.4)' }}
          transition={{ duration: 0.5 }}
          style={{
            width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700,
            border: '2px solid ' + C.sky, zIndex: 2, position: 'relative'
          }}>
          {String(i + 1).padStart(2, '0')}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0.25, x: 40 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ paddingTop: 8 }}>
        <h3 style={{ fontSize: 'clamp(24px, 3.2vw, 40px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 10 }}>{p.t}</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 17, lineHeight: 1.7, maxWidth: 560 }}>{p.d}</p>
      </motion.div>
    </div>
  )
}

export default function NyPool() {
  const isMobile = window.innerWidth <= 820
  const heroRef = useRef(null)
  const { scrollYProgress: hp } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imgY = useTransform(hp, [0, 1], ['0%', '25%'])
  const imgScale = useTransform(hp, [0, 1], [1.1, 1.3])
  const titleY = useTransform(hp, [0, 1], [0, 120])

  // Tidslinje progress-streg
  const timelineRef = useRef(null)
  const { scrollYProgress: tp } = useScroll({ target: timelineRef, offset: ['start 30%', 'end 70%'] })
  const lineScale = useTransform(tp, [0, 1], [0, 1])

  return (
    <div style={{ background: C.navy }}>
      {/* HERO — kompakt, professionel */}
      <section ref={heroRef} className="nypool-hero" style={{ position: 'relative', height: '72vh', minHeight: 520, overflow: 'hidden' }}>
        <motion.div style={{ position: 'absolute', inset: '-10% 0', y: imgY, scale: imgScale }}>
          <img src="/images/a520a122061fd951be2fe1c2899eaad8.jpg" alt="Luksuspool i have"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,24,40,0.05) 0%, rgba(10,24,40,0) 40%, rgba(10,24,40,0.55) 78%, rgba(10,24,40,0.78) 100%)' }} />
        </motion.div>

        <motion.div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: isMobile ? '0 5vw 16px' : '0 5vw 140px', maxWidth: 1400, margin: '0 auto', y: titleY }}>
          <motion.p initial={{ opacity: 0, letterSpacing: '0.5em' }} animate={{ opacity: 0.85, letterSpacing: '0.28em' }} transition={{ duration: 1.2, delay: 0.3 }}
            style={{ color: C.sky, fontSize: 12, textTransform: 'uppercase', marginBottom: 18 }}>Ny pool · forløb</motion.p>
          <h1 style={{ fontSize: isMobile ? '11vw' : 'clamp(40px, 7vw, 92px)', lineHeight: 1.0, color: '#fff', fontWeight: 700, letterSpacing: '-0.03em', margin: 0 }}>
            {['Få en ny', 'swimmingpool'].map((l, li) => (
              <span key={li} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.12em' }}>
                <motion.span style={{ display: 'inline-block', paddingBottom: '0.06em' }} initial={{ y: '110%' }} animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.4 + li * 0.12, ease: [0.22, 1, 0.36, 1] }}>{l}</motion.span>
              </span>
            ))}
          </h1>

          {/* Info-bjælke forneden */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap',
              marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 17, lineHeight: 1.6, maxWidth: 460, margin: 0 }}>
              Komplet entreprise fra første streg til den første dukkert — ét hold, ét ansvar.
            </p>
            <Btn href="#raadgivning">Se forløbet</Btn>
          </motion.div>
        </motion.div>
      </section>

      {/* RÅDGIVNING */}
      <section id="raadgivning" style={{ background: C.sand, padding: '150px 5vw', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
          <div className="advise-grid advise-grid-nypool" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.45fr 1fr', alignItems: 'center' }}>
            {/* Stort billede */}
            <div className="advise-img" style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', alignSelf: 'stretch', boxShadow: '0 40px 90px rgba(10,37,64,0.22)' }}>
              <ImageReveal src="/images/Pool-kant.jpg" alt="Baghave-pool" height="100%" objectPosition="60% 85%" radius={0} noParallax />
              {/* Svævende stat-badge på billedet */}
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute', top: 28, left: 28, background: 'rgba(10,24,40,0.55)',
                  backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: 16, padding: '16px 22px', color: '#fff'
                }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 700, lineHeight: 1 }}>100%</div>
                <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.8, marginTop: 4 }}>Skræddersyet til jer</div>
              </motion.div>
            </div>

            {/* Tekstkort der overlapper billedet */}
            <Reveal>
              <div className="advise-card" style={{
                background: '#fff', borderRadius: 24, padding: 'clamp(32px, 4vw, 56px)',
                boxShadow: '0 40px 90px rgba(10,37,64,0.14)', marginLeft: '-12%', marginTop: '38%', position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
                  <span style={{ width: 36, height: 2, background: C.sky, display: 'inline-block' }} />
                  <p style={{ color: C.sky, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Trin et</p>
                </div>
                <h2 style={{ fontSize: 'clamp(34px, 4vw, 56px)', fontWeight: 700, color: C.deep, marginBottom: 26, letterSpacing: '-0.03em', lineHeight: 1.02 }}>
                  Rådgivning<br />til valget
                </h2>
                <p style={{ color: C.slate, fontSize: 18, lineHeight: 1.85, marginBottom: 22 }}>
                  Vi tager et indledende møde over telefon eller video. Her tager vi en dialog om hele projektet af jeres nye pool — helt fra gravearbejdet til den første dukkert.
                </p>
                <p style={{ color: C.slate, fontSize: 18, lineHeight: 1.85 }}>
                  Vi viser jer muligheder, funktioner og eventuelle modifikationer, så din nye swimmingpool passer perfekt til jer.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* REALISERING — scroll-tidslinje */}
      <section style={{ background: C.navy, padding: '140px 5vw' }}>
        <div style={{ maxWidth: 950, margin: '0 auto' }}>
          <Reveal>
            <p style={{ color: C.sky, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 18 }}>Trin to</p>
            <h2 style={{ fontSize: 'clamp(36px, 6vw, 84px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 24 }}>
              Realisering<br />af drømmen
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.8, maxWidth: 560, marginBottom: 80 }}>
              Projektet følger ni overordnede faser. Vi evaluerer løbende og er i tæt dialog med dig hele vejen.
            </p>
          </Reveal>

          <div ref={timelineRef} style={{ position: 'relative' }}>
            {/* baggrundsstreg */}
            <div style={{ position: 'absolute', left: 45, top: 0, bottom: 64, width: 2, background: 'rgba(255,255,255,0.12)' }} />
            {/* progress-streg */}
            <motion.div style={{ position: 'absolute', left: 45, top: 0, bottom: 64, width: 2, background: C.sky, transformOrigin: 'top', scaleY: lineScale }} />
            {phases.map((p, i) => <Phase key={p.t} p={p} i={i} />)}
          </div>

          <Reveal>
            <p style={{
              marginLeft: 118, marginTop: 8, fontFamily: 'Playfair Display, serif', fontStyle: 'italic',
              fontSize: 'clamp(20px, 2.4vw, 28px)', color: C.sky, lineHeight: 1.5, maxWidth: 620
            }}>
              Vi evaluerer løbende projektet og er i tæt dialog med kunden.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA — levende vand-gradient bag */}
      <section style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '110px 5vw', background: C.sand }}>
        <motion.div aria-hidden
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: '50%', top: '50%', width: '70%', height: '85%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0.04) 40%, transparent 70%)',
            filter: 'blur(24px)', pointerEvents: 'none'
          }} />

        <div style={{ position: 'relative', textAlign: 'center', maxWidth: 920 }}>
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.5em' }} whileInView={{ opacity: 0.9, letterSpacing: '0.3em' }} viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ color: C.sky, fontSize: 13, textTransform: 'uppercase', marginBottom: 28 }}>
            Klar når du er
          </motion.p>

          <h2 style={{ fontSize: 'clamp(36px, 6vw, 84px)', fontWeight: 700, color: C.deep, letterSpacing: '-0.03em', lineHeight: 0.98, margin: 0 }}>
            {['Skal vi bygge', 'jeres pool?'].map((l, li) => (
              <span key={li} style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.1em' }}>
                <motion.span style={{ display: 'inline-block', paddingBottom: '0.05em' }}
                  initial={{ y: '110%' }} animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.2 + li * 0.12, ease: [0.22, 1, 0.36, 1] }}>{l}</motion.span>
              </span>
            ))}
          </h2>

          <Reveal delay={0.3}>
            <p style={{ color: C.slate, fontSize: 'clamp(17px, 2vw, 21px)', lineHeight: 1.6, maxWidth: 520, margin: '28px auto 44px' }}>
              Ring i dag, eller send et par ord om jeres drøm. Vi vender tilbage inden for 24 timer.
            </p>
            <div style={{ display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Btn href="tel:29626248" sky width={240}><PhoneIcon />29 62 62 48</Btn>
              <Btn to="/kontakt" dark width={240}>Start mit poolforløb</Btn>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
