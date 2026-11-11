#!/usr/bin/env bash
# Critic 2 driver, second half (run-all.sh was stopped while its first WebKit run waited
# on the lock): the critic's own probe in Chromium on both trees, then every WebKit
# stage (fix-2 witness, lane witnesses, the critic's probe), then the touched e2e specs.
# One run at a time; every WebKit run waits on the machine-wide lock for as long as it takes.
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../../.." && pwd); RED=$ROOT/.cache/c1-v1100; G=~/.claude/guard/guarded
probe() { # probe <engine>
  local E=$1
  for T in green red; do
    TREE=$([ $T = green ] && echo "$ROOT" || echo "$RED")
    EX=$([ $E = webkit ] && echo "--exclusive webkit" || echo "")
    $G $EX --timeout 30 -- bash "$HERE/probe/runprobe.sh" "$TREE" 8691 "$E" "$T" > "$HERE/probe/out/$T-$E.log" 2>&1
    echo "$(date +%T) critic probe $T $E exit $?" >> "$HERE/chain.log"
  done
}
probe chromium
STAGES="witness" W_ENGINES=webkit bash "$HERE/chain.sh"
probe webkit
STAGES="l2 lanes-webkit" L2_ENGINES=webkit WLANES="6 1 3 4 5 7" bash "$HERE/chain.sh"
STAGES="e2e" bash "$HERE/chain.sh"
echo "$(date +%T) RUN-2-DONE" >> "$HERE/chain.log"
