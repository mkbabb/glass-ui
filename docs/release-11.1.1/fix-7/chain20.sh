#!/bin/bash
# Fix seat 7, resumed: the exits gate's parts after the one gate.sh stopped at (index 1 on),
# each in its own guarded process on port 5354; then chain 18; then the gate's first part
# (chromium-phone, part A) once more, at a 1-minute load under 16 if that comes within 30
# minutes: at 15:58 its CommandDialog pick cell filmed no frame before its mark under a load
# of about 40.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-7
echo "CHAIN20-START $(date +%T)" >> $D/logs/runs.out
$D/gate-rest.sh 1
echo "$(date +%T) gate-rest done" >> $D/logs/runs.out
$D/chain18.sh
t0=$(date +%s)
until [[ $(sysctl -n vm.loadavg | awk '{print int($2)}') -lt 16 ]] || (( $(date +%s) - t0 > 1800 )); do sleep 15; done
echo "$(date +%T) gate part 0 again, load at start $(sysctl -n vm.loadavg)" >> $D/logs/runs.out
cp $D/logs/gate-rest.out $D/logs/gate-rest-1.out
$D/gate-rest.sh 0 0
echo "CHAIN20-DONE $(date +%T)" >> $D/logs/runs.out
