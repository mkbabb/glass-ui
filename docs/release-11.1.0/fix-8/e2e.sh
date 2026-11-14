#!/usr/bin/env bash
# Fix 8: the e2e specs fix 7 ran (critique 6's seventeen), branch only, both engines, one
# guarded run each; failing titles compared to fix 7's branch set with fails.py.
set -u
HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/../../.." && pwd)
G=~/.claude/guard/guarded; LOG=$HERE/chain.log
say() { echo "$(date +%T) $*" >> "$LOG"; }
mkdir -p "$HERE/e2e"
SPECS="disclosure-rotate.spec.ts SegmentedTabs.glide.spec.ts tabs-std.spec.ts a11y-slider.spec.ts aria-orientation.spec.ts Select.bound.spec.ts overlay-sizing.spec.ts menu-glass.spec.ts config-chassis.spec.ts config-right.spec.ts nav-dock-fix.spec.ts Sheet.position.spec.ts handmark.spec.ts liquid-hover.spec.ts dock-plate-clearance.spec.ts register-ios.spec.ts dock-morph-family.spec.ts"
( cd "$ROOT" && PI_REPORT=$HERE/e2e/chromium-branch.json GLASS_UI_DEMO_PORT=8883 $G --timeout 45 -- \
  npx playwright test -c tests-visual/playwright.config.ts --project=chromium-headless-new --workers=1 $SPECS ) > "$HERE/e2e/chromium-branch.log" 2>&1
say "e2e chromium branch exit $?"
( cd "$ROOT" && C3_SPECS="$SPECS" F2_ROOT=$ROOT PI_REPORT=$HERE/e2e/webkit-branch.json GLASS_UI_DEMO_PORT=8884 $G --exclusive webkit --timeout 60 -- \
  npx playwright test -c docs/release-11.1.0/critic-4/e2e-webkit.config.ts --workers=1 ) > "$HERE/e2e/webkit-branch.log" 2>&1
say "e2e webkit branch exit $?"
for E in chromium webkit; do
  python3 "$HERE/fails.py" "$HERE/e2e/$E-branch.json" 0 | grep '^--' | sort > "$HERE/e2e/$E-fails.txt"
  python3 "$HERE/fails.py" "$HERE/../fix-7/e2e/$E-branch.json" 0 | grep '^--' | sort > "$HERE/e2e/$E-fails-fix7.txt"
  say "e2e $E: $(wc -l < "$HERE/e2e/$E-fails.txt") failing, fix 7 $(wc -l < "$HERE/e2e/$E-fails-fix7.txt"); new: $(comm -23 "$HERE/e2e/$E-fails.txt" "$HERE/e2e/$E-fails-fix7.txt" | wc -l)"
done
say "E2E-DONE"
