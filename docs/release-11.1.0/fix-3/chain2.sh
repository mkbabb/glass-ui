#!/usr/bin/env bash
# Fix 3, after the witness: the fix-2 witness and lane L2 rerun on the branch in both
# engines, the committed-tree gates, then the touched e2e specs on the branch and on
# v11.0.0 in both engines. One guarded run at a time; WebKit under --exclusive webkit.
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../../.." && pwd)
RED=$ROOT/.cache/c1-v1100
G=~/.claude/guard/guarded
LOG=$HERE/chain.log
say() { echo "$(date +%T) $*" >> "$LOG"; }
ex() { [ "$1" = webkit ] && echo "--exclusive webkit" || echo ""; }
STAGES=${STAGES:-"rerun gates e2e"}
has() { case " $STAGES " in *" $1 "*) return 0;; esac; return 1; }
df -h /System/Volumes/Data | tail -1 | sed 's/^/disk /' >> "$LOG"
if has rerun; then
  mkdir -p "$HERE/rerun/fix-2/out" "$HERE/rerun/lane-L2/out"
  for E in chromium webkit; do
    $G $(ex $E) --timeout 30 -- bash "$HERE/rerun/fix-2/runprobe.sh" "$ROOT" 8721 "$E" green > "$HERE/rerun/fix-2/out/green-$E.log" 2>&1
    say "fix-2 witness green $E exit $?"
    "$HERE/rerun/lane-L2/witness.sh" "$ROOT" 8722 green green "$E"
    say "lane L2 green $E: $(tail -1 "$HERE/rerun/lane-L2/out/chain.log")"
  done
fi
if has gates; then bash "$HERE/gates.sh"; say "gates: $(grep -c 'exit 0' "$HERE/gates/chain.log") zero exits of 6"; fi
if has e2e; then
  mkdir -p "$HERE/e2e"
  SPECS="disclosure-rotate.spec.ts SegmentedTabs.glide.spec.ts tabs-std.spec.ts a11y-slider.spec.ts aria-orientation.spec.ts"
  for T in branch v1100; do
    TREE=$([ $T = branch ] && echo "$ROOT" || echo "$RED")
    ( cd "$TREE" && PI_REPORT=$HERE/e2e/chromium-$T.json GLASS_UI_DEMO_PORT=8781 $G --timeout 45 -- \
      npx playwright test -c tests-visual/playwright.config.ts --project=chromium-headless-new --workers=1 $SPECS ) > "$HERE/e2e/chromium-$T.log" 2>&1
    say "e2e chromium $T exit $?"
    ( cd "$ROOT" && F2_ROOT=$TREE PI_REPORT=$HERE/e2e/webkit-$T.json GLASS_UI_DEMO_PORT=8782 $G --exclusive webkit --timeout 45 -- \
      npx playwright test -c docs/release-11.1.0/fix-3/e2e-webkit.config.ts --workers=1 ) > "$HERE/e2e/webkit-$T.log" 2>&1
    say "e2e webkit $T exit $?"
  done
fi
say "CHAIN2-DONE stages=[$STAGES]"
