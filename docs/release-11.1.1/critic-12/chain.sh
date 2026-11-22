#!/bin/bash
# Critic 12: everything this seat runs, one heavy run at a time, each through the run guard.
# 1. the five commands on the committed tree and the pack (gates.sh);
# 2. the exits gate's sixteen parts on the tip, carrying on past a failure so every cell is read;
# 3. the same sixteen parts on this seat's v11.1.0 git-archive tree with HEAD's specs;
# 4. the release-10-1-5, 11-0-1, 11-0-2 and 11-1-0 specs on the tip in both engines, then
#    any step that fails there on v11.1.0;
# 5. readings: critic 11's tooltip scale probe and critic 10's row B mouse probe on both trees,
#    and row A's cell three times more on the tip in Chromium 390.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-12
L=$D/logs; G=~/.claude/guard/guarded
from=${1:-1}
echo "CHAIN-START $(date +%T) from step $from head $(git -C $W rev-parse --short HEAD) load $(sysctl -n vm.loadavg)" >> $L/runs.out
if (( from <= 1 )); then bash $D/gates.sh; fi
if (( from <= 2 )); then
  for project in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
    for n in 0 1 2 3; do bash $D/part.sh tip $project $n tip-$project-$n; done
  done
  echo "$(date +%T) tip gate done" >> $L/runs.out
fi
if (( from <= 3 )); then
  for project in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
    for n in 0 1 2 3; do bash $D/part.sh red $project $n red-$project-$n; done
  done
  echo "$(date +%T) red gate done" >> $L/runs.out
fi
if (( from <= 4 )); then
  ALL="partA partB owner daraksha fix2 c2 c1 r1102 r1102b roloop radius r1013"
  WK="partA partB owner daraksha fix2 c2 c1 r1102 r1102b roloop r1013"
  rm -f $L/reg-failed-*.txt
  $G --timeout 85 -- bash $D/reg-inner.sh branch ch $ALL >> $L/reg.out 2>&1
  $G --exclusive webkit --timeout 85 -- bash $D/reg-inner.sh branch wk $WK >> $L/reg.out 2>&1
  for e in ch wk; do
    [ -f $L/reg-failed-branch-$e.txt ] || continue
    steps=$(sort -u $L/reg-failed-branch-$e.txt | tr '\n' ' ')
    case $e in wk) EX="--exclusive webkit";; *) EX="";; esac
    $G $EX --timeout 60 -- bash $D/reg-inner.sh red $e $steps >> $L/reg.out 2>&1
  done
  echo "$(date +%T) earlier specs done" >> $L/runs.out
fi
if (( from <= 5 )); then
  bash $D/probe-tip/run.sh tip chromium-desktop tt-tip-cd
  bash $D/probe-tip/run.sh red chromium-desktop tt-red-cd
  bash $D/probe-tip/run.sh tip webkit-desktop tt-tip-wd
  bash $D/probe-tip/run.sh red webkit-desktop tt-red-wd
  bash $D/probe-rowb/run.sh tip webkit-phone rowb-tip-wp
  bash $D/probe-rowb/run.sh red webkit-phone rowb-red-wp
  A="sheet · a detented Sheet rises into place at its rung's size"
  bash $D/part.sh tip chromium-phone "$A" rowa-tip-cp --repeat-each=3
fi
echo "CHAIN-DONE $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
