'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Reveal — fades + slides its children up the first time they scroll into view.
 *
 * Cheap "sophistication": staggered reveals (pass an incrementing `delay`) make
 * a page feel choreographed/expensive without any animation library. Uses a
 * single IntersectionObserver per instance, disconnects after firing once, and
 * renders immediately (no animation) for prefers-reduced-motion users.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 18,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-[transform,opacity] ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : `translateY(${y}px)`,
      }}
    >
      {children}
    </div>
  )
}
