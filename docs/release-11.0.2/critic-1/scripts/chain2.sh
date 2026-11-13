#!/bin/bash
# Critic 1, after chain1: the release gates again with their own exit codes (chain1 printed
# `date`'s), then the Select probe on v11.0.1 and the tip in both engines.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
C=$W/docs/release-11.0.2/critic-1; L=$C/logs; S=$C/scripts; O=$L/chain.out
G=~/.claude/guard/guarded
say() { echo "$(date +%H:%M:%S) $*" >> $O; }
cd $W
$G --light --timeout 15 -- npm run typecheck > $L/typecheck.log 2>&1; rc=$?; say "typecheck rc=$rc"
$G --timeout 20 -- npm run build > $L/build.log 2>&1; rc=$?; say "build rc=$rc"
$G --light --timeout 10 -- npm run verify:package > $L/verify-package.log 2>&1; rc=$?; say "verify:package rc=$rc"
$G --timeout 20 -- npm run demo:dist:build > $L/demo-dist-build.log 2>&1; rc=$?; say "demo:dist:build rc=$rc"
$G --timeout 30 -- npx vitest run --maxWorkers=2 > $L/vitest.log 2>&1; rc=$?; say "vitest rc=$rc"
mkdir -p $W/.cache/red-v11.0.1/tree/docs/release-11.0.2/o212 && cp -R $W/docs/release-11.0.2/o212/harness $W/.cache/red-v11.0.1/tree/docs/release-11.0.2/o212/
for t in v1101 tip; do
  $G --timeout 25 -- $S/select-probe.sh $t chromium > $L/select-$t-chromium.log 2>&1; rc=$?; say "select-$t-chromium rc=$rc"
  $G --exclusive webkit --timeout 25 -- $S/select-probe.sh $t webkit > $L/select-$t-webkit.log 2>&1; rc=$?; say "select-$t-webkit rc=$rc"
done
say done2
