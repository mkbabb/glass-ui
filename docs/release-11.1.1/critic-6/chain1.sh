#!/bin/bash
# Critic 6, chain 1: the exits gate's sixteen parts on the tip; the four witness parts on
# v11.1.0 in its four projects; part B three more times in WebKit at 390 on the tip.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/critic-6
L=$D/logs
echo "CHAIN1-START $(date +%T) $(git -C $D rev-parse --short HEAD)" >> $L/runs.out
for p in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
  for i in 0 1 2 3; do bash $D/run.sh branch $p $i tip$i-$p; done
done
for p in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
  for i in 0 1 2 3; do bash $D/run.sh red $p $i red$i-$p; done
done
for n in 2 3 4; do bash $D/run.sh branch webkit-phone 1 tip1-webkit-phone-$n; done
echo "CHAIN1-DONE $(date +%T)" >> $L/runs.out
