import Link from 'next/link'
import { ArrowRight, type LucideIcon } from 'lucide-react'

export interface ServiceCard {
  Icon: LucideIcon
  title: string
  /** Rendered verbatim — these are the live route's own figures. */
  price: string
  desc: string
  href: string
}

/**
 * ServiceCards — the 3-up "What We Offer" row on location routes.
 *
 * The light build tinted each icon tile with a per-card colour drawn from the
 * retired legacy palette. Dusk carries no such ramp — separation comes from
 * the panel fill and hairline, so the `color` field is gone from the item
 * shape and every icon is neutral.
 */
export default function ServiceCards({ items }: { items: readonly ServiceCard[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map(({ Icon, title, price, desc, href }) => (
        <Link
          key={title}
          href={href}
          className="panel panel-hover group flex flex-col gap-2.5 rounded-xl p-7"
        >
          <Icon size={18} strokeWidth={1.75} className="text-white" aria-hidden="true" />
          <h3 className="text-base font-medium text-white">{title}</h3>
          <p className="text-[13px] font-medium text-zinc-300">{price}</p>
          <p className="flex-1 text-sm leading-relaxed text-zinc-400">{desc}</p>
          <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-white">
            Learn more
            <ArrowRight
              size={14}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            />
          </span>
        </Link>
      ))}
    </div>
  )
}
