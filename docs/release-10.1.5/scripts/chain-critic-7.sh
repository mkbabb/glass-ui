#!/bin/zsh
# 10.1.5 critic round 7: the critic-6 battery on the fix-6 tip, one run at a time, each under guarded.
#   zsh docs/release-10.1.5/scripts/chain-critic-7.sh   (from anywhere)
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/critic-7
G=~/.claude/guard/guarded
SPEC=release-10-1-5-critic-7.spec.ts
CH=(-c tests-visual/playwright.config.ts --project=chromium-headless-new)
WK=(-c tests-visual/release-10-1-5-critic-7.config.ts --project=webkit)
run() { # name guard-args... -- cmd...
  local n=$1; shift
  "$@" > $L/$n.guard.log 2>&1
  local rc=$?
  echo "$(date +%H:%M) $n rc=$rc $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$n.log 2>/dev/null | tr -s ' ' | tr '\n' ' ') $(grep -i 'refus' $L/$n.guard.log | head -1)" | tee -a $L/runs.txt
  grep -qi 'refus' $L/$n.guard.log && { echo "GUARD REFUSED at $n" | tee -a $L/runs.txt; exit 3; }
}
export GLASS_UI_DEMO_PORT=5271
run battery-chromium $G --timeout 90 -- zsh -c "PI_REPORT=$WT/$L/battery-chromium.json npx playwright test $CH $SPEC --workers=1 > $L/battery-chromium.log 2>&1"
export GLASS_UI_DEMO_PORT=5272
run battery-webkit $G --exclusive webkit --timeout 90 -- zsh -c "PI_REPORT=$WT/$L/battery-webkit.json npx playwright test $WK $SPEC --workers=1 > $L/battery-webkit.log 2>&1"
echo "$(date +%H:%M) chain1 done" | tee -a $L/runs.txt
