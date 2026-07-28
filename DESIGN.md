# DESIGN.md — NYClaw.io ("Dusk" system)

> AI agency for SMBs in Westchester County & NYC.
> This documents the design system **that actually ships**. Values below were read
> from `app/globals.css`, `tailwind.config.ts`, `app/layout.tsx`, `app/components/*`
> and the original handoff (`TOKENS.md`). Do not invent tokens that are not here.

The retired navy / sky-blue / dark-red light theme is **gone**. Every route is dark.
If you find navy, `slate-*`, `sky-blue`, `charcoal` or `dark-red` in the codebase,
it is dead code, not the system.

---

## 0. Three warnings (read these first)

### 1. Never declare a Tailwind color as a flat string

In `tailwind.config.ts`, extending a color with a **string** replaces that color's
entire ramp:

```ts
// ☠️ DO NOT DO THIS
colors: { cyan: '#22d3ee' }   // `cyan-400` now resolves to nothing —
                              // classes emit no CSS, with NO error and NO warning
```

This is exactly how `cyan-400` silently stopped existing in this repo. The failure
mode is invisible: the build passes, the class name stays in the markup, and the
color just never paints. Only `brand-blue` is declared, and only because `#2e8bff`
has no stock Tailwind equivalent. Everything else is stock `zinc`, `cyan-400`,
`indigo-500`.

### 2. Headings are never bolder than 600 — and h1 is weight 400

Hero h1 and page h1 are `font-normal` (400). Section h2 is 500–600. Nothing on the
site is `font-bold`. **The scale does the work, not the weight.** A 700-weight
heading reads as a different brand.

### 3. Violet `#8b5cf6` is not part of the UI palette

One accent gradient, one standalone accent hue (`#22d3ee`). Violet appears in
exactly one place: the hero helix artwork in `lib/heroHelixDraw.ts`, which is the
designer's own composition and is explicitly exempt. Do **not** pull violet into
buttons, borders, text, blooms or gradients. Do not add a second accent hue either.

---

## 1. Atmosphere

**Mood:** dark, AI-native, precise. Restraint over decoration.
**Depth comes from fill difference and hairlines — not shadows.** The only shadow in
the system is `0 1px 2px rgba(0,0,0,.2)` on solid white buttons.
**Texture:** masked 1px grids, radial blooms, and a single accent gradient. Nothing else.

---

## 2. Color tokens

All defined in `:root` in `app/globals.css`. Prefer the CSS variable or the stock
Tailwind class; never re-type a hex inline unless the pattern below already does.

### Surfaces

| Variable | Value | Tailwind | Role |
|---|---|---|---|
| `--canvas` | `#09090b` | `zinc-950` | page canvas, `body`, circle fills, text on white buttons |
| `--panel` | `color-mix(in oklab, #27272a 55%, #000)` | — (use `.panel`) | cards, FAQ / OODA panels, ghost buttons |
| `--solid` | `#18181b` | `zinc-900` | pricing cards, form inputs |
| `--code` | `#0a0a0c` | — | `pre` blocks, hero media-card fill |

### Text

| Variable | Value | Tailwind | Role |
|---|---|---|---|
| `--text-primary` | `#ffffff` | `text-white` | headings, `strong`, active nav |
| `--text-secondary` | `#d4d4d8` | `zinc-300` | body copy, nav links, list items |
| `--text-muted` | `#a1a1aa` | `zinc-400` | captions, eyebrows, table body, FAQ answers |
| `--text-faint` | `#71717a` | `zinc-500` | ".io" suffix, marquee, placeholders |

### Hairlines

| Variable | Value | Role |
|---|---|---|
| `--line` | `rgba(255,255,255,.1)` | grid gaps, section rules, card borders |
| `--line-hover` | `rgba(255,255,255,.28)` | card hover border, input focus outline |
| `--line-dashed` | `rgba(255,255,255,.12)` | FAQ row dividers, pricing divider |

Button outlines are `white/[0.15]` (small) and `white/[0.18]` (large).
Chip / tag fill is `white/[0.07]`. Ghost hover fill is `white/5`–`white/[0.06]`.

### Accent

| Variable | Value | Tailwind | Role |
|---|---|---|---|
| `--brand-blue` | `#2e8bff` | `brand-blue` | gradient stop; the one custom color |
| `--accent` | `#22d3ee` | `cyan-400` | the **only** standalone accent — code text, article CTA rule, hero badge dot |

`#6366f1` (`indigo-500`) exists only as a gradient/bloom stop, never as a flat fill.

### Gradients & blooms (utility classes)

| Class | Definition | Use |
|---|---|---|
| `.text-gradient-ai` | `linear-gradient(100deg, #2e8bff 0%, #6366f1 55%, #22d3ee 100%)`, clipped to text | **second line of an h1 only** |
| `.text-gradient-metric` | `linear-gradient(to right, #fff, #52525b)`, clipped to text | stat and result numbers only |
| `.bloom-indigo` | `radial-gradient(circle, rgba(99,102,241,.2), transparent 60%)`, `blur(40px)` | behind page headers / hero |
| `.bloom-blue` | `radial-gradient(circle, rgba(46,139,255,.18), transparent 65%)`, `blur(30px)` | behind CTA and form panels |
| `.connector-flow` | animated blue → indigo → cyan sweep, `200%` background-size | the OODA timeline connector |
| `.hero-scrim-x` | left-heavy `zinc-950` ramp (`.97 → .92 → .62 → transparent`) | keeps hero copy legible over the video (media is weighted right) |
| `.hero-scrim-y` | bottom-up `rgba(9,9,11,.85) → transparent 55%` | grounds the hero card |
| `.hero-grid` | `rgba(255,255,255,.035)` 1px lines on an `80px` grid, radially masked | hero + service-hero texture |

---

## 3. Typography

Loaded via `next/font/google` in `app/layout.tsx`:

- **Display** — Space Grotesk → `--font-display`, applied to all `h1`–`h6`
- **Body** — Inter → `--font-body`, applied to `body`

Global tracking: headings `-0.02em`, `h1` `-0.035em`.

| Token | Size / line-height / weight / tracking | Typical class |
|---|---|---|
| Hero h1 | `clamp(2.75rem, 6vw, 3.75rem)` / 1.05 / **400** / `-.03em` | `text-[clamp(2.75rem,6vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.03em]` |
| Page h1 (service hero) | `clamp(2.5rem, 5.5vw, 3.75rem)` / 1.06 / **400** / `-.03em` | — |
| Article h1 | `clamp(2rem, 5vw, 3rem)` / 1.1 / **400** / `-.03em` | set by `ArticleShell` |
| Section h2 | `clamp(2rem, 4vw, 2.75rem)` / 1.12 / 500–600 / `-.025em` | — |
| Panel h2 | `clamp(1.75rem, 3.5vw, 2.25rem)` / 1.15 / 500 / `-.025em` | — |
| Article h2 | 30px / 1.2 / 500 / `-.02em` | `.prose-dusk h2` |
| h3 | 20px / 1.3 / 500 / `-.01em` | `.prose-dusk h3` |
| Lede | 19px / 1.55 / 500, white | — |
| Body lg | 17px / 1.65–1.75 / 400 | `text-[17px] leading-relaxed` |
| Article lead | 20px / 1.6 / 400, white | `.prose-dusk > p:first-of-type` |
| Body | 15–16px / 1.6 / 400 | `text-sm` / `text-[15px]` |
| Body sm | 14px / 1.6 | `text-sm` |
| Caption | 13px / 1.6 | `text-[13px] text-zinc-500` |
| Eyebrow | 11–12px / 500 / `.08em` / uppercase | `text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400` |
| Metric | 32px (strip) · 40px (cards) / 600 / `-.03em` | + `.text-gradient-metric` |
| Price | 30px / 600 / `-.03em` | `text-[30px] font-semibold tracking-[-0.03em]` |
| Mono | 13.5px / 1.7 — `ui-monospace, 'Geist Mono', Menlo, monospace` | `.prose-dusk pre` / `code` |

`text-wrap: balance` on headings (`text-balance`), `pretty` on body.

---

## 4. Spacing rhythm

- **Section rhythm:** `px-6 pb-24` on every section; the closing CTA uses `pb-32`.
  The fixed header is cleared globally by `pt-[92px]` on the layout wrapper —
  full-bleed heroes cancel it with `-mt-[92px]` and paint underneath.
- **Anchor offset:** `section[id]` and `[id]:target` get `scroll-margin-top: 108px`
  so in-page jumps don't land under the fixed header. Do not remove.
- **Content widths:** `80rem` header + hero inner · `64rem` wide sections ·
  `56rem` pricing / checklist · `52rem` service-hero · `48rem` article shell ·
  `44rem` prose measure · `38rem` centred intros · `36rem` hero subhead ·
  `34rem` CTA copy.
- **Card padding:** `p-9` capability cells · `p-8` result cards · `p-7`
  service/pricing/work cards · `p-5` related cards.
- **Panel padding:** `px-6 py-14 sm:px-10` (OODA, CTA) · `p-9` (checklist) ·
  `px-5 sm:px-8` (FAQ).
- **Grid gaps:** `1px` hairline grids · `gap-3` chips · `gap-4` related cards ·
  `gap-6` cards · `gap-10`/`gap-12` OODA steps.

---

## 5. Radii

| Radius | Where |
|---|---|
| `rounded-[48px]` | hero media card |
| `rounded-3xl` (24px) | floating header shell |
| `rounded-2xl` (16px) | large panels — OODA, CTA, FAQ, forms, checklist |
| `rounded-xl` (12px) | cards, article CTA strip, tables (`.prose-dusk table`) |
| `10px` | `.prose-dusk pre` |
| `rounded-lg` (8px) | inputs (`.input-dusk`), logo mark |
| `rounded-md` (6px) | header buttons, mobile nav rows |
| `rounded-full` | pills, chips, CTAs, OODA step circles |
| `rounded-sm` | hairline-grid wrappers |

**Elevation:** effectively none. `shadow-[0_1px_2px_rgba(0,0,0,.2)]` on solid white
buttons only. No large soft shadows anywhere.

---

## 6. Motion

| Property | Duration | Easing |
|---|---|---|
| color / border-color / opacity | `.15s`–`.2s` | default |
| transform (card lift, `.panel-hover`) | `.2s` | default |
| chevron rotate (FAQ) | `.2s` (`duration-200`) | default |
| accordion `max-height` | `.3s` (`duration-300`) | `ease-out` |
| `Reveal` fade/slide-up | `.7s` (`duration-700`) | `ease-out`, staggered ~80–90ms |
| `CountUp` ramp | 1500ms | easeOutCubic |
| marquee loop | 34s | linear, infinite |
| connector flow | 5s | linear, infinite |

**Reduced motion is handled and must stay handled.** `globals.css` kills
`.marquee-track`, `.connector-flow` and the aurora/float/pulse animations under
`prefers-reduced-motion: reduce`; `Reveal` and `CountUp` short-circuit to their
final state; `HeroVideo` renders the poster still and never mounts the `<video>`
(so the loop isn't even downloaded).

---

## 7. Structural utilities (`globals.css`)

| Class | What it does |
|---|---|
| `.panel` | `--panel` fill + 1px `--line` border. The default card/panel surface. |
| `.panel-hover` | border → `--line-hover` and `translateY(-2px)` on hover, `.2s`. |
| `.hairline-grid` | Wrapper paints `--line`; children get the canvas fill, so the `1px` gap reads as a hairline. Used for stat strips and capability grids. |
| `.hero-grid` | 80px masked grid overlay. |
| `.hero-scrim-x` / `.hero-scrim-y` | Hero legibility scrims. |
| `.bloom-indigo` / `.bloom-blue` | Ambient radial blooms (position them absolutely, `pointer-events-none`). |
| `.nav-dusk` | Dark-glass header: `rgba(9,9,11,.6)` + `blur(40px)`. |
| `.marquee` / `.marquee-track` | Edge-masked infinite marquee; pauses on hover. |
| `.connector-flow` | Animated OODA connector line. |
| `.input-dusk` | Form field: `--solid` fill, `--line-dashed` border, `8px` radius, white text, faint placeholder, `--line-hover` focus outline. |
| `.text-gradient-ai` / `.text-gradient-metric` | See §2. |

---

## 8. Component inventory (`app/components/`)

### Chrome

| Component | Use it for | Used by |
|---|---|---|
| `SiteHeader` | The floating dusk header. Client component (needs `usePathname` for the active link and state for the mobile menu). Owns the `Wordmark`, also re-exported for the footer. | `app/layout.tsx` |
| `JsonLd` | Structured data: `LocalBusinessJsonLd`, `WebSiteJsonLd`, `ServiceJsonLd`, `FAQJsonLd`. Pass `FAQJsonLd` the **same array** you render, so markup and schema can't drift. | layout + most routes |

### Page sections

| Component | Use it for | Used by |
|---|---|---|
| `ServiceHero` | The shared top of every `/services/*` detail route: back link → badge pill → split h1 (accent gradient on the **second** line) → lede → blurb → two CTAs. | all 3 service detail routes |
| `StatStrip` | 4-up hairline proof strip under a hero. Numeric stats animate; pass `raw` for non-numeric ("24/7", "Sprint"). | service routes, both `/locations/*` |
| `CapabilityGrid` | Centred intro + 3-col hairline grid of icon/title/desc cells. Takes an optional `id` so an existing anchor can be preserved. | all 3 service routes |
| `OodaPanel` | The 4-step OODA timeline on service routes (centred variant with the flowing connector). The homepage has its own left-aligned inline version. | all 3 service routes |
| `DeliverablesChecklist` | 2-col "what's included" check list in a panel. | ai-automation, ai-consulting |
| `ResultsCards` | 3-up outcome cards with a 40px gradient metric. The marketing route's counterpart to the checklist. | ai-marketing |
| `PricingPair` | Two pricing cards. Uses the **solid** `zinc-900` fill (not `.panel`) to separate commercial content from editorial panels without adding a color. | all 3 service routes |
| `IndustryChips` | The 6-up "Who this is for" row. The industry list is baked in; only the blurb varies. | all 3 service routes |
| `FaqSection` | Centred heading + blurb wrapping `FaqAccordion`. | service routes, both `/locations/*` |
| `FaqAccordion` | Single-open disclosure list. Row 0 starts open. Animates `max-height` with a **320px ceiling** — a longer answer will clip, so keep answers short or raise it deliberately. | homepage, via `FaqSection` |
| `CtaPanel` | Closing CTA panel with a blue bloom. `footer` carries "Or explore: …" cross-links; the services index passes a second button instead. | services index + all 3 detail routes |
| `ArticleShell` | Chrome for **every** knowledge/blog article: back link, tags + meta, h1, deck, optional download CTA strip, `.prose-dusk` body at `44rem`, and "Keep reading" cards. There is no `[slug]` route and no MDX — articles are hand-written JSX folders, so the shell is what keeps them consistent. Articles should pass plain `<p>/<h2>/<ul>/<table>` and let `.prose-dusk` style them. | 13 blog routes, 3 knowledge routes, `/dmca` |

### Forms

| Component | Use it for |
|---|---|
| `ContactForm` | The `#contact` section on the homepage. Panel + `.input-dusk` fields + full-width white submit. |
| `PlaybookForm` | Inline single-field email capture for the free guide (homepage). |
| `ResourceForm` | The `/resources` gated-download form, including the post-submit success panel. |

### Primitives

| Component | Use it for |
|---|---|
| `Reveal` | One-shot IntersectionObserver fade/slide-up. Pass an incrementing `delay` (80–90ms) to stagger a row. Disconnects after firing; renders instantly under reduced motion. |
| `CountUp` | Animates `0 → to` on first scroll into view. Pass `raw` for non-numeric values. |
| `HeroVideo` | The homepage hero background loop. Serves `hero.webm` + `hero.mp4` (Safari doesn't play VP9-in-WebM reliably) and the poster still under reduced motion. |
| `HeroHelix` | The **live `<canvas>`** version of the helix. Currently **not imported by any route** — the homepage ships the baked video instead. Kept because it shares `lib/heroHelixDraw.ts`; treat it as available-but-unused, not as the shipping hero. |

---

## 9. Prose system — `.prose-dusk`

Applied by `ArticleShell` to the article body. It styles **by element**, on purpose:
all articles are hand-written JSX with no MDX and no `@tailwindcss/typography`, so
one CSS block restyles every article without editing any of them. **Write semantic
tags and add no per-tag classes.**

| Element | Style |
|---|---|
| container | `--text-secondary`, 17px / 1.75; `1.5rem` gap between all top-level children |
| first `<p>` (lead) | 20px / 1.6, **white** |
| `h2` | 30px / 1.2 / 500 / `-.02em`, white, `3rem` top margin, `text-wrap: balance` |
| `h3` | 20px / 1.3 / 500 / `-.01em`, white, `2.5rem` top margin |
| `strong` | white, 600 |
| `a` | white, underlined at `3px` offset, `rgba(255,255,255,.35)` → white on hover |
| `ul` / `ol` | `1.25rem` left padding, disc / decimal, `li` `0.5rem` top margin, markers `--text-faint` |
| `blockquote` | 3px `rgba(255,255,255,.2)` left rule, `20px` padding, italic |
| `blockquote.pull` | pull-quote variant — `--accent` left rule, not italic, 18px, white. **The one place the standalone accent appears in prose.** |
| `hr` | 1px `--line`, `3rem` top margin |
| `table` | `display: block` + `overflow-x: auto` so wide tables scroll **inside** their container and the page body never does. 12px radius, `--line-dashed` border |
| `thead` | `rgba(255,255,255,.06)` fill |
| `th` | 14px / 500, white, left-aligned, `12px 16px`, `nowrap` |
| `td` | 14px, `--text-muted`; first cell white + 500; rows separated by a dashed `--line` |
| `pre` | `--code` fill, `--line-dashed` border, 10px radius, `13.5px/1.7` mono, `--accent` text, horizontal scroll |
| inline `code` | `0.9em` mono, `--accent` |

---

## 10. The hero video is generated — do not hand-edit it

```bash
npm run render:hero      # node scripts/render-hero.mjs
```

`lib/heroHelixDraw.ts` is the single framework-free drawing core. It feeds **two**
consumers:

1. `app/components/HeroHelix.tsx` — the live `<canvas>` component (currently unused)
2. `scripts/render-hero.mjs` — bakes `public/hero.webm` + `public/hero.mp4` (+ poster)

**Edit the shared module, then re-render. Never fork or copy it** — a second copy
means the live canvas and the baked video drift apart silently.

Why a baked video rather than the live canvas on the homepage: the hero is a
full-bleed media card, and a GPU-decoded loop costs no main-thread JS on an
LCP-critical surface. The original mockup used a 20MB stock clip, which would also
have been blocked by the CSP (`default-src 'self'`, no `media-src`) — rendering our
own footage keeps it first-party and far lighter.

The renderer is deterministic (no `Math.random()`; particle seeds are arithmetic) and
verifies frame 0 and frame N are byte-identical before encoding, so the loop is
genuinely seamless.

---

## 11. Do / Don't

**Do**
- Reach for an existing component before writing a new section.
- Use `.panel` + `.panel-hover` for cards; let hairlines and fill difference create depth.
- Keep the accent gradient to the second line of an h1, and `--accent` to code, the article CTA rule, and the `blockquote.pull` variant.
- Wrap staggered rows in `Reveal`.
- Keep every new animation behind the `prefers-reduced-motion` block.
- Keep wide content (tables, code) scrolling inside its own container.

**Don't**
- Don't declare Tailwind colors as flat strings (§0.1).
- Don't use `font-bold` on headings; nothing exceeds 600, and h1 is 400.
- Don't introduce violet, or any second accent hue (§0.3).
- Don't add box-shadows for depth.
- Don't reintroduce navy / `slate-*` / `sky-blue` / `charcoal` / `dark-red`.
- Don't copy `heroHelixDraw.ts`; edit it and re-render.
- Don't remove `scroll-margin-top` from `section[id]` — anchors will land under the fixed header.

---

*Rewritten 2026-07-28 — documents the shipped dusk system. Sources: `app/globals.css`,
`tailwind.config.ts`, `app/layout.tsx`, `app/components/*`, `lib/heroHelixDraw.ts`,
and the 2026 dusk handoff `TOKENS.md`.*
