'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * CountUp — animates a number from 0 → `to` the first time it scrolls into view.
 *
 * For non-numeric stats (e.g. "24/7") pass `raw` and it renders that verbatim.
 * Uses one rAF ramp with an ease-out curve; respects prefers-reduced-motion by
 * jumping straight to the final value.
 */
export default function CountUp({
  to,
  suffix = '',
  prefix = '',
  raw,
  duration = 1500,
  className = '',
}: {
  to?: number
  suffix?: string
  prefix?: string
  raw?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [display, setDisplay] = useState(to != null ? '0' : raw ?? '')

  useEffect(() => {
    if (raw != null || to == null) return
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(String(to))
      return
    }

    let raf = 0
    let startTs = 0
    const run = (ts: number) => {
      if (!startTs) startTs = ts
      const p = Math.min(1, (ts - startTs) / duration)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setDisplay(String(Math.round(to * eased)))
      if (p < 1) raf = requestAnimationFrame(run)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          raf = requestAnimationFrame(run)
          io.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to, raw, duration])

  return (
    <span ref={ref} className={className}>
      {raw != null ? raw : `${prefix}${display}${suffix}`}
    </span>
  )
}
