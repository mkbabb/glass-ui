#!/usr/bin/env bash
# Critic 4 chain, fourth and last driver. run-all3.sh was stopped after the run-mark probe
# read a size that depends on how the seat was activated, so a paint probe of that (probe6)
# could run next. The WebKit run of the second probe that run-all3 had started runs to its
# end first and is then taken again here, so every WebKit result has a logged exit.
# Order: probe6 in Chromium on both trees; WebKit 2287: the second probe, the run-mark
# probes, every witness; then the touched e2e specs in both engines. One guarded run at a time.
HERE=$(cd "$(dirname "$0")" && pwd); cd "$HERE"
ROOT=$(cd "$HERE/../../.." && pwd); RED=$ROOT/.cache/c1-v1100
G=~/.claude/guard/guarded
while pgrep -f "critic-4/probe4/runprobe.sh" > /dev/null; do sleep 15; done
echo "$(date +%T) run-all3's last run has ended; run-all4 begins" >> chain.log
pr() { # pr <dir> <engine> <label> <tree> <port>
  mkdir -p "$1/out"
  local EX=""; [ "$2" = webkit ] && EX="--exclusive webkit"
  $G $EX --timeout 30 -- bash "$1/runprobe.sh" "$4" "$5" "$2" "$3" > "$1/out/$3-$2.log" 2>&1; echo "$(date +%T) $1 $3 $2 exit $?" >> chain.log
}
pr probe6 chromium green "$ROOT" 8874
pr probe6 chromium red "$RED" 8875
echo "$(date +%T) PROBE6-CHROMIUM-DONE" >> chain.log
pr probe4 webkit green "$ROOT" 8871
pr probe4 webkit red "$RED" 8872
pr probe5 webkit green "$ROOT" 8873
pr probe6 webkit green "$ROOT" 8874
pr probe6 webkit red "$RED" 8875
echo "$(date +%T) PROBES-WEBKIT-DONE" >> chain.log
STAGES="fix4 probe fix3 fix2 c2probe lanes" ENGINES=webkit ./run.sh
echo "$(date +%T) WEBKIT-DONE" >> chain.log
STAGES="e2e" ENGINES="chromium webkit" ./run.sh
echo "$(date +%T) PHASE-B-DONE" >> chain.log
