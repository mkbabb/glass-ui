#!/usr/bin/env bash
# Critic 4 driver. Every browser run is its own guarded call (WebKit under
# --exclusive webkit), one at a time. STAGES picks stages; ENGINES picks engines.
# The witnesses are the fix seats' and the lanes' own probes, copied unchanged; they
# load the original harnesses (lane-L*/harness, fix-2, fix-3, critic-2/probe) from the
# tree being served, and write under critic-4/.
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../../.." && pwd)
RED=$ROOT/.cache/c1-v1100
PKG_RED=$ROOT/.cache/l4-pack/package
LOG=$HERE/chain.log
R=$HERE/rerun
G=~/.claude/guard/guarded
STAGES=${STAGES:-"fix4 fix3 fix2 c2probe lanes probe"}
ENGINES=${ENGINES:-"chromium"}
say() { echo "$(date +%T) $*" >> "$LOG"; }
ex() { [ "$1" = webkit ] && echo "--exclusive webkit" || echo ""; }
has() { case " $STAGES " in *" $1 "*) return 0;; esac; return 1; }
df -h /System/Volumes/Data | tail -1 | sed 's/^/disk /' >> "$LOG"
one() { # one <dir> <port> <engine> <label> <tree>
  mkdir -p "$HERE/$1/out"
  $G $(ex $3) --timeout 30 -- bash "$HERE/$1/runprobe.sh" "$5" "$2" "$3" "$4" > "$HERE/$1/out/$4-$3.log" 2>&1
  say "$1 $4 $3 exit $?"
}
lane() { # lane <L> <engine>
  local L=$1 E=$2 W=$R/lane-L$1/witness.sh
  case $L in
    1|6) "$W" "$ROOT" 88${L}1 green "$E"; "$W" "$RED" 88${L}2 red "$E" ;;
    4)   "$W" "$ROOT" "$ROOT" 8841 green green "$E"; "$W" "$RED" "$PKG_RED" 8842 red red "$E" ;;
    *)   "$W" "$ROOT" 88${L}1 green green "$E"; "$W" "$RED" 88${L}2 red red "$E" ;;
  esac
  [ $L = 7 ] && node "$R/lane-L7/compare.mjs" "$R/lane-L7/out" > "$R/lane-L7/out/compare-$E.log" 2>&1
  say "lane L$L $E: $(tail -2 "$R/lane-L$L/out/chain.log" | tr '\n' ';')"
}
for E in $ENGINES; do
  if has fix4; then
    mkdir -p "$HERE/fix4-witness/out"
    $G $(ex $E) --timeout 30 -- bash "$HERE/fix4-witness/run.sh" "$E" 8801 green="$ROOT" pre="$ROOT/.cache/f4-pre" red="$RED" > "$HERE/fix4-witness/out/run-$E.log" 2>&1
    say "fix4-witness $E exit $?: $(tail -3 "$HERE/fix4-witness/out/chain.log" | tr '\n' ';')"
  fi
  if has fix3; then
    mkdir -p "$HERE/fix3-witness/out"
    for T in green pre red; do
      case $T in green) TREE=$ROOT;; pre) TREE=$ROOT/.cache/f3-pre;; red) TREE=$RED;; esac
      one fix3-witness 8811 "$E" "$T" "$TREE"
    done
    : > "$HERE/fix3-witness/out/judge-$E.log"
    for T in green pre red; do node "$HERE/fix3-witness/judge.mjs" "$HERE/fix3-witness/out" "$T" "$E" red >> "$HERE/fix3-witness/out/judge-$E.log" 2>&1; done
    say "fix3 judge $E: $(tr '\n' ';' < "$HERE/fix3-witness/out/judge-$E.log")"
  fi
  if has fix2; then one fix2-witness 8821 "$E" green "$ROOT"; one fix2-witness 8822 "$E" red "$RED"; fi
  if has c2probe; then one c2-probe 8831 "$E" green "$ROOT"; one c2-probe 8832 "$E" red "$RED"; fi
  if has lanes; then for L in ${LANES:-1 2 3 4 5 6 7}; do lane $L "$E"; done; fi
  if has probe; then one probe 8891 "$E" green "$ROOT"; one probe 8892 "$E" red "$RED"; fi
done
if has gates; then bash "$HERE/gates.sh"; say "gates: $(grep -c 'exit 0' "$HERE/gates/chain.log") zero exits"; fi
if has e2e; then
  mkdir -p "$HERE/e2e"
  export C3_SPECS="disclosure-rotate.spec.ts SegmentedTabs.glide.spec.ts tabs-std.spec.ts a11y-slider.spec.ts aria-orientation.spec.ts Select.bound.spec.ts overlay-sizing.spec.ts menu-glass.spec.ts config-chassis.spec.ts config-right.spec.ts nav-dock-fix.spec.ts Sheet.position.spec.ts handmark.spec.ts"
  for T in branch v1100; do
    TREE=$([ $T = branch ] && echo "$ROOT" || echo "$RED")
    for E in $ENGINES; do
      if [ $E = chromium ]; then
        ( cd "$TREE" && PI_REPORT=$HERE/e2e/chromium-$T.json GLASS_UI_DEMO_PORT=8881 $G --timeout 45 -- \
          npx playwright test -c tests-visual/playwright.config.ts --project=chromium-headless-new --workers=1 $C3_SPECS ) > "$HERE/e2e/chromium-$T.log" 2>&1
      else
        ( cd "$ROOT" && F2_ROOT=$TREE PI_REPORT=$HERE/e2e/webkit-$T.json GLASS_UI_DEMO_PORT=8882 $G --exclusive webkit --timeout 60 -- \
          npx playwright test -c docs/release-11.1.0/critic-4/e2e-webkit.config.ts --workers=1 ) > "$HERE/e2e/webkit-$T.log" 2>&1
      fi
      say "e2e $E $T exit $?"
    done
  done
fi
say "RUN-DONE stages=[$STAGES] engines=[$ENGINES]"
