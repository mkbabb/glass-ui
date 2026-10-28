#!/bin/zsh
# P-A7 gates, one heavy run at a time, in the seat's worktree: build, typecheck (after the build), the harness scene
# app, demo:dist:build, vitest (--maxWorkers=2). `gates.sh [tag]` writes gate-<step>[-tag].log.
A=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7/A7
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p7/A7/wt
T=${1:+-$1}
cd $WT
$A/run.sh gate-build$T --timeout 30 -- npm run build || exit 1
$A/run.sh gate-typecheck$T --light --timeout 20 -- npm run typecheck || exit 2
$A/run.sh build-a7$T --timeout 30 -- node $H/build.mjs $WT --label a7 --out $WT/.a7out || exit 3
$A/run.sh gate-demo-dist$T --timeout 45 -- npm run demo:dist:build || exit 4
$A/run.sh gate-vitest$T --timeout 60 -- npx vitest run --maxWorkers=2 || exit 5
