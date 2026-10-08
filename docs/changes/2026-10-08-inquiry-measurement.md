---
classification: PUBLIC
---
# 2026-10-08 — Keep useful context with a saved inquiry

Previously form-source labels existed only in analytics events. The contact endpoint now validates and saves one of four labels: contact, resources, playbook or unknown. Existing payloads without a label remain valid. The protected export appends a Source column; original columns retain their order. Labels are caller supplied and do not establish qualification or authentication.

Storage checks now require a confirmed positive integer write result. An unavailable or malformed lead read returns a non-cacheable503 after authentication, rather than a successful empty list. A genuinely empty store still returns an empty list.

Add a local, read-only request counter. It emits only totals and bounded source labels; missing, malformed or incomplete data fails instead of turning into zero. It measures stored submissions, not visitors, guide reads, booked calls or sales. No new customer fields, cookies, referrers, campaign tracking, dependencies, public endpoints or scheduled jobs.

Validation:73 source tests, six counter failure/privacy tests, production build/TypeScript, editorial guard, mocked browser payload and receipt checks, and independent review. Production testing does not submit a lead or send an email.
