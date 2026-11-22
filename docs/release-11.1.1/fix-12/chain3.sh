#!/bin/bash
# Fix seat 12, resumed: the five gates on the committed tree (gates.sh), then the exits gate
# whole as scripts/release.sh runs it, on port 5355. One heavy run at a time, each through the
# guard (gate.sh guards each of its own sixteen runs).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/fix-12; L=$D/logs
echo "CHAIN3-START $(date +%T) head $(git -C $W rev-parse --short HEAD) load $(sysctl -n vm.loadavg)" >> $L/runs.out
bash $D/gates.sh
s=$(date +%s); echo "GATE-START $(date +%T) head $(git -C $W rev-parse --short HEAD) load $(sysctl -n vm.loadavg)" >> $L/runs.out
( cd $W && GLASS_UI_DEMO_PORT=5355 npm -w tests-visual run gate:exits ) > $L/gate.log 2>&1
rc=$?
echo "GATE-END $(date +%T) exit $rc $(( $(date +%s) - s ))s load $(sysctl -n vm.loadavg)" >> $L/runs.out
echo "CHAIN3-DONE $(date +%T)" >> $L/runs.out
