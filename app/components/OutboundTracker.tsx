'use client'

import { useEffect } from 'react'
import { track } from '@vercel/analytics'

/**
 * OutboundTracker — records clicks on the booking CTA.
 *
 * The free 15-minute fit audit is the primary conversion, and it lives on
 * Calendly. Those clicks leave the site, so without this they are invisible:
 * analytics would show traffic and zero conversions even when the funnel is
 * working perfectly.
 *
 * Implemented as one delegated listener rather than an onClick per link. The
 * Calendly CTA appears in the header, hero, work card, CTA panels, footer and
 * every service route — wiring each individually would guarantee one gets
 * missed, and any link added later is covered automatically here.
 *
 * Only the destination host and the originating pathname are sent. No PII.
 */
export default function OutboundTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.('a')
      if (!el) return
      const href = el.getAttribute('href') ?? ''
      if (!href.startsWith('http')) return

      let host: string
      try {
        host = new URL(href).hostname
      } catch {
        return
      }
      if (host === window.location.hostname) return

      track(host.includes('calendly') ? 'audit_booking_click' : 'outbound_click', {
        host,
        from: window.location.pathname,
      })
    }

    // Capture phase so the event is recorded even if something downstream
    // stops propagation before it reaches the document.
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}
