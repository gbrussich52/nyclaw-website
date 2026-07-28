# Weekly NYClaw offerings + free guide refresh

You are refreshing **NYClaw.io** (https://nyclaw.io) so free materials and paid offerings stay at the frontier of AI operator practice for small businesses.

## Context (self-contained for any reader of your output)

- **NYClaw.io** = AI implementation / AI operator services for SMBs (Westchester + NYC metro, remote OK). Methodology: OODA. Flagship free lead magnet: **The AI Operator’s Playbook** (HTML at `nyclaw-website/public/ai-operators-playbook.html`, gated on `/resources`).
- **Giani** runs this next to a day job and other products; he wants **great material**, not hype listicles.
- **Daily radar** already exists: markdown briefs in `~/Documents/DailyTechAIBriefs/*-tech-ai-x-brief.md`.
- **Improve queue:** `nyclaw-website/docs/loop/improve-queue.md`.

## Inputs to read (required)

1. Last **7 days** of Grok X briefs: `~/Documents/DailyTechAIBriefs/*-tech-ai-x-brief.md` (if fewer exist, use all).
2. Last **7 days** of last30days radar: `~/Documents/Last30Days/radar/*-last30days-radar.md` (multi-source: Reddit/HN/GitHub/X/web). Prefer last30days for Reddit/HN/GitHub depth; prefer X brief for Twitter-native discourse.
3. Free guide: `nyclaw-website/public/ai-operators-playbook.html` (sample headings + any dated claims; note if content feels pre-current-harness era).
4. Services positioning: `nyclaw-website/app/services/page.tsx` (pricing strings + service names).
5. Current improve queue: `nyclaw-website/docs/loop/improve-queue.md`.
6. Optional: `docs/marketing/module-ai-concierge.md` in the monorepo if present.

## Hunt (Builder OS)

Before recommending a **new** free product or service SKU, briefly search X/web for whether a better public template already exists. Prefer **updating the existing playbook** over spinning a second guide.

## Deliverables (write all of these)

### A) Weekly plan (self-contained markdown)

Path: `nyclaw-website/docs/loop/weekly-refresh-YYYY-MM-DD.md`

Must include:

```markdown
# NYClaw weekly refresh — YYYY-MM-DD

## What the market said this week (plain English)
3–6 bullets from the daily briefs, no unexplained jargon.

## Playbook update plan (AI Operator’s Playbook)
For each proposed change:
- **Section:** heading or topic
- **Change:** what to add/cut/rewrite
- **Why:** which signal justifies it
- **Priority:** P0 this week / P1 later
- **Draft snippet:** 1 short paragraph in Giani/NYClaw voice (plain English, SMB owner)

## Services / homepage positioning
What language to keep, change, or avoid (no inventing prices unless already on site).

## New content (blog/SEO) — only if justified
Max 2 titles with buyer question + outline bullets. Prefer zero if playbook updates matter more.

## Do not ship
Hype, vaporware, model-of-the-week without operator practice.

## Recommended ship order this week
1. …
```

### B) Improve queue

Append **new** items only (dedupe by similar metric id or same title this week) to  
`nyclaw-website/docs/loop/improve-queue.md` under `## Open`.

Format:

`- [ ] **YYYY-MM-DD** \`slug\` — one line. Source: weekly refresh / brief date.`

### C) Optional draft section file

If one playbook section is P0, write a ready-to-paste draft to:

`nyclaw-website/docs/loop/drafts/YYYY-MM-DD-playbook-section-slug.md`

## Voice

Professional, plain, sequential. No AI tricolon closers. No “game-changing.” Define terms. SMB owner is the reader of the **draft snippets**; the weekly plan can be slightly more technical for Giani.

## Done

Confirm absolute paths written.
