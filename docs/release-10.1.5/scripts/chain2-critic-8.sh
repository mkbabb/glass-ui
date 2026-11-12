#!/bin/zsh
# 10.1.5 critic round 8 (second chain, adds probe2 = c8g|c8h): every browser run on the round-8 tip, one guarded run at a time (WebKit 2287 under
# --exclusive webkit), each spec its own guarded call. Stops on a guard refusal.
#   zsh docs/release-10.1.5/scripts/chain-critic-8.sh [step ...]
# steps: <engine>:<name>  engine ch|wk; name branch g6-4 g6-3 probe probe-v1014 r7 r7-v1014 battery
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/critic-8
mkdir -p $L/m5
G=~/.claude/guard/guarded
CH=(-c tests-visual/playwright.config.ts --project=chromium-headless-new)
WK=(-c tests-visual/release-10-1-5-critic-8.config.ts --project=webkit)
one() { # engine name
  local e=$1 n=$2 spec arm="" grep="" gargs
  case $n in
    branch) spec=release-10-1-5.spec.ts;;
    g6-4) spec=release-10-1-4.spec.ts;;
    g6-3) spec=release-10-1-3.spec.ts;;
    probe) spec=release-10-1-5-critic-8.spec.ts;;
    probe-v1014) spec=release-10-1-5-critic-8.spec.ts; arm=v1014; grep="c8a halo|c8e|c8d|c8b";;
    r7) spec=release-10-1-5-critic-8b.spec.ts;;
    r7-v1014) spec=release-10-1-5-critic-8b.spec.ts; arm=v1014;;
    battery) spec=release-10-1-5-critic-8a.spec.ts;;
    probe2) spec=release-10-1-5-critic-8.spec.ts; grep="c8g|c8h";;
    probe2-v1014) spec=release-10-1-5-critic-8.spec.ts; arm=v1014; grep="c8g|c8h";;
  esac
  local cfg tag=$n-$e
  if [[ $e == wk ]]; then cfg=($WK); gargs=(--exclusive webkit --timeout 90); export GLASS_UI_DEMO_PORT=5302
  else cfg=($CH); gargs=(--timeout 90); export GLASS_UI_DEMO_PORT=5301; fi
  $G $gargs -- zsh -c "M5_DUMP=$WT/$L/m5 CRITIC_ARM=$arm PI_REPORT=$WT/$L/$tag.json npx playwright test ${cfg[*]} $spec ${grep:+--grep '$grep'} --workers=1 > $L/$tag.log 2>&1" > $L/$tag.guard.log 2>&1
  local rc=$?
  echo "$(date +%H:%M) $tag rc=$rc $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$tag.log 2>/dev/null | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt
  grep -qi 'refus' $L/$tag.guard.log && { echo "GUARD REFUSED at $tag" | tee -a $L/runs.txt; exit 3; }
  return 0
}
for s in ${@}; do one ${s%%:*} ${s#*:}; done
echo "$(date +%H:%M) chain done: $*" | tee -a $L/runs.txt
