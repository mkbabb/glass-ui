#!/usr/bin/env bash
# Critic 6: the touched e2e specs in Chromium on both trees, one guarded run each
# (run.sh's e2e stage, Chromium half), launched while the WebKit chain waits on its lock.
set -u
HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/../../.." && pwd); G=~/.claude/guard/guarded
SPECS="disclosure-rotate.spec.ts SegmentedTabs.glide.spec.ts tabs-std.spec.ts a11y-slider.spec.ts aria-orientation.spec.ts Select.bound.spec.ts overlay-sizing.spec.ts menu-glass.spec.ts config-chassis.spec.ts config-right.spec.ts nav-dock-fix.spec.ts Sheet.position.spec.ts handmark.spec.ts liquid-hover.spec.ts dock-plate-clearance.spec.ts register-ios.spec.ts dock-morph-family.spec.ts"
for T in branch v1100; do
  TREE=$([ $T = branch ] && echo "$ROOT" || echo "$ROOT/.cache/c1-v1100")
  ( cd "$TREE" && PI_REPORT=$HERE/e2e/chromium-$T.json GLASS_UI_DEMO_PORT=8881 $G --timeout 45 -- \
    npx playwright test -c tests-visual/playwright.config.ts --project=chromium-headless-new --workers=1 $SPECS ) > "$HERE/e2e/chromium-$T.log" 2>&1
  echo "$(date +%T) e2e chromium $T exit $?" >> "$HERE/chain.log"
done
