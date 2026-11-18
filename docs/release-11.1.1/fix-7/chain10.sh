#!/bin/bash
# Fix seat 7, resumed: after chain 9. The branch (the worktree, with the detented Sheet's
# reduced-motion fade uncommitted) reads row A's cell, restated to open the harness again
# after a tap that does not close the sheet, in both engines at 390; then the reduce spec's
# detented Sheet fade, branch and v11.1.0, both engines at 390.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-7
until grep -q "CHAIN9-DONE" $D/logs/runs.out; do sleep 10; done
echo "CHAIN10-START $(date +%T)" >> $D/logs/runs.out
G="sheet · a detented Sheet rises"
F="fade · a detented Sheet"
$D/run.sh branch chromium-phone a8-branch-chromium-phone "$G"
$D/run.sh branch webkit-phone a8-branch-webkit-phone "$G"
$D/run.sh branch chromium-phone rm1-branch-chromium-phone "$F"
$D/run.sh red chromium-phone rm1-red-chromium-phone "$F"
$D/run.sh branch webkit-phone rm1-branch-webkit-phone "$F"
$D/run.sh red webkit-phone rm1-red-webkit-phone "$F"
echo "CHAIN10-DONE $(date +%T)" >> $D/logs/runs.out
