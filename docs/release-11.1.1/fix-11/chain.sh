#!/bin/bash
# Fix seat 11: row A's cell on the tip (Chromium 390 five times, WebKit 390 three times) and
# on v11.1.0 (once each), the five gates on the committed tree, then the exits gate whole as
# scripts/release.sh runs it, on port 5355. One heavy run at a time, each through the guard.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/fix-11; L=$D/logs
CELL="sheet · a detented Sheet rises into place at its rung's size"
echo "CHAIN-START $(date +%T) head $(git -C $W rev-parse --short HEAD) load $(sysctl -n vm.loadavg)" >> $L/runs.out
bash $D/part.sh tip chromium-phone "$CELL" rowa-tip-cp --repeat-each=5
bash $D/part.sh tip webkit-phone "$CELL" rowa-tip-wp --repeat-each=3
bash $D/part.sh red chromium-phone "$CELL" rowa-red-cp
bash $D/part.sh red webkit-phone "$CELL" rowa-red-wp
bash $D/gates.sh
s=$(date +%s); echo "GATE-START $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
( cd $W && GLASS_UI_DEMO_PORT=5355 npm -w tests-visual run gate:exits ) > $L/gate.log 2>&1
rc=$?
echo "GATE-END $(date +%T) exit $rc $(( $(date +%s) - s ))s load $(sysctl -n vm.loadavg)" >> $L/runs.out
echo "CHAIN-DONE $(date +%T)" >> $L/runs.out
