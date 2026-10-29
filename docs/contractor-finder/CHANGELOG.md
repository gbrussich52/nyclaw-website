# October 29, 2026 — compatible dependency security repair

The locked dependency tree had eight npm advisory findings (five high, three
moderate), including Zod validation resource exhaustion, compressed-body parsing
denial of service, and development-tool file-read/code-injection issues. Update
the existing MCP SDK 1.32.1 → 1.32.2 and Zod 4.5.4 → 4.6.7; keep the existing
SDK route and schema implementation. Update Puppeteer Core 25.4.0 → 25.16.0 and
Vitest 4.1.8 → 4.1.12 within their current major versions. Pin these direct
dependencies and refresh compatible transitive locks, including body-parser
2.4.0, Chromium BiDi 157.0.8090-0, Vite 8.3.5 and postcss-selector-parser 6.1.5.
Install scripts were disabled, so the update did not download a browser.
Regenerate the existing self-contained widget so its bundled SDK/Zod code also
uses the patched releases and its CSP hash matches the result.

Fresh npm audit reports zero findings. All 124 tests across 10 files pass,
including a new HTTP MCP tools/list and tools/call regression covering the normal
comparison, immediate-danger handoff, mismatched trade/job, independent-only
evidence gap, private-field rejection and oversized-limit rejection. The existing
official-client initialization/resource test and host/origin/body-size rejection
tests also pass. A loopback production-build probe with the official SDK client
also initializes, lists/calls the tool, reads its resource and verifies those
safety/evidence outcomes and HTTP rejection statuses. TypeScript and the
production build pass. Patched Puppeteer with the installed Chrome renders the
regenerated widget's two EV candidates, danger handoff and independent-only
evidence gap without JavaScript errors. This is local Verify
evidence; publication and production Sense remain separate. Contractor facts,
source observations, license dates, contact behavior and paid flows are unchanged.

# October 28, 2026 — Fanning county license observation

The catalog previously recorded license 217 with a December 31, 2026 expiry. A fresh
check of the [Westchester County trade-license register](https://tradelicenses.westchestercountyny.gov/TradeLicenses/)
on October 28 matched Fanning Electric Co Inc, 55 Central Ave, Ossining, and showed
December 31, 2027. Update only Fanning's license checked date and expiry. Business
service/testimonial sources remain checked October 20; the county lookup does not
refresh them. EASE 2115 and Keating 1668 license records are unchanged.

Existing date tests now evaluate current results after the recheck, reject a
future-dated Fanning observation and still mark all license checks stale after 30
days without expiring or redating service evidence. No ranking, workflow, auth,
contact behavior or schedule changes.

# October 20, 2026

Previously NYClaw had no resident-facing contractor comparison or ChatGPT endpoint. Adds a free source-backed comparison, strict evidence/permission/freshness rules, read-only official MCP app, mobile/desktop web interface, local unsent comparison brief and reproducible review package. Real business-selected testimonials are distinguished from independent recommendations; no fabricated ratings, live availability or private-group collection.

Compatible runtime dependency repairs: Next16.3.4→16.4.2, Nodemailer10.0.1→10.1.7 and patched compatible sharp/source-map-js transitive releases. These address existing npm critical/high advisories; full website regression/build protects existing pages and contact paths. No checkout, database, email-send behavior, paid API or scheduler is introduced.

Build reliability: the existing Google-font loader failed on its returned URL format. Bundle the same previously deployed Inter/Space Grotesk Latin fonts locally with their official SIL Open Font Licenses; remove build-time font fetching. Preserve typography and avoid adding a font service.

Independent review repairs: business-hosted sources cannot become independent reviews through relabelling; separate publisher and documented affiliation assessment are required in addition to redistribution rights. Health now counts admitted evidence rather than a fixed number, fails on stale checks, and the existing resources page links to the finder.

Live website smoke found a stale phone/SMS assertion: the current upstream ContactForm intentionally collects email, business type and workflow challenge, with no phone/SMS field. Update the existing smoke assertions to those actual required fields; no contact UI/API behavior changed. Live contractor17checks passed before this sensor repair.


## October23 — public publisher domain verification

Add OpenAI Platform’s public origin-root ownership challenge for this existing MCP hostname. The saved public submission draft cannot complete its connection/domain checks without this file. It is an intentionally public verification value, not an access credential. No user data, authentication, billing or application behavior changes. Net growth is required by the publisher verification protocol; no new loop or service.
