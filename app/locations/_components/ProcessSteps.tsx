import Reveal from '../../components/Reveal'

export interface ProcessPhase {
  step: string
  title: string
  desc: string
}

/**
 * ProcessSteps — the "From Audit to Live AI in 30 Days" phase list.
 *
 * Vertical rather than the four-across `OodaPanel` because these routes ship
 * three long phases, not four short ones. The numbered circle is the same
 * 44px hairline circle the OODA panel uses, so the two read as one family.
 */
export default function ProcessSteps({ items }: { items: readonly ProcessPhase[] }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((phase, i) => (
        <Reveal key={phase.title} delay={i * 90}>
          <div className="panel flex items-start gap-5 rounded-2xl p-7">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 bg-zinc-950 text-[15px] font-semibold text-white">
              {i + 1}
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400">
                {phase.step}
              </p>
              <h3 className="text-base font-medium text-white">{phase.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{phase.desc}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
