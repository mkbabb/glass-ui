#!/bin/bash
# Fix seat 7, resumed after the reboot: row A's cell as committed (tip snapshot at
# e45c97fe8) and on v11.1.0, both engines at 390; then the Toast reversal cell, restated to
# the entrance's own clock, on v11.1.0 in WebKit 390, ten repeats.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-7
G="sheet · a detented Sheet rises"
echo "CHAIN9-START $(date +%T)" >> $D/logs/runs.out
$D/run.sh tip chromium-phone a7-tip-chromium-phone "$G"
$D/run.sh tip webkit-phone a7-tip-webkit-phone "$G"
$D/run.sh red chromium-phone a7-red-chromium-phone "$G"
$D/run.sh red webkit-phone a7-red-webkit-phone "$G"
$D/run.sh red webkit-phone t1-red-webkit-phone "reverse · a Toast closed while it opens" --repeat-each=10
echo "CHAIN9-DONE $(date +%T)" >> $D/logs/runs.out
