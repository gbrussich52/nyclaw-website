/**
 * heroHelixDraw — framework-free drawing core for the hero DNA helix.
 *
 * Extracted from app/components/HeroHelix.tsx so exactly one implementation
 * feeds both consumers:
 *   1. HeroHelix.tsx        — the live <canvas> component
 *   2. scripts/render-hero.mjs — the offline renderer that bakes public/hero.webm
 *
 * Without this split the shipped video would silently drift away from the
 * component every time the design changed. Keep all drawing math here.
 *
 * Depth is faked: each node's z = sin(angle) drives size + opacity + horizontal
 * foreshortening, so the strand rotating toward the viewer grows brighter and
 * spreads wider. Reads as real 3D for ~free — no WebGL, no dependencies.
 */

export const NODES = 60
export const TURNS = 3.4
export const PACKETS = 4
export const PARTICLE_COUNT = 42

/** Phase advanced per rAF frame by the live component (~0.36 rad/s at 60fps). */
export const LIVE_PHASE_STEP = 0.006

/**
 * Seamless-loop period.
 *
 * The helix itself repeats every 2π (see `helixPoint`: angle = …+ phase), but
 * the data packets advance at half rate (`packetPhase = phase * 0.5`) and so
 * only complete half a cycle in that span. The least common period is 4π —
 * looping at 2π produces a visible jump in the packets on every wrap.
 */
export const LOOP_PERIOD = Math.PI * 4

/** Distance below which two constellation points get linked, in CSS px. */
const MAX_DIST = 96

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
  centerXRatio: number
}

const STOPS: [number, number, number][] = [
  [46, 139, 255], // #2e8bff sky-bright
  [34, 211, 238], // #22d3ee cyan
  [99, 102, 241], // #6366f1 indigo
  [139, 92, 246], // #8b5cf6 violet
]

function colorAt(t: number): [number, number, number] {
  const clamped = Math.min(0.9999, Math.max(0, t))
  const scaled = clamped * (STOPS.length - 1)
  const i = Math.floor(scaled)
  const f = scaled - i
  const a = STOPS[i]
  const b = STOPS[i + 1] ?? STOPS[i]
  return [
    Math.round(a[0] + (b[0] - a[0]) * f),
    Math.round(a[1] + (b[1] - a[1]) * f),
    Math.round(a[2] + (b[2] - a[2]) * f),
  ]
}

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

function helixPoint(
  t: number,
  strandPhase: number,
  phase: number,
  cx: number,
  topPad: number,
  usableH: number,
  radius: number
) {
  const angle = t * TURNS * Math.PI * 2 + phase + strandPhase
  const z = Math.sin(angle)
  return {
    // foreshorten horizontally with depth for a rounder 3D read
    x: cx + Math.cos(angle) * radius * (0.82 + 0.18 * ((z + 1) / 2)),
    y: topPad + t * usableH,
    z,
  }
}

/**
 * Draw one frame. Pure with respect to its arguments — the same params always
 * produce the same pixels, which is what lets the renderer step virtual time
 * instead of racing requestAnimationFrame.
 */
export function drawHelixFrame(ctx: CanvasRenderingContext2D, params: DrawParams): void {
  const { width, height, phase, particles, parX, parY, centerXRatio } = params

  ctx.clearRect(0, 0, width, height)

  const cx = width * centerXRatio + parX
  const topPad = height * 0.06
  const usableH = height * 0.88
  const radius = Math.min(width * 0.26, height * 0.34, 230)

  // Build helix nodes.
  type P = { x: number; y: number; z: number; t: number }
  const nodes: (P & { strand: 0 | 1 })[] = []
  const rungs: { a: P; b: P }[] = []
  for (let i = 0; i < NODES; i++) {
    const t = i / (NODES - 1)
    const a = { ...helixPoint(t, 0, phase, cx, topPad, usableH, radius), t }
    const b = { ...helixPoint(t, Math.PI, phase, cx, topPad, usableH, radius), t }
    a.y += parY
    b.y += parY
    nodes.push({ ...a, strand: 0 }, { ...b, strand: 1 })
    if (i % 2 === 0) rungs.push({ a, b })
  }

  // --- Constellation: link particles + sampled helix nodes when close ---
  const link: { x: number; y: number }[] = []
  for (const p of particles) {
    const depth = p.z
    link.push({
      x: p.x * width + parX * (0.4 + depth),
      y: (p.y % 1) * height + parY * (0.4 + depth),
    })
  }
  for (let i = 0; i < nodes.length; i += 3) link.push({ x: nodes[i].x, y: nodes[i].y })

  ctx.lineWidth = 1
  for (let i = 0; i < link.length; i++) {
    for (let j = i + 1; j < link.length; j++) {
      const dx = link[i].x - link[j].x
      const dy = link[i].y - link[j].y
      const d2 = dx * dx + dy * dy
      if (d2 < MAX_DIST * MAX_DIST) {
        const a = (1 - Math.sqrt(d2) / MAX_DIST) * 0.16
        ctx.strokeStyle = `rgba(120, 170, 240, ${a})`
        ctx.beginPath()
        ctx.moveTo(link[i].x, link[i].y)
        ctx.lineTo(link[j].x, link[j].y)
        ctx.stroke()
      }
    }
  }

  // Particle dots.
  for (const p of particles) {
    const depth = p.z
    const px = p.x * width + parX * (0.4 + depth)
    const py = (p.y % 1) * height + parY * (0.4 + depth)
    ctx.beginPath()
    ctx.fillStyle = `rgba(150, 180, 245, ${0.1 + depth * 0.22})`
    ctx.arc(px, py, 0.7 + depth * 1.7, 0, Math.PI * 2)
    ctx.fill()
  }

  // Rungs (base pairs).
  for (const { a, b } of rungs) {
    const depth = (a.z + b.z) / 2
    const alpha = 0.07 + (depth + 1) * 0.08
    const [r, g, bl] = colorAt((a.t + b.t) / 2)
    ctx.strokeStyle = `rgba(${r}, ${g}, ${bl}, ${alpha})`
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.stroke()
  }

  // Nodes far → near.
  nodes
    .slice()
    .sort((p, q) => p.z - q.z)
    .forEach((n) => {
      const depth = (n.z + 1) / 2
      const size = 1.8 + depth * 3.8
      const alpha = 0.25 + depth * 0.75
      const [r, g, b] = colorAt(n.t)
      ctx.beginPath()
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.18})`
      ctx.arc(n.x, n.y, size * 3.4, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
      ctx.arc(n.x, n.y, size, 0, Math.PI * 2)
      ctx.fill()
    })

  // Traveling data packets + trail.
  const packetPhase = phase * 0.5
  for (let strand = 0; strand < 2; strand++) {
    const strandPhase = strand === 0 ? 0 : Math.PI
    for (let k = 0; k < PACKETS; k++) {
      const base = (packetPhase / (Math.PI * 2) + k / PACKETS + strand * 0.17) % 1
      for (let tr = 0; tr < 6; tr++) {
        const t = (base - tr * 0.011 + 1) % 1
        const pt = helixPoint(t, strandPhase, phase, cx, topPad, usableH, radius)
        const depth = (pt.z + 1) / 2
        const [r, g, b] = colorAt(t)
        const fade = (1 - tr / 6) * (0.4 + depth * 0.6)
        const size = (tr === 0 ? 3.8 : 2.6) * (0.6 + depth * 0.6)
        ctx.beginPath()
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${fade * (tr === 0 ? 0.28 : 0.12)})`
        ctx.arc(pt.x, pt.y + parY, size * 2.8, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.fillStyle = `rgba(255, 255, 255, ${fade * (tr === 0 ? 0.95 : 0.4)})`
        ctx.arc(pt.x, pt.y + parY, size * 0.6, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }
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
