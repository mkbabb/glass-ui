#!/bin/bash
# After the rebind: the package gate, the demo build and the unit suite.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/fix-2/logs
G=~/.claude/guard/guarded
cd $W
$G --timeout 20 -- npm run verify:package > $L/verify-package-6.log 2>&1; echo "verify-package-6 exit $?" >> $L/runs.out
$G --timeout 30 -- npm run demo:dist:build > $L/demo-dist-build-3.log 2>&1; echo "demo-dist-build-3 exit $?" >> $L/runs.out
CI=true $G --timeout 45 -- npx vitest run --maxWorkers=2 > $L/vitest-3.log 2>&1; echo "vitest-3 exit $?" >> $L/runs.out
echo CHAIN11-DONE >> $L/runs.out
