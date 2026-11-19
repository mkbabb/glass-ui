#!/bin/bash
# Fix seat 7: the exits gate as scripts/release.sh runs it, on the worktree at its commit,
# on port 5354; a part that fails stops it, and gate-rest.sh carries on from the next part.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/fix-7/logs
cd $W
echo "$(date +%T) gate start $(git rev-parse --short HEAD)" >> $L/gate.out
GLASS_UI_DEMO_PORT=5354 npm -w tests-visual run gate:exits > $L/gate.log 2>&1
rc=$?
echo "$(date +%T) gate exit $rc $(git rev-parse --short HEAD)" >> $L/gate.out
