#!/bin/zsh
# 10.1.5 critic round 7: the round-7 cells (critic-7b) on the branch and the v10.1.4 arm, g6 and g7, one run at a
# time, each under guarded (WebKit under --exclusive webkit). STEPS picks a subset:
#   zsh docs/release-10.1.5/scripts/chain2-critic-7.sh [step ...]   steps: b-ch v-ch b-wk v-wk g6-ch g6-wk g7
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/critic-7
G=~/.claude/guard/guarded
SPEC=release-10-1-5-critic-7b.spec.ts
CH=(-c tests-visual/playwright.config.ts --project=chromium-headless-new)
WK=(-c tests-visual/release-10-1-5-critic-7.config.ts --project=webkit)
run() {
  local n=$1; shift
  "$@" > $L/$n.guard.log 2>&1
  local rc=$?
  echo "$(date +%H:%M) $n rc=$rc $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$n.log 2>/dev/null | tr -s ' ' | tr '\n' ' ') $(grep -i 'refus' $L/$n.guard.log | head -1)" | tee -a $L/runs.txt
  grep -qi 'refus' $L/$n.guard.log && { echo "GUARD REFUSED at $n" | tee -a $L/runs.txt; exit 3; }
}
STEPS=(${@:-b-ch v-ch b-wk v-wk g6-ch g6-wk g7})
GREP=${GREP:-}
for s in $STEPS; do case $s in
  b-ch) export GLASS_UI_DEMO_PORT=5273; run r7-branch-chromium $G --timeout 60 -- zsh -c "PI_REPORT=$WT/$L/r7-branch-chromium.json npx playwright test $CH $SPEC ${GREP:+--grep '$GREP'} --workers=1 > $L/r7-branch-chromium.log 2>&1";;
  v-ch) export GLASS_UI_DEMO_PORT=5273; run r7-v1014-chromium $G --timeout 60 -- zsh -c "CRITIC_ARM=v1014 PI_REPORT=$WT/$L/r7-v1014-chromium.json npx playwright test $CH $SPEC ${GREP:+--grep '$GREP'} --workers=1 > $L/r7-v1014-chromium.log 2>&1";;
  b-wk) export GLASS_UI_DEMO_PORT=5274; run r7-branch-webkit $G --exclusive webkit --timeout 60 -- zsh -c "PI_REPORT=$WT/$L/r7-branch-webkit.json npx playwright test $WK $SPEC ${GREP:+--grep '$GREP'} --workers=1 > $L/r7-branch-webkit.log 2>&1";;
  v-wk) export GLASS_UI_DEMO_PORT=5274; run r7-v1014-webkit $G --exclusive webkit --timeout 60 -- zsh -c "CRITIC_ARM=v1014 PI_REPORT=$WT/$L/r7-v1014-webkit.json npx playwright test $WK $SPEC ${GREP:+--grep '$GREP'} --workers=1 > $L/r7-v1014-webkit.log 2>&1";;
  g6-ch) export GLASS_UI_DEMO_PORT=5275; run g6-chromium $G --timeout 60 -- zsh -c "for s in release-10-1-4 release-10-1-3 release-10-1-5; do PI_REPORT=$WT/$L/g6-\$s-chromium.json npx playwright test $CH \$s.spec.ts --workers=1 > $L/g6-\$s-chromium.log 2>&1; echo \"g6 \$s-chromium exit=\$? \$(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/g6-\$s-chromium.log | tr -s ' ' | tr '\n' ' ')\" >> $L/runs.txt; done";;
  g6-wk) export GLASS_UI_DEMO_PORT=5276; run g6-webkit $G --exclusive webkit --timeout 60 -- zsh -c "for s in release-10-1-4 release-10-1-3 release-10-1-5; do PI_REPORT=$WT/$L/g6-\$s-webkit.json npx playwright test -c tests-visual/webkit-2287.config.ts --project=webkit \$s.spec.ts --workers=1 > $L/g6-\$s-webkit.log 2>&1; echo \"g6 \$s-webkit exit=\$? \$(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/g6-\$s-webkit.log | tr -s ' ' | tr '\n' ' ')\" >> $L/runs.txt; done";;
  g7) run g7 $G --timeout 60 -- zsh -c "mkdir -p $L/g7; : > $L/g7/gates.txt; for g in 'typecheck:npm run typecheck' 'build:npm run build' 'demo-dist:npm run demo:dist:build' 'vitest:npx vitest run --maxWorkers=2' 'verify-package:npm run verify:package'; do n=\${g%%:*}; c=\${g#*:}; eval \$c > $L/g7/\$n.log 2>&1; echo \"\$n exit=\$?\" >> $L/g7/gates.txt; done; grep -E 'Test Files|Tests ' $L/g7/vitest.log >> $L/g7/gates.txt";;
esac; done
echo "$(date +%H:%M) chain2 done: $STEPS" | tee -a $L/runs.txt
