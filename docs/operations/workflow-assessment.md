---
classification: PUBLIC
---

# Workflow assessment request and operator review

This page documents the request handoff and the operator queue. It describes system behavior, not an activated price, response-time promise, delivery commitment, legal service, or security certification.

## Data and retention

The public form accepts a name, email, firm, one selected workflow, names of current software, one bottleneck category, and an approximate workload range. It requires consent to be contacted about the request. It does not accept attachments or client narratives. The service stores the submitted request fields with a public reference, handling status, and created/updated timestamps. It does not store the contact-consent field, render timestamp, honeypot, or a copy of submitted client files.

Records are stored in Redis with a 30-day expiry; the review index is bounded to 1,000 references. Redis REST configuration uses the existing `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` names, or the existing Vercel KV aliases `KV_REST_API_URL` and `KV_REST_API_TOKEN`. The admin API also requires `ADMIN_PASSWORD`. Keep all values in the deployment environment; never place values in source, docs, or the browser.

## Queue access and handling

Open `/admin/workflow-assessments` and enter the admin password. The screen sends HTTP Basic authentication with username `operator` to `/api/admin/workflow-assessments`. Credentials stay in component memory for that page instance; the UI does not write them to browser storage, cookies, or the URL. Locking clears the password and displayed request data. The API requires authentication, does not cache responses, and checks same-origin requests before status updates.

The queue lists request reference, firm and submitting contact, workflow, received time, current software, stated bottleneck, workload range, and handling status. Available state transitions are `received` → `reviewing` → `needs_info`, `scoped`, or `closed`; `needs_info` may return to `reviewing` or move to `closed`; `scoped` may move to `closed`. A `scoped` status means only that scope was recorded elsewhere. The queue does not record payment, work completion, delivery, or client acceptance.

The queue does not send email or mark a notification delivered. Operators contact a requester through an approved external channel. Booking a call, agreeing scope or fees, accepting work, and recording payment remain separate actions outside this queue.

## Receipts, failures, and retries

The public form returns its `received` reference only after Redis confirms durable creation. Repeating the same request ID and payload returns the same receipt; reusing that ID with changed content returns a conflict. Storage/configuration failure returns an error instead of a success receipt. Request validation, rate limits, storage failures, and unavailable review configuration have explicit error responses.

The admin list returns `{items, count}` and returns an error if storage cannot be read. An empty successful list means there are currently no live records; an API failure must not be interpreted as an empty queue. A status update returns `{ok: true, item}` only after Redis confirms the update. A timeout or unavailable response leaves the result unconfirmed; refresh the queue before retrying. The store enforces allowed status transitions atomically.

Every deployment must have its own review credential configuration. An unconfigured preview fails closed rather than accepting requests that cannot be reviewed. Do not copy a production credential or weaken authentication to enable preview.
