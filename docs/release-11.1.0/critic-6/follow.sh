#!/usr/bin/env bash
# Critic 6 follower: after a marker line, run the next phases one guarded run at a time.
#   follow.sh <marker> <phase>...     phases: p9c p9w gates webkit e2e
set -u
HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/../../.." && pwd); G=~/.claude/guard/guarded; LOG=$HERE/chain.log
say() { echo "$(date +%T) $*" >> "$LOG"; }
M=$1; shift
until grep -qE "^[0-9:]{8} $M\$" "$LOG" 2>/dev/null; do sleep 30; done
p9() { # engine
  local E=$1 EX="" p=8771; [ "$E" = webkit ] && EX="--exclusive webkit"
  mkdir -p "$HERE/probe9/out"
  for spec in green="$ROOT" pre="$ROOT/.cache/f6-pre" red="$ROOT/.cache/c1-v1100"; do
    local L=${spec%%=*} T=${spec#*=}
    $G $EX --timeout 30 -- bash "$HERE/probe9/runprobe.sh" "$T" $p "$E" "$L" > "$HERE/probe9/out/$L-$E.log" 2>&1
    say "probe9 $L $E exit $?: $(tail -1 "$HERE/probe9/out/$L-$E.log" | cut -c1-120)"
    p=$((p+1))
  done
}
for P in "$@"; do
  case $P in
    p9c) p9 chromium; say "PHASE-P9C-DONE";;
    p9w) p9 webkit; say "PHASE-P9W-DONE";;
    gates|webkit|e2e) bash "$HERE/run6.sh" $P;;
  esac
done
say "FOLLOW-DONE $*"
