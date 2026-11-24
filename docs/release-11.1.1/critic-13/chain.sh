#!/bin/bash
# Critic 13: everything this seat runs, one heavy run at a time, each through the run guard.
# 1. the five commands on the committed tree, the pack, and item (d)'s boot-graph witness (gates.sh);
# 2. the pixel floor's three legs on the worktree (item (a));
# 3. the exits gate's sixteen parts on the tip, carrying on past a failure so every cell is read;
# 4. the same sixteen parts on the red tree (v11.1.0's src under the tip's demo and specs);
# 5. the CommandDialog cells on the pre tree (the merged tip before item (c)'s cure), four projects;
# 6. the release-10-1-5, 11-0-1, 11-0-2 and 11-1-0 specs on the tip in both engines, then any
#    step that fails there on the red tree;
# 7. item (e)'s title alone, three times, on the tip and the red tree in WebKit;
# 8. the palette probe on the pre tree (Chromium 1440) and on the tip and red trees (WebKit 1440).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-13
L=$D/logs; G=~/.claude/guard/guarded
from=${1:-1}
refused() { grep -q "REFUSED" $L/runs.out && { echo "CHAIN-STOPPED $(date +%T) on a refusal" >> $L/runs.out; exit 75; }; }
echo "CHAIN-START $(date +%T) from step $from head $(git -C $W rev-parse --short HEAD) load $(sysctl -n vm.loadavg)" >> $L/runs.out
if (( from <= 1 )); then bash $D/gates.sh; fi
if (( from <= 2 )); then bash $D/floor.sh; fi
if (( from <= 3 )); then
  for project in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
    for n in 0 1 2 3; do bash $D/part.sh tip $project $n tip-$project-$n; refused; done
  done
  echo "$(date +%T) tip gate done" >> $L/runs.out
fi
if (( from <= 4 )); then
  for project in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
    for n in 0 1 2 3; do bash $D/part.sh red $project $n red-$project-$n; refused; done
  done
  echo "$(date +%T) red gate done" >> $L/runs.out
fi
if (( from <= 5 )); then
  for project in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
    bash $D/part.sh pre $project "CommandDialog" pre-$project; refused
  done
fi
if (( from <= 6 )); then
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
  ( cd $W && git status --short -- docs tests-visual ) > $L/reg-status-after.txt
fi
if (( from <= 7 )); then
  for t in tip red; do
    case $t in tip) T=$W; P=5355;; red) T=$W/.cache/critic13-red/tree; P=5356;; esac
    s=$(date +%s)
    ( cd $T && GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/e-$t.json \
      $G --exclusive webkit --timeout 30 -- npx playwright test -c tests-visual/webkit-2287.config.ts tests-visual/release-10-1-5.spec.ts \
      --project=webkit --workers=1 -g "fix 12, coarse phone" --repeat-each=3 ) > $L/e-$t.log 2>&1
    echo "$(date +%T) e-$t exit $? $(( $(date +%s) - s ))s $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/e-$t.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
  done
fi
if (( from <= 8 )); then
  bash $D/probe-cmd/run.sh pre chromium-desktop cmd-pre-cd
  bash $D/probe-cmd/run.sh tip webkit-desktop cmd-tip-wd
  bash $D/probe-cmd/run.sh red webkit-desktop cmd-red-wd
fi
echo "CHAIN-DONE $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
