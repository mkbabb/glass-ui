#!/bin/zsh
# 11.0.1 carry critic chain: one Playwright process per step inside ONE guarded call per
# chain (WebKit 2287 under --exclusive webkit), on this worktree's own demo ports.
#   guarded [--exclusive webkit] --timeout 90 -- zsh carry-chain.sh <ch|co|wk> step...
#   steps: r2 (release-10-1-2 whole), rev6 (the O-101a reversal 390->1440 cell, six repeats),
#   o101x3 (the eight v11.0.0-failing O-101 cells, three repeats), partA partB (the 10.1.5
#   release spec in two processes), g6-4, g6-3, owner, fix2, c2 (critic 2's pixel reader)
set -u
WT=${0:A:h:h:h:h}
L=$WT/docs/release-11.0.1/critic-carry/runs
mkdir -p $L
E=$1; shift
cd $WT
case $E in
  wk) CFG=(-c tests-visual/release-11-0-1-critic-2.config.ts --project=webkit); export GLASS_UI_DEMO_PORT=5432;;
  co) CFG=(-c tests-visual/playwright.config.ts --project=coarse-touch); export GLASS_UI_DEMO_PORT=5431;;
  *)  CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); export GLASS_UI_DEMO_PORT=5431;;
esac
export GLASS_UI_DEMO_URL=http://localhost:$GLASS_UI_DEMO_PORT
# The 11.0.1 WebKit configs do not match release-10-1-2.spec.ts; the 2287 base config does.
R2=($CFG); [[ $E == wk ]] && R2=(-c tests-visual/webkit-2287.config.ts --project=webkit)
HALF='(^| )(n1|p[12]|q[123]|r1|s[1-4]|t1|u1) '
note() { echo "$(date +%H:%M) $1 rc=$2 head=$(git rev-parse --short HEAD) load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$1.log 2>/dev/null | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt; }
one() {
  local n=$1 tag=$1-$E rc
  case $n in
    r2) PI_REPORT=$L/$tag.json npx playwright test $R2 release-10-1-2.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    rev6) PI_REPORT=$L/$tag.json npx playwright test $R2 release-10-1-2.spec.ts --grep 'O-101a · a host change during the morph · reversal \(390->1440\)' --repeat-each=6 --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    o101x3) PI_REPORT=$L/$tag.json npx playwright test $R2 release-10-1-2.spec.ts --grep 'O-101 · (horizontal|vertical) · (reversal|mid-expand)' --repeat-each=3 --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    partA) PI_REPORT=$L/$tag.json npx playwright test $CFG release-10-1-5.spec.ts --grep-invert "$HALF" --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    partB) PI_REPORT=$L/$tag.json npx playwright test $CFG release-10-1-5.spec.ts --grep "$HALF" --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    g6-4) PI_REPORT=$L/$tag.json npx playwright test $CFG release-10-1-4.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    g6-3) PI_REPORT=$L/$tag.json npx playwright test $CFG release-10-1-3.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    owner) OWNER_OUT=$L/owner-$E PI_REPORT=$L/$tag.json npx playwright test $CFG release-11-0-1.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    fix2) FIX2_OUT=$L/fix2-$E PI_REPORT=$L/$tag.json npx playwright test $CFG release-11-0-1-fix-2.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    c2) CRITIC_OUT=$L/c2-shots PI_REPORT=$L/$tag.json npx playwright test $CFG release-11-0-1-critic-2.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
  esac
  note $tag $rc
}
for s in ${@}; do one $s; done
echo "$(date +%H:%M) chain $E done: $*" | tee -a $L/runs.txt
