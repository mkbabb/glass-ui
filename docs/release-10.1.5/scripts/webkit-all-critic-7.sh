#!/bin/zsh
# 10.1.5 critic round 7: every remaining WebKit 2287 run in ONE guarded --exclusive webkit call (so the
# machine-wide lock is taken once): the round-7 cells on the branch and the v10.1.4 arm, then g6.
#   ~/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh docs/release-10.1.5/scripts/webkit-all-critic-7.sh
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/critic-7
export GLASS_UI_DEMO_PORT=5277
WK=(-c tests-visual/release-10-1-5-critic-7.config.ts --project=webkit)
sum() { echo "$(date +%H:%M) $1 exit=$2 $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$1.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.txt; }
PI_REPORT=$WT/$L/r7-branch-webkit.json npx playwright test $WK release-10-1-5-critic-7b.spec.ts --workers=1 > $L/r7-branch-webkit.log 2>&1; sum r7-branch-webkit $?
CRITIC_ARM=v1014 PI_REPORT=$WT/$L/r7-v1014-webkit.json npx playwright test $WK release-10-1-5-critic-7b.spec.ts --workers=1 > $L/r7-v1014-webkit.log 2>&1; sum r7-v1014-webkit $?
PI_REPORT=$WT/$L/battery-webkit-rerun.json npx playwright test $WK release-10-1-5-critic-7.spec.ts --grep "dock postures fine 320" --workers=1 > $L/battery-webkit-rerun.log 2>&1; sum battery-webkit-rerun $?
for s in release-10-1-4 release-10-1-3 release-10-1-5; do
  PI_REPORT=$WT/$L/g6-$s-webkit.json npx playwright test -c tests-visual/webkit-2287.config.ts --project=webkit $s.spec.ts --workers=1 > $L/g6-$s-webkit.log 2>&1; sum g6-$s-webkit $?
done
echo "$(date +%H:%M) webkit-all done" >> $L/runs.txt
