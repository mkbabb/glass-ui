#!/usr/bin/env bash
# Critic 5, phase B, after phase A: this critic's probe (probe8) in Chromium on both trees;
# then WebKit 2287 (--exclusive webkit): probe8, every witness and probe; then the touched
# e2e specs on both trees in both engines. One guarded run at a time.
HERE=$(cd "$(dirname "$0")" && pwd); cd "$HERE"
ROOT=$(cd "$HERE/../../.." && pwd); RED=$ROOT/.cache/c1-v1100; G=~/.claude/guard/guarded
until grep -q "PHASE-A-DONE" chain.log; do sleep 20; done
pr() { # pr <dir> <engine> <label> <tree> <port>
  mkdir -p "$1/out"
  local EX=""; [ "$2" = webkit ] && EX="--exclusive webkit"
  $G $EX --timeout 30 -- bash "$1/runprobe.sh" "$4" "$5" "$2" "$3" > "$1/out/$3-$2.log" 2>&1; echo "$(date +%T) $1 $3 $2 exit $?" >> chain.log
}
pr probe8 chromium green "$ROOT" 8878
pr probe8 chromium red "$RED" 8879
echo "$(date +%T) PROBE8-CHROMIUM-DONE" >> chain.log
pr probe8 webkit green "$ROOT" 8878
pr probe8 webkit red "$RED" 8879
echo "$(date +%T) PROBE8-WEBKIT-DONE" >> chain.log
STAGES="fix5 fix4 fix3 fix2 c2probe lanes probe" ENGINES=webkit ./run.sh
pr probe4 webkit green "$ROOT" 8871
pr probe4 webkit red "$RED" 8872
pr probe5 webkit green "$ROOT" 8873
pr probe6 webkit green "$ROOT" 8874
pr probe6 webkit red "$RED" 8875
pr probe7 webkit green "$ROOT" 8876
pr probe7 webkit red "$RED" 8877
echo "$(date +%T) WEBKIT-DONE" >> chain.log
STAGES="e2e" ENGINES="chromium webkit" ./run.sh
echo "$(date +%T) PHASE-B-DONE" >> chain.log
