import Link from 'next/link'
import { ChevronRight, type LucideIcon } from 'lucide-react'

/**
 * ServiceHero — the shared top of every /services/* detail route.
 *
 * All three detail pages share one layout and differ only in content, so the
 * hero (back link → badge pill → split h1 → lede → blurb → two CTAs) lives
 * here rather than being triplicated. The h1 is deliberately weight 400 with
 * the accent gradient on the second line only — per TOKENS.md the scale does
 * the work, not the weight.
 */
export default function ServiceHero({
  badge,
  BadgeIcon,
  titleTop,
  titleAccent,
  lede,
  blurb,
  primary,
  secondary,
}: {
  badge: string
  BadgeIcon: LucideIcon
  titleTop: string
  titleAccent: string
  lede: string
  blurb: string
  primary: { label: string; href: string }
  secondary: { label: string; href: string }
}) {
  return (
    <section className="relative isolate overflow-hidden px-6 pb-20 pt-16 text-center">
      <div className="bloom-indigo pointer-events-none absolute -top-[18rem] left-1/2 -z-10 h-[46rem] w-[52rem] -translate-x-1/2 rounded-full" />
      <div className="hero-grid pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto flex max-w-[52rem] flex-col items-center">
        <Link
          href="/services"
          className="text-sm text-zinc-400 transition-colors hover:text-white"
        >
          &larr; All services
        </Link>

        <div className="mt-5 inline-flex h-7 items-center gap-2 rounded-full px-3.5 text-xs font-medium text-zinc-300 outline outline-1 outline-white/[0.12] [background:color-mix(in_oklab,#27272a_55%,#000)]">
          <BadgeIcon size={13} strokeWidth={2} aria-hidden="true" />
          {badge}
        </div>

        <h1 className="mt-6 text-balance text-[clamp(2.5rem,5.5vw,3.75rem)] font-normal leading-[1.06] tracking-[-0.03em] text-white">
          {titleTop}
          <br />
          <span className="text-gradient-ai">{titleAccent}</span>
        </h1>

        <p className="mt-6 text-[19px] font-medium text-white">{lede}</p>
        <p className="mt-3.5 max-w-[36rem] text-[17px] leading-relaxed text-zinc-300">{blurb}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <Link
            href={primary.href}
            className="inline-flex h-12 items-center gap-1 rounded-full bg-white pl-5 pr-3 text-base font-medium text-zinc-950 shadow-[0_1px_2px_rgba(0,0,0,.2)] transition-opacity hover:opacity-90"
          >
            <span className="whitespace-nowrap">{primary.label}</span>
            <ChevronRight size={18} aria-hidden="true" />
          </Link>
          <a
            href={secondary.href}
            className="inline-flex h-12 items-center rounded-full px-5 text-base font-medium text-white outline outline-1 outline-white/[0.18] transition-colors hover:bg-white/5"
          >
            <span className="whitespace-nowrap">{secondary.label}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
