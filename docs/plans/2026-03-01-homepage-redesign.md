# NYClaw.io Homepage Redesign
**Date:** 2026-03-01
**Status:** Approved
**Scope:** `app/page.tsx`, `app/globals.css`, `app/blog/page.tsx`, `app/layout.tsx`

---

## Goal
Apply targeted design improvements to the homepage to fix brand clarity, conversion architecture, and visual polish issues identified in the design review.

---

## Approved Changes

### 1. Navigation
- Add `"AI Automation Agency"` subtitle under the NYClaw.io wordmark
- Change "Get Started" CTA button color to amber (`#f59e0b`) for contrast against white nav

### 2. Hero Section
- Keep headline and body copy unchanged
- Change to single dominant amber CTA: `"Build My AI →"`
- Secondary ghost button: `"See the Proof"` (anchors to `#cases`)
- Add animated SVG terminal/sparkle icon to visually represent Ainsley

### 3. Comparison Section — Layout flip
- Move the 4 stats (`8x`, `∞`, `24/7`, `10x`) to the TOP of the section at full visual scale
- Side-by-side comparison cards follow below the stats

### 4. "What We're Building" Cards
- Revenue range (e.g. `$500-2K/mo`) becomes the primary large number on each card
- Status dots (🟢/🟡) remain

### 5. "30 Days" Banner
- Promote to standalone full-width section between case studies and services
- Large centered typography on dark background

### 6. Services Cards
- Move pricing block to directly under the service headline
- CTA copy: `"Build My AI Setup →"` and `"Start My AI Brand →"`

### 7. Project Cards
- Replace emoji-only gradient card headers with styled SVG icon + label on branded gradient
- No external image assets required

### 8. "The Experiment" → Timeline
- Convert paragraph block to 3-step horizontal timeline with connector line and date markers
- Same content, dramatically different visual weight

### 9. Playbook Section → Email Capture
- Remove 4 "Coming Soon" article cards (all point to empty /blog)
- Replace with single "Get the Playbook" email capture card

### 10. Contact Form
- Add proper input borders and focus states
- Change submit button to amber: `"Claim My Spot →"`

---

## Technical Approach
- Full rewrite of `app/page.tsx` (535 lines) — cohesive changes across all sections
- Add amber color token to `tailwind.config.ts` (`#f59e0b`)
- Update `app/globals.css` for new utility classes (btn-amber, timeline styles)
- Update `app/blog/page.tsx` logo to match new nav style
- Update `app/layout.tsx` meta description

## Color Tokens (additions)
- `amber: '#f59e0b'` — primary CTA, submit button
- Existing: `navy: '#003366'`, `sky-blue: '#0066cc'`, `dark-red: '#c41e3a'`, `charcoal: '#2c2c2c'`
