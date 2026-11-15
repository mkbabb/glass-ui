#!/usr/bin/env bash
# Fix 9 chain: one guarded run at a time (WebKit under --exclusive webkit). A guarded
# REFUSED anywhere under fix-9/ stops the chain before the next phase.
#   chain.sh <phase>...
#   phases: p11c p11w (probe11: branch + pre-fix), p10c p10w, p9c p9w, f6c f6w, f5c f5w,
#           l1c l1w (lane L1 witness), relc relw (release-10-1-3, -10-1-5, -11-0-1 specs), gates
set -u
HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/../../.." && pwd)
G=~/.claude/guard/guarded; LOG=$HERE/chain.log; PRE=$ROOT/.cache/f9-pre
say() { echo "$(date +%T) $*" >> "$LOG"; }
disk() { local a; a=$(df -g /System/Volumes/Data | tail -1 | awk '{print $4}'); say "disk ${a}G free, load $(uptime | sed 's/.*averages: //')"; [ "$a" -lt 6 ] && { say "STOP disk"; exit 9; }; }
refused() { grep -rIl '\[guarded\] REFUSED' "$HERE" --include='*.log' --include='*.txt' --include='*.out' 2>/dev/null | grep -q . && { say "STOP: guarded REFUSED: $(grep -rIh '\[guarded\] REFUSED' "$HERE" --include='*.log' --include='*.txt' --include='*.out' | head -1)"; exit 75; }; }
ex() { [ "$1" = webkit ] && echo "--exclusive webkit" || echo ""; }
p() { # dir engine port label=tree...
  local D=$1 E=$2 pt=$3; shift 3
  mkdir -p "$HERE/$D/out"
  for spec in "$@"; do
    local L=${spec%%=*} T=${spec#*=}
    disk
    $G $(ex $E) --timeout 40 -- bash "$HERE/$D/runprobe.sh" "$T" $pt "$E" "$L" > "$HERE/$D/out/$L-$E.log" 2>&1
    say "$D $L $E exit $?: $(grep '^VERDICT' "$HERE/$D/out/$L-$E.log" | tail -1)"
    pt=$((pt+1)); refused
  done
}
f6() { # engine
  local E=$1; mkdir -p "$HERE/fix6-witness/out"; disk
  $G $(ex $E) --timeout 25 -- bash "$HERE/fix6-witness/run.sh" "$ROOT" 8961 "$E" green > "$HERE/fix6-witness/out-green-$E.txt" 2>&1
  say "fix6-witness green $E exit $?: $(tail -1 "$HERE/fix6-witness/out-green-$E.txt")"; refused
}
f5() { # engine
  local E=$1; mkdir -p "$HERE/fix5-witness/out"; disk
  $G $(ex $E) --timeout 40 -- bash "$HERE/fix5-witness/run.sh" "$E" 8971 green="$ROOT" > "$HERE/fix5-witness/out/run-$E.log" 2>&1
  say "fix5-witness $E exit $?: $(tail -1 "$HERE/fix5-witness/out/chain.log" | tr '\n' ';')"; refused
}
l1() { # engine
  local E=$1 W=$HERE/lane-L1/witness.sh; disk
  "$W" "$ROOT" 8981 green "$E" > "$HERE/lane-L1/run-$E.log" 2>&1  
  say "lane L1 $E exit $?: $(tail -1 "$HERE/lane-L1/out/chain.log" 2>/dev/null | tr '\n' ';')"; refused
}
rel() { # ch|wk steps...
  local E=$1; shift; mkdir -p "$HERE/release"; disk
  $G $([ "$E" = wk ] && echo "--exclusive webkit") --timeout 90 -- bash "$HERE/release.sh" "$E" "$@" > "$HERE/release/chain-$E-$1.out" 2>&1
  say "release $E $* exit $?: $(tail -2 "$HERE/release/runs.txt" | tr '\n' ';')"; refused
}
for P in "$@"; do
  disk; refused
  case $P in
    p11c) p probe11 chromium 8951 green="$ROOT" pre="$PRE";;
    p11w) p probe11 webkit 8951 green="$ROOT" pre="$PRE";;
    p10c) p probe10 chromium 8941 green="$ROOT";;
    p10w) p probe10 webkit 8941 green="$ROOT";;
    p9c) p probe9 chromium 8931 green="$ROOT";;
    p9w) p probe9 webkit 8931 green="$ROOT";;
    f6c) f6 chromium;; f6w) f6 webkit;;
    f5c) f5 chromium;; f5w) f5 webkit;;
    l1c) l1 chromium;; l1w) l1 webkit;;
    relc) rel ch g6-3 partA partB owner fix2 c2;;
    relw) rel wk g6-3 partA partB owner fix2 c2;;
    l2c|l2w|l7c|l7w) L=${P:1:1}; E=$([ "${P:2:1}" = w ] && echo webkit || echo chromium); disk
      "$HERE/rerun/lane-L$L/witness.sh" "$ROOT" 89${L}1 green green "$E" > "$HERE/rerun/lane-L$L/run-$E.log" 2>&1
      say "lane L$L $E: $(tail -1 "$HERE/rerun/lane-L$L/out/chain.log" | tr '\n' ';') $(tail -1 "$HERE/rerun/lane-L$L/out/green-$E.log")"; refused;;
    gates) bash "$HERE/gates.sh"; say "gates: $(tr '\n' ';' < "$HERE/gates/chain.log")";;
  esac
  say "PHASE-$P-DONE"
done
say "CHAIN-DONE $*"
