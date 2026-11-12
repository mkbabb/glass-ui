#!/bin/zsh
# 10.1.5 critic round 6, second chain: Chromium first (g6, g7, the r6f/r6g/r6h cells on
# both arms), then WebKit (the v10.1.4 r6 arm, r6c coarse re-run, r6g/r6h, g6), each under guarded.
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/critic-6
G=~/.claude/guard/guarded
SPEC=release-10-1-5-critic-6.spec.ts
CH=(-c tests-visual/playwright.config.ts --project=chromium-headless-new)
WK=(-c tests-visual/release-10-1-5-critic-6.config.ts --project=webkit)
run() {
  local n=$1; shift
  "$@" > $L/$n.guard.log 2>&1
  local rc=$?
  echo "$n rc=$rc $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$n.log 2>/dev/null | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt
  grep -qi 'refus' $L/$n.guard.log && { echo "GUARD REFUSED at $n" | tee -a $L/runs.txt; exit 3; }
}
export GLASS_UI_DEMO_PORT=5266
run g6-chromium $G --timeout 90 -- zsh docs/release-10.1.5/scripts/g6-critic-6.sh chromium
run g7 $G --timeout 60 -- zsh docs/release-10.1.5/scripts/gates-critic-6.sh
run extra-chromium $G --timeout 30 -- zsh -c "PI_REPORT=$WT/$L/extra-chromium.json npx playwright test $CH $SPEC --grep 'r6g|r6h' --workers=1 > $L/extra-chromium.log 2>&1"
run v1014-extra-chromium $G --timeout 30 -- zsh -c "CRITIC_ARM=v1014 PI_REPORT=$WT/$L/v1014-extra-chromium.json npx playwright test $CH $SPEC --grep 'r6f|r6g|r6h' --workers=1 > $L/v1014-extra-chromium.log 2>&1"
export GLASS_UI_DEMO_PORT=5267
run wk-extra $G --exclusive webkit --timeout 60 -- zsh -c "PI_REPORT=$WT/$L/wk-extra.json npx playwright test $WK $SPEC --grep 'r6c arrow reach coarse|r6g|r6h' --workers=1 > $L/wk-extra.log 2>&1"
run v1014-r6-webkit $G --exclusive webkit --timeout 60 -- zsh -c "CRITIC_ARM=v1014 PI_REPORT=$WT/$L/v1014-r6-webkit.json npx playwright test $WK $SPEC --grep 'r6[abdfgh] ' --workers=1 > $L/v1014-r6-webkit.log 2>&1"
run g6-webkit $G --exclusive webkit --timeout 90 -- zsh docs/release-10.1.5/scripts/g6-critic-6.sh webkit
echo "chain2 done" | tee -a $L/runs.txt
