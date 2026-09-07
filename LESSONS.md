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
