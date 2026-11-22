#!/bin/bash
# Critic 9: the exits gate's Chromium 390 part B, three times on the tip with a trace kept for
# any failure, to catch the ExpandableContainer reversal cell's crash again.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-9; L=$D/logs
echo "CHAIN3-START $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
for i in 1 2 3; do bash $D/diag.sh tip chromium-phone partB-tip-cp-$i "(reverse|tooltip|expand|leave) · " 1; done
echo "CHAIN3-DONE $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
