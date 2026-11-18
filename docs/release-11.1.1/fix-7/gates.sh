#!/bin/bash
# Fix seat 7: the gates on the committed tree, one guarded run each, exit codes to gates.out.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/fix-7/logs
G=~/.claude/guard/guarded
cd $W
step() { local name=$1; shift; "$@" > $L/$name.log 2>&1; local rc=$?; echo "$(date +%T) $name exit $rc $(git rev-parse --short HEAD)" >> $L/gates.out; }
step typecheck $G --light --timeout 15 -- npm run typecheck
step build $G --timeout 20 -- npm run build
step verify-package $G --light --timeout 10 -- npm run verify:package
step demo-dist-build $G --timeout 20 -- npm run demo:dist:build
CI=true step vitest $G --timeout 30 -- npx vitest run --maxWorkers=2
echo "GATES-DONE $(date +%T)" >> $L/gates.out
