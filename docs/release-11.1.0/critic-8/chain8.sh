#!/usr/bin/env bash
# Critic 8 chain: one guarded run at a time (WebKit under --exclusive webkit). A guarded
# REFUSED anywhere under critic-8/ stops the chain before the next phase.
#   chain8.sh <phase>...   phases: wc p9c p10c relc gates e2ec p9w p10w ww relw1 relw2 e2ew
set -u
HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/../../.." && pwd)
G=~/.claude/guard/guarded; LOG=$HERE/chain.log; RED=$ROOT/.cache/c1-v1100
say() { echo "$(date +%T) $*" >> "$LOG"; }
disk() { local a; a=$(df -g /System/Volumes/Data | tail -1 | awk '{print $4}'); say "disk ${a}G free, load $(uptime | sed 's/.*averages: //')"; [ "$a" -lt 6 ] && { say "STOP disk"; exit 9; }; }
refused() { grep -rIl '\[guarded\] REFUSED' "$HERE" --include='*.log' --include='*.txt' --include='*.out' 2>/dev/null | head -3 | grep -q . && { say "STOP: guarded REFUSED: $(grep -rIh '\[guarded\] REFUSED' "$HERE" --include='*.log' --include='*.txt' --include='*.out' | head -1)"; exit 75; }; }
p() { # dir engine port trees...
  local D=$1 E=$2 pt=$3 EX=""; shift 3; [ "$E" = webkit ] && EX="--exclusive webkit"
  mkdir -p "$HERE/$D/out"
  for spec in "$@"; do
    local L=${spec%%=*} T=${spec#*=} O=""
    case $L in pre|red|v1101) [ $D = probe10 ] && O=tick;; esac
    disk
    ONLY=$O $G $EX --timeout 40 -- bash "$HERE/$D/runprobe.sh" "$T" $pt "$E" "$L" > "$HERE/$D/out/$L-$E.log" 2>&1
    say "$D $L $E exit $?: $(grep '^VERDICT' "$HERE/$D/out/$L-$E.log" | tail -1)"
    pt=$((pt+1)); refused
  done
}
fix6() { # engine
  local E=$1 EX="" pt=8761; [ "$E" = webkit ] && EX="--exclusive webkit"
  mkdir -p "$HERE/fix6-witness/out"
  for spec in green="$ROOT" red="$RED"; do
    local L=${spec%%=*} T=${spec#*=}
    disk
    $G $EX --timeout 25 -- bash "$HERE/fix6-witness/run.sh" "$T" $pt "$E" "$L" > "$HERE/fix6-witness/out-$L-$E.txt" 2>&1
    say "fix6-witness $L $E exit $?: $(tail -1 "$HERE/fix6-witness/out-$L-$E.txt")"
    pt=$((pt+1)); refused
  done
}
for P in "$@"; do
  disk; refused
  case $P in
    wc) fix6 chromium; STAGES="fix5 fix4 fix3 fix2 lanes" ENGINES=chromium bash "$HERE/run.sh";;
    p9c) p probe9 chromium 8771 green="$ROOT" red="$RED";;
    p10c) p probe10 chromium 8781 green="$ROOT" pre="$ROOT/.cache/f8-pre";;
    p11c) p probe11 chromium 8751 green="$ROOT" red="$RED" v1101="$ROOT/.cache/f7-v1101";;
    relc) mkdir -p "$HERE/release"; $G --timeout 90 -- bash "$HERE/release.sh" ch partA partB g6-4 g6-3 r2 owner fix2 c2 > "$HERE/release/chain-ch.out" 2>&1; say "release ch exit $?: $(tail -1 "$HERE/release/runs.txt")";;
    g63c) mkdir -p "$HERE/release-rerun"; ( cd "$ROOT" && GLASS_UI_DEMO_PORT=5493 GLASS_UI_DEMO_URL=http://localhost:5493 PI_REPORT=$HERE/release-rerun/g6-3-ch.json $G --timeout 30 -- npx playwright test -c tests-visual/playwright.config.ts --project=chromium-headless-new release-10-1-3.spec.ts --workers=1 ) > "$HERE/release-rerun/g6-3-ch.log" 2>&1; say "release-10-1-3 chromium rerun exit $?: load $(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' "$HERE/release-rerun/g6-3-ch.log" | tr -s ' ' | tr '\n' ' ')";;
    gates) bash "$HERE/gates.sh" head; say "gates: $(tr '\n' ';' < "$HERE/gates/head/chain.log")";;
    e2ec) STAGES="e2e" ENGINES="chromium" bash "$HERE/run.sh";;
    p9w) p probe9 webkit 8771 green="$ROOT" red="$RED";;
    p10w) p probe10 webkit 8781 green="$ROOT" pre="$ROOT/.cache/f8-pre";;
    p11w) p probe11 webkit 8751 green="$ROOT" red="$RED" v1101="$ROOT/.cache/f7-v1101";;
    ww) fix6 webkit; REDW=1 STAGES="fix5 fix4 fix3 fix2 lanes" ENGINES=webkit bash "$HERE/run.sh";;
    relw1) mkdir -p "$HERE/release"; $G --exclusive webkit --timeout 90 -- bash "$HERE/release.sh" wk partA partB g6-4 > "$HERE/release/chain-wk-1.out" 2>&1; say "release wk-1 exit $?: $(tail -1 "$HERE/release/runs.txt")";;
    relw2) $G --exclusive webkit --timeout 90 -- bash "$HERE/release.sh" wk g6-3 r2 owner fix2 c2 > "$HERE/release/chain-wk-2.out" 2>&1; say "release wk-2 exit $?: $(tail -1 "$HERE/release/runs.txt")";;
    e2ew) STAGES="e2e" ENGINES="webkit" bash "$HERE/run.sh";;
  esac
  say "PHASE-$P-DONE"
done
say "CHAIN-DONE $*"
