import { useState } from 'react'
import { motion } from 'framer-motion'
import { C, Reveal } from '../shared'
import { team } from '../data'

const field = {
  width: '100%', padding: '15px 18px', borderRadius: 12, border: '1px solid #d9d4c8',
  fontSize: 15, outline: 'none', fontFamily: 'Inter, sans-serif', color: C.deep, background: '#fff'
}

export default function Kontakt() {
  const [sent, setSent] = useState(false)

  return (
    <div style={{ background: C.sand }}>
      <section className="kontakt-header" style={{ background: C.navy, padding: '180px 5vw 110px', color: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1, overflow: 'visible', paddingBottom: '0.1em' }}>
            <motion.span style={{ display: 'inline-block' }} initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>Vi hjælper dig<br className="kontakt-br" />hele vejen</motion.span>
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.65 }} transition={{ delay: 0.4 }}
            style={{ fontSize: 'clamp(18px, 2.4vw, 26px)', marginTop: 28, maxWidth: 620, lineHeight: 1.6 }}>
            Du er altid velkommen til at kontakte os. Vi vender tilbage inden for 24 timer med en uforpligtende snak om dit poolprojekt.
          </motion.p>
        </div>
      </section>

      <section className="kontakt-content" style={{ padding: '100px 5vw 140px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 70 }} className="split kontakt-grid">
          {/* INFO */}
          <div className="kontakt-info-col">
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 700, color: C.deep, marginBottom: 32, letterSpacing: '-0.02em' }}>Ring direkte</h2>
            {team.map(m => (
              <div key={m.name} style={{ padding: '20px 0', borderTop: '1px solid rgba(10,37,64,0.12)' }}>
                <div style={{ fontSize: 18, fontWeight: 600, color: C.deep }}>{m.name}</div>
                <div style={{ fontSize: 14, color: C.slate, margin: '4px 0 8px' }}>{m.role}</div>
                <a href={`tel:${m.phone.replace(/ /g, '')}`} style={{ color: C.sky, fontSize: 18, fontWeight: 600, textDecoration: 'none' }}>{m.phone}</a>
              </div>
            ))}
            <div style={{ marginTop: 40, color: C.slate, fontSize: 15, lineHeight: 2 }}>
              <strong style={{ color: C.deep }}>Mail:</strong> <a href="mailto:info@jmswimmingpool.dk" style={{ color: C.sky, textDecoration: 'none' }}>info@jmswimmingpool.dk</a><br />
              <strong style={{ color: C.deep }}>Adresse:</strong> Gl. Ullitsvej 23, 9640 Farsø<br />
              <strong style={{ color: C.deep }}>CVR:</strong> 29815232
            </div>
          </div>

          {/* FORM */}
          <div className="kontakt-form-col">
          <Reveal delay={0.15}>
            <form onSubmit={e => { e.preventDefault(); setSent(true) }}
              style={{ background: '#fff', borderRadius: 24, padding: '48px 44px', boxShadow: '0 20px 60px rgba(10,37,64,0.08)' }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: 56, marginBottom: 20 }}>🏊</div>
                  <h3 style={{ fontSize: 28, fontWeight: 700, color: C.deep, marginBottom: 12 }}>Tak for din besked!</h3>
                  <p style={{ color: C.slate, fontSize: 16 }}>Vi vender tilbage inden for 24 timer.</p>
                </div>
              ) : (
                <>
                  <h2 style={{ fontSize: 26, fontWeight: 700, color: C.deep, marginBottom: 28 }}>Få et gratis tilbud</h2>
                  {[{ l: 'Navn', t: 'text', p: 'Dit fulde navn' }, { l: 'Telefon', t: 'tel', p: '12 34 56 78' }, { l: 'Email', t: 'email', p: 'din@email.dk' }].map(f => (
                    <div key={f.l} style={{ marginBottom: 18 }}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 8, color: C.deep }}>{f.l}</label>
                      <input type={f.t} placeholder={f.p} required style={field}
                        onFocus={e => e.target.style.borderColor = C.sky} onBlur={e => e.target.style.borderColor = '#d9d4c8'} />
                    </div>
                  ))}
                  <div style={{ marginBottom: 26 }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 8, color: C.deep }}>Fortæl om dit projekt</label>
                    <textarea rows={4} placeholder="Drømmer du om en ny pool, renovering eller service?" style={{ ...field, resize: 'vertical' }}
                      onFocus={e => e.target.style.borderColor = C.sky} onBlur={e => e.target.style.borderColor = '#d9d4c8'} />
                  </div>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="submit"
                    style={{ width: '100%', padding: '17px', background: C.deep, color: '#fff', border: 'none', borderRadius: 40, fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                    Send besked
                  </motion.button>
                </>
              )}
            </form>
          </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
