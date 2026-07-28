'use client'

import { useEffect, useState } from 'react'

/**
 * HeroVideo — the baked DNA-helix loop behind the homepage hero.
 *
 * The footage is NYClaw's own: scripts/render-hero.mjs renders
 * lib/heroHelixDraw.ts (the same module the live HeroHelix canvas uses) to
 * public/hero.webm + hero.mp4. Re-run that script after changing the helix, or
 * the video and the component drift apart.
 *
 * Why a video and not the live canvas here: the mockup's hero is a full-bleed
 * media card, and a GPU-decoded loop costs no main-thread JS. Both mp4 and webm
 * ship because Safari does not play VP9-in-WebM reliably.
 *
 * prefers-reduced-motion renders the poster still and never mounts the video,
 * so no animation plays and the loop is never downloaded.
 */
export default function HeroVideo({ className = '' }: { className?: string }) {
  // Starts false so SSR and the first client render agree (no hydration
  // mismatch) and reduced-motion users are served the still by default.
  const [motionOk, setMotionOk] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setMotionOk(!mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  if (!motionOk) {
    return (
      <img
        src="/hero-poster.jpg"
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
      />
    )
  }

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster="/hero-poster.jpg"
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    >
      <source src="/hero.webm" type="video/webm" />
      <source src="/hero.mp4" type="video/mp4" />
    </video>
  )
}
