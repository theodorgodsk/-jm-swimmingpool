import { useEffect, useRef } from 'react'

// Blød "vand-dråbe" cursor der følger musen med forsinkelse
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2
    let rx = mx, ry = my

    const move = e => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', move)

    // Forstør ring ved hover på links/knapper
    const enter = () => ring.current && (ring.current.style.transform = 'translate(-50%,-50%) scale(2.2)')
    const leave = () => ring.current && (ring.current.style.transform = 'translate(-50%,-50%) scale(1)')
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    let raf
    const loop = () => {
      rx += (mx - rx) * 0.15
      ry += (my - ry) * 0.15
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`
      if (ring.current) ring.current.style.left = rx + 'px', ring.current.style.top = ry + 'px'
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', move) }
  }, [])

  return (
    <>
      <div ref={dot} style={{
        position: 'fixed', left: 0, top: 0, width: 6, height: 6, borderRadius: '50%',
        background: '#0ea5e9', pointerEvents: 'none', zIndex: 9999, mixBlendMode: 'difference'
      }} />
      <div ref={ring} style={{
        position: 'fixed', left: 0, top: 0, width: 40, height: 40, borderRadius: '50%',
        border: '1.5px solid rgba(14,165,233,0.6)', pointerEvents: 'none', zIndex: 9999,
        transform: 'translate(-50%,-50%)', transition: 'transform 0.25s ease'
      }} />
    </>
  )
}
