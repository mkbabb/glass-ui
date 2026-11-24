#!/bin/bash
# Critic 13: the readings after the gates and the floor, in four guarded calls, one at a time,
# each running its jobs in order (job.sh) so a batch waits for the guard's admission once.
#   1. Chromium: the typed-palette probe (red, pre, and the tip at 390), the exits gate's eight
#      Chromium parts on the tip and on the red tree, the CommandDialog cells on the pre tree,
#      the palette probe on the pre tree;
#   2. WebKit (exclusive): the same on WebKit, and the palette probe on the tip and the red tree;
#   3. the earlier release specs in Chromium on the tip, then each failing step on the red tree;
#   4. the same in WebKit, then item (e)'s title alone three times on the tip and the red tree.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-13; L=$D/logs; G=~/.claude/guard/guarded
from=${1:-1}
refused() { grep -q '^\[guarded\] REFUSED' $L/batch-$1.log && { echo "$(date +%T) REFUSED batch $1" >> $L/runs.out; exit 75; }; }
J=$D/job.sh
echo "BATCH-START $(date +%T) from $from head $(git -C $W rev-parse --short HEAD) load $(sysctl -n vm.loadavg)" >> $L/runs.out
if (( from <= 1 )); then
  $G --timeout 90 -- bash -c "
    $J probe typed red chromium-desktop typed-red-cd
    $J probe typed pre chromium-desktop typed-pre-cd
    $J probe typed tip chromium-phone typed-tip-cp
    for p in chromium-phone chromium-desktop; do for n in 0 1 2 3; do $J part tip \$p \$n tip-\$p-\$n; done; done
    for p in chromium-phone chromium-desktop; do for n in 0 1 2 3; do $J part red \$p \$n red-\$p-\$n; done; done
    for p in chromium-phone chromium-desktop; do $J part pre \$p CommandDialog pre-\$p; done
    $J probe cmd pre chromium-desktop cmd-pre-cd
  " > $L/batch-1.log 2>&1; refused 1
  echo "$(date +%T) batch 1 done" >> $L/runs.out
fi
if (( from <= 2 )); then
  $G --exclusive webkit --timeout 90 -- bash -c "
    for p in webkit-phone webkit-desktop; do for n in 0 1 2 3; do $J part tip \$p \$n tip-\$p-\$n; done; done
    for p in webkit-phone webkit-desktop; do for n in 0 1 2 3; do $J part red \$p \$n red-\$p-\$n; done; done
    for p in webkit-phone webkit-desktop; do $J part pre \$p CommandDialog pre-\$p; done
    $J probe cmd tip webkit-desktop cmd-tip-wd
    $J probe cmd red webkit-desktop cmd-red-wd
  " > $L/batch-2.log 2>&1; refused 2
  echo "$(date +%T) batch 2 done" >> $L/runs.out
fi
if (( from <= 3 )); then
  rm -f $L/reg-failed-*-ch.txt
  $G --timeout 90 -- bash -c "
    bash $D/reg-inner.sh branch ch partA partB owner daraksha fix2 c2 c1 r1102 r1102b roloop radius r1013
    [ -f $L/reg-failed-branch-ch.txt ] && bash $D/reg-inner.sh red ch \$(sort -u $L/reg-failed-branch-ch.txt | tr '\n' ' ')
    exit 0
  " > $L/batch-3.log 2>&1; refused 3
  echo "$(date +%T) batch 3 done" >> $L/runs.out
fi
if (( from <= 4 )); then
  rm -f $L/reg-failed-*-wk.txt
  $G --exclusive webkit --timeout 90 -- bash -c "
    bash $D/reg-inner.sh branch wk partA partB owner daraksha fix2 c2 c1 r1102 r1102b roloop r1013
    $J e tip e-tip
    $J e red e-red
    [ -f $L/reg-failed-branch-wk.txt ] && bash $D/reg-inner.sh red wk \$(sort -u $L/reg-failed-branch-wk.txt | tr '\n' ' ')
    exit 0
  " > $L/batch-4.log 2>&1; refused 4
  echo "$(date +%T) batch 4 done" >> $L/runs.out
  ( cd $W && git status --short -- docs tests-visual ) > $L/reg-status-after.txt
fi
echo "BATCH-DONE $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
