---
title: NYClaw offerings + free guide refresh loop
created: 2026-07-27
status: active
---

# NYClaw.io — stay current without random content

**Site:** https://nyclaw.io  
**Flagship free asset:** AI Operator’s Playbook (`public/ai-operators-playbook.html`, gated via `/resources` + homepage form)  
**Business module:** `docs/marketing/module-ai-concierge.md` (workspace)

## Goal

Always refresh **what you sell** and **what you give away free** so both match the frontier of AI operators, harnesses, models, and SMB practice — without reinventing tools or shipping hype.

## Offerings inventory (what must stay current)

| Asset | Location | Refresh when |
|-------|----------|----------------|
| Free guide (Playbook HTML) | `public/ai-operators-playbook.html` | New durable practice, model/harness shift, pricing/ROI examples stale, security/ops section outdated |
| Free guide gate | `app/resources/page.tsx`, PlaybookForm, ResourceForm | Copy/CTA; never ship broken download path |
| Services + pricing | `app/services/page.tsx` (+ service subpages) | Positioning language (e.g. closed-loop / harness) or price bands change |
| Homepage claims | `app/page.tsx` | Must match playbook + services |
| SEO/blog | `app/blog/`, `content/seo/` | Only when a signal maps to a real buyer question |
| Location pages | `app/locations/*` | Local trust copy; light touch |

## Loop shape (Continuous Loop + Builder OS)

```text
Daily X/tech radar  →  NYClaw Improve queue  →  Ship guide/service/content update  →  Sense (leads, downloads)  →  next improve
        ↑_______________________________________________________________________________|
```

| Stage | NYClaw meaning |
|-------|----------------|
| **Sense (market)** | Daily Tech+AI X brief (`~/Documents/DailyTechAIBriefs/`) + weekly NYClaw extract |
| **Improve** | `nyclaw-website/docs/loop/improve-queue.md` |
| **Hunt** | Before inventing a new freebie or service package: GitHub + X + last30days |
| **Integrate / Verify / Distribute** | PR → `npm run build` / test → Vercel prod |
| **Sense (product)** | Lead form volume, guide downloads, booked calls (when instrumented) |

## Cadence

| When | What |
|------|------|
| **Daily 7:00** | **last30days** watchlist + radar brief (`scripts/daily-last30days-radar/`) — multi-source |
| **Daily 7:30** | Grok tech/AI **X** brief — includes NYClaw angles |
| **Weekly Mon 8:00** | `scripts/nyclaw-weekly-refresh/run.sh` — reads last 7 **X + last30days** briefs + playbook/services → plan + Improve items |
| **When queue has [ship]** | Agent or you implement playbook section / service copy / one SEO piece |
| **Monthly** | AEO check: 7 buyer questions across ChatGPT/Claude/Perplexity/Gemini for “AI for small business Westchester/NYC” etc. |

## What “great material” means here

For SMB owners (not AI Twitter):

1. **Plain English** — define terms; no “agentic harness” without a sentence of meaning.
2. **Operator-proven** — from your stack (Sense, Improve, skills, OODA), not listicles.
3. **Actionable** — checklist, template, or decision rule they can use this week.
4. **Honest** — what’s hard, what fails, what you charge-ish ranges when public.
5. **Citable (AEO)** — original numbers, named frameworks (OODA + closed loop), consistent entity “NYClaw.io”.

## Free guide update protocol

1. Weekly refresh run produces “Playbook deltas” with section IDs / headings to change.
2. You or an agent edits `public/ai-operators-playbook.html` (and any PDF mirror if present).
3. Bump a visible **“Updated Month Year”** line near the top of the playbook.
4. Deploy; smoke: open `/resources`, submit test only if non-prod, open playbook HTML URL.
5. Check off Improve item; note date in queue.

## Do not

- Spin a new free PDF every week (dilutes the flagship).
- Chase every model release in the playbook (date the section; principles first).
- Sell “chatbot install” when the market wants closed-loop operators — use signal language only if you can deliver it.
- Publish live client secrets or day-job data.

## Commands

```bash
# Daily radar (already launchd)
open ~/Documents/DailyTechAIBriefs/

# Weekly NYClaw refresh (also launchd Mon 8:00)
/Users/gianibrussich/project-claude/nyclaw-website/scripts/nyclaw-weekly-refresh/run.sh

# Manual improve queue
open /Users/gianibrussich/project-claude/nyclaw-website/docs/loop/improve-queue.md
```
