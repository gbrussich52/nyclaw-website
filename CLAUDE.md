# NYClaw.io

Live marketing + lead-gen site for the AI Solution Builder offering. Active SEO investment.

## Stack

- Next.js 15 (App Router, `"type": "module"`) + React 19
- TypeScript, Tailwind CSS 3
- `googleapis` (Google integrations) + `nodemailer` (transactional email)
- Lucide React for icons
- Custom `middleware.ts` at repo root (request-time logic — read it before changing routing)

## Key commands

```bash
npm run dev      # Next dev
npm run build    # Next build
npm run lint     # next lint
```

No test runner — add Vitest before non-trivial logic ships.

## Layout

- `app/` — App Router (flat, no `src/`)
- `content/` — markdown/JSON content (likely SEO landing pages)
- `docs/` — internal docs (8 files)
- `middleware.ts` — request middleware (read first)
- `DESIGN.md` — design system / brand notes (consult before UI changes)
- `scripts/` — utility scripts

## Gotchas

- **SEO is the active growth lever.** Per memory: full SEO overhaul scheduled 2026-04-07, automation in progress. Don't ship pages that hurt indexability (noindex, blocked robots, broken canonicals) without flagging.
- **`middleware.ts` runs on every request** — performance-sensitive. Don't add synchronous network calls.
- **Email goes through nodemailer + googleapis** — credentials in env vars, never hardcoded. Check `.env.local` shape before touching mail flows.
- **Public-facing site** — any SQL/log path must not leak PII or internal metric names.

## Current focus

SEO overhaul + automation. Engineering should serve organic acquisition.

## Related memory

- `nyclaw_seo_overhaul.md` — SEO baseline, automation, trigger ID
