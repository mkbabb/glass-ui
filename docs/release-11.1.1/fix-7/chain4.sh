#!/bin/bash
# The restated guard cell, ten repeats in WebKit 390 on the worktree and v11.1.0; then
# the sheet cells (rows A and B) on both trees, Chromium 390 and WebKit 390.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-7
echo "CHAIN4-START $(date +%T)" >> $D/logs/runs.out
G="reverse · a disclosure reopened while it closes"
$D/run.sh branch webkit-phone g2-branch-webkit-phone "$G" --repeat-each=10
$D/run.sh red webkit-phone g2-red-webkit-phone "$G" --repeat-each=10
for p in chromium-phone webkit-phone; do
    $D/run.sh branch $p a2-branch-$p "sheet · "
    $D/run.sh red $p a2-red-$p "sheet · "
done
echo "CHAIN4-DONE $(date +%T)" >> $D/logs/runs.out
