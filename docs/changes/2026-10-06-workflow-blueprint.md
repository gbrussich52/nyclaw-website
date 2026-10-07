---
classification: PUBLIC
---

# Workflow Blueprint operator handoff — 2026-10-06

## What changed

Replaced the generic law-firm assessment landing with the named Workflow Blueprint offer: a responsive review-sheet visual, three interactive fictional document states, a native-software-first assessment scope, and a short operational request form. The existing free fit call, referral attribution, canonical URL and LegalAIMCP relationship remain explicit. No savings, customer proof, fee, guarantee or certification is invented.

Added atomic Redis creation with a stable UUID receipt and payload digest. Identical retries recover the receipt after a lost write reply; changed replays conflict. Records expire after 30 days; the index caps at 1,000 without silently evicting live requests. Unconfigured review or failed storage returns an actionable error. Admin responses are authenticated, uncached, strictly projected, and updates require same-origin requests plus allowed state transitions.

Added a password-gated operator queue at `/admin/workflow-assessments` for reviewing workflow assessment requests. The operator can inspect the request reference, submitting contact, firm, workflow, received time, current software, stated bottleneck, workload range, and handling status; allowed status updates are persisted through the authenticated review API. Queue and storage errors remain visible instead of appearing as an empty list. Locking clears credentials and request details held by the page.

Added the operations runbook and updated the privacy page to describe the assessment request fields, 30-day record expiry for this request type, service-provider hosting/storage, and email-control verification for access/deletion requests. Existing retention for other forms is unchanged.

## Before and why

Before, the assessment request had no operator screen for reviewing the durable handoff. The new queue replaces the generic untracked handoff with a small, authenticated workflow that uses the existing Redis and admin-password infrastructure. It does not send email or imply payment, delivery, client acceptance, an active price, or a response-time commitment. Preview remains unavailable until its own admin password is configured; production credentials are not copied or exposed.

## Lesson

An authenticated request queue can make intake reviewable, but its status is only an operational note. A successful request receipt confirms durable storage, and a scope status does not establish payment or acceptance; those events need separate evidence.

## Review fix

Cross-review found that two status saves could overlap and an older response could clear the shared busy marker, allowing lock to race with pending requests. Saves are now serialized globally. Lock advances a session generation, aborts every active request, clears the password and all visible queue state, and stale completions cannot repopulate the screen. Fetches have a 12-second client timeout. The privacy page date and form count were corrected with the new assessment form.

## Verification

Source unit tests:44 passed; TypeScript and production Webpack build passed. Independent backend and UI cross-review fixed a namespaced-read bug, stored-record validation, auth throttling, and a late-response lock race. A loopback gate executes the actual Redis Lua on official Redis8.2.10 with fictional contacts, an isolated Chrome profile and no Redis persistence; it verifies lost-reply retry, one durable request, protected queue, status/expiry, mobile layout and lock/outage behavior. The gate writes a report even when it fails. These checks do not establish a real customer request, payment, accepted delivery or hosted-provider integration.

No dependency, campaign, fee activation, installed runner or production configuration was added. This release advances request-path Integrate/Verify; buyer response and paid accepted delivery remain separate evidence.

The real browser gate additionally reproduced a legitimate status update rejected by the internal Next origin. The origin guard now validates the browser Origin against the actual request Host and Vercel-trusted HTTPS protocol; regression cases retain cross-origin/missing-origin rejection. Independent re-review found no confirmed bypass under the stated Vercel ingress boundary.

Final local production-mode UAT:17/17 browser assertions passed against actual Redis8.2.10 through a loopback REST bridge, including status update and held-response lock. Reports/screenshots remain private local artifacts; the replay gate contains fictional data only.
