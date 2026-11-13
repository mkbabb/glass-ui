#!/usr/bin/env bash
# Fix 7 chain: one guarded run at a time (WebKit under --exclusive webkit).
#   chain.sh <phase>...   phases: p9c p9w wc ww relc relw e2e
#   wc/ww: the fix 2-6 witnesses and lanes L1-L7, branch and v11.0.0 (run.sh, from critic 6)
set -u
HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/../../.." && pwd)
G=~/.claude/guard/guarded; LOG=$HERE/chain.log
say() { echo "$(date +%T) $*" >> "$LOG"; }
disk() { local a; a=$(df -g /System/Volumes/Data | tail -1 | awk '{print $4}'); [ "$a" -lt 6 ] && { say "STOP disk ${a}G free"; exit 9; }; }
p9() { # engine
  local E=$1 EX="" p=8771; [ "$E" = webkit ] && EX="--exclusive webkit"
  mkdir -p "$HERE/probe9/out"
  for spec in green="$ROOT" pre="$ROOT/.cache/f7-pre" red="$ROOT/.cache/c1-v1100" v1101="$ROOT/.cache/f7-v1101"; do
    local L=${spec%%=*} T=${spec#*=}
    disk
    $G $EX --timeout 30 -- bash "$HERE/probe9/runprobe.sh" "$T" $p "$E" "$L" > "$HERE/probe9/out/$L-$E.log" 2>&1
    say "probe9 $L $E exit $?: $(grep '^VERDICT' "$HERE/probe9/out/$L-$E.log" | tail -1)"
    p=$((p+1))
  done
}
fix6() { # engine
  local E=$1 EX="" p=8761; [ "$E" = webkit ] && EX="--exclusive webkit"
  mkdir -p "$HERE/fix6-witness/out"
  for spec in green="$ROOT" red="$ROOT/.cache/c1-v1100"; do
    local L=${spec%%=*} T=${spec#*=}
    disk
    $G $EX --timeout 25 -- bash "$HERE/fix6-witness/run.sh" "$T" $p "$E" "$L" > "$HERE/fix6-witness/out-$L-$E.txt" 2>&1
    say "fix6-witness $L $E exit $?: $(tail -1 "$HERE/fix6-witness/out-$L-$E.txt")"
    p=$((p+1))
  done
}
for P in "$@"; do
  disk
  case $P in
    p9c) p9 chromium; say "PHASE-P9C-DONE";;
    p9w) p9 webkit; say "PHASE-P9W-DONE";;
    wc) fix6 chromium; STAGES="fix5 fix4 fix3 fix2 lanes" ENGINES=chromium bash "$HERE/run.sh"; say "PHASE-WC-DONE";;
    ww) fix6 webkit; STAGES="lanes fix5 fix4 fix3 fix2" ENGINES=webkit bash "$HERE/run.sh"; say "PHASE-WW-DONE";;
    relc) $G --timeout 90 -- bash "$HERE/release.sh" ch partA partB g6-4 g6-3 r2 owner fix2 c2 > "$HERE/release/chain-ch.out" 2>&1; say "release ch exit $?: $(tail -1 "$HERE/release/runs.txt")"; say "PHASE-RELC-DONE";;
    relw) $G --exclusive webkit --timeout 90 -- bash "$HERE/release.sh" wk partA partB g6-4 g6-3 r2 owner fix2 c2 > "$HERE/release/chain-wk.out" 2>&1; say "release wk exit $?: $(tail -1 "$HERE/release/runs.txt")"; say "PHASE-RELW-DONE";;
    e2e) STAGES="e2e" ENGINES="chromium webkit" bash "$HERE/run.sh"; say "PHASE-E2E-DONE";;
  esac
done
say "CHAIN-DONE $*"
