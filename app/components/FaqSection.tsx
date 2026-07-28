import FaqAccordion, { type FaqItem } from './FaqAccordion'

/**
 * FaqSection — centred heading + blurb above the shared accordion.
 *
 * The `items` passed here are the same array handed to `FAQJsonLd`, so the
 * rendered questions and the structured data can never drift apart.
 */
export default function FaqSection({
  blurb,
  items,
}: {
  blurb: string
  items: readonly FaqItem[]
}) {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-[64rem]">
        <div className="mx-auto max-w-[34rem] text-center">
          <h2 className="text-balance text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-white">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-zinc-400">{blurb}</p>
        </div>
        <div className="mx-auto mt-10 max-w-[38rem]">
          <FaqAccordion items={items} />
        </div>
      </div>
    </section>
  )
}
