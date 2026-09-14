# NYClaw weekly refresh — 2026-09-13

Self-contained plan for Giani. NYClaw.io sells AI operator work for small businesses (Westchester + NYC metro, remote OK) and gives away **The AI Operator’s Playbook** as the free lead magnet.

**Inputs used**

- X briefs: `2026-09-06` through `2026-09-13` (8 files). Last 7 days from today is 09-07 through 09-13; 09-06 is included because it is the first file after the 09-05 gap.
- last30days radar markdown: last file is `2026-09-01`. No `radar/*-last30days-radar.md` exists for this week. Daily X briefs Part 2 still carry the last30days extract (Reddit/HN/GitHub/web). Used those, plus the 09-01 radar for the gap note.
- Playbook: `public/ai-operators-playbook.html` (cover still **Updated July 2026**; Part 3B still missing the 08-25 and 08-31 P0s)
- Services: `app/services/page.tsx` (live prices unchanged)
- Homepage: `app/page.tsx` (H1 still vitamin; 40% / 8x / 24/7 vanity stats are gone, replaced by Scoped / Handoff / Sprint / Your tools)
- Improve queue: `docs/loop/improve-queue.md` (08-25 and 08-31 playbook P0s still open)
- Optional module: `docs/marketing/module-ai-concierge.md` (March 2026; **pricing is still stale** vs the live site)

## Hunt

- Topic: whether to ship a second free “AEO / GEO for local owners” PDF, a citation-tracking SKU, or an Agents API package
- Queries: “SMB AEO checklist 2026”, “GEO vs SEO local business owner”, “ask ChatGPT who to hire HVAC”, X `AEO small business checklist` since 09-06
- Fresh signal:
  - FindSkill (May 17): seven free AEO tactics, answer-first then FAQ schema then a monthly manual test. Vendor blog.
  - FirstAnswer (Mar 30): 100-item SMB AEO audit. Agency lead magnet.
  - Growth Local (Apr 28): SEO vs GEO table plus an “AI mirror test” of five queries in ChatGPT and Perplexity. Closest public cousin of this week’s self-test.
  - AirOps (Sep 10): ChatGPT citation tracking, four methods, then the product. 95% of citations from third-party sites is their claim, used to sell a dashboard.
  - HVAC-specific ChatGPT recs (Pleiades, Glorifli, Scope, OpenLens): Foursquare / GBP / schema packages. The competitor shape to refuse, not copy.
  - OpenAI Agents API public beta (10 Sep) and Anthropic Managed Agents: labs selling the loop as a hosted product. Not an SMB SKU.
- Best hits:
  - Public AEO checklists exist in volume. They are agency PDFs and tracker-SaaS funnels.
  - No public template owns NYClaw’s Westchester voice plus OODA + closed loop + human on send + “a citation is not a booked job.”
- Decision: **adapt** the existing playbook. Do not spin a second free guide, a GEO agency offer, or an Agents API package.
- What we take: unbranded self-test, question then short answer then detail, two-stage funnel (SEO gets you in the pool, AEO is what gets cited), proof is a booked job not a visibility score. Keep it inside Part 4 + Template 6.

## What the market said this week (plain English)

- Ranking on Google is not the same as being named when someone asks ChatGPT who to hire. Ahrefs numbers circulating this week: AI Overviews overlap with Google’s top 10 fell from about 76% to 38%; ChatGPT overlap with that top 10 is roughly 8–12%; only about 11% of cited pages show up in more than one engine. One dashboard score is the wrong instrument.
- A citation can name you and still send nobody. A branded prompt that lists you 21 times is autocomplete. An unbranded category question that never names you is the real test. The useful columns are: retrieved, named, clicked, booked. Visibility is not revenue.
- The free test takes ten minutes. Open Perplexity, ChatGPT, Gemini, and Google AI Overviews. Ask ten category questions without your brand in the prompt. Log cited you / competitor / nobody / wrong. One founder on X this week went from 0 of 5 named to 4 of 5 in two months by rewriting pages as question, then a 40–60 word answer, then detail. Treat 40% / 3x conversion as **his** numbers, not ours.
- GEO agencies all sound the same this week. The buyer question on r/GoogleAnalytics is: what did they change on your site last month, and did ChatGPT name you after that? Freshness of cited pages matters more than another acronym. Original LinkedIn posts are a citation surface; reshares almost never are.
- Small businesses still ask for a chatbot. The work that pays is boring: qualify the inbound, follow up once, send the reminder, write the CRM row, route the email. Human still hits send on the first three. Salesforce stuffing 37 sales skills into Claude with no send-gate is the slop to not copy.
- Labs now sell the loop. OpenAI’s Agents API (public beta 10 Sep) hosts sessions, compaction, subagents, sandbox. Anthropic’s Managed Agents is the same category. Rui Gonçalves’s split: they own the loop; you still own scope, verify-on-stop, blast radius, and budget. Nik Kale: a harness is what a wrong answer is allowed to do.
- last30days’ “AI for small business automation operators” topic was empty on 09-13 and noisy most of the week (job boards, connect farms, Dan Martell). Do not invent SMB demand from that slot. The SMB-relevant lines came from X and from a handful of Reddit threads, not from a shop-owner census.

Last week’s aspirin is still unshipped: tools installed, process unchanged; clerk not associate; cover date still July 2026. That is the operator failure this week, ahead of any new AEO heading.

## Playbook update plan (AI Operator’s Playbook)

Part 3B (harness + closed loop + dollar leak) is still the right chapter for the unshipped 08-25 and 08-31 P0s. Do those first. This week adds one short AEO section in Part 4, and two lines on Template 6. Do not add a new PDF.

### 1. Cover / About date stamp (carry from 08-25)

- **Section:** Cover line + About “Last updated”
- **Change:** July 2026 → September 2026. Keep “operator practices, not tool rankings.”
- **Why:** Trust signal. Last ship was 2026-07-27. Already queued under `playbook-installed-not-implemented`.
- **Priority:** P0 this week (do not re-queue)
- **Draft snippet:** `Updated September 2026 · Operator practices, not tool rankings`

### 2. Installed is not implemented (carry from 08-25)

- **Section:** After “Start With One Dollar Leak,” before “After Go-Live”
- **Change:** Ship the 08-25 draft. Do not rewrite it this week. Bump the date line in that draft to September.
- **Why:** Still the buyer complaint. 09-10 r/AiAutomations “useful automations are boring” is the same gap: they want a chatbot, they need one named job.
- **Priority:** P0 this week (do not re-queue)
- **Draft snippet:** Already at `docs/loop/drafts/2026-08-25-playbook-section-installed-not-implemented.md`

### 3. The model is a clerk, not an associate (carry from 08-31)

- **Section:** After “Installed Is Not Implemented,” before “After Go-Live”
- **Change:** Ship the 08-31 draft. Fold in this week’s one-liner: a list of 37 skills with no cannot-send rule is a faster way to look sloppy.
- **Why:** 09-13 Salesforce 37 skills, 09-13 Nik Kale permission boundary, 09-08 Michael Simpson warehouse confirmation. Same send list. Do not write a second heading.
- **Priority:** P0 this week (do not re-queue)
- **Draft snippet:** Already at `docs/loop/drafts/2026-08-31-playbook-section-clerk-not-associate.md`

### 4. Instruction files are software + fewer tools (carry from 08-31)

- **Section:** Part 3 security callout, plus one paragraph under the harness heading
- **Change:** Ship the four 08-31 rules. Add from 09-12 if space: keys and agent integrations are production credentials; scope OAuth; a skill pack that scores 0.00 with vs without is a README wearing a costume. Keep `playbook-fewer-tools` as P1.
- **Why:** 08-30 SKILL.md incident still unshipped. 09-12 Anthropic threat report and `claude plugin eval` are the same hygiene, not a new chapter.
- **Priority:** P0 for the four-line callout already queued; P1 for fewer-tools (do not re-queue)
- **Draft snippet:** If your AI loads a file of instructions every time it starts, that file is code. Read it before restore. Do not paste an install command a chat handed you.

### 5. When a buyer asks ChatGPT who to hire (new heading in Part 4)

- **Section:** After “How to Position AI Automation to Skeptical Clients,” before Part 5. Also extend Template 6’s “AI search attribution” block with the self-test.
- **Change:** One short owner-facing section. Self-test. Two-stage funnel in one sentence. Question then short answer then detail. Citation is not a booked job. Unbranded prompts. Do not add Princeton 115%, 40%/3x, or a GEO product.
- **Why:** Recurring signal 09-06 through 09-13. Buyer question is already in the r/aeo AMA and r/GoogleAnalytics thread. Hunt found generic checklists; none in this voice.
- **Priority:** P0 this week (new queue item)
- **Draft snippet:** Open ChatGPT or Perplexity. Type the question a customer would type, without your name. “Who should I hire for [your trade] in Westchester.” If you are not in the answer, you do not exist for that buyer that day. Ranking on Google is a different score. Write the page only you could write: the question, a short direct answer, then the detail. When someone says they found you, write down whether it was ChatGPT, Google, or a person. A footnote that copies none of your facts is not a lead.

### 6. Second-turn FAQ (P1)

- **Section:** Same AEO section, two sentences, or FAQ blocks on money pages later
- **Change:** After the category question, engines ask a follow-up (“ok, but for a 12-person shop in Westchester?”). One objection pair that survives that turn. Do not write a second AEO chapter.
- **Why:** 09-13 last30days AEO topic: query-shaped vs conversational. Q→answer pages win the first cite; they do not win the second turn.
- **Priority:** P1 later (fold into `playbook-aeo-local-owners`, do not split)
- **Draft snippet:** After the short answer, write the objection you actually hear. “We already have ChatGPT.” “We’re a 12-person shop.” If the page cannot answer that without a sales call, the engine will cite someone who can.

### 7. AEO one-liners on Template 6 (P1, still do not write a tracker chapter)

- **Section:** Template 6 “AI search attribution”
- **Change:** Keep the CRM source field. Add: run the 10×4 self-test once a month; last-touch date on any page you hope gets cited; original LinkedIn beats a blog reshare. Do not sell `llms.txt` as the work. robots.ts already allows all crawlers via `userAgent: '*'`; `llms.txt` is absent and optional.
- **Why:** 09-09 overlap numbers, 09-10 LinkedIn study, 09-11 freshness, 09-13 self-test. Queue already has `aeo-original-data`.
- **Priority:** P1 later
- **Draft snippet:** Once a month, ask ten unbranded questions in four engines. Log named / competitor / nobody. Touch the pages that got you cited. A reshare of your blog is almost invisible there.

## Services / homepage positioning

Live prices (do not invent; do not use the March 2026 module numbers):

| Offer | Live string |
|-------|-------------|
| Custom AI Agents | $3.5K–8K per agent sprint · no monthly required |
| Workflow Automation | $5K–15K project · 2–3 connected automations |
| Fit Audit + Roadmap | Free 15-min fit · $1K–2.5K full roadmap (optional) |

**Keep:** project-based; wired into tools they already use; runbook; exceptions to a human; optional care after go-live; Westchester + NYC; OODA; free 15-minute fit. Valentine Family Electric and Byram Mason as named work (do not paraphrase those blocks). Homepage stats rewrite already shipped: Scoped / Handoff / Sprint / Your tools. Do not put 40% / 8x / 24/7 back.

**Change (copy, not price) — same open item as 08-25, plus this week’s talking points:**

- Homepage H1 is still “Custom AI agents, built for how you already work.” Vitamin. Lead with: they use ChatGPT and missed calls / overnight leads / follow-ups still sit. Then the build.
- Services hero still leads with “AI agency services for small businesses.” Same aspirin rewrite. Agent card still “Agents that do real work in your stack.” Name the five boring jobs from 09-10: qualify the inbound, follow up once, send the reminder, write the CRM row, route the email. Human on send for the first three.
- Fit-audit first questions this week: where are you losing money; name one process that should run differently; who is allowed to hit send; when did you last ask ChatGPT who to hire for your trade. Not which model they like. Not “which agents should we add.” Not “can you get us cited.”
- Error-handling include already says exceptions go to a human. Make that “a named human on send, refund, and anything that leaves the building.”
- Against this week’s vendor theater, in discovery only: we are not 37 skills, not a managed Agents API, not a GEO agency. We pick one hated job, put permissions outside the model, and return the outcome in their system.

**Avoid:**

- 24/7 receptionist that emails clients; “autonomous while you sleep”
- Reselling Agents API, Managed Agents, Muse, ECC’s 286 skills, HighLevel retainers, Cursor-as-the-product
- Promising ChatGPT citations, staffing an AEO title, selling Otterly / Peec / AirOps / a visibility score
- Invented prices or bringing back the stale module retainers ($199–$499/mo)
- Competing on harness brand names or picking a side in lab-hosted loops
- PAP UAD 3.6 scare copy on nyclaw.io (that is PAP, unless a Westchester lender asks for one named review workflow)
- Printing @abhishvekcn’s 40% / 3x, Princeton 115%, or Ahrefs overlap numbers as NYClaw results

**Aspirin test (services):** time (nights on follow-up), money (leads that never get a same-night reply), peace of mind (a named person can stop a bad send). Not “we use agents.” Not “we’ll get you cited.”

## New content (blog/SEO) — only if justified

Prefer **zero** new posts until the unshipped playbook P0s and this week’s AEO section ship.

The justified buyer question is already a playbook section: **“Open Perplexity. Ask who to hire for my trade. Am I named?”** Do not also write a Cursor-feud thinkpiece, an Agents API explainer, or “why ChatGPT stopped citing us” until `aeo-original-data` has an original number to put on a page.

Already queued `blog-after-setup` (2026-07-27) still waits on playbook P0. When it ships, keep the 08-25 title: **“We use AI every day and nothing runs differently.”** Add one outline bullet from this week: the unbranded ChatGPT question.

If a second URL is ever justified after the playbook section is live, one title only:

- **Title:** Open ChatGPT. Ask who to hire in Westchester. Are you named?
- **Buyer question:** I rank on Google. Why doesn’t ChatGPT recommend me?
- **Outline:** unbranded vs branded prompt; 10×4 log; question then short answer then detail; citation vs booked job; what we will not sell (tracker, Reddit seeding, 37-skill pack).

## Do not ship

- A second free PDF or FindSkill / FirstAnswer / Growth Local AEO clone
- GEO agency retainers, citation dashboards, `llms.txt` as the product
- 24/7 intake bot that emails clients; HighLevel $297/mo beginner funnel
- Model-of-the-week, Claude Code changelog recaps, Agents API as NYClaw’s runtime
- ECC 286 skills, Salesforce 37 skills, Muse, “we host Codex”
- AEO tracker, Reddit-seeding, “cited in ChatGPT” as a deliverable
- Princeton 115% as a 2026 KPI; 40% / 3x as a NYClaw guarantee
- HF Hub “your agent is being fingerprinted” alarmism as a playbook chapter (one hygiene line at most, after verify)
- Yoga-studio agent catalog; $1M-zero-employees; Dan Martell
- UAD 3.6 rush-to-close copy on this site
- Anything that treats a managed lab loop as a replacement for Sense / Improve / a named human on send

## Recommended ship order this week

1. Playbook: date stamp to **September 2026** + **Installed is not implemented** + receipt/allowlist bullets (08-25 P0, still open). Paste from `docs/loop/drafts/2026-08-25-playbook-section-installed-not-implemented.md`.
2. Playbook: **The model is a clerk, not an associate** + send list. Paste from `docs/loop/drafts/2026-08-31-playbook-section-clerk-not-associate.md`. Add the 37-skills one-liner.
3. Playbook: four-line **instruction files are software** callout in Part 3 security (08-31, still open).
4. Playbook: **When a buyer asks ChatGPT who to hire.** Paste from `docs/loop/drafts/2026-09-13-playbook-section-aeo-local-owners.md`. Extend Template 6 with the self-test line.
5. Services + homepage: one aspirin line (process unchanged; named human on send; five boring jobs). H1 rewrite. No price change. Same open item as 08-25. Vanity stats are already gone; do not reopen them.
6. Then, and only then, the already-queued `blog-after-setup`.
7. P1 later: fewer-tools paragraph; second-turn FAQ; Template 6 LinkedIn one-liner; `aeo-original-data` still wants a dated original number. Do not buy a citation dashboard.
8. Sense still open: `sense-guide-downloads`. New ops note: last30days radar markdown stopped at 2026-09-01; weekly refresh had to read Part 2 of the X briefs instead. Restore that file or document the new path. Not an offerings SKU.

## Improve queue

New Open items appended in `docs/loop/improve-queue.md` (2026-09-13). Did not re-add `playbook-installed-not-implemented`, `playbook-done-means-receipt`, `services-process-change-copy`, `playbook-clerk-not-associate`, `playbook-skills-are-code`, `playbook-fewer-tools`, `blog-after-setup`, `aeo-original-data`, `pdf-mirror`, or `sense-guide-downloads`.
