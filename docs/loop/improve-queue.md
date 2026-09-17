---
classification: PRIVATE
---
# NYClaw.io — Improve queue

Auto-appended by weekly refresh + any agent that finds a real gap.  
**Ship items** update the free playbook, services, or site copy. Check off when live on nyclaw.io.

## Open

- [x] **2026-08-07** `bof-cost-page` — Shipped: `/blog/ai-automation-cost-westchester` — DIY vs freelancer vs managed-agency cost breakdown, grounded in real services pricing ($3.5K–15K project range). Source: marketing-seo audit, Cody Schneider bottom-of-funnel framework.
- [x] **2026-08-07** `bof-chatgpt-vs-consultant` — Shipped: `/blog/chatgpt-vs-ai-consultant` — vs-format post addressing the "just use ChatGPT" sales objection. Source: marketing-seo audit, Cody Schneider bottom-of-funnel framework.
- [ ] **2026-07-27** `aeo-original-data` — AEO signal: engines cite original claims. Add one original operator artifact to playbook or blog (e.g. cost of a failed automation, time saved pattern, Westchester vertical checklist). Partial: Template 6 + CRM source field note shipped in playbook; still want a dated “original number” post. Source: daily brief AEO + last30days radar.
- [ ] **2026-07-27** `sense-guide-downloads` — Instrument or document how many guide downloads / lead form hits per week so Sense is not only market radar.
- [ ] **2026-07-27** `pdf-mirror` — `public/downloads/ai-operators-playbook.pdf` still dated Apr 2026; regenerate from updated HTML when a clean HTML→PDF path is available (or drop PDF if unused in email).
- [ ] **2026-07-27** `blog-after-setup` — Buyer question: “What should I do after ChatGPT is set up for my business?” Outline: week-1 install vs week-4 loop; one metric; when to call an operator. Defer until playbook P0 is live.
- [ ] **2026-08-25** `playbook-installed-not-implemented` — Add Part 3B section + bump cover/About to August 2026: tools installed, process unchanged is not implementation. Source: weekly refresh / briefs 08-22 and 08-24.
- [ ] **2026-08-25** `playbook-done-means-receipt` — Extend operator-setup checklist: allowed sites, no card on the agent, expected record appeared and can be undone, failed tries do not commit to memory. Source: weekly refresh / briefs 08-19 through 08-24.
- [ ] **2026-08-25** `services-process-change-copy` — Hero/agent-card aspirin line: they use ChatGPT and nothing runs differently; drop or rewrite homepage 24/7 / 8x / 40% stats; keep live prices; no MCP/Managed Agents SKU. Source: weekly refresh / briefs 08-18, 08-22, 08-24.
- [ ] **2026-08-31** `playbook-clerk-not-associate` — Add Part 3B section: AI drafts, a named human sends; intake capture yes, outbound legal/financial email never without a person. Source: weekly refresh / briefs 08-30 and 08-31.
- [ ] **2026-08-31** `playbook-skills-are-code` — Extend Part 3 security: instruction files are executable; never paste a chat-given install command; read every skill/hook on restore. Source: weekly refresh / brief 08-30.
- [ ] **2026-08-31** `playbook-fewer-tools` — One paragraph: expose jobs (one tool, more parameters), not 40 CRM endpoints; past ~20 tools the agent is guessing. Source: weekly refresh / brief 08-31.
- [ ] **2026-09-13** `playbook-aeo-local-owners` — Part 4 section + Template 6 self-test: 10 unbranded questions × 4 engines, question then short answer then detail, citation is not a booked job. Source: weekly refresh / briefs 09-06 through 09-13.
- [ ] **2026-09-13** `radar-md-gap` — last30days radar markdown in ~/Documents/Last30Days/radar/ stopped at 2026-09-01; weekly refresh had to use X-brief Part 2 extracts. Restore the md files or document the new path. Source: weekly refresh 2026-09-13.
- [ ] **2026-09-14** `playbook-works-on-tuesday` — Part 3B section: named job still fires mid-week; quota-exhausted is a Sense break; fallback is not “add another agent.” Source: weekly refresh / brief 2026-09-14.
- [ ] **2026-09-14** `playbook-pin-tools` — Part 3 security: pin MCP versions; read skill pre-approvals; refuse Bash(*) / fake-scoped shell grants. Source: weekly refresh / brief 2026-09-14.

## Done

- [x] **2026-07-27** `playbook-stale-date` — Shipped: cover + About “Updated July 2026 · operator practices, not tool rankings.” Live when deployed.
- [x] **2026-07-27** `positioning-closed-loop` — Shipped: playbook Part 3B (harness + closed loop + dollar leak); homepage hero + services intro/agent card language. Deploy required.
- [x] **2026-07-27** `playbook-skill-hygiene` — Shipped: prune callout after Four Core Documents; anti-pattern 7 model-upgrade note.
- [x] **2026-07-27** `playbook-template-6` — Shipped: Closed-Loop Weekly Sense Check + optional AI-search source field.

## 2026-08-24 — from the portfolio SEO audit (`docs/tasks/2026-08-24-seo-portfolio-audit.md`)
- [x] **`com.giani.nyclaw-weekly-refresh` has failed every Monday since 8/03:** `bash -n scripts/nyclaw-weekly-refresh/run.sh` → line 34 "unexpected EOF while looking for matching `'`" (apostrophe inside a heredoc inside `$(...)`). Fix: write the prompt to a temp file instead of a nested heredoc; run once by hand; confirm `docs/seo-reports/` gets its first artifact (empty since April). Verified 2026-08-24 23:45 ET.
  **Fixed 2026-08-25**: root cause was a bash 3.2 parser bug where an apostrophe inside an unquoted heredoc nested in `$(...)` is misread as an unterminated single quote (`scripts/nyclaw-weekly-refresh/run.sh:25-38`, the "Today's date" line). Rewrote to redirect the heredoc straight to a temp file (no `$(...)` wrapper around the heredoc), then read the file for `-p`. `bash -n` now passes; hand-run confirmed twice — once directly (exit 0, artifact `docs/loop/weekly-refresh-2026-08-25.md`, 11345 bytes) and once via `launchctl kickstart -k` after reloading the job (exit 0, artifact regenerated at 12356 bytes, `docs/loop/improve-queue.md` auto-appended, optional draft written to `docs/loop/drafts/`). `docs/seo-reports/` turned out to be unrelated — it's the (currently unscheduled) output path for a *different* prompt, `docs/seo-audit-prompt.md`; see `docs/seo-reports/README.md`. One thing worth flagging: this hand-run also exposed that `run.sh`'s `--permission-mode bypassPermissions` let grok rewrite two live blog pages that PROMPT.md never asked it to touch (pricing/FAQ copy) — reverted before commit, not shipped. That's a scope-tightening question for `PROMPT.md`/grok flags, left open below.
- [ ] **`nyclaw-weekly-refresh` grok run edited unrelated live blog pages** (`app/blog/ai-automation-cost-westchester/page.tsx`, `app/blog/chatgpt-vs-ai-consultant/page.tsx`) during the 2026-08-25 verification hand-run, despite `PROMPT.md` only specifying the weekly plan, improve-queue append, and an optional draft file. Reverted, not committed. `--permission-mode bypassPermissions` gives grok full repo write access; consider scoping PROMPT.md more explicitly ("do not edit files outside `docs/loop/`") or dropping to a narrower permission mode. Source: hand-verification of the launchd fix.
- [x] 2026-08-25 00:50 ET — scope guard added (`scripts/nyclaw-weekly-refresh/scope-guard.sh`, called before/after the grok run): tracked files outside `docs/loop/` changed by the run are reverted and listed under "## Scope guard" at the end of the plan; new untracked files outside scope are flagged, not deleted; Giani's own pre-run edits are never touched. Adversarially tested in a throwaway repo (4 cases). PROMPT.md scope-tightening still worth doing, but the gate no longer depends on the model obeying it.
- 2026-09-17 — local `npm run build` fails on this laptop (Turbopack PostCSS needs to bind a local port; blocked even unsandboxed). `npx next build --webpack` passes — use it to verify locally. Also `npm run lint` is broken (Next 16 removed `next lint`; no eslint.config.*). Fix: migrate lint script to `eslint .` with a flat config.
