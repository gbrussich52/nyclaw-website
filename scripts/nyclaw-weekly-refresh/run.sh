#!/bin/bash
# Existing Monday job: bounded private research, never sending or publishing.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SCRIPT_DIR="$ROOT/scripts/nyclaw-weekly-refresh"
LOG_DIR="$SCRIPT_DIR/logs"
DATE_LOCAL="$(date +%Y-%m-%d)"
RUN_ID="$(python3 -c 'import uuid; print(uuid.uuid4())')"
LOG_FILE="$LOG_DIR/${DATE_LOCAL}.log"
GROK_BIN="${GROK_BIN:-$HOME/.grok/bin/grok}"
GROK_MODEL="${GROK_MODEL:-grok-4.6}"
MAX_TURNS="${MAX_TURNS:-35}"
GROK_TIMEOUT_SECONDS="${GROK_TIMEOUT_SECONDS:-1800}"
mkdir -p "$LOG_DIR" "$ROOT/docs/loop/drafts"
export PATH="/opt/homebrew/bin:/usr/local/bin:$HOME/.local/bin:$HOME/.grok/bin:${PATH:-/usr/bin:/bin}"
health() {
  python3 - "$LOG_DIR/acquisition-health.json" "$RUN_ID" "$DATE_LOCAL" "$1" "${2:-}" <<'PY'
import datetime,json,os,sys
from pathlib import Path
file,run,date,status,proof=sys.argv[1:]
p=Path(file);tmp=p.with_suffix('.tmp')
data={'checked_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'run_id':run,'date':date,'status':status,'ok':False}
if status=='complete':
 evidence=json.loads(Path(proof).read_text())
 if evidence.get('ok') is not True or evidence.get('source_verified') is not True:raise ValueError('Source proof required')
 data.update(ok=True,source_verified=True,packet_sha256=evidence['packet_sha256'])
tmp.write_text(json.dumps(data)+'\n')
os.replace(tmp,p)
PY
}
bounded() {
  python3 - "$@" <<'PY'
import os,signal,subprocess,sys
limit=int(sys.argv[1])
if not 1 <= limit <= 1800:sys.exit(2)
try:
 process=subprocess.Popen(sys.argv[2:],start_new_session=True)
 try:sys.exit(process.wait(timeout=limit))
 except subprocess.TimeoutExpired:
  os.killpg(process.pid,signal.SIGTERM)
  try:process.wait(timeout=2)
  except subprocess.TimeoutExpired:pass
  try:os.killpg(process.pid,signal.SIGKILL)
  except ProcessLookupError:pass
  process.wait();sys.exit(124)
except Exception:sys.exit(2)
PY
}
health running
case "$MAX_TURNS" in ''|*[!0-9]*) health configuration_invalid; exit 2;; esac
if [ "$MAX_TURNS" -lt 1 ] || [ "$MAX_TURNS" -gt 35 ]; then health configuration_invalid; exit 2; fi
QUOTA_SCRIPT=/Users/gianibrussich/project-claude/scripts/loops/preflight-quota.sh
if [ -f "$QUOTA_SCRIPT" ] && source "$QUOTA_SCRIPT" 2>/dev/null; then
  if ! preflight_grok; then health skipped_quota; exit 0; fi
fi
{
  echo "=== $(date -u +%Y-%m-%dT%H:%M:%SZ) weekly acquisition start ==="
  if [ ! -x "$GROK_BIN" ]; then health model_unavailable; exit 2; fi
  RUN_PROMPT_FILE="$(mktemp "${TMPDIR:-/tmp}/nyclaw-weekly-prompt.XXXXXX")"
  PROOF="$(mktemp "${TMPDIR:-/tmp}/nyclaw-weekly-proof.XXXXXX")"
  SNAP="$(mktemp "${TMPDIR:-/tmp}/nyclaw-weekly-snap.XXXXXX")"
  PLAN="$ROOT/docs/loop/weekly-refresh-${DATE_LOCAL}.md"
  PACKET="$ROOT/docs/loop/acquisition-${DATE_LOCAL}.json"
  trap 'rm -f "$RUN_PROMPT_FILE" "$SNAP" "$PROOF"' EXIT
  cat > "$RUN_PROMPT_FILE" <<PROMPT
Read and follow $SCRIPT_DIR/PROMPT.md.
Site root: $ROOT
Date for filenames: $DATE_LOCAL
Exact run ID: $RUN_ID
Write a fresh <=1200-word plan with Run ID: $RUN_ID to $PLAN.
Write the private company packet to $PACKET using run_id $RUN_ID and actual current UTC timestamps.
Use read-only public company research; no outreach, publication or payment.
PROMPT
  bash "$SCRIPT_DIR/scope-guard.sh" before "$SNAP"
  model_status=0
  bounded "$GROK_TIMEOUT_SECONDS" "$GROK_BIN" --model "$GROK_MODEL" --always-approve --max-turns "$MAX_TURNS" \
    --permission-mode bypassPermissions --cwd "$ROOT" --output-format plain \
    -p "$(cat "$RUN_PROMPT_FILE")" 2>&1 || model_status=$?
  guard_status=0
  bash "$SCRIPT_DIR/scope-guard.sh" after "$SNAP" "$PLAN" || guard_status=$?
  if [ "$model_status" -eq 124 ]; then health model_timeout; exit 2; fi
  if [ "$model_status" -ne 0 ]; then health model_failed; exit 2; fi
  if [ "$guard_status" -ne 0 ]; then health scope_guard_failed; exit 2; fi
  if ! bounded 120 python3 "$SCRIPT_DIR/acquisition-check.py" --packet "$PACKET" --run-id "$RUN_ID" --plan "$PLAN" --verify-sources --json >"$PROOF"; then
    health artifacts_invalid; exit 2
  fi
  health complete "$PROOF"
  echo "OK validated plan and private packet; no outreach sent"
} >>"$LOG_FILE" 2>&1
