#!/usr/bin/env bash
# The 11.1.0 close chain (critic 10's, on the merged tree): one guarded run
# at a time, WebKit under --exclusive webkit. A guarded REFUSED anywhere under close/
# stops the chain before the next phase.
#   chain.sh <phase>...
#   p11c p11w  probe11 on the tip and on the pre-fix tree (.cache/f9-pre = 432cbefda)
#   p10c p10w  probe10 on the tip
#   l6c l6w    lane L6 (the dock in every posture) on the tip
#   l7w        lane L7 in WebKit, the corrected reader
#   relc relw  release-10-1-3, -10-1-5 (A, B), -11-0-1, -fix-2, -critic-2
#   gates      build, typecheck, demo:dist:build, vitest, verify:package
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
rel() { # ch|wk steps...
  local E=$1; shift; mkdir -p "$HERE/release"; disk
  $G $([ "$E" = wk ] && echo "--exclusive webkit") --timeout 90 -- bash "$HERE/release.sh" "$E" "$@" > "$HERE/release/chain-$E-$1.out" 2>&1
  say "release $E $* exit $?: $(tail -2 "$HERE/release/runs.txt" | tr '\n' ';')"; refused
}
for P in "$@"; do
  disk; refused
  case $P in
    p11c) p probe11 chromium 9051 green="$ROOT";;
    p11w) p probe11 webkit 9051 green="$ROOT";;
    p10c) p probe10 chromium 9041 green="$ROOT";;
    p10w) p probe10 webkit 9041 green="$ROOT";;
    l6c|l6w) E=$([ $P = l6w ] && echo webkit || echo chromium)
      "$HERE/rerun/lane-L6/witness.sh" "$ROOT" 9061 green "$E" > "$HERE/rerun/lane-L6/run-$E.log" 2>&1
      say "lane L6 $E: $(tail -1 "$HERE/rerun/lane-L6/out/chain.log" | tr '\n' ';') $(tail -1 "$HERE/rerun/lane-L6/out/green-$E.log")"; refused;;
    l1c|l1w|l2c|l2w|l3c|l3w|l4c|l4w|l5c|l5w|l7c) L=${P:1:1}; E=$([ "${P:2:1}" = w ] && echo webkit || echo chromium); W=$HERE/rerun/lane-L$L/witness.sh
      case $L in
        1) "$W" "$ROOT" 97${L}1 green "$E";;
        4) "$W" "$ROOT" "$ROOT" 97${L}1 green green "$E";;
        *) "$W" "$ROOT" 97${L}1 green green "$E";;
      esac > "$HERE/rerun/lane-L$L/run-$E.log" 2>&1
      say "lane L$L $E: $(tail -1 "$HERE/rerun/lane-L$L/out/chain.log" | tr '\n' ';') $(tail -1 "$HERE/rerun/lane-L$L/out/green-$E.log")"; refused;;
    l7w) "$HERE/rerun/lane-L7/witness.sh" "$ROOT" 9071 green green webkit > "$HERE/rerun/lane-L7/run-webkit.log" 2>&1
      say "lane L7 webkit: $(tail -1 "$HERE/rerun/lane-L7/out/chain.log" | tr '\n' ';') $(tail -1 "$HERE/rerun/lane-L7/out/green-webkit.log")"; refused;;
    relc) rel ch r2 g6-4 g6-3 partA partB owner fix2 c2 r1102 r1102b roloop;;
    relw) rel wk r2 g6-4 g6-3 partA partB owner fix2 c2 r1102 r1102b roloop;;
    gates) bash "$HERE/gates.sh" lib; say "gates lib: $(tail -8 "$HERE/gates/chain.log" | tr '\n' ';')"; refused;;
    floors) bash "$HERE/gates.sh" browser; say "gates browser: $(tail -6 "$HERE/gates/chain.log" | tr '\n' ';')"; refused;;
    arch) $G --timeout 40 -- bash "$HERE/archive-gates.sh" "${ARCH_LABEL:-final}" > "$HERE/archive-${ARCH_LABEL:-final}.out" 2>&1
      say "archive gates exit $?: $(tr '\n' ';' < "$HERE/gates-archive-${ARCH_LABEL:-final}/gates.txt")"; refused;;
    stc) p searchthrow chromium 9091 green="$ROOT";;
    stw) p searchthrow webkit 9091 green="$ROOT";;
    *) say "unknown phase $P";;
  esac
  say "PHASE-$P-DONE"
done
say "CHAIN-DONE $*"
