#!/bin/bash
# Claude Fable 5.2, 2026-11-16: one command to rebuild the guide PDF and prove it matches the page.
# Why: the PDF was rebuilt by hand five times in two days, and once headless Chrome failed silently
# inside a sandbox, so a stale PDF was reported as current. This retires the hand-typed command.
# Net growth: one script; it adds no schedule and no dependency (Chrome and poppler were already needed).
#
# Run from the repo root, outside any sandbox (Chrome cannot start in one):
#   bash scripts/build-guide-pdf.sh
set -euo pipefail

CHROME="${CHROME_PATH:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PAGE="public/ai-operators-playbook.html"
PDF="public/downloads/ai-operators-playbook.pdf"
TMP="$(mktemp -d)/guide.pdf"

[ -f "$PAGE" ] || { echo "run from the repo root: $PAGE not found" >&2; exit 1; }

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$TMP" "file://$PWD/$PAGE" >/dev/null 2>&1 || true

# Chrome can exit 0 and write nothing. Trust the file, not the exit code.
[ -s "$TMP" ] || { echo "Chrome wrote no PDF (sandboxed, or Chrome missing at: $CHROME)" >&2; exit 1; }
mv "$TMP" "$PDF"
echo "built $PDF ($(pdfinfo "$PDF" | awk '/^Pages/ {print $2}') pages)"

python3 -I scripts/check-guide-structure.py
python3 -I scripts/check-guide-pdf-layout.py | tail -2
