#!/bin/bash
# Item 1's witness: part B on the tip snapshot, WebKit 390 three times running and once
# in each other project; then part B on v11.1.0 in the two phone projects.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-7
echo "CHAIN1-START $(date +%T)" >> $D/logs/runs.out
for n in 1 2 3; do $D/run.sh tip webkit-phone b1-tip-webkit-phone-$n 1; done
for p in chromium-phone chromium-desktop webkit-desktop; do $D/run.sh tip $p b1-tip-$p 1; done
for p in webkit-phone chromium-phone; do $D/run.sh red $p b1-red-$p 1; done
echo "CHAIN1-DONE $(date +%T)" >> $D/logs/runs.out
