# NYClaw weekly refresh — 2026-08-25

Self-contained plan for Giani. NYClaw.io sells AI operator work for small businesses (Westchester + NYC metro, remote OK) and gives away **The AI Operator’s Playbook** as the free lead magnet.

**Inputs used**

- X briefs: `2026-08-18` through `2026-08-22` and `2026-08-24` (no `08-23` or `08-25` file)
- last30days radar: `2026-08-18` through `08-21`, plus `08-23` (that file briefed the missing `08-22` dump) and `08-24`
- Playbook: `public/ai-operators-playbook.html` (cover still **Updated July 2026**)
- Services: `app/services/page.tsx` (live prices)
- Homepage: `app/page.tsx` (hero + stats still vitamin)
- Improve queue: `docs/loop/improve-queue.md`
- Optional module: `docs/marketing/module-ai-concierge.md` (March 2026; **pricing is stale** vs the live site)

## Hunt

- Topic: whether to ship a second free SMB AI playbook / 30-day pilot PDF this week
- Queries: “SMB AI operator playbook 2026”, “small business AI implementation checklist process owner metric rollback”, GitHub “AI small business playbook”
- Fresh signal:
  - Pathopt’s *How to Run a 30-Day AI Pilot* already names owner / operator / one metric / Day-30 kill-or-scale
  - AWS’s SMB AI readiness checklist (still circulating this window): one outcome, named data owners, access rules before you automate
  - nasscom (24 Aug 2026): stalled pilots are a production-readiness gap (business owner + monitoring + rollback), not a model gap
  - Perplexity’s Aug 18 SMB hub starts with the bottleneck workflow, not the model
  - HighLevel “sell AI to local businesses” beginner videos ($297–$500/mo missed-call textback) are the competitor shape to refuse, not copy
  - GitHub `TheWayWithin/BOS-AI` (“30 specialized agents”) is the volume-agent product to ignore
- Best hits:
  - Public 30-day pilot templates exist; they are generic consulting PDFs
  - `walkinglabs/learn-harness-engineering` (~13k stars) is a coding-harness course (AGENTS.md + verify files), not an SMB owner guide
  - No public template owns NYClaw’s Westchester operator voice plus OODA + closed loop + receipt language
- Decision: **adapt** the existing playbook. Do not spin a second free guide or a new SKU.
- What we take: process → baseline number → named owner → human accept → undo path. Keep it inside Part 3B + Template 6.

## What the market said this week (plain English)

- A lot of small businesses already “use AI” (surveys still quote high adoption) and still cannot name **one process that runs differently**. Tool installed, workflow unchanged, then it drifts back to manual.
- Knowledge work has no compiler. A coding agent fails in minutes. An intake bot or after-hours reply can look fine and still send the wrong thing. The product is the check, not the model.
- “Done” is not a green checkmark. Done is: the expected record showed up in the real system, a person can undo it, and a failed try did not get saved as truth.
- ChatGPT is pickier about what it *cites*. Listicles and Reddit threads are a weak bet there. Your own page that answers one buyer question is the durable play. Ranking on Google is not the same as being named in an AI answer.
- Buyers who already have Claude do not want a second chatbot from you. They want their existing setup to call a named action on a named site, with a human on money and customers.
- Ignore: model-of-the-week, “50 agents,” Slack-as-your-control-room, HighLevel $297/mo beginner funnels, “get us in ChatGPT in 15 days,” paid listicle mills.

## Playbook update plan (AI Operator’s Playbook)

The July Part 3B (harness + closed loop + Template 6) is still the right chapter. It is missing this week’s aspirin: **installed is not implemented**, plus a plainer definition of “done.” Cover date is still July 2026.

### 1. Cover / About date stamp

- **Section:** Cover line + About “Last updated”
- **Change:** July 2026 → August 2026. Keep “operator practices, not tool rankings.”
- **Why:** Trust signal; last ship was 2026-07-27.
- **Priority:** P0 this week
- **Draft snippet:** `Updated August 2026 · Operator practices, not tool rankings`

### 2. Installed is not implemented (new heading in Part 3B)

- **Section:** After “Start With One Dollar Leak,” before “After Go-Live”
- **Change:** Add a short section that names the actual buyer complaint this week. Do not add a new PDF.
- **Why:** X brief 08-22 (@shawnypants / Intuit-style “89% use AI”) and 08-24 (still the NYClaw aspirin). Radar 08-18: 50-person marketing lead shopping tools, not a handoff.
- **Priority:** P0 this week
- **Draft snippet:** You already pay for ChatGPT. Your team uses it. Name one process that runs differently on Friday than it did before the subscription. If you cannot, you did not implement AI. You bought a tab. Before another tool: write the process, today’s number, and the human who owns that number after launch.

### 3. Done means a receipt (extend “How You Know You’re Buying an Operator Setup”)

- **Section:** Operator-setup bullets + Automation Architecture Checklist
- **Change:** Add: named systems it may write to; named sites it may read; no card on the agent; finished = expected record appeared and can be undone; a failed run does not get saved as memory. Optional one-liner for no-API work (clicking a portal): wait for the confirmation file, then a human accepts.
- **Why:** 08-19 effect receipts; 08-20 allowlists / ZDR as a *setting*; 08-21 computer-use GA (do not resell it); 08-24 ACID-Agent “failed steps must not commit” + EXPECTED / COLLECTED / GAPS.
- **Priority:** P0 this week
- **Draft snippet:** A finished run is not “the command succeeded.” It is “the appointment / CRM row / text we expected is there, and we can undo it.” Write the allowed sites. The agent does not hold a company card. If a try fails, do not let it write that failure into the notes the next run will read.

### 4. Your agent, their thing (P1)

- **Section:** One paragraph under operator-setup, or services language only if the playbook stays too long
- **Change:** If they already have Claude or ChatGPT, the job is a named action their setup can call — not a second chatbot you host.
- **Why:** 08-24 @ASpittel / @GergelyOrosz demand. Matches live services (“wired into the tools you already use”) without inventing an MCP product.
- **Priority:** P1 later
- **Draft snippet:** If you already have an AI you like, do not buy a second one from a vendor. Ask whether *your* setup can do one named job in *your* software, with you still approving anything that spends money or talks to a customer.

### 5. AEO one-liners (P1, do not write a second AEO chapter)

- **Section:** Template 6 “AI search attribution” block (already shipped July)
- **Change:** Three lines max: mention is not a citation; a Reddit-only program is the wrong bet on ChatGPT; skip “best AI tools 2026” pages. Do not sell `llms.txt`, an AEO dashboard, or paid listicles.
- **Why:** 08-19/08-20 ChatGPT citation shift; 08-21 licensed-news lift (we cannot buy that); 08-23 fetch-vs-cite; 08-22 Google spam update done (one job per page). Queue already has `aeo-original-data`.
- **Priority:** P1 later
- **Draft snippet:** If ChatGPT says your name but links someone else, that is awareness, not a lead you can count. Write the page only you could write. Do not pay for listicles.

### 6. Design-is-a-draft / model-of-the-week (skip or one sentence)

- **Section:** Existing anti-pattern 7 (“Chasing New Tools”)
- **Change:** Optional one sentence: an artboard or a demo is a draft until a human accepts it against the real brand and process.
- **Why:** `/design` (08-18) is operator-useful for Giani, weak as SMB-owner playbook copy. Do not chase Claude Code version numbers in the guide.
- **Priority:** P1 later

## Services / homepage positioning

Live prices (do not invent; do not use the March 2026 module numbers):

| Offer | Live string |
|-------|-------------|
| Custom AI Agents | $3.5K–8K per agent sprint · no monthly required |
| Workflow Automation | $5K–15K project · 2–3 connected automations |
| Fit Audit + Roadmap | Free 15-min fit · $1K–2.5K full roadmap (optional) |

**Keep:** project-based, not a product install; wired into tools they already use; runbook; error handling to a human; optional care after go-live; Westchester + NYC; OODA; free 15-minute fit. Valentine Family Electric and Byram Mason as named work (do not paraphrase those blocks).

**Change (copy, not price):**

- Homepage H1 is still “Custom AI agents, built for how you already work.” That is vitamin language. Lead with the problem: they use ChatGPT and missed calls / overnight leads / follow-ups still sit. Then the build.
- Homepage stats currently show **40% avg. cost reduction**, **8x productivity**, and **24/7 agents that keep working**. The 24/7 line is the “autonomous while you sleep” anti-pattern. The 40% / 8x numbers are not a dated original artifact. Replace with one process-change line or drop the vanity pair until you have a number you can stand behind.
- Services hero and agent card still lead with “custom AI agents.” Same aspirin rewrite as the homepage H1.
- “What’s always included” already has workflow design + success metric. Make the metric a **baseline they already have**, not a KPI we invent after the demo.
- Fit-audit blurb: first questions are process, today’s number, who owns the outcome — not which model they like.

**Avoid:**

- Reselling Managed Agents, Slack Code, an MCP mesh, “50 agents,” computer-use as a product, HighLevel $297/mo retainers
- Promising ChatGPT citations
- “Autonomous while you sleep” / “24/7 agents that keep working”
- Invented prices or bringing back the stale module retainers ($199–$499/mo) unless you deliberately change the live offer
- Competing on `/design` or harness brand names (Claude Code vs Codex vs Grok)

**Aspirin test (services):** time (nights on follow-up), money (leads that never get a same-night reply), peace of mind (a named person can stop a bad send). Not “we use agents.”

## New content (blog/SEO) — only if justified

Prefer **zero** new posts until the playbook P0 ships.

The justified buyer question this week is already queued as `blog-after-setup` (2026-07-27): “What should I do after ChatGPT is set up?” When that ships, retitle to the week’s actual complaint: **“We use AI every day and nothing runs differently.”** Outline: process, baseline number, owner, receipt, rollback. Problem in the title, not the product. One job per page. Do not write a listicle teardown or a ChatGPT-citation explainer (AEO item already open).

## Do not ship

- A second free PDF or “30-day pilot” clone of Pathopt / AWS / nasscom
- Model comparison roundups, Claude Code changelog recaps, `/design` tutorials
- HighLevel beginner funnel, missed-call SaaS SKU, AI website auditor, BOS-AI-style 30-agent OS
- Paid listicle mill, Cloudflare/Peec/Otterly as a product, `llms.txt` as the work
- “We wire MCP” as a finished engagement
- Computer-use / Slack Code / Managed Agents as things NYClaw resells
- Anti-AI fonts, volume entity pages, “close before November” UAD scare copy (PAP, not NYClaw)

## Recommended ship order this week

1. Playbook: date stamp + **Installed is not implemented** + receipt/allowlist bullets (P0). Ready-to-paste draft: `docs/loop/drafts/2026-08-25-playbook-section-installed-not-implemented.md`
2. Services + homepage: one aspirin line on the hero or agent card (process unchanged → we map one job, baseline, owner, kill switch). Drop or rewrite the 24/7 / 8x / 40% stats. No price change.
3. Then, and only then, the already-queued `blog-after-setup` with this week’s title.
4. Ops (not a page): the launchd weekly-refresh script is already on the queue (`com.giani.nyclaw-weekly-refresh` failed since 8/03). This plan was written by hand. Fix the script so next Monday is not skipped.
5. Sense still open: `sense-guide-downloads`; AEO five-query log (official page vs listicle vs Reddit; cited vs named). Do not buy a dashboard for that.

## Improve queue

New Open items appended in `docs/loop/improve-queue.md` (2026-08-25). Did not re-add `blog-after-setup`, `aeo-original-data`, `pdf-mirror`, or the launchd script fix.
