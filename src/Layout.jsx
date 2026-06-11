import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { C, ease } from './shared'

const nav = [
  { to: '/', label: 'Forside' },
  { to: '/om-os', label: 'Om os' },
]

const serviceLinks = [
  { to: '/ny-pool', label: 'Ny pool' },
  { to: '/renovering', label: 'Renovering' },
  { to: '/poolservice', label: 'Poolservice' },
  { to: '/pooltag', label: 'Pooltag' },
  { to: '/folieskifte', label: 'Folieskifte' },
]

function ServiceDropdown() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isActive = serviceLinks.some(l => pathname === l.to)

  return (
    <div style={{ position: 'relative' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}>
      <button style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        color: isActive ? C.sky : 'rgba(255,255,255,0.85)',
        fontSize: 14, fontWeight: 600, fontFamily: 'Inter, sans-serif',
        display: 'flex', alignItems: 'center', gap: 5
      }}>
        Ydelser
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: 'inline-block', fontSize: 10, opacity: 0.6 }}>▼</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', top: 'calc(100% + 14px)', left: '50%', transform: 'translateX(-50%)',
              background: 'rgba(10,24,40,0.97)', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16,
              padding: '8px', minWidth: 210,
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
            }}>
            {serviceLinks.map(l => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', borderRadius: 10, textDecoration: 'none', color: pathname === l.to ? C.sky : 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: 500, transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                {l.label}
                <span style={{ opacity: 0.4, fontSize: 14 }}>→</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Layout() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  // Smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08 })
    let raf
    const loop = t => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [])

  // Scroll til top ved sideskift + luk menu
  useEffect(() => { window.scrollTo(0, 0); setMenuOpen(false) }, [pathname])

  const onHome = pathname === '/'
  const allLinks = [...nav, ...serviceLinks, { to: '/kontakt', label: 'Kontakt' }]

  return (
    <div style={{ background: C.navy }}>

      {/* NAV */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease, delay: 0.2 }}
        style={{ position: 'fixed', top: 18, left: 0, right: 0, zIndex: 1000, padding: '0 14px', display: 'flex', justifyContent: 'center' }}
      >
        <div style={{
          width: '100%', maxWidth: 1240, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'rgba(10,24,40,0.92)', backdropFilter: 'blur(14px)',
          border: '1px solid rgba(255,255,255,0.08)', borderRadius: 22, padding: '12px 16px',
          boxShadow: '0 18px 50px rgba(10,37,64,0.28)'
        }}>
          {/* Logo i hvid chip */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <span style={{ background: '#fff', borderRadius: 14, padding: '6px 12px', display: 'flex', alignItems: 'center' }}>
              <img src="/images/JMS-logo-farve300-tekst-under.png" alt="JM Swimming Pool" style={{ height: 46, width: 'auto', display: 'block' }} />
            </span>
          </Link>

          {/* Desktop links */}
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 30, fontWeight: 600 }}>
            {nav.map(i => (
              <NavLink key={i.to} to={i.to}
                style={({ isActive }) => ({
                  color: isActive ? C.sky : 'rgba(255,255,255,0.85)',
                  textDecoration: 'none', transition: 'color 0.2s', fontSize: 16
                })}>
                {i.label}
              </NavLink>
            ))}
            <ServiceDropdown />
          </div>

          {/* Desktop CTA */}
          <Link to="/kontakt" className="nav-links" style={{ textDecoration: 'none' }}>
            <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{
              display: 'inline-block', padding: '13px 28px', background: C.sky, color: C.deep,
              borderRadius: 14, fontSize: 14, fontWeight: 700, letterSpacing: '0.02em'
            }}>
              Kontakt
            </motion.span>
          </Link>

          {/* Hamburger (mobil) */}
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, display: 'none', flexDirection: 'column', gap: 5 }}>
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} style={{ display: 'block', width: 24, height: 2, background: '#fff', borderRadius: 2 }} />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} style={{ display: 'block', width: 24, height: 2, background: '#fff', borderRadius: 2 }} />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} style={{ display: 'block', width: 24, height: 2, background: '#fff', borderRadius: 2 }} />
          </button>
        </div>

        {/* Mobil dropdown menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute', top: 'calc(100% + 8px)', left: 14, right: 14,
                background: 'rgba(10,24,40,0.97)', backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18,
                padding: '12px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
              }}>
              {allLinks.map(l => (
                <Link key={l.to} to={l.to}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderRadius: 12, textDecoration: 'none', color: pathname === l.to ? C.sky : 'rgba(255,255,255,0.85)', fontSize: 16, fontWeight: 500 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  {l.label}
                  <span style={{ opacity: 0.4 }}>→</span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <Outlet />

      {/* FOOTER */}
      <footer style={{ background: C.navy, padding: '70px 5vw 50px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="footer-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40 }}>
          <div style={{ maxWidth: 320 }}>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 700, color: '#fff' }}>JM Swimmingpool</span>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, lineHeight: 1.7, marginTop: 16 }}>
              Landsdækkende swimmingpool specialister med 15 års erfaring. Vi påtager os hele entreprisen, fra start til slut.
            </p>
          </div>
          <div>
            <div style={{ color: C.sky, fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Sider</div>
            {nav.concat({ to: '/kontakt', label: 'Kontakt' }).map(i => (
              <div key={i.to} style={{ marginBottom: 10 }}>
                <Link to={i.to} style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 15 }}>{i.label}</Link>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: C.sky, fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Kontakt</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 2 }}>
              <a href="tel:29626248" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'block' }}>29 62 62 48</a>
              <a href="mailto:info@jmswimmingpool.dk" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'block' }}>info@jmswimmingpool.dk</a>
              Gl. Ullitsvej 23, 9640 Farsø
            </div>
          </div>
        </div>
        <div className="footer-bottom" style={{ maxWidth: 1200, margin: '50px auto 0', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.35)', fontSize: 13, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span>© 2026 JM Swimming Pool · CVR 29815232</span>
          <span>MobilePay · Dankort · Visa · Mastercard</span>
        </div>
      </footer>
    </div>
  )
}
