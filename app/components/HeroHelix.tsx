'use client'

import { useEffect, useRef } from 'react'
import {
  createParticles,
  drawHelixFrame,
  stepParticles,
  LIVE_PHASE_STEP,
} from '@/lib/heroHelixDraw'

/**
 * HeroHelix — full immersive 2.5D "DNA double-helix" data-network on <canvas>.
 *
 * Why canvas (not Spline/WebGL): ~0 dependencies, a few KB, no network fetch —
 * keeps LCP fast on a site where organic search is the growth lever.
 *
 * All drawing math lives in lib/heroHelixDraw.ts, shared with
 * scripts/render-hero.mjs which bakes public/hero.webm from the same code.
 * Edit the shared module, not a copy, or the video and the component drift.
 *
 * Perf/accessibility guards:
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

    let width = 0
    let height = 0
    let dpr = 1

    const particles = createParticles()

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    let targetX = 0
    let targetY = 0
    let parX = 0
    let parY = 0

    const drawFrame = (phase: number) =>
      drawHelixFrame(ctx, { width, height, phase, particles, parX, parY, centerXRatio })

    resize()

    let raf = 0
    let phase = 0
    let running = false

    const tick = () => {
      phase += LIVE_PHASE_STEP
      stepParticles(particles)
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
