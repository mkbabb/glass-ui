#!/bin/zsh
# 10.1.5 fix round 13: the two WebKit cells the branch pass lost, alone (q2's navigation hang; F-4 at load 25).
#   ~/.claude/guard/guarded --exclusive webkit --timeout 30 -- zsh docs/release-10.1.5/scripts/rerun-fix-13.sh
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/fix-13; export GLASS_UI_DEMO_PORT=5364
CFG=(-c tests-visual/release-10-1-5-fix-13.config.ts --project=webkit)
npx playwright test $CFG release-10-1-5.spec.ts --grep "q2 O-187" --repeat-each=${Q2_N:-4} --workers=1 > $L/q2-rerun-wk.log 2>&1
echo "$(date +%H:%M) q2-rerun-wk rc=$? load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/q2-rerun-wk.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt
PI_REPORT=$WT/$L/g6-4-rerun-wk.json npx playwright test $CFG release-10-1-4.spec.ts --workers=1 > $L/g6-4-rerun-wk.log 2>&1
echo "$(date +%H:%M) g6-4-rerun-wk rc=$? load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/g6-4-rerun-wk.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt
