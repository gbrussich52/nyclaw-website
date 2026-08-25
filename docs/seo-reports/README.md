# docs/seo-reports/

Empty since April 2026. `docs/seo-audit-prompt.md` names this directory as the
output of a "scheduled Claude Code trigger every Monday at 9am ET" — no such
schedule currently exists (checked `~/Library/LaunchAgents/` and this
session's cron list on 2026-08-24; the only active nyclaw automation is
`com.giani.nyclaw-weekly-refresh`, Mon 8:00am). That prompt is effectively
orphaned until someone re-wires it to a real scheduler.

The active weekly automation (`scripts/nyclaw-weekly-refresh/run.sh`) writes
its reports elsewhere:

- Weekly plan: `docs/loop/weekly-refresh-YYYY-MM-DD.md`
- New findings: appended to `docs/loop/improve-queue.md`
- Optional P0 draft: `docs/loop/drafts/YYYY-MM-DD-*.md`

If `docs/seo-audit-prompt.md` gets a real schedule again, its reports belong
here. Until then, treat this directory as inactive rather than broken.
