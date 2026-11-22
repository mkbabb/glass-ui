#!/bin/bash
# Fix seat 10: the exits gate whole as scripts/release.sh runs it, on port 5355.
#   gate.sh <log name>
# (chain.sh's stage 3 logs the gate's exit as 0 whatever it is: its `$?` is read after a
# `$(date)` in the same line. The gate's own log holds its result.)
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/fix-10/logs
start=$(date +%s)
echo "GATE-START $(date +%T) $1 head $(git -C $W rev-parse --short HEAD) load $(sysctl -n vm.loadavg)" >> $L/runs.out
(cd $W && GLASS_UI_DEMO_PORT=5355 npm -w tests-visual run gate:exits > $L/$1.log 2>&1)
rc=$?
echo "$(date +%T) $1 gate:exits exit $rc $(( $(date +%s) - start ))s load=$(sysctl -n vm.loadavg)" >> $L/runs.out
exit $rc
