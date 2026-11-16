#!/usr/bin/env bash
# Critic 7 chain: one guarded run at a time (WebKit under --exclusive webkit).
#   chain7.sh <phase>...   phases: wc p9c relc gates e2ec p9w ww relw e2ew redw
set -u
HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/../../.." && pwd)
G=~/.claude/guard/guarded; LOG=$HERE/chain.log; RED=$ROOT/.cache/c1-v1100
say() { echo "$(date +%T) $*" >> "$LOG"; }
disk() { local a; a=$(df -g /System/Volumes/Data | tail -1 | awk '{print $4}'); [ "$a" -lt 6 ] && { say "STOP disk ${a}G free"; exit 9; }; }
p9() { # engine trees...
  local E=$1 EX="" p=8771; shift; [ "$E" = webkit ] && EX="--exclusive webkit"
  mkdir -p "$HERE/probe9/out"
  for spec in "$@"; do
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
  for spec in green="$ROOT" red="$RED"; do
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
    wc) fix6 chromium; STAGES="fix5 fix4 fix3 fix2 lanes" ENGINES=chromium bash "$HERE/run.sh";;
    p9c) p9 chromium green="$ROOT" pre="$ROOT/.cache/f7-pre" red="$RED";;
    relc) mkdir -p "$HERE/release"; $G --timeout 90 -- bash "$HERE/release.sh" ch partA partB g6-4 g6-3 r2 owner fix2 c2 > "$HERE/release/chain-ch.out" 2>&1; say "release ch exit $?: $(tail -1 "$HERE/release/runs.txt")";;
    gates) bash "$HERE/gates.sh" head; say "gates: $(tr '\n' ';' < "$HERE/gates/head/chain.log")";;
    e2ec) STAGES="e2e" ENGINES="chromium" bash "$HERE/run.sh";;
    p9w) p9 webkit green="$ROOT" red="$RED";;
    ww) fix6 webkit; STAGES="lanes fix5 fix4 fix2" ENGINES=webkit bash "$HERE/run.sh"; REDW=1 STAGES="fix3" ENGINES=webkit bash "$HERE/run.sh";;
    relw) mkdir -p "$HERE/release"; $G --exclusive webkit --timeout 90 -- bash "$HERE/release.sh" wk partA partB g6-4 g6-3 r2 owner fix2 c2 > "$HERE/release/chain-wk.out" 2>&1; say "release wk exit $?: $(tail -1 "$HERE/release/runs.txt")";;
    e2ew) STAGES="e2e" ENGINES="webkit" bash "$HERE/run.sh";;
    redw) REDW=1 LANES="1 2 3 4 5" STAGES="lanes fix5 fix4 fix2" ENGINES=webkit bash "$HERE/run.sh";;
  esac
  say "PHASE-$P-DONE"
done
say "CHAIN-DONE $*"
