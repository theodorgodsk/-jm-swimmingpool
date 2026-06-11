import { motion } from 'framer-motion'
import { C, Reveal, RevealWords, ImageReveal, Counter, Btn } from '../shared'
import { team } from '../data'

const expertise = [
  { t: 'Vores ekspertise', d: 'Vores erfarne team af poolkonsulenter og anlægsgartnere sikrer en professionel proces fra start til slut. Vi fokuserer på kvalitet i alle detaljer og bruger kun de bedste materialer for at garantere holdbarhed og driftssikkerhed.' },
  { t: 'Miljøbevidst tilgang', d: 'Vi arbejder målrettet på at tilbyde energieffektive løsninger, der minimerer både dit vandforbrug og dine varmeudgifter. Vores poolløsninger er designet med fokus på både komfort og miljøhensyn.' },
  { t: 'Skræddersyede løsninger', d: 'Vi tilpasser din pool præcist efter dine ønsker og din grunds forudsætninger. Uanset om du drømmer om en klassisk rektangulær pool, en elegant infinity-pool eller en naturlig swimmingpool, kan vi realisere din vision.' },
]

export default function OmOs() {
  return (
    <div style={{ background: C.sand }}>
      {/* HEADER */}
      <section className="om-os-header" style={{ background: C.navy, padding: '180px 5vw 120px', color: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            style={{ color: C.sky, fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 24 }}>Vi bygger, du hygger</motion.p>
          <h1 className="om-os-h1" style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            <RevealWords text="Om vores virksomhed" style={{ color: '#fff' }} />
          </h1>
          <Reveal delay={0.3}>
            <p style={{ fontSize: 'clamp(18px, 2.2vw, 26px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, maxWidth: 760, marginTop: 32 }}>
              Med over 15 års erfaring i poolbranchen er vi specialister i at skabe den perfekte pooloplevelse til danske hjem. Vi håndterer hele processen fra rådgivning og design til udgravning, installation og vedligeholdelse.
            </p>
          </Reveal>
        </div>
      </section>

      {/* EKSPERTISE */}
      <section className="om-os-expertise" style={{ padding: '120px 5vw' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 70, alignItems: 'start' }} className="split">
          <div>
            <ImageReveal src="/images/12311.jpg" alt="Poolarbejde" height="60vh" noParallax />
          </div>
          <div className="split-text expertise-list">
            {expertise.map((e, i) => (
              <Reveal key={e.t} delay={i * 0.08}>
                <div className="expertise-item" style={{ marginBottom: 48, paddingBottom: 48, borderBottom: i < expertise.length - 1 ? '1px solid rgba(10,37,64,0.12)' : 'none' }}>
                  <h3 style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 700, color: C.deep, marginBottom: 16, letterSpacing: '-0.02em' }}>{e.t}</h3>
                  <p style={{ color: C.slate, fontSize: 17, lineHeight: 1.8 }}>{e.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section style={{ background: C.navy, padding: '130px 5vw' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal><h2 style={{ textAlign: 'center', fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 700, color: '#fff', marginBottom: 16, letterSpacing: '-0.02em' }}>Vores team</h2>
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 16, marginBottom: 70 }}>Ring direkte til specialisten der løser din opgave.</p></Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 28 }}>
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.1}>
                <motion.div whileHover={{ y: -8 }} className="team-card" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '44px 36px', textAlign: 'center', height: '100%' }}>
                  <div className="team-avatar" style={{ width: 88, height: 88, borderRadius: '50%', margin: '0 auto 24px', background: `linear-gradient(135deg, ${C.sky}, ${C.deep})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 30, fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
                    {m.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="team-info">
                    <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{m.name}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.6, marginBottom: 18 }}>{m.role}</p>
                    <a href={`tel:${m.phone.replace(/ /g, '')}`} style={{ color: C.sky, fontSize: 17, fontWeight: 600, textDecoration: 'none' }}>{m.phone}</a>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
