#!/bin/bash
# The committed tree's gates after row 8 and row 13 (a): typecheck, build, package.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/fix-2/logs
G=~/.claude/guard/guarded
cd $W
$G --timeout 20 -- npm run typecheck > $L/typecheck-3.log 2>&1; echo "typecheck-3 exit $?" >> $L/runs.out
$G --timeout 30 -- npm run build > $L/build-4.log 2>&1; echo "build-4 exit $?" >> $L/runs.out
$G --timeout 20 -- npm run verify:package > $L/verify-package-5.log 2>&1; echo "verify-package-5 exit $?" >> $L/runs.out
echo CHAIN10-DONE >> $L/runs.out
