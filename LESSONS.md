---
classification: PRIVATE
---
# LESSONS — nyclaw-website

No entries yet. Scaffolded 2026-09-05 (FIX-J, first-principles audit C12) so
`scripts/gates/project-standard.py` checks content, not file existence.
Append dated entries here as they happen — format: date, what happened,
evidence, what changed.

- 2026-09-05 — Replaced unsubstantiated 40% cost/8x productivity and 24/7 assertions with existing scoped-price, handoff, sprint and tools facts. Preserved approved named-client proof and brand layout. Lesson: validate customer-visible claims and meaningful rendered state, not only HTTP success. Evidence: website sweep and local repair checks. — Codex
- 2026-09-07 — App-security-baseline batch: added Zod validation to `app/api/admin/leads/route.ts`'s `format` query param (was read raw), escaped all JSON-LD `<script>` blocks (`JsonLd.tsx` + 3 knowledge pages) with the Next.js `<` pattern as defense-in-depth even though today's data is hardcoded, and ran `npm audit fix` (no `--force`) to clear the sharp/libvips CVE chain. Confirmed item 6 (server-side auth) was already correct on the leads route — HTTP Basic Auth with a constant-time compare, no change needed; that gate hit is a false positive for this route. Two dependency advisories remain (nodemailer, next/postcss) with no fix short of a breaking major version bump — left in place and reported to the director. Lesson: the gate can't tell "already authenticated, just flagging for review" from "actually missing auth" — read the route before assuming a manual-flag item is a gap. — Claude Fable 5.1


## 2026-10-06 — Put workflow evidence before a paid assessment

The company acquisition page now gives law-firm owners a fictional output, explicit review boundaries and named assessment deliverables before the free-fit-call CTA. The proposed $495 fee in the revenue audit remains a hypothesis; this release does not activate a payment or imply validated demand. Gate: every follow-on assessment requires scope and fee in writing, and acquisition content must link to an actual route with a stable sitemap date. This improves existing pages and the existing content queue; no new scheduled loop is added.

## 2026-10-06 — Bound research inputs and verify the conversion destination

Turn limits alone do not prevent expensive repeated reading. Use small source excerpts, stop at the qualified-candidate cap, and preserve facts after compaction. The first real probe exposed oversized inputs despite passing structural tests. Live booking verification also found15-minute site copy pointing to an active30-minute event; correct the public offer instead of assuming the URL slug proves duration. Gates:14 research-boundary tests and rendered booking labels checked against the actual calendar. No recorded appointment or acquired customer is implied.

- 2026-10-06 — A corrected agent prompt can still inherit a retired rule from a second input. The successful weekly pilot repeated the calendar's old word quota. Remove the conflicting checklist at its source; the producer prompt already prioritizes evidence over length. Gate: read the real output and both scheduled inputs, rather than treating saved instructions as behavior.

- 2026-10-07 — Cross-industry benchmarking: separate arrival, action and return. Large-domain visits do not prove that a layout converts. Replace repeated capability prose with fictional, selectable handoff examples; preserve real customer proof separately. Gate: extended existing editorial guard to the shared component, plus browser checks for complete/missing states, keyboard input and no API writes. No new loop or schedule.

- 2026-10-07 — A useful proof page needs one source for client facts and a true receipt. Moving the frozen case array into a shared module preserves exact wording across home and work; general buyer questions stay separate. A guide form's success previously promised an email the route never sent. Gate: shared-copy SHA256, editorial guide promise/model checks and scripts/customer-path-uat.mjs with mocked failure/retry/success, canonical/anchors/mobile and actual guide destination. No schedule or new vendor.

- 2026-10-08 — Durable inquiry measurement must distinguish empty from unavailable. Preserve bounded form context with the record, require confirmed storage writes and return503 for unavailable protected exports. Gate: mocked route/storage cases plus aggregate-only counter failures/privacy tests and browser source assertions. Context labels are untrusted and never establish lead quality. The estate reuses its existing income-health sensor; no new job or paid analytics plan.

- 2026-10-22 — Ahrefs five-page broken-link repair: four live industry posts still linked to retired /workshop; GPT-5.4 linked to a nonexistent setup guide. Replaced workshop offer copy/destinations with the actual contact form and linked the existing public AI Operator’s Playbook; mirrored the four markdown drafts. A source regression gate now rejects both retired routes and checks replacement sources exist. Preserve real HTTP-to-HTTPS redirects and do not resurrect an unavailable workshop just to hide a 404. — Codex

- 2026-10-22 — Ahrefs48-page schema repair: inherited ProfessionalService incorrectly carried serviceType (Service-only) and triggered Google LocalBusiness address requirements without a public office address. Replaced that node with Service referencing the existing Organization provider; removed LocalBusiness-only priceRange and Organization-only knowsAbout from the service. No street address or rich-result eligibility invented. Rendered-component regression covers the type/property/provider relationship. Root search description shortened to truthful concise copy. — Codex

- 2026-10-23 — Cinematic homepage pass (WebGL DNA helix hero, scroll-linked reveals, process strand). Four lessons. (1) A WebGL program can compile both shaders and still fail to link: `uPass` was `mediump` in one shader and `highp` in the other, so the canvas mounted and drew nothing. Gate: log the link error and check the rendered pixels in a screenshot, never just that the canvas exists. (2) `--scrim: 9, 9, 11` (commas) made every `rgb(var(--scrim) / a)` invalid, so the nav glass and hero scrims had silently painted nothing since the Hallmark pass. Space-separated channels only. (3) Starting the helix one frame after mount let shader compile land before first paint under a 4x CPU throttle (devtools FCP 1.7s → 2.7s). Starting it after `load` + idle brought runs back to 1.5s, though devtools runs on localhost stay bimodal (1.5s / 2.7s) and simulated LCP is 2.6s on the baseline too, so report both methods. (4) A dash-offset "draw" with `pathLength` plus `vector-effect: non-scaling-stroke` stops short in Chrome; a clip-path wipe is exact. — Claude Opus 5.5
