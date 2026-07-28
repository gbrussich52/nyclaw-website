import { Check } from 'lucide-react'

/**
 * DeliverablesChecklist — 2-col check list inside a panel.
 *
 * Used by the agents and audit routes; the marketing route shows
 * `ResultsCards` in this slot instead (per the handoff).
 */
export default function DeliverablesChecklist({
  title,
  blurb,
  items,
  note,
}: {
  title: string
  blurb: string
  items: readonly string[]
  note?: string
}) {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto flex max-w-[56rem] flex-col gap-10">
        <div className="mx-auto flex max-w-[38rem] flex-col gap-5 text-center">
          <h2 className="text-balance text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.025em] text-white">
            {title}
          </h2>
          <p className="text-[17px] leading-relaxed text-zinc-300">{blurb}</p>
        </div>

        <div className="panel rounded-2xl p-9">
          <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {items.map((item) => (
              <div key={item} className="flex items-start gap-2.5">
                <Check
                  size={14}
                  strokeWidth={2.5}
                  aria-hidden="true"
                  className="mt-[3px] shrink-0 text-white"
                />
                <span className="text-sm leading-relaxed text-zinc-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {note ? <p className="text-center text-[13px] text-zinc-400">{note}</p> : null}
      </div>
    </section>
  )
}
