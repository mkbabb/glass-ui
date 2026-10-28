#!/bin/zsh
# P-E6 gates, one heavy run at a time, in the seat's worktree: build, typecheck (after the build), the harness scene
# app (candidate arm), demo:dist:build, vitest --maxWorkers=2.
E=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6/E6
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p6/E6/wt
cd $WT
$E/run.sh gate-build --timeout 30 -- npm run build || exit 1
$E/run.sh gate-typecheck --light --timeout 20 -- npm run typecheck || exit 2
$E/run.sh gate-demo-dist --timeout 45 -- npm run demo:dist:build || exit 4
$E/run.sh gate-vitest --timeout 60 -- npx vitest run --maxWorkers=2 || exit 5
