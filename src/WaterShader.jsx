import { useEffect, useRef } from 'react'

// Animeret vand-caustics shader (WebGL). Kører i baggrunden af hero.
const frag = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

// Caustics-agtig vandeffekt
float wave(vec2 p, float t) {
  float v = 0.0;
  v += sin((p.x * 8.0 + t));
  v += sin((p.y * 8.0 + t * 1.3));
  v += sin((p.x * 6.0 + p.y * 6.0 + t * 0.8));
  v += sin(length(p) * 12.0 - t * 1.5);
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_res.x / u_res.y;

  vec2 m = (u_mouse / u_res) * 2.0 - 1.0;
  p += m * 0.15;

  float t = u_time * 0.4;
  float v = wave(p, t);
  v += wave(p * 1.7 + 1.3, t * 1.2) * 0.5;

  float caustic = pow(abs(sin(v * 1.2)), 3.0);

  // Pool-farver: dyb teal -> lys cyan -> hvidt skum
  vec3 deep = vec3(0.02, 0.27, 0.43);
  vec3 mid  = vec3(0.05, 0.55, 0.72);
  vec3 light = vec3(0.45, 0.85, 0.95);

  vec3 col = mix(deep, mid, smoothstep(0.0, 0.6, v * 0.3 + 0.5));
  col = mix(col, light, caustic * 0.9);
  col += caustic * vec3(0.6, 0.9, 1.0) * 0.4;

  // Vignette
  float vig = 1.0 - length(uv - 0.5) * 0.8;
  col *= vig;

  gl_FragColor = vec4(col, 1.0);
}
`

const vert = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

export default function WaterShader() {
  const canvasRef = useRef(null)
  const mouse = useRef([0, 0])

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl')
    if (!gl) return

    const compile = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }

    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uMouse = gl.getUniformLocation(prog, 'u_mouse')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = e => { mouse.current = [e.clientX, window.innerHeight - e.clientY] }
    window.addEventListener('mousemove', onMove)

    let raf
    let visible = true
    const observer = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0 })
    observer.observe(canvas)

    const start = performance.now()
    let last = 0
    const render = (now) => {
      raf = requestAnimationFrame(render)
      if (!visible) return
      if (now - last < 20) return  // max ~50fps
      last = now
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, (performance.now() - start) / 1000)
      gl.uniform2f(uMouse, mouse.current[0], mouse.current[1])
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    render(0)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    />
  )
}
