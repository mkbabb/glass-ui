#!/bin/bash
# Critic 14: everything this seat runs, one heavy run at a time, each through the run guard.
#   0. the five commands on the committed tree, the pack and item (d)'s boot-graph witness (gates.sh);
#   1. Chromium (one guarded call): the exits gate's eight Chromium parts on the tip and on the red
#      tree, the CommandDialog cells on the pre tree, the lift cell on the norule tree;
#   2. WebKit (one guarded call, exclusive): the same in WebKit;
#   3. the pixel floor's three legs, each its own guarded call (floor.sh);
#   4. the earlier release specs in Chromium on the tip, then each failing step on the red tree;
#   5. the same in WebKit (item (e)'s title moved to 6);
#   6. WebKit, new since critique 13 first: the lift cell, item (e)'s title, then step 2's runs.
#   batch.sh [from] | batch.sh only <step>... (the listed steps, in the order given)
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-14; L=$D/logs; G=~/.claude/guard/guarded; J=$D/job.sh
from=${1:-0}
if [ "$1" = only ]; then shift; for n in "$@"; do bash "$0" $n $n || exit $?; done; exit 0; fi
to=${2:-9}
refused() { grep -q '^\[guarded\] REFUSED' $L/batch-$1.log 2>/dev/null && { echo "$(date +%T) REFUSED batch $1" >> $L/runs.out; exit 75; }; }
echo "BATCH-START $(date +%T) from $from head $(git -C $W rev-parse --short HEAD) load $(sysctl -n vm.loadavg)" >> $L/runs.out
if (( from <= 0 && 0 <= to )); then
  bash $D/gates.sh
  grep -q '^\[guarded\] REFUSED' $L/gate-*.log && { echo "$(date +%T) REFUSED in gates" >> $L/runs.out; exit 75; }
  echo "$(date +%T) batch 0 (gates) done" >> $L/runs.out
fi
if (( from <= 1 && 1 <= to )); then
  $G --timeout 90 -- bash -c "
    for p in chromium-phone chromium-desktop; do for n in 0 1 2 3; do $J part tip \$p \$n tip-\$p-\$n; done; done
    for p in chromium-phone chromium-desktop; do for n in 0 1 2 3; do $J part red \$p \$n red-\$p-\$n; done; done
    for p in chromium-phone chromium-desktop; do $J part pre \$p CommandDialog pre-\$p; done
    for p in chromium-phone chromium-desktop; do $J part norule \$p 'lift · ' norule-\$p; done
  " > $L/batch-1.log 2>&1; refused 1
  echo "$(date +%T) batch 1 done" >> $L/runs.out
fi
if (( from <= 2 && 2 <= to )); then
  $G --exclusive webkit --timeout 90 -- bash -c "
    for p in webkit-phone webkit-desktop; do for n in 0 1 2 3; do $J part tip \$p \$n tip-\$p-\$n; done; done
    for p in webkit-phone webkit-desktop; do for n in 0 1 2 3; do $J part red \$p \$n red-\$p-\$n; done; done
    for p in webkit-phone webkit-desktop; do $J part pre \$p CommandDialog pre-\$p; done
    for p in webkit-phone webkit-desktop; do $J part norule \$p 'lift · ' norule-\$p; done
  " > $L/batch-2.log 2>&1; refused 2
  echo "$(date +%T) batch 2 done" >> $L/runs.out
fi
if (( from <= 3 && 3 <= to )); then
  bash $D/floor.sh
  grep -q '^\[guarded\] REFUSED' $L/floor-*.log && { echo "$(date +%T) REFUSED in floor" >> $L/runs.out; exit 75; }
  echo "$(date +%T) batch 3 (floor) done" >> $L/runs.out
fi
if (( from <= 4 && 4 <= to )); then
  rm -f $L/reg-failed-*-ch.txt
  $G --timeout 90 -- bash -c "
    bash $D/reg-inner.sh branch ch partA partB owner daraksha fix2 c2 c1 r1102 r1102b roloop radius r1013
    [ -f $L/reg-failed-branch-ch.txt ] && bash $D/reg-inner.sh red ch \$(sort -u $L/reg-failed-branch-ch.txt | tr '\n' ' ')
    exit 0
  " > $L/batch-4.log 2>&1; refused 4
  echo "$(date +%T) batch 4 done" >> $L/runs.out
fi
if (( from <= 5 && 5 <= to )); then
  rm -f $L/reg-failed-*-wk.txt
  $G --exclusive webkit --timeout 90 -- bash -c "
    bash $D/reg-inner.sh branch wk partA partB owner daraksha fix2 c2 c1 r1102 r1102b roloop r1013
    [ -f $L/reg-failed-branch-wk.txt ] && bash $D/reg-inner.sh red wk \$(sort -u $L/reg-failed-branch-wk.txt | tr '\n' ' ')
    # the WebKit tip cells that failed in batch 6 on their films' preconditions, read again
    $J rev tip webkit-phone rev-tip-wp2 3
    $J rev red webkit-phone rev-red-wp2 3
    $J rev tip webkit-desktop rev-tip-wd2 3
    $J part tip webkit-phone exit.·.Sheet.right exitR-tip-wp2 --repeat-each=5
    exit 0
  " > $L/batch-5.log 2>&1; refused 5
  echo "$(date +%T) batch 5 done" >> $L/runs.out
  ( cd $W && git status --short -- docs tests-visual src demo ) > $L/reg-status-after.txt
fi
if (( from <= 6 && 6 <= to )); then
  # WebKit (one guarded call, exclusive), in the order of what is new since critique 13: the
  # lift cell on the tip, the red tree and the norule tree, item (e)'s title, then the exits
  # gate's eight WebKit parts on the tip and the red tree and the CommandDialog cells on the
  # pre tree.
  $G --exclusive webkit --timeout 90 -- bash -c "
    for p in webkit-phone webkit-desktop; do for t in tip red norule; do $J part \$t \$p 'lift · ' lift-\$t-\$p; done; done
    $J e tip e-tip
    $J e red e-red
    for p in webkit-phone webkit-desktop; do for n in 0 1 2 3; do $J part tip \$p \$n tip-\$p-\$n; done; done
    for p in webkit-phone webkit-desktop; do for n in 0 1 2 3; do $J part red \$p \$n red-\$p-\$n; done; done
    for p in webkit-phone webkit-desktop; do $J part pre \$p CommandDialog pre-\$p; done
  " > $L/batch-6.log 2>&1; refused 6
  echo "$(date +%T) batch 6 done" >> $L/runs.out
fi
echo "BATCH-DONE $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
