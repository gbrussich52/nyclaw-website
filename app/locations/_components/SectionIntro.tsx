/**
 * SectionIntro — centred eyebrow + h2 + blurb above a location section.
 *
 * The shared service components (`CapabilityGrid`, `PricingPair`, …) render
 * their own heading and take no eyebrow. Location routes carry eyebrows that
 * are themselves local-SEO copy ("All Five Boroughs", "The NYC Reality"), so
 * the intro is split out here and the grids below it are laid out in-page.
 * Type scale matches the service sections exactly.
 */
export default function SectionIntro({
  eyebrow,
  title,
  blurb,
}: {
  eyebrow?: string
  title: string
  blurb?: string
}) {
  return (
    <div className="mx-auto flex max-w-[38rem] flex-col gap-4 text-center">
      {eyebrow ? (
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.12] tracking-[-0.025em] text-white">
        {title}
      </h2>
      {blurb ? (
        <p className="text-[17px] leading-relaxed text-zinc-300">{blurb}</p>
      ) : null}
    </div>
  )
}
