import type { LucideIcon } from 'lucide-react'

export interface Capability {
  Icon: LucideIcon
  title: string
  desc: string
}

/**
 * CapabilityGrid — centred intro plus a 3-col hairline grid of capability cells.
 *
 * Shared by all three service detail routes. `id` is passed per route so the
 * hero's secondary CTA can keep the anchor the live page already publishes
 * (#what-you-get, #what-we-build) rather than minting a new one.
 */
export default function CapabilityGrid({
  id,
  title,
  blurb,
  items,
}: {
  id?: string
  title: string
  blurb: string
  items: readonly Capability[]
}) {
  return (
    <section id={id} className="px-6 pb-24">
      <div className="mx-auto flex max-w-[64rem] flex-col gap-12">
        <div className="mx-auto flex max-w-[38rem] flex-col gap-5 text-center">
          <h2 className="text-balance text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.025em] text-white">
            {title}
          </h2>
          <p className="text-[17px] leading-relaxed text-zinc-300">{blurb}</p>
        </div>

        <div className="hairline-grid grid overflow-hidden rounded-sm border border-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ Icon, title: cellTitle, desc }) => (
            <div key={cellTitle} className="flex flex-col gap-3 p-9">
              <div className="flex items-center gap-2">
                <Icon size={16} strokeWidth={1.75} className="text-white" aria-hidden="true" />
                <h3 className="text-sm font-medium text-white">{cellTitle}</h3>
              </div>
              <p className="text-sm leading-relaxed text-zinc-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
