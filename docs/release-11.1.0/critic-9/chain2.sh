#!/usr/bin/env bash
# Critic 9, second chain: this round's own probe12 (the plate under the ancestors fix 9's
# record left unread). One guarded run at a time, WebKit under --exclusive webkit.
#   chain2.sh <phase>...   p12c (tip, pre-fix, v11.0.1 in Chromium)  p12w (tip, pre-fix in WebKit)
set -u
HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/../../.." && pwd)
G=~/.claude/guard/guarded; LOG=$HERE/chain.log; PRE=$ROOT/.cache/f9-pre; V1101=$ROOT/.cache/f7-v1101
say() { echo "$(date +%T) $*" >> "$LOG"; }
disk() { local a; a=$(df -g /System/Volumes/Data | tail -1 | awk '{print $4}'); say "disk ${a}G free, load $(uptime | sed 's/.*averages: //')"; [ "$a" -lt 6 ] && { say "STOP disk"; exit 9; }; }
refused() { grep -rIl '\[guarded\] REFUSED' "$HERE" --include='*.log' --include='*.txt' --include='*.out' 2>/dev/null | grep -q . && { say "STOP: guarded REFUSED: $(grep -rIh '\[guarded\] REFUSED' "$HERE" --include='*.log' --include='*.txt' --include='*.out' | head -1)"; exit 75; }; }
p() { # engine port label=tree...
  local E=$1 pt=$2; shift 2
  mkdir -p "$HERE/probe12/out"
  for spec in "$@"; do
    local L=${spec%%=*} T=${spec#*=}
    disk
    $G $([ "$E" = webkit ] && echo "--exclusive webkit") --timeout 30 -- bash "$HERE/probe12/runprobe.sh" "$T" $pt "$E" "$L" > "$HERE/probe12/out/$L-$E.log" 2>&1
    say "probe12 $L $E exit $?: $(grep '^VERDICT' "$HERE/probe12/out/$L-$E.log" | tail -1)"
    pt=$((pt+1)); refused
  done
}
for P in "$@"; do
  disk; refused
  case $P in
    p12c) p chromium 9081 green="$ROOT" pre="$PRE" v1101="$V1101";;
    p12w) p webkit 9081 green="$ROOT" pre="$PRE";;
  esac
  say "PHASE2-$P-DONE"
done
say "CHAIN2-DONE $*"
