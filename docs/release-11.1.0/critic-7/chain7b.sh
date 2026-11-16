#!/usr/bin/env bash
# Critic 7, second chain: this round's own probe (probe10), then chain7.sh's later phases.
#   chain7b.sh <phase>...   phases: p10c p10w + any chain7.sh phase
set -u
HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/../../.." && pwd)
G=~/.claude/guard/guarded; LOG=$HERE/chain.log; RED=$ROOT/.cache/c1-v1100
say() { echo "$(date +%T) $*" >> "$LOG"; }
p10() { # engine trees...
  local E=$1 EX="" p=8781; shift; [ "$E" = webkit ] && EX="--exclusive webkit"
  mkdir -p "$HERE/probe10/out"
  for spec in "$@"; do
    local L=${spec%%=*} T=${spec#*=}
    $G $EX --timeout 40 -- bash "$HERE/probe10/runprobe.sh" "$T" $p "$E" "$L" > "$HERE/probe10/out/$L-$E.log" 2>&1
    say "probe10 $L $E exit $?: $(grep '^VERDICT' "$HERE/probe10/out/$L-$E.log" | tail -1)"
    p=$((p+1))
  done
}
for P in "$@"; do
  case $P in
    p10c) p10 chromium green="$ROOT" red="$RED" v1101="$ROOT/.cache/f7-v1101"; say "PHASE-p10c-DONE";;
    p10w) p10 webkit green="$ROOT" red="$RED"; say "PHASE-p10w-DONE";;
    *) bash "$HERE/chain7.sh" "$P";;
  esac
done
say "CHAIN-B-DONE $*"
