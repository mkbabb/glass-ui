#!/bin/bash
# Critic 6: the gates on the committed tree, one guarded run each; each exit code is
# captured before anything else runs.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/critic-6/logs
G=~/.claude/guard/guarded
cd $W
step() { local name=$1; shift; "$@" > $L/gate-$name.log 2>&1; local rc=$?; echo "$(date +%T) $name exit $rc $(git rev-parse --short HEAD) dirty=$(git status --porcelain -- src tests tests-visual scripts package.json CHANGELOG.md README.md | wc -l | tr -d ' ')" >> $L/gates.out; }
step typecheck $G --light --timeout 15 -- npm run typecheck
step build $G --timeout 20 -- npm run build
step verify-package $G --light --timeout 10 -- npm run verify:package
step demo-dist-build $G --timeout 20 -- npm run demo:dist:build
CI=true step vitest $G --timeout 30 -- npx vitest run --maxWorkers=2
echo "GATES-DONE $(date +%T)" >> $L/gates.out
