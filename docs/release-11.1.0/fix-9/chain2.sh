#!/usr/bin/env bash
# Fix 9, second chain: the dock search page witness, partB's rerun, the gates. One guarded run at a time.
set -u
HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/../../.." && pwd)
G=~/.claude/guard/guarded; LOG=$HERE/chain.log
say() { echo "$(date +%T) $*" >> "$LOG"; }
disk() { local a; a=$(df -g /System/Volumes/Data | tail -1 | awk '{print $4}'); say "disk ${a}G free, load $(uptime | sed 's/.*averages: //')"; [ "$a" -lt 6 ] && { say "STOP disk"; exit 9; }; }
refused() { grep -rIl '\[guarded\] REFUSED' "$HERE" --include='*.log' --include='*.txt' --include='*.out' 2>/dev/null | grep -q . && { say "STOP: guarded REFUSED"; exit 75; }; }
st() { # engine label tree port
  local EX=""; [ "$1" = webkit ] && EX="--exclusive webkit"; disk
  $G $EX --timeout 25 -- bash "$HERE/searchthrow/runprobe.sh" "$3" $4 "$1" "$2" > "$HERE/searchthrow/out-$2-$1.log" 2>&1
  say "searchthrow $2 $1 exit $?: $(grep '^VERDICT' "$HERE/searchthrow/out-$2-$1.log")"; refused
}
for P in "$@"; do
  case $P in
    stc) st chromium green "$ROOT" 8991; st chromium pre "$ROOT/.cache/f9-pre" 8992; st chromium v1101 "$ROOT/.cache/f7-v1101" 8993;;
    stw) st webkit green "$ROOT" 8994; st webkit pre "$ROOT/.cache/f9-pre" 8995;;
    pbc) disk; $G --timeout 40 -- bash "$HERE/release.sh" ch partB > "$HERE/release/chain-ch-partB-rerun.out" 2>&1; say "partB ch rerun exit $?: $(tail -2 "$HERE/release/runs.txt" | tr '\n' ';')"; refused;;
    gates) rm -rf "$HERE/gates"; bash "$HERE/gates.sh"; say "gates2: $(tr '\n' ';' < "$HERE/gates/chain.log")";;
  esac
  say "PHASE2-$P-DONE"
done
say "CHAIN2-DONE $*"
