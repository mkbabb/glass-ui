#!/bin/bash
# Critic 8, second sitting (from 09:00 on 2026-11-20, the battery ruled no reason to stop):
# what the first sitting's chain did not finish, one heavy run at a time, each through the
# run guard.
# 1. vitest on the committed tree (the first sitting's read exit 1 at a load of 37 to 45),
#    then its two failing files on the tip and on v11.1.0, interleaved, ten times each;
# 2. the exits gate's parts the first sitting did not reach, on the tip, and part A in
#    Chromium 390 once more (its row A cell failed at a load of 45);
# 3. the same parts on the v11.1.0 git-archive tree with HEAD's specs;
# 4. the release-10-1-5, 11-0-1, 11-0-2 and 11-1-0 specs on the tip in both engines, and
#    a step that fails there on v11.1.0 too;
# 5. the disclosure guard, twenty films on each tree in WebKit 390, interleaved by fives.
#   chain2.sh [first step]
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-8
L=$D/logs; G=~/.claude/guard/guarded
RED=$W/.cache/red-v11.1.0/tree
from=${1:-1}
log() { echo "$(date +%T) $*" >> $L/runs.out; }
log "CHAIN2-START from step $from head $(git -C $W rev-parse --short HEAD) load $(sysctl -n vm.loadavg)"

if (( from <= 1 )); then
  cd $W
  s=$(date +%s)
  CI=true $G --timeout 30 -- npx vitest run --maxWorkers=2 > $L/gate-vitest-2.log 2>&1
  rc=$?
  echo "$(date +%T) vitest-2 exit $rc $(( $(date +%s) - s ))s $(git rev-parse --short HEAD) load=$(sysctl -n vm.loadavg) $(grep -E '^\s+Tests ' $L/gate-vitest-2.log | tr -s ' ')" >> $L/gates.out
  for i in $(seq 1 10); do
    for t in tip red; do
      case $t in tip) cd $W ;; red) cd $RED ;; esac
      CI=true $G --light --timeout 5 -- npx vitest run --maxWorkers=2 tests/components/menu/contract.test.ts \
        tests/components/custom/aurora/atoms.test.ts > $L/vitest-cd-$t-$i.log 2>&1
      rc=$?
      echo "$t $i exit $rc $(grep -E '^\s+Tests ' $L/vitest-cd-$t-$i.log | tr -s ' ') $(grep -c ' × ' $L/vitest-cd-$t-$i.log) $(grep ' × ' $L/vitest-cd-$t-$i.log | cut -c1-50 | tr '\n' ';') load=$(sysctl -n vm.loadavg)" >> $L/vitest-cd.txt
    done
  done
  log "vitest done"
fi

if (( from <= 2 )); then
  for n in 2 3; do bash $D/part.sh tip chromium-desktop $n tip-chromium-desktop-$n; done
  for project in webkit-phone webkit-desktop; do
    for n in 0 1 2 3; do bash $D/part.sh tip $project $n tip-$project-$n; done
  done
  bash $D/part.sh tip chromium-phone 0 tip-chromium-phone-0b
  log "tip gate done"
fi

if (( from <= 3 )); then
  bash $D/redspecs.sh || exit 1
  for project in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
    for n in 0 1 3; do bash $D/part.sh red $project $n red-$project-$n; done
  done
  log "red gate done"
fi

if (( from <= 4 )); then
  mkdir -p $L/out
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
  log "earlier specs done"
fi

if (( from <= 5 )); then
  for round in 1 2 3 4; do
    for t in tip red; do
      bash $D/cell.sh $t webkit-phone guard-$t-$round "reverse · a disclosure reopened while it closes finishes its reopen" --repeat-each=5
    done
  done
  log "disclosure guard done"
fi
log "CHAIN2-DONE load $(sysctl -n vm.loadavg)"
