#!/bin/bash
# Fix seat 3: the gates on the committed tree, one heavy run at a time: the demo build, the
# unit suite, then the exits gate as scripts/release.sh runs it (its own guarded call per
# project and part), on this seat's port.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/fix-3/logs
G=~/.claude/guard/guarded
cd $W
$G --timeout 30 -- npm run demo:dist:build > $L/demo-dist-build-1.log 2>&1; echo "$(date +%T) demo:dist:build exit $?" >> $L/runs.out
CI=true $G --timeout 45 -- npx vitest run --maxWorkers=2 > $L/vitest-1.log 2>&1; echo "$(date +%T) vitest exit $?" >> $L/runs.out
GLASS_UI_DEMO_PORT=5351 GLASS_UI_DEMO_URL=http://localhost:5351 PI_REPORT=$L/gate-part.json npm -w tests-visual run gate:exits > $L/gate-1.log 2>&1; echo "$(date +%T) gate:exits exit $?" >> $L/runs.out
echo chain3 done
