#!/usr/bin/env bash
# handmark.spec.ts (the spec lanes L5 and L7 touch), both trees, Chromium then WebKit.
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../../.." && pwd); RED=$ROOT/.cache/c1-v1100; G=~/.claude/guard/guarded
for T in branch v1100; do
  TREE=$([ $T = branch ] && echo "$ROOT" || echo "$RED")
  ( cd "$TREE" && PI_REPORT=$HERE/e2e/handmark-chromium-$T.json GLASS_UI_DEMO_PORT=8685 $G --timeout 20 -- \
    npx playwright test -c tests-visual/playwright.config.ts --project=chromium-headless-new --workers=1 handmark.spec.ts ) > "$HERE/e2e/handmark-chromium-$T.log" 2>&1
  echo "$(date +%T) e2e handmark chromium $T exit $?" >> "$HERE/chain.log"
done
for T in branch v1100; do
  TREE=$([ $T = branch ] && echo "$ROOT" || echo "$RED")
  ( cd "$ROOT" && F2_ROOT=$TREE PI_REPORT=$HERE/e2e/handmark-webkit-$T.json GLASS_UI_DEMO_PORT=8686 $G --exclusive webkit --timeout 20 -- \
    npx playwright test -c docs/release-11.1.0/critic-2/e2e-webkit-handmark.config.ts --workers=1 ) > "$HERE/e2e/handmark-webkit-$T.log" 2>&1
  echo "$(date +%T) e2e handmark webkit $T exit $?" >> "$HERE/chain.log"
done
echo "$(date +%T) RUN-7-DONE" >> "$HERE/chain.log"
