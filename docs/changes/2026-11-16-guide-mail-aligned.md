---
classification: PUBLIC
---
# 2026-11-16: Guide email sends through Resend when a key is set

Claude Sonnet 5.5, 2026-11-16.

## What changed
- `lib/guide-email.ts`: `sendGuideEmail` tries Resend first when `RESEND_API_KEY` is set (plain `fetch` to `https://api.resend.com/emails`, 8 second timeout, same From and Reply-To as before). On a non-2xx answer, a network error or a timeout it falls back to the Gmail transport. The result now carries `via: 'resend' | 'gmail'`, and `resendNote` when Gmail sent after Resend failed. The transport argument may be `null`. Failure reasons carry the HTTP status and Resend's short error name at most, never the key.
- `app/api/contact/route.ts`: the guide still sends when only the Resend key is set. The owner alert line says which path sent it: `GUIDE EMAIL: sent (signed for nyclaw.io)` or `GUIDE EMAIL: sent through Gmail ... (may land in spam ...)`. Failures keep `FAILED`.
- `.env.example` and `README.md`: `RESEND_API_KEY` and a short "Guide email sender" note.
- Tests: `lib/__tests__/guide-email-resend.test.ts` (new); one assertion in `guide-email.test.ts` now expects `via: 'gmail'`.

## What the prior code did
It sent every guide through Gmail SMTP as `hello@nyclaw.io`. The Return-Path is a gmail.com address and nyclaw.io has no Google DKIM key, so SPF and DKIM do not align and DMARC (`p=quarantine`) tells outside inboxes to junk it.

## Why
The DNS for Resend is already on nyclaw.io, so mail sent through Resend passes. No key means no change in behavior. The owner alert, form check, duplicate guard and visitor copy are untouched.

## 2026-11-17 (Claude Sonnet 5.5): rebase and test proof
- Rebased onto origin/main 0fa44f4 (Next pinned 16.4.6); no conflicts, package files untouched.
- Added one route test: Resend fails and Gmail also throws, so `guide_emailed` is false and the owner alert says FAILED with both reasons. Before, both-fail was proven only at the function level or with Gmail env missing.
- Mutation checks (temporary, restored): ignoring a missing key, a wrong From, swallowing a Gmail failure, and treating a Resend error as success each turn the suite red.
