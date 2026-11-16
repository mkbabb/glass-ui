#!/usr/bin/env bash
# Critic 6 chain: one guarded run at a time. Chromium first (no lock), the committed-tree
# gates, then WebKit under --exclusive webkit, then the touched e2e specs.
#   run6.sh <phase>   phase = chromium | gates | webkit | e2e
set -u
HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/../../.." && pwd)
G=~/.claude/guard/guarded; LOG=$HERE/chain.log
say() { echo "$(date +%T) $*" >> "$LOG"; }
fix6() { # engine
  local E=$1 EX=""; [ "$E" = webkit ] && EX="--exclusive webkit"
  mkdir -p "$HERE/fix6-witness/out"
  local p=8761
  for spec in green="$ROOT" pre="$ROOT/.cache/f6-pre" red="$ROOT/.cache/c1-v1100"; do
    local L=${spec%%=*} T=${spec#*=}
    $G $EX --timeout 25 -- bash "$HERE/fix6-witness/run.sh" "$T" $p "$E" "$L" > "$HERE/fix6-witness/out-$L-$E.txt" 2>&1
    say "fix6-witness $L $E exit $?: $(tail -1 "$HERE/fix6-witness/out-$L-$E.txt")"
    p=$((p+1))
  done
}
case "$1" in
chromium) fix6 chromium; STAGES="fix5 fix4 fix3 fix2 lanes" ENGINES=chromium bash "$HERE/run.sh"; say "PHASE-CHROMIUM-DONE";;
gates)    bash "$HERE/gates.sh"; say "gates: $(tr '\n' ';' < "$HERE/gates/chain.log")"; say "PHASE-GATES-DONE";;
webkit)   fix6 webkit; STAGES="lanes fix5 fix4 fix3 fix2" ENGINES=webkit bash "$HERE/run.sh"; say "PHASE-WEBKIT-DONE";;
e2e)      STAGES="e2e" ENGINES="chromium webkit" bash "$HERE/run.sh"; say "PHASE-E2E-DONE";;
esac
