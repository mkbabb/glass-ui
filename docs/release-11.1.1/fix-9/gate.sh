#!/bin/bash
# Fix seat 9 (fix 8's): the exits gate as scripts/release.sh runs it (npm -w tests-visual run
# gate:exits), on the worktree at its commit, every part on port 5354. A part that fails stops
# it; gate-rest.sh carries on from the next part.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/fix-9/logs
cd $W
echo "$(date +%T) gate start $(git rev-parse --short HEAD) load $(sysctl -n vm.loadavg)" >> $L/gate.out
GLASS_UI_DEMO_PORT=5354 npm -w tests-visual run gate:exits > $L/gate.log 2>&1
rc=$?
echo "$(date +%T) gate exit $rc $(git rev-parse --short HEAD) load $(sysctl -n vm.loadavg)" >> $L/gate.out
exit $rc
