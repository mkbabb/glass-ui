#!/bin/bash
# Fix seat 7, resumed: the owed witnesses on the tip snapshot at the commit given, each run
# admitted by the guard alone (the 1-minute load stayed 34 to 79 from 13:09 to 14:12), the
# disclosure guard last, each block started at a load under 10 (at most 60 minutes' wait).
#   chain17.sh <commit>
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-7
echo "CHAIN17-START $(date +%T)" >> $D/logs/runs.out
$D/sync-tip.sh "$1"
RM="fade · a detented Sheet"
for t in tip red; do for p in chromium-phone webkit-phone; do $D/run.sh $t $p rm2-$t-$p "$RM"; done; done
A="sheet · a detented Sheet rises"
$D/run.sh tip webkit-phone h3-tip-webkit-phone "$A"
$D/run.sh red webkit-phone h3-red-webkit-phone "$A"
$D/run.sh red chromium-phone h3-red-chromium-phone "$A"
$D/run.sh tip chromium-phone h3-tip-chromium-phone "$A"
for i in 1 2 3; do $D/run.sh tip webkit-phone b2-tip-webkit-phone-$i 1; done
DT="(standing · detented Sheet|routes · a detented Sheet leaves whole)"
$D/run.sh tip chromium-phone d20-tip-chromium-phone "$DT" --repeat-each=20
$D/run.sh red chromium-phone d20-red-chromium-phone "$DT" --repeat-each=20
echo "CHAIN17-DONE $(date +%T)" >> $D/logs/runs.out
