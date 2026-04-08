# DESIGN.md — NYClaw.io

> AI agent automation agency for SMBs. Ainsley is the face/voice of the brand.
> Drop this into any AI coding agent context for consistent UI generation.

---

## 1. Visual Theme & Atmosphere

**Mood**: Sharp, credible, authoritative. NYC-native professional agency. Not a startup, not a law firm — an AI-first automation agency.
**Density**: Medium. Marketing pages breathe. Service pages are crisp.
**Philosophy**: Clean editorial + conversion-focused. Trust through design precision.
**Surfaces**: White + dark navy sections. Subtle pulsing animation (2.5s) on key accent elements.

---

## 2. Color Palette & Roles

| Name          | Hex       | Tailwind Class  | Role                                          |
|---------------|-----------|-----------------|-----------------------------------------------|
| Brand Navy    | `#003366` | `navy`          | Primary authority: headers, hero, nav, CTAs   |
| Sky Blue      | `#0066cc` | `sky-blue`      | Links, hover states, accent highlights        |
| Dark Red      | `#c41e3a` | `dark-red`      | Urgency, alert accents, selective emphasis    |
| Charcoal      | `#2c2c2c` | `charcoal`      | Dark sections, footer                         |
| White         | `#ffffff` | `white`         | Primary background, text on dark sections     |
| Slate 50      | `#f8fafc` | `slate-50`      | Alternating section backgrounds               |
| Slate 200     | `#e2e8f0` | `slate-200`     | Borders, dividers                             |
| Slate 400     | `#94a3b8` | `slate-400`     | Captions, secondary labels                    |
| Slate 600     | `#475569` | `slate-600`     | Body text                                     |

**Do NOT use**: orange, yellow, purple, bright green.
**Subtle animation**: `animate-pulse-slow` (2.5s) on the main CTA badge/dot — not on buttons.

---

## 3. Typography Rules

**Font Stack**: System sans-serif (`font-sans`, Inter/system-ui)

| Element            | Size    | Weight    | Class                                              |
|--------------------|---------|-----------|----------------------------------------------------|
| Hero H1            | 4xl–6xl | Bold 700  | `text-4xl md:text-6xl font-bold text-white`        |
| Section H2         | 3xl     | Bold 700  | `text-3xl font-bold text-navy`                     |
| Card title         | xl      | Semibold  | `text-xl font-semibold text-navy`                  |
| Body               | base    | Normal    | `text-base text-slate-600`                         |
| Label / eyebrow    | xs      | Semibold  | `text-xs font-semibold uppercase tracking-widest`  |
| Nav links          | sm      | Medium    | `text-sm font-medium`                              |

---

## 4. Component Stylings

### Hero Section
```
Container:   bg-navy min-h-screen flex items-center
Headline:    text-white font-bold (large, tight tracking)
Subhead:     text-white/70 text-xl
CTA primary: bg-sky-blue text-white hover:bg-sky-blue/90 rounded-xl px-8 py-3 font-semibold shadow-lg
CTA ghost:   border border-white/30 text-white hover:bg-white/10 rounded-xl px-8 py-3
Badge/tag:   bg-white/10 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full animate-pulse-slow
```

### Buttons
```
Primary:   bg-navy text-white hover:bg-navy/90 rounded-xl px-6 py-3 font-semibold shadow-sm
Secondary: border border-slate-200 bg-white text-navy hover:bg-slate-50 rounded-xl px-6 py-3
Accent:    bg-sky-blue text-white hover:opacity-90 rounded-xl px-6 py-3 font-semibold
Danger:    bg-dark-red text-white hover:opacity-90 rounded-xl px-6 py-3
```

### Cards
```
Standard:   rounded-2xl border border-slate-200 bg-white p-8 shadow-sm
Hover:      transition-all hover:-translate-y-1 hover:shadow-md hover:border-navy/20
Dark card:  bg-navy text-white rounded-2xl p-8
Icon block: inline-flex rounded-xl bg-sky-blue/10 p-3 mb-4
```

### Navigation
```
Light nav:  bg-white border-b border-slate-200 sticky top-0 z-50
Dark nav:   bg-navy
Logo:       font-bold text-navy (light) / text-white (dark)
Nav link:   text-slate-600 hover:text-navy text-sm font-medium
CTA in nav: bg-navy text-white rounded-lg px-4 py-2 text-sm font-semibold
```

### Sections (alternating)
```
White:      bg-white py-24
Light gray: bg-slate-50 py-24
Dark navy:  bg-navy py-24 (text-white inside)
```

### Social Proof / Testimonials
```
Card:       rounded-2xl bg-slate-50 border border-slate-200 p-6
Quote:      text-slate-700 italic text-base
Attribution:text-navy font-semibold text-sm
```

---

## 5. Layout Principles

**Max widths**: `max-w-6xl` for wide sections, `max-w-4xl` for content, `max-w-2xl` for single-column text blocks.
**Section rhythm**: `py-24` for major sections, `py-16` for sub-sections.
**Grid**: 3-column card grids (`grid-cols-1 md:grid-cols-3 gap-8`), 2-column for features.
**Alignment**: Content sections center-aligned on hero/marketing, left-aligned on content/data pages.

---

## 6. Depth & Elevation

```
Flat:     border-slate-200 no shadow (dividers, borders)
Card:     shadow-sm
Hover:    shadow-md + -translate-y-1
Modal:    shadow-2xl
```

Border radius: `rounded-xl` buttons/inputs, `rounded-2xl` cards, `rounded-full` badges/avatars.

---

## 7. Do's and Don'ts

**Do:**
- Lead with navy for authority. Sky blue for action/links.
- Use pulsing animation ONLY on the hero badge/dot, nowhere else
- Section eyebrows: `text-xs font-semibold uppercase tracking-widest text-slate-400`
- Feature icon containers: `bg-sky-blue/10 rounded-xl p-3 inline-flex`
- Alternate white/slate-50/navy sections for rhythm

**Don't:**
- Don't use orange, yellow, or purple
- Don't use gradients on nav or body backgrounds
- Don't center body text in content sections — only on hero/marketing
- Don't use more than 2 CTAs per section
- Don't put red on anything that isn't urgent/error/alert

---

## 8. Responsive Behavior

- Mobile: single column, hamburger nav, stacked hero
- `sm` (640px): 2-col grids begin
- `md` (768px): 3-col grids, nav shows full
- `lg` (1024px): max-width containers kick in

Touch targets: min 44px height on all interactives.

---

## 9. Agent Prompt Guide

### Quick color reference:
```
primary:    #003366 (navy)
secondary:  #0066cc (sky-blue)
accent-red: #c41e3a (dark-red)
bg:         #ffffff / #f8fafc (slate-50)
dark-bg:    #2c2c2c (charcoal)
text:       #475569 (slate-600)
muted:      #94a3b8 (slate-400)
border:     #e2e8f0 (slate-200)
```

### Ready-to-use prompts:
> "Build this section using the DESIGN.md system. Hero: bg-navy, white text, sky-blue CTA. Section background alternates white/slate-50. Cards: rounded-2xl border-slate-200 shadow-sm hover:-translate-y-1. No orange, no gradients."

> "Create a feature grid: 3 columns, each card has an icon in bg-sky-blue/10 rounded-xl p-3, card title in text-navy font-semibold, body in text-slate-600. Hover lifts card."

---

*Generated 2026-04-04 | NYClaw.io brand spec — navy/blue/red, Ainsley-forward design*
