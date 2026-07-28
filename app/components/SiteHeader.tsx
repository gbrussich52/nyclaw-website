'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { CALENDLY_URL } from '../config'

/**
 * SiteHeader — floating dusk header, per the 2026 handoff.
 *
 * Client component for two reasons the server layout cannot cover: the active
 * nav link needs usePathname(), and the mobile menu needs local state.
 *
 * The previous header had NO mobile navigation at all — its md:hidden branch
 * rendered only two CTA buttons, leaving Services / How it works / Work /
 * Knowledge / Free guide unreachable on a phone. That is fixed here.
 */

const NAV = [
  { href: '/services', label: 'Services' },
  { href: '/#process', label: 'How it works' },
  { href: '/#work', label: 'Work' },
  { href: '/knowledge', label: 'Knowledge' },
  { href: '/resources', label: 'Free guide' },
] as const

function Wordmark({ size = 'md' }: { size?: 'md' | 'sm' }) {
  const mark = size === 'md' ? 'h-[26px] w-[26px]' : 'h-6 w-6'
  const word = size === 'md' ? 'text-[17px]' : 'text-[15px]'
  return (
    <span className="flex items-center gap-2.5">
      <span
        className={`${mark} grid place-items-center rounded-lg bg-white text-[13px] font-semibold tracking-[-0.04em] text-zinc-950`}
      >
        NY
      </span>
      <span className={`${word} font-medium text-white`}>
        NYClaw<span className="text-zinc-500">.io</span>
      </span>
    </span>
  )
}

export default function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close the menu on route change — Next keeps this component mounted across
  // navigations, so without this the panel stays open over the new page.
  useEffect(() => setOpen(false), [pathname])

  // Anchor links (/#work) share the homepage route; only match real segments.
  const isActive = (href: string) =>
    !href.includes('#') && (pathname === href || pathname.startsWith(`${href}/`))

  return (
    <header className="fixed inset-x-0 top-2 z-50 px-2">
      <div className="nav-dusk mx-auto max-w-[80rem] rounded-3xl px-5 md:px-8">
        <div className="flex items-center justify-between py-[18px]">
          <Link href="/" aria-label="NYClaw.io home">
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors hover:text-white ${
                  isActive(item.href) ? 'font-medium text-white' : 'text-zinc-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 items-center rounded-md px-3 text-[13px] font-medium text-zinc-200 outline outline-1 outline-white/15 transition-colors hover:bg-zinc-800"
              style={{ background: 'color-mix(in oklab, #27272a 55%, #000)' }}
            >
              15-min fit audit
            </a>
            <Link
              href="/#contact"
              className="flex h-8 items-center rounded-md bg-white px-3 text-[13px] font-medium text-zinc-950 shadow-[0_1px_2px_rgba(0,0,0,.2)] transition-opacity hover:opacity-90"
            >
              Start a project
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-9 w-9 place-items-center rounded-md text-zinc-300 outline outline-1 outline-white/15 transition-colors hover:text-white md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open && (
          <div id="mobile-nav" className="border-t border-white/10 pb-5 pt-4 md:hidden">
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-2 py-2.5 text-[15px] transition-colors hover:bg-white/5 hover:text-white ${
                    isActive(item.href) ? 'font-medium text-white' : 'text-zinc-300'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 items-center justify-center rounded-md text-sm font-medium text-zinc-200 outline outline-1 outline-white/15"
                style={{ background: 'color-mix(in oklab, #27272a 55%, #000)' }}
              >
                15-min fit audit
              </a>
              <Link
                href="/#contact"
                className="flex h-10 items-center justify-center rounded-md bg-white text-sm font-medium text-zinc-950"
              >
                Start a project
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export { Wordmark }
