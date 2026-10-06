---
classification: PRIVATE
---
# 2026-10-06 — Law-firm workflow acquisition page

Before: the law-firm intake article ended with a generic project inquiry and a recovered-revenue promise. There was no focused owner/operations landing page explaining a bounded workflow assessment.

After: `/law-firm-workflows` covers intake handoff, missing-document follow-up and invoice preparation using existing NYClaw components. It offers a free fit call through the shared Calendly setting and names the deliverables of a separately scoped assessment. One fictional missing-document output demonstrates a finding, draft reminder, staff decision and acceptance check. No fee is activated; the proposed $495 assessment in the revenue audit is not presented as a validated offer.

The intake article now links contextually to the page. The sitemap adds the route and dates the article's CTA change to 2026-10-06. `llms.txt` describes the actual offer and ownership relationship. Calendly and LegalAIMCP planner/document-check links use `utm_source=nyclaw&utm_medium=referral&utm_campaign=law_firm_workflows`.

The existing content calendar prioritizes one missing-document follow-up article, with primary Clio documentation, explicit limits on what those features establish, a non-duplicated proposed route, and the new assessment/planner links. This refines an existing publishing queue rather than adding a schedule. This note records the new acquisition route and offer boundary in one place; no separate planning document is added.

Validation: TypeScript passed. The production Webpack build passed (48 generated pages, including the new route). Default Turbopack rejected the temporary worktree dependency symlink; `npm run build -- --webpack` succeeded with no source configuration change. Built HTML checks confirmed the fictional-example label, operator relationship, article CTA, and Calendly/document-check/planner UTM values. Existing middleware/Edge and missing-local-rate-limit-credential warnings remain; no environment file was copied. Parent task owns review, browser verification, publication and automation changes. No outreach, payment activation, new API, dependency or schedule is part of this slice.


## Existing weekly job: bounded company-fit research

The existing Monday refresh now produces a <=1,200-word plan and a private packet of zero to three company-level candidates, with primary-site evidence and explicitly unsent AI-prepared drafts. The calendar remains the publishing backlog; new speculative blog proposals wait until queued work ships. The root task's `docs/seo-audit-prompt.md` aligns the existing cloud audit with the same narrow buyer-content scope.

`acquisition-check.py` rejects stale/future evidence, wrong run IDs, duplicate domains, unsafe or non-company sources, excessive quotes, contact fields, authorized/sent outreach, and missing disclosure/offer boundaries. An honest empty result needs inspected sources and a reason. Private packet JSON and job logs are ignored by Git. The existing runner explicitly selects `grok-4.6`, caps work at 35 turns, records incomplete/skipped/failed states, preserves the scope guard, and marks health successful only after the new packet and short plan validate. No additional scheduler is created.

Verification: six stdlib tests pass, including a fake model returning a nonzero exit, scope-guard execution afterward, and prior health invalidation; shell syntax passes. No live Grok research or messages were run by this implementation slice. The model alias will be confirmed by the parent task's isolated pilot. Automated checks validate structure and limits; a reviewer must still check quote accuracy and that narrative text contains no personal information or invented intent before authorizing any future outreach.


### Review hardening

The existing runner now bounds Grok to 1,800 seconds in a separate process group, terminates the group on timeout, and still runs the scope guard before recording failure. Source verification has a separate 120-second process cap. Scope violations return nonzero rather than reporting a successful run after restoration. Preexisting dirty files remain preserved; the existing guard still cannot distinguish concurrent edits to files that were clean at the initial snapshot.

The source verifier permits at most eight HTTPS primary URLs, validates every resolved address as global, pins the checked address for TLS, rejects redirects, and limits each page to 1 MiB with a 10-second socket timeout. Visible text excludes scripts/styles; normalized quotations must occur on the cited page. Failed fetches, bot protection and JavaScript-only pages cannot establish proof. Health carries source verification plus the packet SHA-256, and later health checks verify the digest without fetching again. Empty packets still require readable checked sources.

New plans and drafts are ignored along with private packets; plans may contain aggregate observations only, never company names, quotes or outreach drafts. Four historical weekly plan files are already tracked and were not deleted. The parent task should review their historical exposure separately. Local tests cover quote fabrication, private resolution, unavailable sources, timeouts, digest changes and actual scope-guard behavior. No live research or model run was initiated by this review-fix slice.

## Live pilot corrections

The real research probe repeatedly loaded oversized archives/raw pages and compacted before producing a packet. Research now starts with at most2,000 words of relevant inputs, one batched discovery, and bounded600-word safe source excerpts. Existing fetch/TLS/source-proof gates are reused; no additional scheduler or API. The excerpt fixture covers relevance, original case, contact redaction and the size limit;14 tests pass. Root's public-source probe verifies two company drafts; a third source returned403 and was omitted, rather than bypassed or called verified.

The live Calendly destination displays “Free AI Audit — 30 min” with available October dates. Website labels had advertised15 minutes. Duration references for that offer are corrected to30 in current CTAs, metadata and discovery text, including the two raw duration stats. Unrelated time windows, numerical claims and pricing remain unchanged. This is a local conversion-consistency bugfix observed during release verification; no separate market Hunt is needed. Production build/route validation remains the release gate.

### Pilot feedback: remove conflicting length quota

The first successful weekly packet repeated the calendar's old 1500–2500-word checklist despite the producer prompt requiring useful evidence over length. Replace that checklist item with the named buyer question and primary-source support. This aligns the two inputs consumed by the existing scheduled agents. Documentation-only verification: contradictory target absent; source and scope requirements retained.
