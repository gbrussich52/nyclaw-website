export interface ResultCard {
  metric: string
  label: string
  desc: string
}

/**
 * ResultsCards — 3-up outcome cards with a 40px gradient metric.
 *
 * Marketing-route counterpart to `DeliverablesChecklist`. Metrics are rendered
 * verbatim (they are ranges like "3-5x", not animatable counters).
 */
export default function ResultsCards({
  title,
  blurb,
  items,
}: {
  title: string
  blurb: string
  items: readonly ResultCard[]
}) {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto flex max-w-[64rem] flex-col gap-10">
        <div className="mx-auto flex max-w-[38rem] flex-col gap-5 text-center">
          <h2 className="text-balance text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.025em] text-white">
            {title}
          </h2>
          <p className="text-[17px] leading-relaxed text-zinc-300">{blurb}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map(({ metric, label, desc }) => (
            <div
              key={label}
              className="panel panel-hover flex flex-col gap-2.5 rounded-xl p-8 text-center"
            >
              <div className="text-gradient-metric text-[40px] font-semibold leading-none tracking-[-0.03em]">
                {metric}
              </div>
              <p className="text-[15px] font-medium text-white">{label}</p>
              <p className="text-sm leading-relaxed text-zinc-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
