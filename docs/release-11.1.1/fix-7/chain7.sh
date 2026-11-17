#!/bin/bash
# Fix seat 7, resumed: row A's cell on the branch with the frames from the read to the
# press and the press point's distance from the button recorded, Chromium 390 then
# WebKit 390. Waits for chain 6 to finish first.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-7
G="sheet · a detented Sheet rises"
until grep -q CHAIN6-DONE $D/logs/runs.out; do sleep 5; done
echo "CHAIN7-START $(date +%T)" >> $D/logs/runs.out
$D/run.sh branch chromium-phone a5-branch-chromium-phone "$G"
$D/run.sh branch webkit-phone a5-branch-webkit-phone "$G"
echo "CHAIN7-DONE $(date +%T)" >> $D/logs/runs.out
