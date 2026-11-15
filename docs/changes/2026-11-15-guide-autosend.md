---
classification: PUBLIC
---
# 2026-11-15 — Email the free guide to the visitor at once

Claude Sonnet 5.5, 2026-11-15.

## What changed
- New `lib/guide-email.ts`: pure `buildGuideEmail` (subject, text, html) and `sendGuideEmail` (nodemailer transport, per-instance 10 minute duplicate guard). From and Reply-To are `GUIDE_FROM_EMAIL`, default `hello@nyclaw.io`.
- `app/api/contact/route.ts`: for sources `resource_form` and `playbook_form`, the visitor email goes out before the owner alert. The alert carries `GUIDE EMAIL: sent` or `GUIDE EMAIL: FAILED <reason>`. The JSON response adds `guide_emailed: true|false` for those sources only. A failed send is logged (timestamp and source, never the address) and never fails the request.
- `app/hooks/useContactSubmit.ts`: exposes `guideEmailed` from the response.
- `ResourceForm.tsx`, `PlaybookForm.tsx`: before submit, "the guide opens here and a copy is emailed to you"; after submit, "We also emailed it to <address>." only when `guide_emailed` is true.
- Tests: `lib/__tests__/guide-email.test.ts`, `lib/__tests__/contact-guide-email.test.ts`; `contact-route.test.ts` expects `guide_emailed: false` when no mail env is set.

## What the prior code did
2026-10-07 removed the email promise because the backend never sent one. The guide link appeared only on the page after success; the owner got a lead alert and the visitor got nothing. The route created the transport only when `NOTIFY_EMAIL` was set; it now needs only `GMAIL_USER` and `GMAIL_APP_PASSWORD` for the visitor email.

## PDF
Not attached. `public/downloads/ai-operators-playbook.pdf` last changed 2026-03-23, before the 2026-10-11 guide rewrite of the HTML guide. The email links the HTML guide only.

## Roll back
Revert the commit. The forms go back to the on-page link only, and the route sends only the owner alert.
