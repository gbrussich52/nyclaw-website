---
classification: PUBLIC
---
# Local missing-document workflow lab

This executable prototype uses two fictional firms and real local Supabase Auth/Postgres. It handles metadata, staff drafts, reviewer approvals and simulated receipts. No delivery provider is contacted.

## Run

Requirements: Node 24+, Supabase CLI 2.120.0+, Deno 2+ and Google Chrome for browser checks. The CLI's native runtime is alpha and serves only as a local test environment. The config isolates project `nyclaw-workflow-lab` on API port 54581 and database port 54582. Do not link this checkout to a hosted project or run `db push` or `config push`.

```sh
supabase start --workdir . > /dev/null
npm run workflow-lab:setup
npm run dev -- --webpack --hostname 127.0.0.1 --port 3120
```

The first start applies the migration. To reinitialize this dedicated fictional stack, stop the app, run `supabase db reset --local --workdir . --yes`, then rerun setup. Setup creates four Auth users with random passwords and writes only ignored `.env.local` with mode 0600. Business requests use the user's JWT and a publishable key; privileged setup credentials never enter browser storage or business requests.

Open http://127.0.0.1:3120/workflow-lab. Choose Aster staff, prepare a draft, switch to Aster reviewer, retrieve the persisted draft, approve and simulate. Birch has separate records. Complete, uncertain and stale cases prevent drafting. Failed simulations permit an explicit retry while approval remains valid. A timeout stays unconfirmed and cannot be silently retried. Refresh retrieves the actual receipt.

Firm switches and sign-out immediately clear cached records. Requests have 12-second deadlines; recovery reads receipts without repeating mutations. Production and nonloopback requests reject fixture login. External MCP OAuth consent is not activated.

## Verify

Keep the development app running. Native PostgreSQL's client is discovered automatically; `PSQL_BIN` can select a client for a Docker stack.

```sh
npm test
npx tsc --noEmit
npm run build -- --webpack
cd supabase/functions/workflow-mcp
deno check --config deno.json index.ts
deno test --config deno.json --allow-env index_test.ts
```

Return to the repository root. Avoid running the build concurrently with browser replay: generated Next files can reload the development app during an action.

```sh
WORKFLOW_LAB_OUTPUT=/private/tmp/nyclaw-workflow-proof npm run test:workflow-lab
```

The replay resets only the known six fictional cases and refuses unexpected fixture shape. It writes private JSON reports even on failure. Actual signed Auth tokens and Postgres permissions exercise firm isolation, revoked membership during queue waits, approval expiry during waits, role checks, direct-write denial, duplicate confirmation and unconfirmed timeout. MCP checks cover the tool allowlist and receipt recovery.

Browser fault injection loses replies after actual saved writes, stalls an approval reply past the client deadline, simulates a read outage and holds an old firm's response during switching. These prove transport recovery for simulated actions. Screenshots contain fictional records only.

Rollback SQL assertions run through `localRuntime().sqlFile('supabase/tests/workflow_lab.sql')`. The helper permits only the configured loopback endpoints. These are manual gates; no runner or scheduled job is installed.

## Permission boundary

The `workflow-mcp` function adopts the [official Supabase app MCP block](https://supabase.com/library/r/mcp.json), with pinned server, middleware and MCP dependencies plus a Deno lock. Official middleware verifies the user's signed token. The adapter exposes `list_document_exceptions`, `prepare_followup_draft` and `get_workflow_receipt`. List results use `{cases:[...]}` and include `latestDraftId`. Errors are bounded and sanitized; mutations are never automatically retried.

Every `workflow_lab` table has RLS. Anonymous access and direct authenticated writes are denied. Private helpers cannot be called externally. Mutations refresh and lock active membership after advisory waits. Approval binds to the case version and draft body, expires after 15 minutes and uses the wall clock after locks. Approver access is also rechecked. A current reviewer can replace a revoked reviewer's approval. A receipt does not mark documents complete.

## Before a real pilot

Agree paid scope, an approved checklist, the native-tool gap, metadata source, roles, retention and acceptance tests. Replace fixture login with real onboarding, verify hosted policies through normal user clients and review shared-project Auth effects and schema deployment separately. A later provider adapter needs approved recipients, idempotency, acknowledgments and reconciliation.

Connect business outcome checks to an existing registered sensor after implementation. Measure support time and costs before offering monthly maintenance. This runbook replaces one-off setup instructions and introduces no paid dependency or schedule.
