#!/bin/bash
# scope-guard.sh — keep the unattended weekly grok run inside docs/loop/.
#
# 2026-08-25 finding: with --permission-mode bypassPermissions the Monday run
# rewrote two live blog pages (pricing copy, FAQs, meta descriptions) that
# PROMPT.md never asked for. The job does not commit, but an unreviewed rewrite
# left in the working tree of an auto-deploying site is one `git add -A` away
# from production. So: snapshot the tree before the run, and afterwards revert
# every TRACKED file outside the allowed prefixes that was clean before and
# modified by the run. Files Giani had already modified himself are left alone.
# Untracked new files outside scope are not deleted (that's destructive) but
# are listed loudly. The reverted/flagged list is appended to the plan.
#
# Usage: scope-guard.sh before <snapshot-file>
#        scope-guard.sh after  <snapshot-file> <plan-file>
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
ALLOWED="^(docs/loop/|scripts/nyclaw-weekly-refresh/logs/)"

mode="${1:-}"; snap="${2:-}"; plan="${3:-}"
[ -n "$mode" ] && [ -n "$snap" ] || { echo "usage: scope-guard.sh before|after <snapshot> [plan]" >&2; exit 2; }

case "$mode" in
  before)
    git -C "$ROOT" status --porcelain --untracked-files=all > "$snap"
    ;;
  after)
    reverted=""; flagged=""
    while IFS= read -r line; do
      [ -z "$line" ] && continue
      status="${line:0:2}"; path="${line:3}"
      case "$path" in *" -> "*) path="${path##* -> }";; esac
      if printf '%s' "$path" | grep -Eq "$ALLOWED"; then continue; fi
      # Was this path already dirty before the run? Then it is Giani's, not grok's.
      if grep -Fq -- " $path" "$snap" 2>/dev/null; then continue; fi
      if [ "$status" = "??" ]; then
        flagged="${flagged}${path}"$'\n'
      else
        git -C "$ROOT" checkout -- "$path" 2>/dev/null && reverted="${reverted}${path}"$'\n'
      fi
    done < <(git -C "$ROOT" status --porcelain --untracked-files=all)
    if [ -n "$reverted$flagged" ]; then
      {
        echo; echo "## Scope guard"
        [ -n "$reverted" ] && { echo "Reverted (tracked files outside docs/loop/ changed by this run):"; printf '%s' "$reverted" | sed 's/^/- /'; }
        [ -n "$flagged" ]  && { echo "Left in place, NOT committed — new files outside docs/loop/ (review or delete):"; printf '%s' "$flagged" | sed 's/^/- /'; }
      } >> "$plan" 2>/dev/null || true
      echo "scope-guard: reverted $(printf '%s' "$reverted" | grep -c .) file(s), flagged $(printf '%s' "$flagged" | grep -c .) untracked" >&2
    fi
    ;;
  *) echo "scope-guard: unknown mode $mode" >&2; exit 2;;
esac
