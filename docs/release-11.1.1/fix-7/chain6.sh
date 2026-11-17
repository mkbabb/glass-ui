#!/bin/bash
# Fix seat 7, resumed: row A's cell in Chromium 390 again, with the tap read where it lands
# (its press), on the branch and on v11.1.0. Waits for chain 5 to finish first.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-7
G="sheet · a detented Sheet rises"
until grep -q CHAIN5-DONE $D/logs/runs.out; do sleep 5; done
echo "CHAIN6-START $(date +%T)" >> $D/logs/runs.out
$D/run.sh branch chromium-phone a4-branch-chromium-phone "$G"
$D/run.sh red chromium-phone a4-red-chromium-phone "$G"
echo "CHAIN6-DONE $(date +%T)" >> $D/logs/runs.out
