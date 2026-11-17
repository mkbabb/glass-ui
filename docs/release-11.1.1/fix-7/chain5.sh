#!/bin/bash
# Fix seat 7, resumed: row A's cell with clause (1) as the tap's outcome, on the branch and
# on v11.1.0, Chromium 390 then WebKit 390.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-7
G="sheet · a detented Sheet rises"
echo "CHAIN5-START $(date +%T)" >> $D/logs/runs.out
$D/run.sh branch chromium-phone a3-branch-chromium-phone "$G"
$D/run.sh red chromium-phone a3-red-chromium-phone "$G"
$D/run.sh branch webkit-phone a3-branch-webkit-phone "$G"
$D/run.sh red webkit-phone a3-red-webkit-phone "$G"
echo "CHAIN5-DONE $(date +%T)" >> $D/logs/runs.out
