#!/bin/bash
# Fix seat 7, resumed: after chain 10. The Toast reversal cell, restated to the entrance's
# own clock, on the branch in both engines at 390 and on v11.1.0 in Chromium 390, ten
# repeats each; then row A's cell three times in Chromium 390 on each tree, for the share
# of +120 ms taps the press lands on.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-7
until grep -q "CHAIN10-DONE" $D/logs/runs.out; do sleep 10; done
echo "CHAIN11-START $(date +%T)" >> $D/logs/runs.out
T="reverse · a Toast closed while it opens"
G="sheet · a detented Sheet rises"
$D/run.sh branch webkit-phone t1-branch-webkit-phone "$T" --repeat-each=10
$D/run.sh branch chromium-phone t1-branch-chromium-phone "$T" --repeat-each=10
$D/run.sh red chromium-phone t1-red-chromium-phone "$T" --repeat-each=10
$D/run.sh branch chromium-phone a9-branch-chromium-phone "$G" --repeat-each=3
$D/run.sh red chromium-phone a9-red-chromium-phone "$G" --repeat-each=3
echo "CHAIN11-DONE $(date +%T)" >> $D/logs/runs.out
