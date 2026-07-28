#!/bin/bash
# Weekly NYClaw offerings + free guide refresh via Grok headless agent.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"   # nyclaw-website
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG_DIR="$SCRIPT_DIR/logs"
DATE_LOCAL="$(date +%Y-%m-%d)"
LOG_FILE="$LOG_DIR/${DATE_LOCAL}.log"
PROMPT_FILE="$SCRIPT_DIR/PROMPT.md"
GROK_BIN="${GROK_BIN:-$HOME/.grok/bin/grok}"
MAX_TURNS="${MAX_TURNS:-35}"

mkdir -p "$LOG_DIR" "$ROOT/docs/loop/drafts"
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.local/bin:$HOME/.grok/bin:${PATH:-/usr/bin:/bin}"

{
  echo "=== $(date -u +%Y-%m-%dT%H:%M:%SZ) nyclaw weekly refresh start ==="
  command -v grok >/dev/null 2>&1 && GROK_BIN="$(command -v grok)"
  if [ ! -x "$GROK_BIN" ] && ! command -v grok >/dev/null 2>&1; then
    echo "error: grok not found"
    exit 2
  fi

  RUN_PROMPT=$(cat <<EOF
Read and follow: $PROMPT_FILE

Workspace monorepo may be at $HOME/project-claude. NYClaw site root is:
$ROOT

Daily briefs directory:
$HOME/Documents/DailyTechAIBriefs

Today's date for filenames: $DATE_LOCAL

Write the weekly plan and update the improve queue as specified. Confirm paths.
EOF
)

  "$GROK_BIN" \
    --always-approve \
    --max-turns "$MAX_TURNS" \
    --permission-mode bypassPermissions \
    --cwd "$ROOT" \
    --output-format plain \
    -p "$RUN_PROMPT" \
    2>&1 || true

  PLAN="$ROOT/docs/loop/weekly-refresh-${DATE_LOCAL}.md"
  if [ -f "$PLAN" ] && [ -s "$PLAN" ]; then
    echo "OK plan $PLAN ($(wc -c < "$PLAN") bytes)"
    exit 0
  fi
  echo "error: weekly plan missing: $PLAN"
  exit 1
} >>"$LOG_FILE" 2>&1
