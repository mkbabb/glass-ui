#!/usr/bin/env bash
# Critic 5, phase A: the committed-tree gates (one heavy run), then every witness and probe
# in headless Chromium on its trees. One guarded run at a time.
HERE=$(cd "$(dirname "$0")" && pwd); cd "$HERE"
ROOT=$(cd "$HERE/../../.." && pwd); RED=$ROOT/.cache/c1-v1100; G=~/.claude/guard/guarded
echo "$(date +%T) phase A begins at $(git -C "$ROOT" rev-parse --short HEAD)" >> chain.log
STAGES="gates" ./run.sh
echo "$(date +%T) GATES-DONE" >> chain.log
STAGES="fix5 fix4 fix3 fix2 c2probe lanes probe" ENGINES=chromium ./run.sh
pr() { # pr <dir> <engine> <label> <tree> <port>
  mkdir -p "$1/out"
  local EX=""; [ "$2" = webkit ] && EX="--exclusive webkit"
  $G $EX --timeout 30 -- bash "$1/runprobe.sh" "$4" "$5" "$2" "$3" > "$1/out/$3-$2.log" 2>&1; echo "$(date +%T) $1 $3 $2 exit $?" >> chain.log
}
pr probe4 chromium green "$ROOT" 8871
pr probe4 chromium red "$RED" 8872
pr probe5 chromium green "$ROOT" 8873
pr probe6 chromium green "$ROOT" 8874
pr probe6 chromium red "$RED" 8875
pr probe7 chromium green "$ROOT" 8876
pr probe7 chromium red "$RED" 8877
echo "$(date +%T) PHASE-A-DONE" >> chain.log
