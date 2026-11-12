#!/bin/zsh
# 10.1.5 critic round 6: every remaining run, one at a time, each under guarded.
#   zsh docs/release-10.1.5/scripts/chain-critic-6.sh   (from anywhere)
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/critic-6
G=~/.claude/guard/guarded
SPEC=release-10-1-5-critic-6.spec.ts
CH=(-c tests-visual/playwright.config.ts --project=chromium-headless-new)
WK=(-c tests-visual/release-10-1-5-critic-6.config.ts --project=webkit)
run() { # name guard-args... -- cmd...
  local n=$1; shift
  "$@" > $L/$n.guard.log 2>&1
  local rc=$?
  echo "$n rc=$rc $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$n.log 2>/dev/null | tr -s ' ' | tr '\n' ' ') $(grep -i 'refus' $L/$n.guard.log | head -1)" | tee -a $L/runs.txt
  grep -qi 'refus' $L/$n.guard.log && { echo "GUARD REFUSED at $n" | tee -a $L/runs.txt; exit 3; }
}
export GLASS_UI_DEMO_PORT=5266
run v1014-r6-chromium $G --timeout 60 -- zsh -c "CRITIC_ARM=v1014 PI_REPORT=$WT/$L/v1014-r6-chromium.json npx playwright test $CH $SPEC --grep 'r6[abd] ' --workers=1 > $L/v1014-r6-chromium.log 2>&1"
run battery-chromium $G --timeout 90 -- zsh -c "PI_REPORT=$WT/$L/battery-chromium.json npx playwright test $CH $SPEC --grep-invert 'r6 ' --workers=1 > $L/battery-chromium.log 2>&1"
export GLASS_UI_DEMO_PORT=5267
run probe-webkit $G --exclusive webkit --timeout 90 -- zsh -c "PI_REPORT=$WT/$L/probe-webkit.json npx playwright test $WK $SPEC --workers=1 > $L/probe-webkit.log 2>&1"
run v1014-r6-webkit $G --exclusive webkit --timeout 60 -- zsh -c "CRITIC_ARM=v1014 PI_REPORT=$WT/$L/v1014-r6-webkit.json npx playwright test $WK $SPEC --grep 'r6[abd] ' --workers=1 > $L/v1014-r6-webkit.log 2>&1"
run g6-chromium $G --timeout 90 -- zsh docs/release-10.1.5/scripts/g6-critic-6.sh chromium
run g6-webkit $G --exclusive webkit --timeout 90 -- zsh docs/release-10.1.5/scripts/g6-critic-6.sh webkit
run g7 $G --timeout 60 -- zsh docs/release-10.1.5/scripts/gates-critic-6.sh
echo "chain done" | tee -a $L/runs.txt
