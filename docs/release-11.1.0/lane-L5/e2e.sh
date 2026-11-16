#!/usr/bin/env bash
# Lane L5 — the e2e spec these items touch (handmark.spec.ts), per engine and per tree, as
# guarded browser runs (WebKit under --exclusive webkit). The spec writes its captures into
# docs/tranches/BK/audit/visual; those tracked files are restored after each run so the
# release records are not clobbered. Exit codes logged per run; reports are JSON.
set -u
cd "$(dirname "$0")/../../.."
D=docs/release-11.1.0/lane-L5/gates
G=~/.claude/guard/guarded
mkdir -p "$D"
LOG=$D/chain.log
step() { local name=$1; shift; "$@" > "$D/$name.log" 2>&1; local rc=$?; echo "$(date +%T) $name exit $rc" >> "$LOG"; }
restore() { mkdir -p "$D/png"; for f in docs/tranches/BK/audit/visual/handmark-*.png; do [ -e "$f" ] && mv "$f" "$D/png/$T-$(basename "$f")"; done 2>/dev/null; git restore -- docs/tranches/BK/audit/visual 2>/dev/null; }
RED=$PWD/.cache/l5-v1100
for TREE in "$PWD" "$RED"; do
  T=$([ "$TREE" = "$PWD" ] && echo branch || echo v1100)
  PI_REPORT=$PWD/$D/e2e-chromium-$T.json GLASS_UI_DEMO_PORT=7993 step e2e-chromium-$T $G --timeout 45 -- \
    npx playwright test -c "$TREE/tests-visual/playwright.config.ts" --project=chromium-headless-new --workers=1 handmark.spec.ts
  restore
  L5_ROOT=$TREE PI_REPORT=$PWD/$D/e2e-webkit-$T.json GLASS_UI_DEMO_PORT=7994 step e2e-webkit-$T $G --exclusive webkit --timeout 45 -- \
    npx playwright test -c docs/release-11.1.0/lane-L5/e2e-webkit.config.ts --workers=1
  restore
done
echo E2E-DONE >> "$LOG"
