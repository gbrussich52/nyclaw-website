---
classification: PUBLIC
---
# Missing-document workflow prototype

Build one executable workflow inside NYClaw for two fictional firms. Use real local Supabase Auth/Postgres permissions, four staff/reviewer accounts and an authenticated MCP adapter. Publish reviewable source. Hosted schema/Auth, customer data, real delivery, activated prices and schedules are outside this prototype.

## Data contract

Session: workspace ID/name, user ID and staff/reviewer role. Case: ID, workspace ID, label, version, latest draft ID, observation time and document checklist. Checklist entries are received, missing or uncertain. Observations older than seven days and uncertain entries require review. Fresh missing-only cases permit follow-up; all-received cases are complete. Labels are data, never instructions.

Draft: ID, case/version, body, preparer, approver, approval expiration and events. Status is prepared, approved, simulated_confirmed, failed or unconfirmed. Preparation uses a bounded template and UUID request key. Repeating a request returns its original result; reuse for a different case conflicts. Only one draft exists per case version.

Approval binds to the draft body and case version and expires after 15 minutes. Staff can prepare; reviewers approve and simulate. Each mutation rechecks membership, version, freshness and relevant approval after waits. Confirmation has one receipt. A timeout stays unconfirmed without automatic retry. Failed simulation permits explicit retry under valid approval. Simulated outcomes never imply real provider acknowledgment or completed documents.

## Database and API

Use private schema `workflow_lab`, RLS on every table, no anonymous access and no direct authenticated writes. RPCs enforce permissions, pin the search path and revoke public helper execution. Firm identity comes from active database membership, not a supplied workspace claim. Projections omit credentials.

RPCs: `describe_session`, `list_document_exceptions`, `prepare_followup_draft`, `approve_followup`, `simulate_delivery`, `get_workflow_receipt`. Inaccessible objects produce errors without leaking metadata.

Local API session routes select one fictional persona and perform real Supabase login. JWTs use HTTP-only, SameSite Strict cookies scoped to the prototype API. Passwords live only in ignored `.env.local`. Require development mode, explicit local enablement, loopback app/database origins and same-origin mutations. Production returns 404. State/actions routes validate inputs and expose only fixed RPCs with caller-scoped JWTs.

## UI and MCP

The review workspace shows a clear fictional badge, checklist queue, drafts and receipt timeline. Switching firms clears records immediately and rejects stale responses. Role restrictions are enforced by the database. Requests have deadlines, visible outage states and receipt recovery before retry. No file upload or document-content processing is added. Support mobile and keyboard use.

The separate MCP function adopts official Supabase authentication middleware. Expose only list, draft and receipt tools with strict UUID inputs, bounded outputs and sanitized errors. No approval, simulation, send or arbitrary SQL tool. External OAuth consent remains inactive.

## Verification

Run source tests, TypeScript, production build and separate Deno checks. Use actual local Auth tokens and Postgres RLS/RPCs. Configure isolated API/database ports 54581/54582; setup generates fictional account passwords without printing them.

Acceptance covers firm isolation, revoked membership during waits, complete/missing/uncertain/stale cases, request conflicts, anonymous/tampered tokens, instruction-like labels, outages, reviewer roles, denied direct writes, version changes, approval expiry during waits, duplicate confirmation and unconfirmed timeouts. Browser checks exercise staff-to-reviewer flow, persisted draft discovery, firm switches, mobile layout and lost/stalled replies after real writes.

Manual gates write private reports and reset only known fictional fixtures. They replace repeated ad hoc testing; no new scheduled loop is introduced. Local integration and verification do not establish hosted service delivery or paid customer acceptance.
