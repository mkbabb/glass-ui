#!/usr/bin/env bash
# Critic 4 chain, third driver. run-all2.sh was stopped while its gates stage ran (that
# stage runs to its end) so the run-mark probe the orchestrator asked for at 10:25
# (orchestrator-note-mark-press.md) could join the chain. Order: the run-mark probe in
# Chromium, then WebKit 2287 (the second probe, the run-mark probe, every witness), then
# the touched e2e specs in both engines. One guarded run at a time.
HERE=$(cd "$(dirname "$0")" && pwd); cd "$HERE"
ROOT=$(cd "$HERE/../../.." && pwd); RED=$ROOT/.cache/c1-v1100
G=~/.claude/guard/guarded
until grep -q "RUN-DONE stages=\[gates\]" chain.log; do sleep 20; done
echo "$(date +%T) GATES-DONE" >> chain.log
pr() { # pr <dir> <engine> <label> <tree> <port>
  mkdir -p "$1/out"
  local EX=""; [ "$2" = webkit ] && EX="--exclusive webkit"
  $G $EX --timeout 30 -- bash "$1/runprobe.sh" "$4" "$5" "$2" "$3" > "$1/out/$3-$2.log" 2>&1; echo "$(date +%T) $1 $3 $2 exit $?" >> chain.log
}
pr probe5 chromium green "$ROOT" 8873
pr probe4 webkit green "$ROOT" 8871
pr probe4 webkit red "$RED" 8872
pr probe5 webkit green "$ROOT" 8873
STAGES="fix4 probe fix3 fix2 c2probe lanes" ENGINES=webkit ./run.sh
echo "$(date +%T) WEBKIT-DONE" >> chain.log
STAGES="e2e" ENGINES="chromium webkit" ./run.sh
echo "$(date +%T) PHASE-B-DONE" >> chain.log
