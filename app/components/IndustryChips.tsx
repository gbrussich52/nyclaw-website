import {
  Building2,
  Scale,
  Activity,
  ShoppingBag,
  UtensilsCrossed,
  Wrench,
} from 'lucide-react'

/**
 * IndustryChips — the "Who this is for" 6-up card row.
 *
 * The industry list is identical on all three service routes, so it lives here
 * rather than in each page. Only the blurb varies.
 */
const industries = [
  { Icon: Building2, label: 'Real Estate' },
  { Icon: Scale, label: 'Legal Services' },
  { Icon: Activity, label: 'Healthcare' },
  { Icon: ShoppingBag, label: 'Retail / E-Comm' },
  { Icon: UtensilsCrossed, label: 'Hospitality' },
  { Icon: Wrench, label: 'Contractors' },
]

export default function IndustryChips({ blurb }: { blurb: string }) {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto flex max-w-[64rem] flex-col gap-8">
        <div className="mx-auto flex max-w-[38rem] flex-col gap-4 text-center">
          <h2 className="text-balance text-[clamp(1.75rem,3.5vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.025em] text-white">
            Who this is for
          </h2>
          <p className="text-base leading-relaxed text-zinc-400">{blurb}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {industries.map(({ Icon, label }) => (
            <div
              key={label}
              className="panel panel-hover flex flex-col items-center gap-2.5 rounded-xl px-3 py-5"
            >
              <Icon size={17} strokeWidth={1.75} className="text-zinc-300" aria-hidden="true" />
              <p className="text-center text-[13px] font-medium text-white">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
