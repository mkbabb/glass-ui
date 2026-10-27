#!/bin/zsh
# P-A6 gates, one heavy run at a time, in the seat's worktree: build, typecheck (after the build:
# the fourier-math self-reference), the harness scene app, demo:dist:build, vitest.
A=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6/A6
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p6/A6/wt
cd $WT
$A/run.sh gate-build --timeout 30 -- npm run build || exit 1
$A/run.sh gate-typecheck --light --timeout 20 -- npm run typecheck || exit 2
$A/run.sh build-a6 --timeout 30 -- node $H/build.mjs $WT --label a6 --out $WT/.a6out || exit 3
$A/run.sh gate-demo-dist --timeout 45 -- npm run demo:dist:build || exit 4
$A/run.sh gate-vitest --timeout 60 -- npx vitest run --maxWorkers=2 || exit 5
