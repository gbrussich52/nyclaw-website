'use client'

import { useEffect, useRef } from 'react'

/**
 * HeroHelix — full immersive 2.5D "DNA double-helix" data-network on <canvas>.
 *
 * Why canvas (not Spline/WebGL): ~0 dependencies, a few KB, no network fetch —
 * keeps LCP fast on a site where organic search is the growth lever. Depth is
 * faked: each node's z = sin(angle) drives size + opacity + horizontal
 * foreshortening, so the strand rotating toward the viewer grows brighter and
 * spreads wider. Reads as real 3D for ~free.
 *
 * "Full" layer:
 *  - double helix with extra turns, weighted to `centerXRatio` of the width
 *  - constellation: nearby points (drifting particles + sampled helix nodes)
 *    link with faint lines → neural-mesh feel
 *  - "data packets" travel along each strand with a fading trail
 *  - gentle mouse parallax (lerped)
 *
 * Perf/accessibility guards:
 *  - constellation linkable set is capped (~80 points) to stay <1ms/frame
 *  - IntersectionObserver pauses the rAF loop when offscreen
 *  - devicePixelRatio scaling capped at 2×
 *  - prefers-reduced-motion renders a single static frame
 */
export default function HeroHelix({
  centerXRatio = 0.62,
}: {
  centerXRatio?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const stops: [number, number, number][] = [
      [46, 139, 255], // #2e8bff sky-bright
      [34, 211, 238], // #22d3ee cyan
      [99, 102, 241], // #6366f1 indigo
      [139, 92, 246], // #8b5cf6 violet
    ]
    const colorAt = (t: number): [number, number, number] => {
      const clamped = Math.min(0.9999, Math.max(0, t))
      const scaled = clamped * (stops.length - 1)
      const i = Math.floor(scaled)
      const f = scaled - i
      const a = stops[i]
      const b = stops[i + 1] ?? stops[i]
      return [
        Math.round(a[0] + (b[0] - a[0]) * f),
        Math.round(a[1] + (b[1] - a[1]) * f),
        Math.round(a[2] + (b[2] - a[2]) * f),
      ]
    }

    let width = 0
    let height = 0
    let dpr = 1

    const PARTICLE_COUNT = 42
    const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      x: ((i * 61) % 100) / 100,
      y: ((i * 37) % 100) / 100,
      z: ((i * 23) % 100) / 100,
      vy: 0.012 + (i % 5) * 0.004,
    }))

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const NODES = 60
    const TURNS = 3.4
    const PACKETS = 4

    let targetX = 0
    let targetY = 0
    let parX = 0
    let parY = 0

    const helixPoint = (
      t: number,
      strandPhase: number,
      phase: number,
      cx: number,
      topPad: number,
      usableH: number,
      radius: number
    ) => {
      const angle = t * TURNS * Math.PI * 2 + phase + strandPhase
      const z = Math.sin(angle)
      return {
        // foreshorten horizontally with depth for a rounder 3D read
        x: cx + Math.cos(angle) * radius * (0.82 + 0.18 * ((z + 1) / 2)),
        y: topPad + t * usableH,
        z,
      }
    }

    const drawFrame = (phase: number) => {
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

      const MAX_DIST = 96
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

    resize()

    let raf = 0
    let phase = 0
    let running = false

    const tick = () => {
      phase += 0.006
      for (const p of particles) {
        p.y += p.vy * 0.001
        if (p.y > 1.05) p.y -= 1.1
      }
      parX += (targetX - parX) * 0.06
      parY += (targetY - parY) * 0.06
      drawFrame(phase)
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running || reduceMotion) return
      running = true
      raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    )
    io.observe(canvas)

    const onResize = () => {
      resize()
      if (reduceMotion) drawFrame(0.6)
    }
    window.addEventListener('resize', onResize)

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const nx = (e.clientX - (rect.left + rect.width / 2)) / rect.width
      const ny = (e.clientY - (rect.top + rect.height / 2)) / rect.height
      targetX = Math.max(-1, Math.min(1, nx)) * 18
      targetY = Math.max(-1, Math.min(1, ny)) * 12
    }
    if (!reduceMotion) window.addEventListener('pointermove', onPointerMove)

    if (reduceMotion) drawFrame(0.6)

    return () => {
      stop()
      io.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [centerXRatio])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none h-full w-full"
    />
  )
}
