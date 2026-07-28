import { Check } from 'lucide-react'

export interface Plan {
  name: string
  price: string
  /** Qualifier printed next to the price — "fixed scope", "/mo or rev share". */
  unit: string
  desc: string
  items: readonly string[]
}

/**
 * PricingPair — the two-card pricing block.
 *
 * Pricing cards use the solid `zinc-900` fill rather than the translucent
 * panel fill, per TOKENS.md — it separates commercial content from the
 * surrounding editorial panels without adding a colour.
 */
export default function PricingPair({
  title,
  blurb,
  plans,
  note,
}: {
  title: string
  blurb: string
  plans: readonly Plan[]
  note?: string
}) {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto flex max-w-[56rem] flex-col gap-10">
        <div className="mx-auto flex max-w-[38rem] flex-col gap-5 text-center">
          <h2 className="text-balance text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-white">
            {title}
          </h2>
          <p className="text-[17px] leading-relaxed text-zinc-300">{blurb}</p>
        </div>

        <div className="grid items-start gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div key={plan.name} className="flex flex-col gap-3.5 rounded-xl bg-zinc-900 p-7">
              <h3 className="text-base font-medium text-white">{plan.name}</h3>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[30px] font-semibold tracking-[-0.03em] text-white">
                  {plan.price}
                </span>
                <span className="text-sm text-zinc-400">{plan.unit}</span>
              </div>
              <p className="text-sm leading-relaxed text-zinc-400">{plan.desc}</p>
              <hr className="border-t border-dashed border-white/15" />
              <ul className="flex flex-col gap-3 text-sm">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-zinc-300">
                    <Check
                      size={12}
                      strokeWidth={2.5}
                      aria-hidden="true"
                      className="mt-[5px] shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {note ? <p className="text-center text-[13px] text-zinc-400">{note}</p> : null}
      </div>
    </section>
  )
}
