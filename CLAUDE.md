# NYClaw.io

Live marketing + lead-gen site for the AI Solution Builder offering. Active SEO investment.

## Stack

- Next.js 15 (App Router, `"type": "module"`) + React 19
- TypeScript, Tailwind CSS 3
- `nodemailer` (transactional email) — `googleapis` was removed once the Google Sheets lead log integration was dropped; do not reintroduce without a live consumer
- Lucide React for icons
- Custom `middleware.ts` at repo root (request-time logic — read it before changing routing)

## Key commands

```bash
npm run dev      # Next dev
npm run build    # Next build
npm run lint     # next lint
npm test         # vitest run — lib/__tests__/ covers sanitize, leads, rate-limit
```

## Layout

- `app/` — App Router (flat, no `src/`)
- `content/` — markdown/JSON content (likely SEO landing pages)
- `docs/` — internal docs (8 files)
- `middleware.ts` — request middleware (read first)
- `DESIGN.md` — design system / brand notes (consult before UI changes)
- `scripts/` — utility scripts

## Gotchas

- **SEO is the active growth lever.** Per memory: full SEO overhaul scheduled 2026-04-07, automation in progress. Don't ship pages that hurt indexability (noindex, blocked robots, broken canonicals) without flagging.
- **`middleware.ts` runs on every request** — performance-sensitive. Don't add synchronous/blocking network calls. Documented exception: the distributed rate limiter (`lib/rate-limit.ts`) does call Upstash Redis via REST on every `/api/*` request — it's async, 2s-timeout-bounded, and fail-open, so an outage adds latency but never blocks traffic. Any other network call added to middleware must meet the same bar.
- **Email goes through nodemailer** — credentials in env vars, never hardcoded. Check `.env.local` shape before touching mail flows.
- **Public-facing site** — any SQL/log path must not leak PII or internal metric names.

## Current focus

SEO overhaul + automation. Engineering should serve organic acquisition.

## Related memory

- `nyclaw_seo_overhaul.md` — SEO baseline, automation, trigger ID
