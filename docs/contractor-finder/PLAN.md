# Contractor Evidence — implementation and launch contract

Goal: help a resident compare up to three relevant businesses using traceable job evidence, source types/dates and license gaps. Reuse NYClaw's site and official MCP SDK; no new directory platform, database, paid API, model call or scheduler. This document replaces separate speculative contractor plans; one record covers design, gates and actual delivery.

User authorized this build October 20. Existing-project apps are separate endpoints and brands. This is a small initial Westchester collection, with limited NYC apartment coverage. No claim of whole-market coverage. No commercial placement or lead resale.

## Architecture and files

- lib/contractors/schema.ts + catalog.ts: strict bounded public-record catalog, nine real businesses, minimal original paraphrases, no raw posts or reviewer identity. County electrical license numbers 2115,1668,217 and December31,2026 expiry manually observed October20 in the public register. License checks expire after30days, service sources after90days. Third-party publication dates stay unknown unless supplied.
- search.ts: strict trade/area/property/job filters, up to3 candidates, source freshness, independent lineage deduplication and clear no-match/safety states. Current initial records contain zero permissioned independent reviews. Business-selected testimonials never count as independent. An independent recommendation requires a current relevant license observation and permissioned independent evidence.
- server.ts + app/api/contractors/mcp/route.ts: official SDK Streamable HTTP, read-only tool/resource,8KiB streamed body bound, host/origin restrictions. No arbitrary URL retrieval, write action, account access, homeowner data or contact submission.
- widget-client.ts + build-widget.mjs: official MCP Apps bridge, text-only DOM insertion, checked HTTPS links, self-contained resource with exact script hash CSP; web preview data injection escapes script-closing text and rehashes the script.
- app/contractor-finder: finished mobile/desktop comparison, evidence-only filter, source links, meaningful empty state and local downloadable comparison/unsent request draft. No email/message is sent by that download.
- app/api/contractors/{search,widget,health}: fixed read-only bounded filters and source freshness health. Public site/app privacy is explicit. Existing site telemetry remains aggregate.
- chatgpt-contractor-plugin and scripts/contractors/package.py: deterministic three-file connector ZIP, five positive/three negative cases. Actual walkthrough and publishing identity remain submission gates. Never bundle site source, private reviews, cookies or credentials.

## Hunt and source boundary

Official OpenAI examples and MCP Apps SDK adapted; no protocol handroll. GitHub query contractor recommendation found an obsolete2014 ML project and unrelated marketplace. LocalProDev/mcp-server (MIT) offers public business tools but its commercial-electrical/general niche coverage and rating provenance do not establish residential Westchester recommendations; no unverified proxy added. ProFix's CC-BY4.0 data is Ohio-only, so cannot fill NY matches. These are potential later approved adapters, not installed dependencies.

Meta's official scraping guidance says automated collection requires prior permission. No Facebook scraping or authenticated group import is connected, even if a caller asserts permission. Community records require a recorded rights basis and moderation; user login/group membership alone is not the data license. No user-submitted public import endpoint. Support corrections/removal at hello@nyclaw.io.

## Acceptance and outcomes

- Strict-source/permission/duplicates/date and matching tests, real official MCP client and HTTP initialization/tool/resource tests, malicious origin/oversize/invalid requests, injection/CSP checks.
- All website tests, types and production build; runtime dependency audit. Fix compatible existing critical/high runtime advisories before publication, without a blanket major upgrade.
- Independent security/code review and actual desktop/mobile browser check. Visual evidence and real state changes, not only a successful build.
- Production URL proof is required before reporting shipped; ChatGPT approval/publication is distinct. No paid output/service upsells in this free app. Owner-required identity/terms actions happen only after a reviewable package exists.
- Health reports real collection freshness, current relevant checks and independent-review count. No usage/revenue claim from health. No new schedule. Commercial acquisition, future permissioned community supply and monetization remain open hypotheses; do not treat a functional comparison as proof of a business.
