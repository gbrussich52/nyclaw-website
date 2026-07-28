import Reveal from './Reveal'

export interface OodaStep {
  letter: string
  label: string
  timeline: string
  desc: string
}

/**
 * OodaPanel — the four-step OODA timeline as it appears on service routes.
 *
 * Differs from the homepage panel: heading and blurb sit above the panel and
 * the steps are centred. The connector is absolutely positioned at the
 * circles' vertical midpoint (44px circle / 2 = 22px) and inset 12% so it
 * never runs past the first or last circle.
 */
export default function OodaPanel({
  id,
  title,
  blurb,
  steps,
  note,
}: {
  id?: string
  title: string
  blurb: string
  steps: readonly OodaStep[]
  note?: string
}) {
  return (
    <section id={id} className="px-6 pb-24">
      <div className="mx-auto flex max-w-[64rem] flex-col gap-10">
        <div className="mx-auto flex max-w-[38rem] flex-col gap-5 text-center">
          <h2 className="text-balance text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.025em] text-white">
            {title}
          </h2>
          <p className="text-[17px] leading-relaxed text-zinc-300">{blurb}</p>
        </div>

        <div className="panel relative overflow-hidden rounded-2xl px-6 py-14 sm:px-10">
          <div className="relative">
            <div className="connector-flow pointer-events-none absolute left-[12%] right-[12%] top-[22px] hidden h-px md:block" />
            <div className="grid gap-10 md:grid-cols-4 md:gap-12">
              {steps.map((step, i) => (
                <Reveal key={step.label} delay={i * 90}>
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-zinc-950 text-[15px] font-semibold text-white">
                      {step.letter}
                    </div>
                    <p className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400">
                      Step {i + 1} &middot; {step.timeline}
                    </p>
                    <p className="text-base font-medium text-white">{step.label}</p>
                    <p className="text-[13px] leading-relaxed text-zinc-400">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {note ? <p className="text-center text-[15px] text-zinc-300">{note}</p> : null}
      </div>
    </section>
  )
}
