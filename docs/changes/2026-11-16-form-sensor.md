---
classification: PUBLIC
---
# 2026-11-16: Guide labels use the real title; test path for the form-delivery check

Claude Sonnet 5.5, 2026-11-16.

## What changed
- Labels: the guide's real title is "The AI Operator's Playbook". The form heading in `app/components/PlaybookForm.tsx` now says that (the line under it is unchanged). The lead message string there now reads "Requested via The AI Operator's Playbook form". Link labels on the New York City, Westchester County and White Plains pages now read "Free guide: The AI Operator's Playbook". The privacy page line says "the free guide, The AI Operator's Playbook". The email subject already used the real title.
- `lib/guide-email.ts`: new `FORM_CHECK_ADDRESS` (`hello+formcheck@nyclaw.io`) and `isFormCheckAddress()` (exact match, case-insensitive).
- `app/api/contact/route.ts`: when the visitor email is that address, the lead is stored with `test: true` and the owner "New Lead" alert is skipped. Everything else is the same: rate limit, honeypot, time-trap, validation, and the visitor guide email all run as for a real request.
- `lib/__tests__/contact-form-check.test.ts`: test address sends the guide, skips the owner alert, tags the lead; other addresses (and look-alikes) behave as before; honeypot and rate limit still apply to the test address.

## What the prior code did
The old label "Free AI Readiness Guide" named a product that does not exist. Every guide request sent the owner a lead alert, and nothing could prove weekly that the visitor email arrives. The guide form once showed a thank-you page and sent no email for weeks, and no one noticed.

## Why
A weekly check (project-claude `scripts/loops/site-watch/forms.py`) submits this form with the fixed address and looks for the email in Gmail. It needs a path that really sends the visitor email but does not fake a lead for Giani.

## Roll back
Revert the commit. Labels return to the old name and the test address gets the owner alert like anyone else.
