#!/usr/bin/env bash
# Fix 8 chain: one guarded run at a time (WebKit under --exclusive webkit).
#   chain.sh <phase>...   phases: p10c p10w l1c l1w l7c l7w g63c g63w gates
#   p10*: critic 7's probe10 (fix-8/probe10): the branch in full; the pre-fix tree
#         (.cache/f8-pre, git archive of the commit before fix 8), v11.0.0 and v11.0.1 on `tick`.
set -u
HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/../../.." && pwd)
G=~/.claude/guard/guarded; LOG=$HERE/chain.log
RED=$ROOT/.cache/c1-v1100
say() { echo "$(date +%T) $*" >> "$LOG"; }
disk() { local a; a=$(df -g /System/Volumes/Data | tail -1 | awk '{print $4}'); [ "$a" -lt 6 ] && { say "STOP disk ${a}G free"; exit 9; }; }
ex() { [ "$1" = webkit ] && echo "--exclusive webkit" || echo ""; }
p10() { # engine
  local E=$1 p=8781
  mkdir -p "$HERE/probe10/out"
  for spec in green="$ROOT" pre="$ROOT/.cache/f8-pre" red="$RED" v1101="$ROOT/.cache/f7-v1101"; do
    local L=${spec%%=*} T=${spec#*=} O=tick
    [ $L = green ] && O=""
    disk
    ONLY=$O $G $(ex $E) --timeout 40 -- bash "$HERE/probe10/runprobe.sh" "$T" $p "$E" "$L" > "$HERE/probe10/out/$L-$E.log" 2>&1
    say "probe10 $L $E exit $?: $(grep '^VERDICT' "$HERE/probe10/out/$L-$E.log" | tail -1)"
    p=$((p+1))
  done
}
g63() { # engine
  local E=$1 CFG
  if [ $E = webkit ]; then CFG="-c tests-visual/release-11-0-1-critic-2.config.ts --project=webkit"; export GLASS_UI_DEMO_PORT=5494
  else CFG="-c tests-visual/playwright.config.ts --project=chromium-headless-new"; export GLASS_UI_DEMO_PORT=5493; fi
  export GLASS_UI_DEMO_URL=http://localhost:$GLASS_UI_DEMO_PORT
  mkdir -p "$HERE/release"; disk
  ( cd "$ROOT" && PI_REPORT=$HERE/release/g6-3-$E.json $G $(ex $E) --timeout 30 -- npx playwright test $CFG release-10-1-3.spec.ts --workers=1 ) > "$HERE/release/g6-3-$E.log" 2>&1
  say "release-10-1-3 $E exit $?: $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' "$HERE/release/g6-3-$E.log" | tr -s ' ' | tr '\n' ' ')"
}
for P in "$@"; do
  disk
  case $P in
    p10c) p10 chromium;; p10w) p10 webkit;;
    l1c|l1w) E=$([ $P = l1c ] && echo chromium || echo webkit); bash "$HERE/rerun/lane-L1/witness.sh" "$ROOT" 8851 green $E; say "lane L1 $E: $(tail -1 "$HERE/rerun/lane-L1/out/chain.log")";;
    l7c|l7w) E=$([ $P = l7c ] && echo chromium || echo webkit); bash "$HERE/rerun/lane-L7/witness.sh" "$ROOT" 8871 green green $E; bash "$HERE/rerun/lane-L7/witness.sh" "$RED" 8872 red red $E; say "lane L7 $E: $(tail -2 "$HERE/rerun/lane-L7/out/chain.log" | tr '\n' ';')";;
    g63c) g63 chromium;; g63w) g63 webkit;;
    gates) bash "$HERE/gates.sh" head; say "gates: $(tr '\n' ';' < "$HERE/gates/head/chain.log")";;
  esac
  say "PHASE-$P-DONE"
done
say "CHAIN-DONE $*"
