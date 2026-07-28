/**
 * heroHelixDraw — framework-free drawing core for the hero DNA helix.
 *
 * This is the DESIGNER'S helix from the 2026 dusk handoff
 * (`NYClaw Dusk.dc.html`, the `heroMedia: 'helix'` variant), not the older
 * hero canvas the site shipped before the redesign. The two are different
 * compositions, not recolors:
 *
 *   old — vertical column, NODES 60 / TURNS 3.4, discrete node dots only
 *   new — horizontal ribbon sweeping left→right, NODES 132 / TURNS 1.85,
 *         continuous stroked strands with a horizontal gradient and a
 *         three-pass blur bloom composited with 'lighter'
 *
 * Exactly one implementation feeds both consumers:
 *   1. app/components/HeroHelix.tsx    — the live <canvas> component
 *   2. scripts/render-hero.mjs         — bakes public/hero.webm + hero.mp4
 * Edit here, never a copy, then re-run `npm run render:hero`.
 */

export const NODES = 132
export const TURNS = 1.85
export const PACKETS = 4
export const PARTICLE_COUNT = 42

/** Phase advanced per rAF frame by the live component (~0.36 rad/s at 60fps). */
export const LIVE_PHASE_STEP = 0.006

/**
 * Seamless-loop period.
 *
 * The strands repeat every 2π, but the data packets advance at half rate
 * (`packetPhase = phase * 0.5`) and so only complete half a cycle in that
 * span. The least common period is 4π — looping at 2π leaves the packets
 * mid-flight and the wrap visibly jumps.
 */
export const LOOP_PERIOD = Math.PI * 4

/** Distance below which two constellation points get linked, in CSS px. */
const MAX_DIST = 110

export interface Particle {
  x: number
  y: number
  z: number
  vy: number
}

export interface DrawParams {
  width: number
  height: number
  /** Animation phase in radians. */
  phase: number
  particles: readonly Particle[]
  /** Pointer parallax offsets, already lerped. Zero when there is no pointer. */
  parX: number
  parY: number
  /** Handoff's `heroIntensity` prop — scales every alpha. Range 0.5–1.6. */
  intensity?: number
}

/**
 * Strand gradient stops, left to right. Verbatim from the handoff.
 *
 * Violet (#8b5cf6) is deliberately present: TOKENS.md restricts the *chrome*
 * to one accent, but this is the designer's own hero artwork and their stop
 * list includes it. Do not "correct" this to match the UI palette.
 */
const STOPS: [number, number, number][] = [
  [46, 139, 255], // #2e8bff brand-blue
  [99, 102, 241], // #6366f1 indigo-500
  [139, 92, 246], // #8b5cf6 violet
  [34, 211, 238], // #22d3ee cyan-400
]

function colorAt(t: number): [number, number, number] {
  const c = Math.min(0.9999, Math.max(0, t))
  const s = c * (STOPS.length - 1)
  const i = Math.floor(s)
  const f = s - i
  const a = STOPS[i]
  const b = STOPS[i + 1] ?? STOPS[i]
  return [
    Math.round(a[0] + (b[0] - a[0]) * f),
    Math.round(a[1] + (b[1] - a[1]) * f),
    Math.round(a[2] + (b[2] - a[2]) * f),
  ]
}

const rgba = (c: [number, number, number], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`

/**
 * Deterministic particle seeds — arithmetic, never Math.random().
 *
 * This is what makes the offline render reproducible frame-for-frame without
 * seeding a PRNG. Do not replace with randomness.
 */
export function createParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    x: ((i * 61) % 100) / 100,
    y: ((i * 37) % 100) / 100,
    z: ((i * 23) % 100) / 100,
    vy: 0.012 + (i % 5) * 0.004,
  }))
}

/** Live per-frame particle drift, with wrap. Mutates in place. */
export function stepParticles(particles: Particle[]): void {
  for (const p of particles) {
    p.y += p.vy * 0.001
    if (p.y > 1.05) p.y -= 1.1
  }
}

interface Pt {
  x: number
  y: number
  z: number
  t: number
}

/**
 * Draw one frame. Pure with respect to its arguments — the same params always
 * produce the same pixels, which is what lets the renderer step virtual time
 * instead of racing requestAnimationFrame.
 */
export function drawHelixFrame(ctx: CanvasRenderingContext2D, params: DrawParams): void {
  const { width, height, phase, particles, parX, parY } = params
  const inten = params.intensity ?? 1

  ctx.clearRect(0, 0, width, height)

  // Horizontal sweep: t runs left to right, strand rotation displaces
  // vertically. The strand overshoots the canvas on both sides (leftPad is
  // negative, usableW > width) so it bleeds off-frame rather than terminating.
  const cy = height * 0.5 + parY
  const leftPad = -width * 0.06
  const usableW = width * 1.12
  const radius = Math.min(height * 0.42, 340)

  const helixPoint = (t: number, strandPhase: number): Pt => {
    const angle = t * TURNS * Math.PI * 2 + phase + strandPhase
    const z = Math.sin(angle)
    return {
      x: leftPad + t * usableW + parX,
      y: cy + Math.cos(angle) * radius * (0.84 + 0.16 * ((z + 1) / 2)),
      z,
      t,
    }
  }

  const strands: [Pt[], Pt[]] = [[], []]
  const rungs: { a: Pt; b: Pt }[] = []
  for (let i = 0; i < NODES; i++) {
    const t = i / (NODES - 1)
    const a = helixPoint(t, 0)
    const b = helixPoint(t, Math.PI)
    strands[0].push(a)
    strands[1].push(b)
    if (i % 2 === 0) rungs.push({ a, b })
  }

  // --- Constellation: link drifting particles + sampled strand nodes ---
  const link: { x: number; y: number }[] = []
  for (const p of particles) {
    link.push({
      x: p.x * width + parX * (0.4 + p.z),
      y: (p.y % 1) * height + parY * (0.4 + p.z),
    })
  }
  for (let i = 0; i < strands[0].length; i += 6) {
    link.push({ x: strands[0][i].x, y: strands[0][i].y })
  }

  ctx.lineWidth = 1
  for (let i = 0; i < link.length; i++) {
    for (let j = i + 1; j < link.length; j++) {
      const dx = link[i].x - link[j].x
      const dy = link[i].y - link[j].y
      const d2 = dx * dx + dy * dy
      if (d2 < MAX_DIST * MAX_DIST) {
        ctx.strokeStyle = `rgba(150,170,215,${(1 - Math.sqrt(d2) / MAX_DIST) * 0.075})`
        ctx.beginPath()
        ctx.moveTo(link[i].x, link[i].y)
        ctx.lineTo(link[j].x, link[j].y)
        ctx.stroke()
      }
    }
  }

  // Particle dots.
  for (const p of particles) {
    const px = p.x * width + parX * (0.4 + p.z)
    const py = (p.y % 1) * height + parY * (0.4 + p.z)
    ctx.beginPath()
    ctx.fillStyle = `rgba(190,205,240,${0.05 + p.z * 0.13})`
    ctx.arc(px, py, 0.6 + p.z * 1.4, 0, Math.PI * 2)
    ctx.fill()
  }

  // Horizontal gradient across the full width, so the ribbon shifts hue
  // left→right rather than along its own length.
  const grad = (a0: number) => {
    const alpha = a0 * inten
    const g = ctx.createLinearGradient(0, 0, width, 0)
    g.addColorStop(0, rgba(STOPS[0], alpha * 0.3))
    g.addColorStop(0.34, rgba(STOPS[0], alpha))
    g.addColorStop(0.62, rgba(STOPS[1], alpha))
    g.addColorStop(0.84, rgba(STOPS[2], alpha))
    g.addColorStop(1, rgba(STOPS[3], alpha * 0.85))
    return g
  }

  const traceStrands = (lw: number, alpha: number) => {
    ctx.lineWidth = lw
    ctx.lineCap = 'round'
    ctx.strokeStyle = grad(alpha)
    for (const s of strands) {
      ctx.beginPath()
      ctx.moveTo(s[0].x, s[0].y)
      for (let k = 1; k < s.length; k++) ctx.lineTo(s[k].x, s[k].y)
      ctx.stroke()
    }
  }

  // Bloom: three successively tighter blurred passes additively composited,
  // then a crisp core. This is what gives the ribbon its glow — without it the
  // strands read as flat lines.
  const supportsFilter = typeof ctx.filter === 'string'
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  if (supportsFilter) {
    ctx.filter = 'blur(30px)'
    traceStrands(18, 0.34)
    ctx.filter = 'blur(9px)'
    traceStrands(6, 0.34)
    ctx.filter = 'blur(3px)'
    traceStrands(2.6, 0.4)
    ctx.filter = 'none'
  } else {
    traceStrands(16, 0.09)
  }
  traceStrands(2, 0.66)
  ctx.restore()

  // Rungs (base pairs).
  for (const r of rungs) {
    const depth = (r.a.z + r.b.z) / 2
    ctx.strokeStyle = rgba(colorAt(r.a.t), (0.06 + (depth + 1) * 0.075) * inten)
    ctx.lineWidth = 1.1
    ctx.beginPath()
    ctx.moveTo(r.a.x, r.a.y)
    ctx.lineTo(r.b.x, r.b.y)
    ctx.stroke()
  }

  // Nodes, far → near.
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  strands[0]
    .concat(strands[1])
    .sort((p, q) => p.z - q.z)
    .forEach((n) => {
      const depth = (n.z + 1) / 2
      const size = 1.4 + depth * 3.4
      const alpha = (0.14 + depth * 0.6) * inten
      const c = colorAt(n.t)
      ctx.beginPath()
      ctx.fillStyle = rgba(c, alpha * 0.12)
      ctx.arc(n.x, n.y, size * 4.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.fillStyle = rgba(c, alpha)
      ctx.arc(n.x, n.y, size, 0, Math.PI * 2)
      ctx.fill()
    })
  ctx.restore()

  // Traveling data packets + trail.
  const packetPhase = phase * 0.5
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  for (let strand = 0; strand < 2; strand++) {
    const strandPhase = strand === 0 ? 0 : Math.PI
    for (let k = 0; k < PACKETS; k++) {
      const base = (packetPhase / (Math.PI * 2) + k / PACKETS + strand * 0.17) % 1
      for (let tr = 0; tr < 7; tr++) {
        const t = (base - tr * 0.009 + 1) % 1
        const pt = helixPoint(t, strandPhase)
        const depth = (pt.z + 1) / 2
        const c = colorAt(t)
        const fade = (1 - tr / 7) * (0.35 + depth * 0.65) * inten
        const size = (tr === 0 ? 3.2 : 2.2) * (0.6 + depth * 0.6)
        ctx.beginPath()
        ctx.fillStyle = rgba(c, fade * (tr === 0 ? 0.22 : 0.09))
        ctx.arc(pt.x, pt.y, size * 3.2, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.fillStyle = `rgba(235,242,255,${fade * (tr === 0 ? 0.85 : 0.3)})`
        ctx.arc(pt.x, pt.y, size * 0.55, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }
  ctx.restore()
}

/**
 * Particle positions for frame `frame` of a `totalFrames`-long seamless loop.
 *
 * The live drift (`stepParticles`) can never loop: vy takes five incommensurate
 * values (0.012 + (i % 5) * 0.004) against a 1.1 wrap, so the particles do not
 * all realign at any frame count. Forcing them to would require running ~50×
 * faster than designed — over a 30s loop the live drift only covers ~1% of the
 * viewport, so there is nothing worth preserving in the linear motion itself.
 *
 * Instead each particle bobs sinusoidally, which is periodic by construction.
 * Amplitude is derived from that particle's own vy so the per-particle speed
 * variation survives, and peak-to-peak travel equals the distance it would have
 * drifted linearly across the loop.
 *
 * Returns a fresh array; never mutates the seeds.
 */
export function loopParticlesAt(
  seeds: readonly Particle[],
  frame: number,
  totalFrames: number
): Particle[] {
  const theta = (2 * Math.PI * frame) / totalFrames
  return seeds.map((p) => ({
    ...p,
    y: p.y + ((p.vy * 0.001 * totalFrames) / 2) * Math.sin(theta),
  }))
}
