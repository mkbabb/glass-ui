#!/bin/bash
# Fix seat 6, chain 2 (after chain 1): the stall harness with the dock and one other part.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-6
L=$D/logs
until grep -q "CHAIN1-DONE" $L/runs.out; do sleep 15; done
cd /Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
P=$D/probe/stall7.probe.ts
FIX6_WITH=dock,rows PROBE=$P $D/bisect2.sh 3d5026c92 s7-tip-dock-rows "reverse · a (Accordion|Collapsible)" 6
FIX6_WITH=dock,expand PROBE=$P $D/bisect2.sh 3d5026c92 s7-tip-dock-expand "reverse · a (Accordion|Collapsible)" 6
echo "CHAIN2-DONE $(date +%T)" >> $L/runs.out
