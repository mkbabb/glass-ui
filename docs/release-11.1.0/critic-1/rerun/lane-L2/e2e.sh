#!/usr/bin/env bash
# Lane L2 — the e2e specs these items touch, per engine and per tree, as guarded browser
# runs (WebKit under --exclusive webkit). Exit codes logged per run; reports are JSON.
set -u
cd "$(dirname "$0")/../../.."
D=docs/release-11.1.0/lane-L2/gates
G=~/.claude/guard/guarded
LOG=$D/chain.log
step() { local name=$1; shift; "$@" > "$D/$name.log" 2>&1; local rc=$?; echo "$(date +%T) $name exit $rc" >> "$LOG"; }
RED=$PWD/.cache/l2-v1100
for TREE in "$PWD" "$RED"; do
  T=$([ "$TREE" = "$PWD" ] && echo branch || echo v1100)
  PI_REPORT=$PWD/$D/e2e-chromium-$T.json GLASS_UI_DEMO_PORT=7951 step e2e-chromium-$T $G --timeout 45 -- \
    npx playwright test -c "$TREE/tests-visual/playwright.config.ts" --project=chromium-headless-new --workers=1 \
    a11y-slider.spec.ts Select.bound.spec.ts easing-primitive.spec.ts dock-with-slider-live.spec.ts
  L2_ROOT=$TREE PI_REPORT=$PWD/$D/e2e-webkit-$T.json GLASS_UI_DEMO_PORT=7952 step e2e-webkit-$T $G --exclusive webkit --timeout 45 -- \
    npx playwright test -c docs/release-11.1.0/lane-L2/e2e-webkit.config.ts --workers=1
done
echo E2E-DONE >> "$LOG"
