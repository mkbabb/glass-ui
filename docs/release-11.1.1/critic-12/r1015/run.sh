#!/bin/bash
# Critic 12: the release-10-1-5 critic and fix specs in WebKit 2287 on one tree, through the run
# guard, one Playwright process.   run.sh <tip|red> <log name> [spec files...]
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-12/r1015
L=$W/docs/release-11.1.1/critic-12/logs
case $1 in tip) T=$W; P=5355 ;; red) T=$W/.cache/critic12-v11.1.0/tree; P=5356 ;; esac
mkdir -p $T/tests-visual/critic12-r1015 && cp $D/critic12-r1015.config.ts $T/tests-visual/critic12-r1015/
start=$(date +%s)
cd $T/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$2.json \
  ~/.claude/guard/guarded --exclusive webkit --timeout 85 -- npx playwright test -c critic12-r1015/critic12-r1015.config.ts --project=webkit --workers=1 "${@:3}" > $L/$2.log 2>&1
rc=$?
rm -rf $T/tests-visual/critic12-r1015
echo "$(date +%T) $2 r1015 $1 exit $rc $(( $(date +%s) - start ))s load=$(sysctl -n vm.loadavg) $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$2.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
exit $rc
