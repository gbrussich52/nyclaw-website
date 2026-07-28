import Link from 'next/link'
import { MapPin } from 'lucide-react'

export interface HeroLink {
  label: string
  href: string
  /** Opens in a new tab — used for the Calendly booking link. */
  external?: boolean
}

/**
 * LocationHero — top of every /locations/* route.
 *
 * Deliberately NOT `ServiceHero`: that component hardcodes an "All services"
 * back link to /services, and there is no /locations index for these pages to
 * return to. Injecting it would add an internal link that isn't in the live
 * copy — an SEO change, not a restyle. Everything else (bloom, grid overlay,
 * split h1 at weight 400 with the accent gradient on line two, pill badge,
 * two CTAs) matches ServiceHero exactly so the two page types read as one
 * system.
 */
export default function LocationHero({
  badge,
  titleTop,
  titleAccent,
  lede,
  blurb,
  primary,
  secondary,
}: {
  badge: string
  titleTop: string
  titleAccent: string
  lede: string
  blurb: string
  primary: HeroLink
  secondary: HeroLink
}) {
  return (
    <section className="relative isolate overflow-hidden px-6 pb-20 pt-16 text-center">
      <div className="bloom-indigo pointer-events-none absolute -top-[18rem] left-1/2 -z-10 h-[46rem] w-[52rem] -translate-x-1/2 rounded-full" />
      <div className="hero-grid pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto flex max-w-[52rem] flex-col items-center">
        <div className="inline-flex h-7 items-center gap-2 rounded-full px-3.5 text-xs font-medium text-zinc-300 outline outline-1 outline-white/[0.12] [background:color-mix(in_oklab,#27272a_55%,#000)]">
          <MapPin size={13} strokeWidth={2} aria-hidden="true" />
          {badge}
        </div>

        <h1 className="mt-6 text-balance text-[clamp(2.5rem,5.5vw,3.75rem)] font-normal leading-[1.06] tracking-[-0.03em] text-white">
          {titleTop}
          <br />
          <span className="text-gradient-ai">{titleAccent}</span>
        </h1>

        <p className="mt-6 text-[19px] font-medium text-white">{lede}</p>
        <p className="mt-3.5 max-w-[36rem] text-[17px] leading-relaxed text-zinc-300">
          {blurb}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <HeroButton link={primary} solid />
          <HeroButton link={secondary} />
        </div>
      </div>
    </section>
  )
}

function HeroButton({ link, solid = false }: { link: HeroLink; solid?: boolean }) {
  const className = solid
    ? 'inline-flex h-12 items-center rounded-full bg-white px-5 text-base font-medium text-zinc-950 shadow-[0_1px_2px_rgba(0,0,0,.2)] transition-opacity hover:opacity-90'
    : 'inline-flex h-12 items-center rounded-full px-5 text-base font-medium text-white outline outline-1 outline-white/[0.18] transition-colors hover:bg-white/5'

  const label = <span className="whitespace-nowrap">{link.label}</span>

  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
    </a>
  ) : (
    <Link href={link.href} className={className}>
      {label}
    </Link>
  )
}
