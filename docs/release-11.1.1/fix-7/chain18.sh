#!/bin/bash
# Fix seat 7, resumed: row A's cell in Chromium 390 and part B in WebKit 390 three times
# running, on the tip snapshot again, each at a 1-minute load under 16 (h3 ran at 39 to 65,
# b2 at 26 to 44, with films holed by load); then the disclosure guard in WebKit 390,
# twenty films on each tree (tip snapshot and v11.1.0), interleaved in blocks of five,
# each block started at a 1-minute load under 10. The waits share one 60-minute budget
# from the chain's start; once it is spent, the load at each start is recorded and the
# run goes ahead.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-7
echo "CHAIN18-START $(date +%T)" >> $D/logs/runs.out
T0=$(date +%s)
low() {
    until [[ $(sysctl -n vm.loadavg | awk '{print int($2)}') -lt ${1:-10} ]]; do
        if (( $(date +%s) - T0 > 3600 )); then echo "$(date +%T) load wait budget spent, load at start $(sysctl -n vm.loadavg)" >> $D/logs/runs.out; return; fi
        sleep 15
    done
    echo "$(date +%T) load at start $(sysctl -n vm.loadavg)" >> $D/logs/runs.out
}
low 16; $D/run.sh tip chromium-phone h4-tip-chromium-phone "sheet · a detented Sheet rises"
for i in 1 2 3; do low 16; $D/run.sh tip webkit-phone b3-tip-webkit-phone-$i 1; done
GD="reverse · a disclosure reopened while it closes"
for i in 1 2 3 4; do
    low; $D/run.sh tip webkit-phone g3-tip-webkit-phone-$i "$GD" --repeat-each=5
    low; $D/run.sh red webkit-phone g3-red-webkit-phone-$i "$GD" --repeat-each=5
done
echo "CHAIN18-DONE $(date +%T)" >> $D/logs/runs.out
