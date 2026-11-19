#!/bin/bash
# Fix seat 7, resumed after the pause: row A's cell with the aimed frame held until the
# press lands, on the worktree (branch) in Chromium 390 and WebKit 390.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-7
echo "CHAIN13-START $(date +%T)" >> $D/logs/runs.out
A="sheet · a detented Sheet rises"
$D/run.sh branch chromium-phone h1-branch-chromium-phone "$A"
$D/run.sh branch webkit-phone h1-branch-webkit-phone "$A"
echo "CHAIN13-DONE $(date +%T)" >> $D/logs/runs.out
