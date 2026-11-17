#!/bin/bash
# Fix seat 6, chain 1 (after the stall probes): defect 2's two cells on v11.1.0, twenty
# repeats each, and on the branch; the press cell on v11.1.0 and on the branch.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-6
L=$D/logs
until grep -q " s7-tip-no-dock src@" $L/runs.out; do sleep 15; done
R=$D/run.sh
$R red chromium-phone d2-red-expand-chromium-phone "expand · an ExpandableContainer closed while it enters" "--repeat-each=20"
$R red webkit-phone d2-red-collreopen-webkit-phone "reverse · a Collapsible reopened while it closes" "--repeat-each=20"
$R branch chromium-phone d2-tip-expand-chromium-phone "expand · an ExpandableContainer closed while it enters" "--repeat-each=20"
for p in chromium-phone chromium-desktop webkit-desktop; do
  $R red $p b-red-press-$p "press · a pressed control"
  $R branch $p b-tip-press-$p "press · a pressed control"
done
echo "CHAIN1-DONE $(date +%T)" >> $L/runs.out
