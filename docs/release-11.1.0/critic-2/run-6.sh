#!/usr/bin/env bash
# Critic 2 driver, last part. Waits for the WebKit lane stage that run-2 started, then:
# the critic's probe once more in Chromium and in WebKit on both trees (cells were added
# after its first runs; the first WebKit readings are kept in probe/out/first-webkit/),
# then the touched e2e specs: the branch in both engines, v11.0.0 in WebKit and Chromium.
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../../.." && pwd); RED=$ROOT/.cache/c1-v1100; G=~/.claude/guard/guarded
until grep -q "CHAIN-DONE stages=\[l2 lanes-webkit\]" "$HERE/chain.log"; do sleep 30; done
for E in chromium webkit; do
  for T in green red; do
    TREE=$([ $T = green ] && echo "$ROOT" || echo "$RED")
    EX=$([ $E = webkit ] && echo "--exclusive webkit" || echo "")
    $G $EX --timeout 30 -- bash "$HERE/probe/runprobe.sh" "$TREE" 8691 "$E" "$T" > "$HERE/probe/out/$T-$E.log" 2>&1
    echo "$(date +%T) critic probe (final) $T $E exit $?" >> "$HERE/chain.log"
  done
done
echo "$(date +%T) PROBES-DONE" >> "$HERE/chain.log"
STAGES="e2e" bash "$HERE/chain.sh"
( cd "$RED" && PI_REPORT=$HERE/e2e/chromium-v1100.json GLASS_UI_DEMO_PORT=8683 $G --timeout 45 -- \
  npx playwright test -c tests-visual/playwright.config.ts --project=chromium-headless-new --workers=1 \
  Select.bound.spec.ts overlay-sizing.spec.ts menu-glass.spec.ts config-chassis.spec.ts config-right.spec.ts SegmentedTabs.glide.spec.ts disclosure-rotate.spec.ts nav-dock-fix.spec.ts Sheet.position.spec.ts aria-orientation.spec.ts ) > "$HERE/e2e/chromium-v1100.log" 2>&1
echo "$(date +%T) e2e chromium v1100 exit $?" >> "$HERE/chain.log"
echo "$(date +%T) RUN-6-DONE" >> "$HERE/chain.log"
