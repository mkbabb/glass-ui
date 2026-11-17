#!/bin/bash
# Critic 3, chain 2: this seat's probes (readings only) on the tip and on v11.1.0, in the
# four projects, one guarded Playwright process each. The probe is copied into the v11.1.0
# tree at the same relative path so its imports resolve to that tree's harnesses.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/critic-3
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
RED=$W/.cache/red-v11.1.0/tree
L=$D/logs; G=~/.claude/guard/guarded
C=docs/release-11.1.1/critic-3/probe/probe.config.ts
mkdir -p $RED/docs/release-11.1.1/critic-3/probe $RED/tests-visual/release-11-1-1
cp $D/probe/*.ts $RED/docs/release-11.1.1/critic-3/probe/
cp $W/tests-visual/release-11-1-1*.ts $RED/tests-visual/
cp $W/tests-visual/release-11-1-1/* $RED/tests-visual/release-11-1-1/
one() { # <label> <tree> <port> <project>
  case $4 in webkit-*) EX="--exclusive webkit" ;; *) EX="" ;; esac
  (cd $2 && GLASS_UI_DEMO_PORT=$3 GLASS_UI_DEMO_URL=http://localhost:$3 PI_REPORT=$L/probe-$1-$4.json \
    $G $EX --timeout 30 -- npx playwright test -c $C --project=$4 --workers=1 > $L/probe-$1-$4.log 2>&1)
  echo "$(date +%T) probe-$1-$4 exit $? load=$(uptime | sed 's/.*averages: //')" >> $L/runs.out
}
for p in ${PROJECTS:-chromium-phone chromium-desktop webkit-phone webkit-desktop}; do
  one tip $W 5351 $p
  one red $RED 5352 $p
done
echo "CHAIN2-DONE $(date +%T)" >> $L/runs.out
