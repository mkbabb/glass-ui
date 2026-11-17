#!/bin/bash
# Critic 5, chain 2: the earlier release specs on the tip in both engines, one guarded
# call per engine (one Playwright process per step inside it).
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/critic-5
L=$D/logs; G=~/.claude/guard/guarded
$G --timeout 80 -- bash $D/reg-inner.sh branch ch partA partB owner daraksha fix2 c2 c1 r1102 r1102b roloop radius r1013 >> $L/reg.out 2>&1
echo "PHASE-REG-CH-DONE $(date +%T)" >> $L/runs.out
$G --exclusive webkit --timeout 89 -- bash $D/reg-inner.sh branch wk partA partB owner daraksha fix2 c2 c1 r1102 r1102b roloop r1013 >> $L/reg.out 2>&1
echo "PHASE-REG-WK-DONE $(date +%T)" >> $L/runs.out
echo "CHAIN2-DONE $(date +%T)" >> $L/runs.out
