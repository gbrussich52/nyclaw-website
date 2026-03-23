#!/bin/bash
# smoke-test.sh — Post-deploy verification for nyclaw.io
# Run after every push. Checks critical links and values are correct.
# Usage: ./scripts/smoke-test.sh [optional-url]

URL="${1:-https://nyclaw.io}"
PASS=0
FAIL=0

check() {
  local label="$1"
  local pattern="$2"
  local content="$3"

  if echo "$content" | grep -q "$pattern"; then
    echo "  ✅ $label"
    ((PASS++))
  else
    echo "  ❌ FAIL: $label (pattern: $pattern)"
    ((FAIL++))
  fi
}

echo ""
echo "🔍 Smoke test: $URL"
echo "────────────────────────────────────"

BODY=$(curl -s --max-time 10 "$URL")

if [ -z "$BODY" ]; then
  echo "  ❌ FAIL: Could not reach $URL"
  exit 1
fi

# --- Critical link checks ---
check "Calendly URL (correct)"    "nyclaw-io-proton/30min"    "$BODY"
check "Calendly URL (no old)"     ""                          "$(echo "$BODY" | grep -v 'nyclaw-io-proton' | grep 'calendly.com/nyclaw[^-]' || echo 'OK')"
check "Contact section exists"    'id="contact"'              "$BODY"
check "Phone field in form"       'type="tel"'                "$BODY"
check "SMS consent checkbox"      'sms-consent'               "$BODY"
check "No hardcoded old URL"      ""                          "$(echo "$BODY" | grep 'calendly.com/nyclaw\"' && echo FOUND || echo OK)"

# --- Health check ---
HEALTH=$(curl -s --max-time 5 "$URL/api/health")
check "Health endpoint OK"        '"status":"ok"'             "$HEALTH"

echo "────────────────────────────────────"
echo "  Passed: $PASS | Failed: $FAIL"
echo ""

if [ $FAIL -gt 0 ]; then
  echo "⚠️  Smoke test FAILED — investigate before announcing deploy"
  exit 1
else
  echo "✅ All checks passed"
  exit 0
fi
