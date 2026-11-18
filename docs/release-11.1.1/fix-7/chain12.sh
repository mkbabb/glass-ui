#!/bin/bash
# Fix seat 7, resumed: after chain 11, on the tip snapshot at the commit given.
#   chain12.sh <commit>
# 1. The disclosure guard in WebKit 390, twenty films on each tree, interleaved in blocks of
#    five, each block started at a 1-minute load under 10.
# 2. The four detented Sheet cells (two standing, two routes), twenty repeats each in
#    Chromium 390, tip and v11.1.0.
# 3. Part B in WebKit 390 on the tip, three times running.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-7
until grep -q "CHAIN11-DONE" $D/logs/runs.out; do sleep 10; done
echo "CHAIN12-START $(date +%T)" >> $D/logs/runs.out
$D/sync-tip.sh "$1"
low() { until [[ $(sysctl -n vm.loadavg | awk '{print int($2)}') -lt 10 ]]; do sleep 15; done; echo "$(date +%T) load at start $(sysctl -n vm.loadavg)" >> $D/logs/runs.out; }
GD="reverse · a disclosure reopened while it closes"
for i in 1 2 3 4; do
    low; $D/run.sh tip webkit-phone g3-tip-webkit-phone-$i "$GD" --repeat-each=5
    low; $D/run.sh red webkit-phone g3-red-webkit-phone-$i "$GD" --repeat-each=5
done
DT="(standing · detented Sheet|routes · a detented Sheet leaves whole)"
$D/run.sh tip chromium-phone d20-tip-chromium-phone "$DT" --repeat-each=20
$D/run.sh red chromium-phone d20-red-chromium-phone "$DT" --repeat-each=20
for i in 1 2 3; do $D/run.sh tip webkit-phone b2-tip-webkit-phone-$i 1; done
echo "CHAIN12-DONE $(date +%T)" >> $D/logs/runs.out
