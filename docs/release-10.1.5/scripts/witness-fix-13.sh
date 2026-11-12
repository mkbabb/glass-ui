#!/bin/zsh
# 10.1.5 fix round 13: browser runs, one Playwright process per step, inside ONE guarded call per engine
# (WebKit 2287 under --exclusive webkit).
#   ~/.claude/guard/guarded [--exclusive webkit] --timeout 90 -- zsh docs/release-10.1.5/scripts/witness-fix-13.sh ch|wk tip|branch step...
# arm `tip` runs the round-13 tip's src (c788bbca7, swapped in; HEAD's src restored on exit); arm `branch` runs HEAD's.
# steps: u1 (the T1 witness, U1_N repeats), c13b (critique 13's per-frame reading at 332, the working src as `tip`),
# branch (the release spec), g6-4, g6-3
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/fix-13
mkdir -p $L
E=$1; ARM=$2; shift 2
if [[ $E == wk ]]; then CFG=(-c tests-visual/release-10-1-5-fix-13.config.ts --project=webkit); PROJ=webkit; export GLASS_UI_DEMO_PORT=5364
else CFG=(-c tests-visual/release-10-1-5-fix-13.config.ts --project=chromium-headless-new); PROJ=chromium-headless-new; export GLASS_UI_DEMO_PORT=5365; fi
if [[ $ARM == tip ]]; then
  trap 'git checkout HEAD -- src; git status --short src' EXIT INT TERM
  git checkout c788bbca7 -- src
  sleep 2
fi
one() {
  local n=$1 tag=$1-$ARM-$E rc
  case $n in
    u1)
      PI_REPORT=$WT/$L/$tag.json npx playwright test $CFG release-10-1-5.spec.ts --grep "u1 a collapsing" --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    c13b)
      local c=(-c tests-visual/release-10-1-5-critic-13.config.ts --project=$PROJ)
      C13B_ARMS=tip C13B_LABEL=$ARM C13B_STAGES=${STAGES:-332} C13B_N=${N:-24} C13B_OUT=$WT/$L/c13b-$ARM.json npx playwright test $c release-10-1-5-critic-13.spec.ts --grep "c13b" --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    branch)
      PI_REPORT=$WT/$L/$tag.json npx playwright test $CFG release-10-1-5.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    g6-4)
      PI_REPORT=$WT/$L/$tag.json npx playwright test $CFG release-10-1-4.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    g6-3)
      PI_REPORT=$WT/$L/$tag.json npx playwright test $CFG release-10-1-3.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
  esac
  echo "$(date +%H:%M) $tag rc=$rc load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$tag.log 2>/dev/null | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt
}
for s in ${@}; do one $s; done
echo "$(date +%H:%M) chain $E $ARM done: $*" | tee -a $L/runs.txt
