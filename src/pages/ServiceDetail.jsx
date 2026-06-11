import { useLocation, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { C, Reveal, ImageReveal, Btn, PhoneIcon } from '../shared'
import { servicePages } from '../data'

export default function ServiceDetail() {
  const slug = useLocation().pathname.replace('/', '')
  const data = servicePages[slug]
  if (!data) return <Navigate to="/" replace />

  return (
    <div style={{ background: C.sand }}>
      {/* HEADER */}
      <section style={{ background: C.navy, padding: '180px 5vw 100px', color: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            style={{ color: C.sky, fontSize: 14, fontWeight: 600, marginBottom: 16 }}>{data.label}</motion.p>
          <h1 style={{ fontSize: 'clamp(44px, 9vw, 110px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.95, overflow: 'hidden' }}>
            <motion.span style={{ display: 'inline-block' }} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
              {data.title}
            </motion.span>
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.4, duration: 0.8 }}
            style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', marginTop: 24, fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: C.sky }}>
            {data.tagline}
          </motion.p>
        </div>
      </section>

      {/* BILLEDE + INTRO */}
      <section style={{ padding: '100px 5vw' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="split">
          <ImageReveal src={data.image} alt={data.title} height="55vh" />
          <Reveal>
            <p style={{ fontSize: 'clamp(20px, 2.6vw, 30px)', color: C.deep, lineHeight: 1.5, fontWeight: 400, letterSpacing: '-0.01em' }}>
              {data.intro}
            </p>
            <div style={{ marginTop: 36 }}><Btn to="/kontakt">{data.cta}</Btn></div>
          </Reveal>
        </div>
      </section>

      {/* PROCES-TRIN */}
      <section style={{ padding: '60px 5vw 140px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal><h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: C.deep, marginBottom: 60, letterSpacing: '-0.02em' }}>Sådan foregår det</h2></Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {data.steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <motion.div whileHover={{ y: -8 }} style={{ background: '#fff', borderRadius: 20, padding: '40px 34px', height: '100%' }}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 48, fontWeight: 700, color: C.sky, lineHeight: 1, marginBottom: 16 }}>{s.n}</div>
                  <h3 style={{ fontSize: 21, fontWeight: 700, color: C.deep, marginBottom: 12 }}>{s.t}</h3>
                  <p style={{ color: C.slate, fontSize: 15, lineHeight: 1.7 }}>{s.d}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: C.sky, padding: '120px 5vw', textAlign: 'center' }}>
        <Reveal>
          <h2 style={{ fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: 700, color: C.deep, letterSpacing: '-0.03em', marginBottom: 36 }}>Klar til at gå i gang?</h2>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Btn href="tel:29626248"><PhoneIcon />29 62 62 48</Btn>
            <Btn to="/kontakt" light>{data.cta}</Btn>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
