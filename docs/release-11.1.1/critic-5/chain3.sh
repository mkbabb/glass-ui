#!/bin/bash
# Critic 5, chain 3: the disclosure reversal cells, copied verbatim into the probe with a
# second per-frame recorder (scroll, boxes, seeks), ten repeats interleaved in WebKit at
# 390 on the tip; then chain 2 (the earlier release specs).
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/critic-5
bash $D/probe/run.sh webkit-phone stall5-webkit-phone "reverse · a (Accordion|Collapsible)" "--repeat-each=10"
echo "PHASE-PROBE-DONE $(date +%T)" >> $D/logs/runs.out
bash $D/chain2.sh
echo "CHAIN3-DONE $(date +%T)" >> $D/logs/runs.out
