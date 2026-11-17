#!/bin/bash
# Critic 6, chain 2 (after chain 1): the detented Sheet's standing cell read raw and
# repeated in Chromium 390; the gates on the committed tree; then the earlier release
# specs on the tip, one guarded call per engine (Chromium, then WebKit 2287 under the
# WebKit lock); a step that fails on the tip runs on v11.1.0 twice.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/critic-6
L=$D/logs; G=~/.claude/guard/guarded
until grep -q CHAIN1-DONE $L/runs.out; do sleep 30; done
bash $D/probe/run.sh chromium-phone detent-raw-chromium-phone "detent raw" --repeat-each=4
bash $D/run-cell.sh chromium-phone tip-detent10-chromium-phone "standing · detented Sheet" --repeat-each=10
bash $D/gates.sh
ALL="partA partB owner daraksha fix2 c2 c1 r1102 r1102b roloop radius r1013"
WK="partA partB owner daraksha fix2 c2 c1 r1102 r1102b roloop r1013"
$G --timeout 80 -- bash $D/reg-inner.sh branch ch $ALL >> $L/reg.out 2>&1
$G --exclusive webkit --timeout 85 -- bash $D/reg-inner.sh branch wk $WK >> $L/reg.out 2>&1
for e in ch wk; do
  [ -f $L/reg-failed-branch-$e.txt ] || continue
  steps=$(sort -u $L/reg-failed-branch-$e.txt | tr '\n' ' ')
  case $e in wk) EX="--exclusive webkit";; *) EX="";; esac
  for n in 1 2; do
    $G $EX --timeout 60 -- bash $D/reg-inner.sh red $e $steps >> $L/reg.out 2>&1
    for s in $steps; do mv $L/reg-red-$s-$e.log $L/reg-red-$s-$e-$n.log 2>/dev/null; mv $L/reg-red-$s-$e.json $L/reg-red-$s-$e-$n.json 2>/dev/null; done
  done
done
echo "CHAIN2-DONE $(date +%T)" >> $L/runs.out
