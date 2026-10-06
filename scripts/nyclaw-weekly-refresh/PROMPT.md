---
classification: PRIVATE
---
# Weekly NYClaw evidence and company-fit research

Operate only inside this site's `docs/loop/`. Do not edit production code, commit, publish, send messages, submit forms, buy anything, or create schedules. Public-site read-only research GETs are allowed; no outreach requests or contact scraping.

Read the current content calendar, improve queue, last weekly plan and prior `acquisition-*.json` packets. Read the last seven days of existing AI briefs/radar only for relevant evidence. NYClaw offers a free fit call; follow-on assessment scope and fee require written agreement. NYClaw operates LegalAIMCP. The focal route is `/law-firm-workflows`; LegalAIMCP's planner and document example help qualify a workflow, not prove a deployed service.

Write exactly these bounded artifacts using the date and run ID supplied by the runner:

1. `docs/loop/weekly-refresh-YYYY-MM-DD.md`, no more than 1,200 words, with `Run ID: RUN_ID`. Do not include company names, quotations or outreach drafts in the plan; keep company research only in the private JSON packet. State aggregate evidence, the current buyer question, one recommended next measurable step, and any needed correction to existing material. Prioritize the already queued missing-document-follow-up article. Do not propose additional blog posts while prior queued articles remain unshipped. Separate evidence from hypotheses; skip speculative feature lists and new products. Append only genuinely new, deduplicated corrective items to the existing improve queue if necessary.
2. Private `docs/loop/acquisition-YYYY-MM-DD.json` with schema:
   - `schema_version`: 1, `generated_at`: current UTC ISO timestamp, `run_id`: supplied exact ID.
   - `outreach_authorized`: false, `sent_count`: 0.
   - `checked_sources`: nonempty list of at most 8 HTTPS primary company URLs actually inspected; URLs must not contain query parameters or fragments. Inspect no more than 8 sources total in this run.
   - `companies`: 0–3 objects. Each has `name`, `domain` (bare lowercase company domain, no www), `location`, `source_url`, `observed_at` (current UTC ISO timestamp), `quoted_evidence` (verbatim, maximum 25 words per company/source), `workflow_fit`, `intent`: "workflow_fit", `status`: "draft", `draft`: {"subject": "...", "body": "..."}.
   - If no companies qualify, use an empty list and a specific `no_matches_reason`. Honest zero is valid; never invent companies or evidence to fill a quota.

Research company-owned websites only. A practice description can establish workflow relevance, never buying intent, pain, budget, recent hiring or willingness to pay. Avoid companies already in prior packets unless genuinely new cited evidence changes the fit; explain that evidence in workflow_fit. Collect no people's names, personal profiles, emails, phone numbers or client data. Do not infer location or operations from the domain alone. Quotes must be traceable to the source URL on that company's domain. No directories or scraped prospect lists as evidence.

Drafts are for operator review, not sending. Each body must include the literal disclosure "AI-prepared draft for NYClaw", a relevant company-level observation, the phrase "free fit call", and "scope and fee agreed in writing". Link:
`https://nyclaw.io/law-firm-workflows?utm_source=company_research&utm_medium=outreach_draft&utm_campaign=law_firm_workflows`
No claims of hours saved, existing customer results, legal certification or active monitoring. No individual recipients or contact fields.

Run the local validator with the exact packet/run ID and plan paths. Finish by reporting paths and real counts only. Packet files are private and ignored by Git; never move their contents into a public page or tracked report.
