#!/bin/bash
# Fix seat 10: every witness run, one heavy run at a time, each through the run guard.
#   chain.sh <stage>
# 1. item 1's probe with the film module before the fix (15ca90647) and on the branch;
#    item 2's frost cells on the plant (Chromium 390, WebKit 390, twice each), on v11.1.0
#    (four projects) and on the branch (four projects, three times each);
# 2. row 9's reversal cell on v11.1.0 (Chromium 390, three times), then the gate's part B on
#    the branch three times in each project;
# 3. the exits gate whole as scripts/release.sh runs it, on port 5355, then the five gates.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/fix-10
L=$D/logs
FROST="fade · a (Sheet right|Sheet bottom|detented Sheet) "
PARTB="(reverse|tooltip|expand|leave) · "
EXPAND="expand · an ExpandableContainer reopened while it leaves"
short() { case $1 in chromium-phone) echo cp ;; chromium-desktop) echo cd ;; webkit-phone) echo wp ;; webkit-desktop) echo wd ;; esac; }
echo "STAGE-$1-START $(date +%T) head $(git -C $W rev-parse --short HEAD) load $(sysctl -n vm.loadavg)" >> $L/runs.out
case $1 in
  1)
    bash $D/probe/run.sh 15ca90647 chromium-phone lost-before-cp
    bash $D/probe/run.sh branch chromium-phone lost-branch-cp
    for p in chromium-phone webkit-phone; do bash $D/run.sh plant $p plant-frost-$(short $p) "$FROST" --repeat-each=2; done
    for p in chromium-phone chromium-desktop webkit-phone webkit-desktop; do bash $D/run.sh red $p red-frost-$(short $p) "$FROST"; done
    for p in chromium-phone chromium-desktop webkit-phone webkit-desktop; do bash $D/run.sh branch $p frost-$(short $p) "$FROST" --repeat-each=3; done
    ;;
  2)
    bash $D/run.sh red chromium-phone red-expand-cp "$EXPAND" --repeat-each=3
    for p in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
      for n in 1 2 3; do bash $D/run.sh branch $p partB-$(short $p)-$n "$PARTB"; done
    done
    ;;
  3)
    start=$(date +%s)
    (cd $W && GLASS_UI_DEMO_PORT=5355 npm -w tests-visual run gate:exits > $L/gate.log 2>&1)
    echo "$(date +%T) gate:exits exit $? $(( $(date +%s) - start ))s load=$(sysctl -n vm.loadavg)" >> $L/runs.out
    bash $D/gates.sh
    ;;
esac
echo "STAGE-$1-DONE $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
