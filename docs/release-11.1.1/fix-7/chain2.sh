#!/bin/bash
# Rows A and B, first reading: the sheet cells on the worktree (branch) and on v11.1.0,
# Chromium 390 then WebKit 390.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-7
echo "CHAIN2-START $(date +%T)" >> $D/logs/runs.out
for p in chromium-phone webkit-phone; do
    $D/run.sh branch $p a-branch-$p "sheet · "
    $D/run.sh red $p a-red-$p "sheet · "
done
echo "CHAIN2-DONE $(date +%T)" >> $D/logs/runs.out
