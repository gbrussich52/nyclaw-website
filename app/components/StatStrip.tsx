import Reveal from './Reveal'
import CountUp from './CountUp'

export interface Stat {
  /** Numeric target — animates from 0. Omit and pass `raw` for non-numeric stats. */
  to?: number
  prefix?: string
  suffix?: string
  raw?: string
  label: string
}

/**
 * StatStrip — the 4-up hairline proof strip used under every service hero.
 *
 * `.hairline-grid` paints the rule colour and gives each cell the canvas fill,
 * so the 1px gaps read as hairlines rather than borders. Cells are wrapped in
 * `Reveal` (staggered) exactly as on the homepage strip.
 */
export default function StatStrip({ items }: { items: readonly Stat[] }) {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-[64rem]">
        <div className="hairline-grid grid grid-cols-2 overflow-hidden rounded-sm border-y border-white/10 md:grid-cols-4">
          {items.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div className="px-4 py-7 text-center">
                <div className="text-gradient-metric text-[32px] font-semibold leading-none tracking-[-0.03em]">
                  <CountUp to={stat.to} prefix={stat.prefix} suffix={stat.suffix} raw={stat.raw} />
                </div>
                <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
