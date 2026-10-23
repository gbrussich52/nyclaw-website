'use client'

// classification: PUBLIC
import { useEffect, useRef, useState } from 'react'

/**
 * DnaHelix: a 3D ball-and-stick DNA double helix drawn on the GPU with raw
 * WebGL 1. No three.js, no dependency; the whole renderer is this file.
 *
 * Scene: two sugar-phosphate backbones (a glossy sphere at every base pair,
 * joined by smaller beads so each strand reads as a chain), base-pair rungs
 * between them (sticks in two tints, one per base), offset by a real
 * major/minor groove, plus a sparse field of out-of-focus dust.
 *
 * Every point's position is computed in the vertex shader from
 * (axial t, strand mix f, kind, seed), so the vertex buffer is static and the
 * CPU only sets a few uniforms per frame.
 *
 * Two passes over the same buffer:
 *   1. solid: sphere-shaded cores with depth test + depth write, so the front
 *      strand hides the back one like a real object. Far points are fogged
 *      toward the background; near points grow and soften (depth of field).
 *   2. glow: additive halos (soft bloom) and dust bokeh, depth-tested against
 *      the cores but not writing depth.
 * The buffer is ordered far end -> near end so soft, blurred near spheres
 * blend over what is behind them.
 *
 * Guards: mounts after first paint (the headline stays the LCP element),
 * DPR capped (2 desktop / 1.5 touch), fewer base pairs on small screens,
 * pauses offscreen (IntersectionObserver) and on hidden tabs,
 * prefers-reduced-motion draws one still frame, no WebGL or a lost context
 * shows a still frame rendered by this same renderer (public/dna-poster.webp).
 */

const VERT = `
precision highp float;
attribute vec4 aP; // x: axial t (-1..1) | y: strand mix f (0..1) | z: kind | w: seed
uniform float uTime, uAspect, uTilt, uYaw, uScroll, uPx, uRadius, uHalf, uPitch, uDist;
uniform mediump float uPass; // shared with the fragment shader: precision must match
uniform vec2 uCenter, uRot;
varying vec3 vCol;
varying float vAlpha, vCore, vEdge, vBlur, vKind, vGlow;

const vec3 BG = vec3(0.035, 0.035, 0.045);
const vec3 ICE = vec3(0.80, 0.93, 1.0);
const vec3 CYAN = vec3(0.133, 0.827, 0.933);
const vec3 SKY = vec3(0.18, 0.545, 1.0);
const vec3 INDIGO = vec3(0.39, 0.40, 0.95);

void main() {
  float kind = aP.z;
  float seed = aP.w;
  float t = aP.x;
  vec3 p;
  float size;
  vec3 col;
  float glow;
  if (kind < 2.5) {
    float y = t * uHalf;
    float pitch = uPitch * (1.0 + uScroll * 0.7);            // scroll unwinds the coil
    float a = y * 6.2831853 / pitch + uTime * 0.24;
    float b = a + 2.35;                                         // major/minor groove offset
    p = mix(vec3(cos(a) * uRadius, y, sin(a) * uRadius), vec3(cos(b) * uRadius, y, sin(b) * uRadius), aP.y);
    if (kind < 0.5) {                                           // backbone node
      size = 0.46;
      col = aP.y < 0.5 ? mix(ICE, CYAN, 0.35) : mix(ICE, INDIGO, 0.55);
      glow = 0.34;
    } else if (kind < 1.5) {                                    // backbone link bead
      size = 0.2;
      col = aP.y < 0.5 ? mix(ICE, CYAN, 0.55) : mix(ICE, INDIGO, 0.7);
      glow = 0.12;
    } else {                                                    // base-pair stick
      size = 0.1;
      vec3 l = seed < 0.5 ? CYAN : ICE;
      vec3 r = seed < 0.5 ? INDIGO : SKY;
      col = aP.y < 0.5 ? l : r;
      glow = 0.1;
    }
  } else {                                                      // dust: loose shell, drifting along the axis
    float yy = mod(aP.y * 2.0 * uHalf + uTime * 0.18, 2.0 * uHalf) - uHalf;
    float ang = seed * 6.2831853 + uTime * 0.04;
    float r = uRadius * (2.0 + fract(seed * 7.13) * 3.0);
    p = vec3(cos(ang) * r + t * 2.0, yy, sin(ang) * r);
    size = 0.05 + fract(seed * 3.7) * 0.1;
    col = mix(SKY, ICE, fract(seed * 11.0));
    glow = 0.5;
  }

  // lean the axis into depth (one end toward the camera), lay it diagonally
  // on screen, then the small pointer parallax
  float cw = cos(uYaw), sw = sin(uYaw);
  p.yz = vec2(cw * p.y - sw * p.z, sw * p.y + cw * p.z);
  float ct = cos(uTilt), st = sin(uTilt);
  p.xy = vec2(ct * p.x - st * p.y, st * p.x + ct * p.y);
  float cx = cos(uRot.y), sx = sin(uRot.y);
  p.yz = vec2(cx * p.y - sx * p.z, sx * p.y + cx * p.z);
  float cy = cos(uRot.x), sy = sin(uRot.x);
  p.xz = vec2(cy * p.x + sy * p.z, -sy * p.x + cy * p.z);

  float dist = uDist + uScroll * 3.0;                           // recede on scroll
  float w = max(0.6, dist - p.z);
  const float F = 2.75;                                         // ~40deg vertical fov
  float zn = clamp((w - 0.5) / 40.0, 0.0, 1.0) * 2.0 - 1.0;
  gl_Position = vec4(p.x * F / uAspect + uCenter.x * w, p.y * F + uCenter.y * w, zn * w, w);

  // depth of field: sharp at the helix centre, soft toward the near end,
  // slightly soft and fogged toward the far end
  float nearBlur = clamp((dist - 1.2 - w) / 3.2, 0.0, 1.0);
  float farBlur = clamp((w - dist - 1.5) / 7.0, 0.0, 1.0) * 0.45;
  float blur = kind > 2.5 ? 1.0 : max(nearBlur, farBlur);
  float fog = clamp((w - dist + 0.5) / 9.0, 0.0, 1.0);

  float diam = size * F / w * uPx;                              // core diameter in px
  float sprite;
  if (uPass < 0.5) {
    sprite = diam * (1.0 + blur * 0.55) + 2.0;
    vCore = diam / sprite;
  } else {
    sprite = diam * (kind > 2.5 ? 1.6 : 2.8);
    vCore = diam / sprite;
  }
  gl_PointSize = (uPass < 0.5 && kind > 2.5) ? 0.0 : sprite;
  vEdge = 2.0 / sprite + blur * 0.5 * vCore;
  vBlur = blur;
  vKind = kind;
  vGlow = glow * (1.0 - fog * 0.8);
  vCol = mix(col, BG, fog * 0.82);
  vAlpha = kind > 2.5 ? 0.22 + fract(seed * 5.3) * 0.25 : 1.0;
}
`

const FRAG = `
precision mediump float;
uniform float uPass, uFade;
varying vec3 vCol;
varying float vAlpha, vCore, vEdge, vBlur, vKind, vGlow;
void main() {
  vec2 c = gl_PointCoord * 2.0 - 1.0;
  float r = length(c);
  if (r > 1.0) discard;
  if (uPass < 0.5) {
    // solid pass: a lit sphere with a soft (depth-of-field) edge
    float a = clamp((vCore - r) / max(vEdge, 0.001) + 0.5, 0.0, 1.0);
    if (a < 0.02) discard;
    vec2 q2 = c / vCore;
    float q = min(length(q2), 1.0);
    vec3 n = normalize(vec3(q2, sqrt(max(0.0, 1.0 - q * q))));
    vec3 L = normalize(vec3(-0.5, 0.65, 0.6));
    float lam = max(dot(n, L), 0.0);
    float spec = pow(max(dot(reflect(-L, n), vec3(0.0, 0.0, 1.0)), 0.0), 36.0);
    // fake environment: bright sky above, dark floor below, gives the chrome read
    float env = smoothstep(-0.35, 0.95, n.y * 0.8 - n.x * 0.25);
    float rim = pow(1.0 - n.z, 2.6);
    vec3 rgb = vCol * (0.1 + 0.62 * lam)
             + vCol * env * 0.38
             + vec3(spec) * (0.9 - vBlur * 0.6)
             + vec3(0.13, 0.83, 0.93) * rim * 0.55;
    a *= uFade;
    gl_FragColor = vec4(rgb * a, a);
  } else {
    // glow pass: soft bloom around every core, bokeh for the dust
    float g;
    if (vKind > 2.5) {
      g = (1.0 - smoothstep(0.55, 1.0, r)) * vAlpha;
    } else {
      float x = r / vCore;
      g = exp(-x * x * 0.9) * vGlow * (1.0 - step(x, 0.9) * 0.6);
    }
    g *= uFade;
    gl_FragColor = vec4(vCol * g, 0.0);
  }
}
`

type Layout = { tilt: number; yaw: number; cx: number; cy: number; dist: number; dim: number }

/** Points ordered from the far end (t = +1) to the near end (t = -1). */
function buildGeometry(pairs: number, dust: number): Float32Array {
  const LINKS = [0.25, 0.5, 0.75] // backbone beads between two nodes
  const STICK = 13 // points per base-pair stick
  const out: number[] = []
  const tAt = (i: number) => 1 - (i / (pairs - 1)) * 2
  for (let i = 0; i < pairs; i++) {
    const t = tAt(i)
    const seed = ((i * 7919) % 101) / 101 < 0.5 ? 0.25 : 0.75
    for (let k = 0; k < STICK; k++) {
      const f = 0.06 + (k / (STICK - 1)) * 0.88
      out.push(t, f, 2, seed)
    }
    out.push(t, 0, 0, 0, t, 1, 0, 0)
    if (i < pairs - 1) {
      const t2 = tAt(i + 1)
      for (const l of LINKS) {
        const tl = t + (t2 - t) * l
        out.push(tl, 0, 1, 0, tl, 1, 1, 0)
      }
    }
  }
  for (let i = 0; i < dust; i++) {
    const h = (n: number) => {
      const x = Math.sin(i * 127.1 + n * 311.7) * 43758.5453
      return x - Math.floor(x)
    }
    out.push(h(1) * 2 - 1, h(2), 3, h(3))
  }
  return new Float32Array(out)
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)
  if (!s) return null
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn('[DnaHelix] shader', gl.getShaderInfoLog(s))
    return null
  }
  return s
}

export default function DnaHelix({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let disposed = false
    let cleanup = () => {}

    const start = () => {
      if (disposed) return
      const gl = canvas.getContext('webgl', {
        antialias: false,
        alpha: true,
        depth: true,
        premultipliedAlpha: true,
        powerPreference: 'low-power',
        preserveDrawingBuffer: false,
      })
      if (!gl) return setFallback(true)
      const vs = compile(gl, gl.VERTEX_SHADER, VERT)
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
      const prog = gl.createProgram()
      if (!vs || !fs || !prog) return setFallback(true)
      gl.attachShader(prog, vs)
      gl.attachShader(prog, fs)
      gl.linkProgram(prog)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.warn('[DnaHelix] link', gl.getProgramInfoLog(prog))
        return setFallback(true)
      }
      gl.useProgram(prog)

      const small = window.innerWidth < 768
      const coarse = window.matchMedia('(pointer: coarse)').matches
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const pairs = small ? 52 : 72
      const dust = small ? 70 : 150
      const data = buildGeometry(pairs, dust)
      const total = data.length / 4
      const solid = total - dust // dust is last and only drawn in the glow pass
      const buf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
      const loc = gl.getAttribLocation(prog, 'aP')
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, 0, 0)

      const u = (n: string) => gl.getUniformLocation(prog, n)
      const U = {
        time: u('uTime'), aspect: u('uAspect'), tilt: u('uTilt'), yaw: u('uYaw'), scroll: u('uScroll'),
        px: u('uPx'), radius: u('uRadius'), half: u('uHalf'), pitch: u('uPitch'), dist: u('uDist'),
        center: u('uCenter'), rot: u('uRot'), pass: u('uPass'), fade: u('uFade'),
      }
      gl.enable(gl.BLEND)
      gl.enable(gl.DEPTH_TEST)
      gl.depthFunc(gl.LEQUAL)
      gl.clearColor(0, 0, 0, 0)
      gl.clearDepth(1)

      let dim = 1
      const resize = () => {
        const rect = canvas.getBoundingClientRect()
        const dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2)
        canvas.width = Math.max(1, Math.round(rect.width * dpr))
        canvas.height = Math.max(1, Math.round(rect.height * dpr))
        gl.viewport(0, 0, canvas.width, canvas.height)
        const aspect = rect.width / Math.max(1, rect.height)
        const layout: Layout =
          aspect > 1.1
            ? { tilt: -0.98, yaw: -0.42, cx: 0.64, cy: 0.06, dist: 11, dim: 1 } // desktop: diagonal, right of the headline
            : { tilt: -0.3, yaw: -0.5, cx: 0.78, cy: 0.1, dist: 15, dim: 0.85 } // portrait: a strand down the right edge, dimmed behind the copy
        gl.uniform1f(U.aspect, aspect)
        gl.uniform1f(U.px, canvas.height / 2)
        gl.uniform1f(U.tilt, layout.tilt)
        gl.uniform1f(U.yaw, layout.yaw)
        gl.uniform2f(U.center, layout.cx, layout.cy)
        gl.uniform1f(U.dist, layout.dist)
        dim = layout.dim
      }
      gl.uniform1f(U.radius, 1.5)
      gl.uniform1f(U.half, 9)
      gl.uniform1f(U.pitch, 5.2)
      resize()

      let rotX = 0, rotY = 0, tgtX = 0, tgtY = 0, scroll = 0
      const draw = (time: number, fade: number) => {
        gl.uniform1f(U.time, time)
        gl.uniform1f(U.scroll, scroll)
        gl.uniform2f(U.rot, rotX, rotY)
        gl.uniform1f(U.fade, fade)
        gl.depthMask(true)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        gl.uniform1f(U.pass, 0)
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
        gl.drawArrays(gl.POINTS, 0, solid)
        gl.uniform1f(U.pass, 1)
        gl.depthMask(false)
        gl.blendFunc(gl.ONE, gl.ONE)
        gl.drawArrays(gl.POINTS, 0, total)
      }

      // ?helix-still: a fixed frame used to render the static poster
      const still = reduce || new URLSearchParams(window.location.search).has('helix-still')
      if (still) {
        draw(2.2, dim)
        const ro = new ResizeObserver(() => { resize(); draw(2.2, dim) })
        ro.observe(canvas)
        canvas.dataset.ready = '1'
        cleanup = () => ro.disconnect()
        return
      }

      const t0 = performance.now()
      let raf = 0
      let visible = true
      const frame = (now: number) => {
        raf = 0
        const t = (now - t0) / 1000
        rotX += (tgtX - rotX) * 0.05
        rotY += (tgtY - rotY) * 0.05
        const host = canvas.parentElement
        if (host) {
          const r = host.getBoundingClientRect()
          scroll = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)))
        }
        const intro = Math.min(1, t / 1.2)
        draw(t + 2.2, dim * intro * intro * (3 - 2 * intro) * (1 - scroll * 0.6))
        loop()
      }
      const loop = () => {
        if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame)
      }
      const stop = () => {
        if (raf) cancelAnimationFrame(raf)
        raf = 0
      }

      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting
        if (visible) loop()
        else stop()
      })
      io.observe(canvas)
      const onVis = () => (document.hidden ? stop() : loop())
      document.addEventListener('visibilitychange', onVis)
      const ro = new ResizeObserver(resize)
      ro.observe(canvas)
      const onMove = (e: PointerEvent) => {
        tgtX = (e.clientX / window.innerWidth - 0.5) * 0.22
        tgtY = (e.clientY / window.innerHeight - 0.5) * 0.14
      }
      if (!coarse) window.addEventListener('pointermove', onMove, { passive: true })
      const onLost = (e: Event) => {
        e.preventDefault()
        stop()
        setFallback(true)
      }
      canvas.addEventListener('webglcontextlost', onLost)
      canvas.dataset.ready = '1'
      loop()

      cleanup = () => {
        stop()
        io.disconnect()
        ro.disconnect()
        document.removeEventListener('visibilitychange', onVis)
        window.removeEventListener('pointermove', onMove)
        canvas.removeEventListener('webglcontextlost', onLost)
      }
    }

    // Start only after the page has loaded and the main thread is idle, so
    // first paint and the headline (LCP) never wait on shader compilation.
    let idle = 0
    let kick = 0
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    const schedule = () => {
      if (w.requestIdleCallback) idle = w.requestIdleCallback(start, { timeout: 1200 })
      else idle = window.setTimeout(start, 200)
    }
    const onLoad = () => {
      kick = requestAnimationFrame(schedule)
    }
    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad, { once: true })
    return () => {
      disposed = true
      window.removeEventListener('load', onLoad)
      cancelAnimationFrame(kick)
      if (w.cancelIdleCallback) w.cancelIdleCallback(idle)
      clearTimeout(idle)
      cleanup()
    }
  }, [])

  return (
    <div aria-hidden="true" className={`pointer-events-none ${className}`}>
      {fallback ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/dna-poster.webp" alt="" className="h-full w-full object-cover object-right" decoding="async" />
      ) : (
        <canvas ref={canvasRef} className="h-full w-full" />
      )}
    </div>
  )
}
