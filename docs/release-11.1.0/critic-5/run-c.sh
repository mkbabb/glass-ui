#!/usr/bin/env bash
# Critic 5, phase C, after phase B: probe8's mount cells (the observer-step reading was
# added after the first Chromium pass) its active-and-hover cells and its active-and-current cells, each with cure cells, in both engines on both trees. One guarded run at a time.
HERE=$(cd "$(dirname "$0")" && pwd); cd "$HERE"
ROOT=$(cd "$HERE/../../.." && pwd); RED=$ROOT/.cache/c1-v1100; G=~/.claude/guard/guarded
until grep -q "PHASE-B-DONE" chain.log; do sleep 20; done
pr() { # pr <engine> <label> <tree> <port>
  local EX=""; [ "$1" = webkit ] && EX="--exclusive webkit"
  ONLY=mount,active,both,dir $G $EX --timeout 30 -- bash probe8/runprobe.sh "$3" "$4" "$1" "$2" > "probe8/out/$2-$1-mount+active+both+dir.log" 2>&1; echo "$(date +%T) probe8 (mount, active, both, dir) $2 $1 exit $?" >> chain.log
}
pr chromium green "$ROOT" 8878
pr chromium red "$RED" 8879
pr webkit green "$ROOT" 8878
pr webkit red "$RED" 8879
echo "$(date +%T) PHASE-C-DONE" >> chain.log
