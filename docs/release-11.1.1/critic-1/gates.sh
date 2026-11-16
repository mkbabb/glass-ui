#!/bin/bash
# Critic 1: the library gates on the committed tip, one guarded run at a time.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/critic-1/logs
G=~/.claude/guard/guarded
cd $W
echo "head $(git rev-parse --short HEAD) $(date +%T)" >> $L/gates.txt
$G --timeout 20 -- npm run typecheck > $L/typecheck.log 2>&1; echo "typecheck exit $?" >> $L/gates.txt
$G --timeout 20 -- npm run build > $L/build.log 2>&1; echo "build exit $?" >> $L/gates.txt
$G --timeout 20 -- npm run demo:dist:build > $L/demo-dist-build.log 2>&1; echo "demo:dist:build exit $?" >> $L/gates.txt
CI=true $G --timeout 40 -- npx vitest run --maxWorkers=2 > $L/vitest.log 2>&1; echo "vitest exit $?" >> $L/gates.txt
$G --timeout 10 -- npm run verify:package > $L/verify-package.log 2>&1; echo "verify:package exit $?" >> $L/gates.txt
(npm pack --dry-run --json --ignore-scripts > $L/pack-tip.json 2> $L/pack-tip.err); echo "pack exit $?" >> $L/gates.txt
echo "GATES-DONE $(date +%T)" >> $L/gates.txt
