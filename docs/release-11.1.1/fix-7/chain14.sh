#!/bin/bash
# Fix seat 7, resumed: row A's cell with a press that meets a later frame than the one it
# aimed at taken again, on the worktree and on v11.1.0, Chromium 390 and WebKit 390.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-7
echo "CHAIN14-START $(date +%T)" >> $D/logs/runs.out
A="sheet · a detented Sheet rises"
$D/run.sh branch chromium-phone h2-branch-chromium-phone "$A"
$D/run.sh branch webkit-phone h2-branch-webkit-phone "$A"
$D/run.sh red chromium-phone h2-red-chromium-phone "$A"
$D/run.sh red webkit-phone h2-red-webkit-phone "$A"
echo "CHAIN14-DONE $(date +%T)" >> $D/logs/runs.out
