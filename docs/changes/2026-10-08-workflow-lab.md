---
classification: PUBLIC
---
# Missing-document workflow lab — 2026-10-08

Previously, the Workflow Blueprint showed fictional outputs and handled assessment requests but had no executable document workflow. This change adds a local workspace for two fictional firms, backed by real Supabase Auth and Postgres. Staff can prepare missing-document drafts; reviewers can approve them and simulate confirmed, failed or unconfirmed outcomes. Durable receipts preserve what happened.

Database permissions isolate firms and deny direct writes. Approval binds to the case version and draft body, expires after 15 minutes, and is checked after queue waits. The authenticated MCP adapter exposes only list, draft and receipt tools. The browser clears records during firm switches and recovers saved receipts after lost replies without repeating writes.

Fixture login requires development mode, explicit local enablement and loopback endpoints. Production rejects every prototype API request. Passwords are generated into ignored `.env.local`. No hosted migration, shared Auth change, real email, customer data, price or scheduled job is activated. Development permits Webpack source-map evaluation; production CSP remains strict. Next's generated agent guidance is retained, and Deno functions are checked separately from Next types.

Validation passed: 52 source tests, TypeScript, production build, five Deno tests, 32 actual Auth/database/MCP checks, 21 browser checks, six production-boundary checks and rollback SQL assertions. Independent security and code reviews covered the workflow boundaries.

The setup and replay scripts replace ad hoc manual testing. See `docs/operations/workflow-lab.md` for commands and `docs/specs/workflow-lab.md` for the contract. This is local fictional proof; customer acceptance and provider delivery remain future work.
