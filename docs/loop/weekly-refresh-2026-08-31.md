# NYClaw weekly refresh — 2026-08-31

Self-contained plan for Giani. NYClaw.io sells AI operator work for small businesses (Westchester + NYC metro, remote OK) and gives away **The AI Operator’s Playbook** as the free lead magnet.

**Inputs used**

- X briefs: `2026-08-25`, `08-26`, `08-30`, `08-31` (no `08-27`, `08-28`, or `08-29` files)
- last30days radar: `2026-08-25`, `08-26`, `08-30`, `08-31` (same gaps)
- Playbook: `public/ai-operators-playbook.html` (cover still **Updated July 2026**; Part 3B still missing last week’s unshipped P0)
- Services: `app/services/page.tsx` (live prices unchanged)
- Homepage: `app/page.tsx` (H1 and 40% / 8x / 24/7 stats still vitamin; same as 08-25)
- Improve queue: `docs/loop/improve-queue.md` (08-25 P0s still open)
- Optional module: `docs/marketing/module-ai-concierge.md` (March 2026; **pricing is still stale** vs the live site)

## Hunt

- Topic: whether to ship a second free “agent governance / what the AI may send” PDF, or a new SKU
- Queries: “SMB AI agent send policy 2026”, “human approval gate small business agent”, “SKILL.md malware restore checklist”, X `poisoned SKILL.md` since 08-24
- Fresh signal:
  - SoGood.ai *AI Agent Governance for Small Business* (Jun 4, updated Aug 26): six controls — written scope, human gate on blast-radius actions, cost ceiling, audit log, kill switch, named owner. Generic consulting PDF, not Westchester operator voice.
  - DataVessel (Jun 17) and Activepieces (Jul 11): draft vs send vs deny. Twin.so (Aug 19): draft-and-approve for public channels.
  - @Av1dlive (Aug 28): public ALLOW / REQUIRE HUMAN / DENY list. Same shape as this week’s clerk split.
  - Numa Lunah SKILL.md incident (Fri 28, ~1.4M views by Mon): instruction files persist malware across a wipe. B2BNN recap Aug 29. Reversec / Red Hat / Automationswitch checklists exist and are **developer** docs, not SMB owner guides.
  - HighLevel / “AI employees while you sleep” / 137-agent maps are the competitor shape to refuse.
- Best hits:
  - Public send-gate templates exist. They are vendor blogs and one X list.
  - No public template owns NYClaw’s Westchester voice plus OODA + closed loop + receipt + “do not paste the chat’s curl.”
- Decision: **adapt** the existing playbook. Do not spin a second free guide, a governance SKU, or a 24/7 receptionist that emails clients.
- What we take: AI drafts; a named human sends. Instruction files are code. Jobs, not 40 connectors. Keep it inside Part 3 / 3B.

## What the market said this week (plain English)

- A style-guide file on disk can re-infect a wiped laptop. If your AI loads instruction files every session, those files are software. Read them before restore. Do not paste an install command a chatbot handed you until you have opened the real domain in a browser you control.
- The model is a clerk, not an associate. A small-firm lawyer this weekend: excellent at pulling CRM and email and summarizing; mediocre at sending the next email. A $25–30k/mo studio asked Reddit which agents to add. Useful replies: write down the work, then ask where you are losing money. Do not start with a catalog of agents.
- Wiring 40 connectors into one AI session makes it guess. Alpic’s public benchmark: past about 20 tools, the model picks the right one less than half the time. One job with more parameters beats four thin “CRM endpoints.”
- Lab access is a contract, not a feature. OpenAI will cut Cursor’s GPT access on November 12 after the SpaceX close. Anthropic is adding Claude compute to the same IDE. Do not sell “put an agent in Cursor and we are done.” Sell operator practice that still works if the IDE or the lab changes.
- A ChatGPT footnote is not a customer. ChatGPT will cite a URL and borrow none of its facts. Reddit’s share of ChatGPT Search citations dropped from 3.83% to 0.52% in mid-August without those sites changing. One canonical page for ChatGPT; a wider set for Perplexity; independent mentions still matter. Do not seed forums.
- “20x Max” is a five-hour burst, not four times the workweek. Sep 14 also cuts Claude Code weekly headroom about 17% versus the August promo. If the client cannot see *which* job burned the week, the cut will feel like a product failure.

Last week’s aspirin is still unshipped: tools installed, process unchanged. Cover date is still July 2026.

## Playbook update plan (AI Operator’s Playbook)

Part 3B (harness + closed loop + dollar leak) is still the right chapter. Last week’s P0 — **Installed is not implemented** plus receipt/allowlist bullets — has a paste-ready draft and is still open. Do that first. This week adds the send gate and the instruction-file warning. Do not add a new PDF.

### 1. Cover / About date stamp (carry from 08-25)

- **Section:** Cover line + About “Last updated”
- **Change:** July 2026 → August 2026 if this ships today. If it slips to September, stamp September. Keep “operator practices, not tool rankings.”
- **Why:** Trust signal. Last ship was 2026-07-27. Already queued under `playbook-installed-not-implemented`.
- **Priority:** P0 this week (do not re-queue)
- **Draft snippet:** `Updated August 2026 · Operator practices, not tool rankings`

### 2. Installed is not implemented (carry from 08-25)

- **Section:** After “Start With One Dollar Leak,” before “After Go-Live”
- **Change:** Ship the 08-25 draft. Do not rewrite it this week.
- **Why:** Still the buyer complaint. Radar 08-31 (studio “which agents should I add”) is the same gap.
- **Priority:** P0 this week (do not re-queue)
- **Draft snippet:** Already at `docs/loop/drafts/2026-08-25-playbook-section-installed-not-implemented.md`

### 3. The model is a clerk, not an associate (new heading in Part 3B)

- **Section:** After last week’s “Installed Is Not Implemented” (or after “Start With One Dollar Leak” if that has not shipped yet), before “After Go-Live”
- **Change:** Add a short section plus a three-column send list. Do not add a second guide.
- **Why:** X brief 08-30 (@mak3333 clerk vs associate; @d_patel7688 80% would rather pull data inside the chat unless the message is proactive). X brief 08-31 (@PhDofScaLpiNg: 40 rules passed, operator still killed auto-post). Radar 08-31: yoga/pilates studio, named revenue, named headcount; useful replies were process inventory and “where am I losing money.”
- **Priority:** P0 this week
- **Draft snippet:** ChatGPT will pull last week’s inquiries and draft the follow-up. That is useful. Hitting send on a legal, medical, or money email is a different job. Write three lists before you connect inbox or SMS: it may do this unattended (capture the missed call, log the lead); it drafts and a named person sends (outbound email, public post, invoice); it never does this (cards, refunds, signing anything). If you cannot name the person who can refuse, you do not have an operator setup. You have autocomplete with your letterhead.

### 4. Instruction files are software (extend Part 3 security)

- **Section:** After “Security Isn't Optional: The Three Fake Forms” (or a short callout in Part 3B operator-setup)
- **Change:** Four rules in plain English. No Claude Code version numbers. No malware-vendor names as a product.
- **Why:** X brief 08-30 (@Numalunah, ~1.4M views by Mon): wipe + restore, poisoned `SKILL.md` that looked like the user’s own style guide. X brief 08-31: MCP skills threat model (host-side exec, nested consent). B2BNN recap 08-29. Hunt found developer checklists; SMB owners still need four sentences, not a 15-point Snyk audit.
- **Priority:** P0 this week
- **Draft snippet:** If your AI loads a file of instructions every time it starts, that file is code. A backup is not trusted just because it is yours. Before you restore or install: read the whole file; do not paste a download command from a chat until you have opened the company’s real site yourself; the AI does not hold a company card; it may only talk to the sites and inboxes you listed. If a vendor says “paste this and you’re done,” you are installing software you have not read.

### 5. Fewer tools, not more connectors (P1)

- **Section:** One paragraph under “The Model Is the Engine. The Harness Is the Car.” or operator-setup
- **Change:** Expose jobs (one tool, more parameters), not a pile of CRM endpoints. Human still clicks send.
- **Why:** X brief 08-31 (Alpic: past ~20 tools, correct pick <50%). Do not name MCP in the owner-facing heading. Define it once: “connectors that let the AI call your software.”
- **Priority:** P1 later
- **Draft snippet:** Connecting every app you own does not make the AI smarter. Past a couple dozen buttons it starts guessing which one to press. Give it one job — “log this missed call in the CRM and draft a text” — with the fields it needs. Leave send to a person.

### 6. A permission slip you can revoke while it is still running (fold into 08-25 receipt bullets)

- **Section:** Extend `playbook-done-means-receipt` (already open). Do not add a new heading unless Part 3B is still short after the P0s.
- **Why:** Radar 08-26 (Agent Relay × Ratify public kill-switch). 08-25 already queued: allowed sites, expected record, failed tries do not commit. This week’s add: named folder, expiry, revoke while the job is still running, receipt the other party can check without calling you.
- **Priority:** P0 this week (same open item; do not re-queue)
- **Draft snippet:** A pasted API key is not permission. Name the folder it may write to, when that permission ends, and who can kill it while it is still running. If you cannot revoke it until Monday, you did not give permission. You handed over the keys.

### 7. AEO one-liners (P1, still do not write a second AEO chapter)

- **Section:** Template 6 “AI search attribution” block
- **Change:** Two lines max this week: a citation can name you and use none of your facts; Reddit is no longer a ChatGPT strategy (Promptwatch: 3.83% → 0.52% of ChatGPT Search citations, Aug 8–17). Keep skip-listicles. Do not sell a dashboard.
- **Why:** X 08-30 (ornamental citation; ChatGPT few canonical pages / Perplexity almost never repeats). X 08-31 (engines disagree; ChatGPT wants third-party mentions, Claude wants structured data on your site). Radar 08-30 (glue-on-pizza as the accident version of a gamed comment). Queue already has `aeo-original-data`.
- **Priority:** P1 later
- **Draft snippet:** If ChatGPT footnotes you and copies nothing you wrote, that is not a lead. Write the page only you could write. Do not pay someone to seed Reddit.

## Services / homepage positioning

Live prices (do not invent; do not use the March 2026 module numbers):

| Offer | Live string |
|-------|-------------|
| Custom AI Agents | $3.5K–8K per agent sprint · no monthly required |
| Workflow Automation | $5K–15K project · 2–3 connected automations |
| Fit Audit + Roadmap | Free 15-min fit · $1K–2.5K full roadmap (optional) |

**Keep:** project-based; wired into tools they already use; runbook; error handling to a human; optional care after go-live; Westchester + NYC; OODA; free 15-minute fit. Valentine Family Electric and Byram Mason as named work (do not paraphrase those blocks).

**Change (copy, not price) — same open item as 08-25, plus this week’s talking points:**

- Homepage H1 is still “Custom AI agents, built for how you already work.” Vitamin. Lead with: they use ChatGPT and missed calls / overnight leads / follow-ups still sit. Then the build.
- Homepage stats still show **40% avg. cost reduction**, **8x productivity**, and **24/7 agents that keep working**. The 24/7 line is now directly contradicted by this week’s clerk/send signal. Drop or rewrite the vanity pair until you have a dated original number (`aeo-original-data` is still open).
- Services hero and agent card still lead with “custom AI agents.” Same aspirin rewrite.
- Fit-audit first questions this week: where are you losing money (no-shows, unread inquiries, unpaid packages); name one process that should run differently; who is allowed to hit send. Not which model they like. Not “which agents should we add.”
- Discovery talking point, not a SKU: Max “20x” is a five-hour burst. If they already pay for a coding-agent plan, the job is a checkable process and a usage receipt, not more connectors.
- Error-handling include already says exceptions go to a human. Make that “a named human on send, refund, and anything that leaves the building.”

**Avoid:**

- 24/7 receptionist that emails clients; “autonomous while you sleep”
- Reselling Managed Agents, an MCP mesh, “50 agents,” HighLevel retainers, Cursor-as-the-product
- Promising ChatGPT citations or staffing an AEO title
- Invented prices or bringing back the stale module retainers ($199–$499/mo)
- Competing on harness brand names (Claude Code vs Codex vs Grok) or picking a side in the Cursor/OpenAI feud
- Ratify / Agent Relay / Benzi / Governor as things we install
- PAP UAD 3.6 scare copy on nyclaw.io (that is PAP, unless a Westchester lender asks for one named review workflow)

**Aspirin test (services):** time (nights on follow-up), money (leads that never get a same-night reply), peace of mind (a named person can stop a bad send). Not “we use agents.” Not “we’ll get you cited.”

## New content (blog/SEO) — only if justified

Prefer **zero** new posts until last week’s playbook P0 and this week’s clerk section ship.

The 08-30 brief had a real buyer question: **“What is the AI allowed to send?”** That is a playbook section this week, not a second URL. Do not also write a Cursor-feud thinkpiece or “why ChatGPT stopped citing us” until `aeo-original-data` has an original number to put on a page.

Already queued `blog-after-setup` (2026-07-27) still waits on playbook P0. When it ships, keep last week’s title: **“We use AI every day and nothing runs differently.”** Add one outline bullet from this week: send list (unattended / draft+human / never).

## Do not ship

- A second free PDF or SoGood/DataVessel “governance playbook” clone
- 24/7 intake bot that emails clients; HighLevel $297/mo beginner funnel
- Model-of-the-week, Claude Code changelog recaps, Cursor vs OpenAI recap
- MCP mesh as a finished engagement; “connect 40 tools”
- AEO tracker, Reddit-seeding, “cited in ChatGPT” as a deliverable
- Governor / skillsovermcp.com / Ratify / Benzi / Munder / Seed as NYClaw products
- Yoga-studio agent catalog; $70k-MRR indie essay
- UAD 3.6 rush-to-close copy on this site
- Anything that treats Tibo’s Codex usage reset as capacity you can sell

## Recommended ship order this week

1. Playbook: date stamp + **Installed is not implemented** + receipt/allowlist bullets (08-25 P0, still open). Paste from `docs/loop/drafts/2026-08-25-playbook-section-installed-not-implemented.md`. Fold in this week’s permission-slip one-liner (named folder, expiry, revoke while running).
2. Playbook: **The model is a clerk, not an associate** + send list. Paste from `docs/loop/drafts/2026-08-31-playbook-section-clerk-not-associate.md`.
3. Playbook: four-line **instruction files are software** callout in Part 3 security.
4. Services + homepage: one aspirin line (process unchanged; named human on send). Drop or rewrite 24/7 / 8x / 40%. No price change. Same open item as 08-25.
5. Then, and only then, the already-queued `blog-after-setup`.
6. P1 later: fewer-tools paragraph; Template 6 AEO two-liner. Do not buy a citation dashboard.
7. Sense still open: `sense-guide-downloads`; AEO five-query log (named vs cited vs ignored). Sep 14 Claude weekly cut is a Sense event for Giani’s own compute, not a nyclaw.io page.

## Improve queue

New Open items appended in `docs/loop/improve-queue.md` (2026-08-31). Did not re-add `playbook-installed-not-implemented`, `playbook-done-means-receipt`, `services-process-change-copy`, `blog-after-setup`, `aeo-original-data`, `pdf-mirror`, or `sense-guide-downloads`.
