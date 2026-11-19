#!/bin/bash
# Fix seat 7, resumed: the owed witnesses on the tip snapshot at the commit given.
#   chain15.sh <commit>
# Each timing run starts at a 1-minute load under 16 (the disclosure guard under 10).
# 1. Row A's cell on v11.1.0, Chromium 390 and WebKit 390 (the branch read before the commit).
# 2. A detented Sheet's reduced-motion fade, tip and v11.1.0, both engines at 390.
# 3. The four detented Sheet cells (two standing, two routes), twenty repeats each in
#    Chromium 390, tip and v11.1.0.
# 4. The disclosure guard in WebKit 390, twenty films on each tree, interleaved in blocks
#    of five.
# 5. Part B in WebKit 390 on the tip, three times running.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-7
echo "CHAIN15-START $(date +%T)" >> $D/logs/runs.out
$D/sync-tip.sh "$1"
low() { until [[ $(sysctl -n vm.loadavg | awk '{print int($2)}') -lt $1 ]]; do sleep 15; done; echo "$(date +%T) load at start $(sysctl -n vm.loadavg)" >> $D/logs/runs.out; }
A="sheet · a detented Sheet rises"
low 16; $D/run.sh red chromium-phone h3-red-chromium-phone "$A"
low 16; $D/run.sh red webkit-phone h3-red-webkit-phone "$A"
RM="fade · a detented Sheet"
for t in tip red; do for p in chromium-phone webkit-phone; do low 16; $D/run.sh $t $p rm2-$t-$p "$RM"; done; done
DT="(standing · detented Sheet|routes · a detented Sheet leaves whole)"
low 16; $D/run.sh tip chromium-phone d20-tip-chromium-phone "$DT" --repeat-each=20
low 16; $D/run.sh red chromium-phone d20-red-chromium-phone "$DT" --repeat-each=20
GD="reverse · a disclosure reopened while it closes"
for i in 1 2 3 4; do
    low 10; $D/run.sh tip webkit-phone g3-tip-webkit-phone-$i "$GD" --repeat-each=5
    low 10; $D/run.sh red webkit-phone g3-red-webkit-phone-$i "$GD" --repeat-each=5
done
for i in 1 2 3; do low 16; $D/run.sh tip webkit-phone b2-tip-webkit-phone-$i 1; done
echo "CHAIN15-DONE $(date +%T)" >> $D/logs/runs.out
