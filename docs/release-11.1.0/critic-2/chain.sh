#!/usr/bin/env bash
# Fix 2 chain, every browser run its own guarded call (WebKit under --exclusive webkit),
# one at a time. STAGES (space list) picks stages; default all.
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../../.." && pwd)
RED=$ROOT/.cache/c1-v1100
PRE=$ROOT/.cache/f2-pre
PKG_RED=$ROOT/.cache/l4-pack/package
LOG=$HERE/chain.log
R=$HERE/rerun
G=~/.claude/guard/guarded
STAGES=${STAGES:-"witness gates l2 lanes-chromium lanes-webkit e2e"}
say() { echo "$(date +%T) $*" >> "$LOG"; }
ex() { [ "$1" = webkit ] && echo "--exclusive webkit" || echo ""; }
has() { case " $STAGES " in *" $1 "*) return 0;; esac; return 1; }
df -h /System/Volumes/Data | tail -1 | sed 's/^/disk /' >> "$LOG"
if has witness; then
  for E in ${W_ENGINES:-chromium webkit}; do
    for T in ${W_TREES:-green red}; do
      TREE=$([ $T = green ] && echo "$ROOT" || echo "$RED")
      $G $(ex $E) --timeout 30 -- bash "$HERE/witness/runprobe.sh" "$TREE" 8611 "$E" "$T" > "$HERE/witness/out/$T-$E.log" 2>&1
      say "witness $T $E exit $?"
    done
  done
fi
if has gates; then bash "$HERE/gates.sh"; say "gates done: $(grep -c 'exit 0' "$HERE/gates/chain.log") zero exits"; fi
if has l2; then
  W=$R/lane-L2/witness.sh
  for E in ${L2_ENGINES:-chromium webkit}; do
    "$W" "$ROOT" 8621 green green "$E"; "$W" "$RED" 8622 red red "$E"; "$W" "$PRE" 8623 pre green "$E"
    say "lane L2 $E: $(tail -3 "$R/lane-L2/out/chain.log" | tr '\n' ';')"
  done
fi
lane() { # lane <L> <engine>
  local L=$1 E=$2 W=$R/lane-L$1/witness.sh
  case $L in
    1|6) "$W" "$ROOT" 86${L}1 green "$E"; "$W" "$RED" 86${L}2 red "$E" ;;
    4)   "$W" "$ROOT" "$ROOT" 8641 green green "$E"; "$W" "$RED" "$PKG_RED" 8642 red red "$E" ;;
    *)   "$W" "$ROOT" 86${L}1 green green "$E"; "$W" "$RED" 86${L}2 red red "$E" ;;
  esac
  [ $L = 7 ] && node "$R/lane-L7/compare.mjs" "$R/lane-L7/out" > "$R/lane-L7/out/compare-$E.log" 2>&1
  say "lane L$L $E: $(tail -2 "$R/lane-L$L/out/chain.log" | tr '\n' ';')"
}
if has lanes-chromium; then for L in ${CLANES:-1 3 5}; do lane $L chromium; done; fi
if has lanes-webkit; then for L in ${WLANES:-1 3 4 5 6 7}; do lane $L webkit; done; fi
if has e2e; then
  mkdir -p "$HERE/e2e"
  [ "${E2E_ENGINES:-chromium webkit}" != webkit ] && ( cd "$ROOT" && PI_REPORT=$HERE/e2e/chromium-branch.json GLASS_UI_DEMO_PORT=8681 $G --timeout 45 -- \
    npx playwright test -c tests-visual/playwright.config.ts --project=chromium-headless-new --workers=1 \
    Select.bound.spec.ts overlay-sizing.spec.ts menu-glass.spec.ts config-chassis.spec.ts config-right.spec.ts SegmentedTabs.glide.spec.ts disclosure-rotate.spec.ts nav-dock-fix.spec.ts Sheet.position.spec.ts aria-orientation.spec.ts ) > "$HERE/e2e/chromium-branch.log" 2>&1
  say "e2e chromium branch exit $?"
  [ "${E2E_ENGINES:-chromium webkit}" != chromium ] && ( cd "$ROOT" && F2_ROOT=$ROOT PI_REPORT=$HERE/e2e/webkit-branch.json GLASS_UI_DEMO_PORT=8682 $G --exclusive webkit --timeout 45 -- \
    npx playwright test -c docs/release-11.1.0/critic-2/e2e-webkit.config.ts --workers=1 ) > "$HERE/e2e/webkit-branch.log" 2>&1
  say "e2e webkit branch exit $?"
  [ "${E2E_ENGINES:-chromium webkit}" != chromium ] && ( cd "$ROOT" && F2_ROOT=$RED PI_REPORT=$HERE/e2e/webkit-v1100.json GLASS_UI_DEMO_PORT=8684 $G --exclusive webkit --timeout 45 -- \
    npx playwright test -c docs/release-11.1.0/critic-2/e2e-webkit.config.ts --workers=1 ) > "$HERE/e2e/webkit-v1100.log" 2>&1
  say "e2e webkit v1100 exit $?"
fi
say "CHAIN-DONE stages=[$STAGES]"
