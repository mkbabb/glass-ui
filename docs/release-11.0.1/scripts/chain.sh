#!/bin/zsh
# 11.0.1 witness chain: one Playwright process per step, inside ONE guarded call per chain
# (WebKit 2287 under --exclusive webkit). Each tree gets its own demo port, so no run can
# attach to another worktree's dev server.
#   guarded [--exclusive webkit] --timeout 90 -- zsh chain.sh <ch|wk> <tree> step...
#   tree: merged (this worktree) | v1100 (git archive of v11.0.0 at ./v1100, spec copied in)
#   steps: partA partB (the 10.1.5 release spec in two processes), g6-4, g6-3, ub7, owner,
#   dara (daraksha's two repro pages, a reading)
set -u
WT=${0:A:h:h:h:h}
L=$WT/docs/release-11.0.1/runs
mkdir -p $L
E=$1; T=$2; shift 2
if [[ $T == v1100 ]]; then ROOT=$WT/v1100; BASEPORT=5395; else ROOT=$WT; BASEPORT=5391; fi
cd $ROOT
if [[ $E == wk ]]; then CFG=(-c tests-visual/release-11-0-1.config.ts --project=webkit); export GLASS_UI_DEMO_PORT=$((BASEPORT+1))
else CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); export GLASS_UI_DEMO_PORT=$BASEPORT; fi
HALF='(^| )(n1|p[12]|q[123]|r1|s[1-4]|t1|u1) '
note() { echo "$(date +%H:%M) $T $1 rc=$2 load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$1.log 2>/dev/null | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt; }
one() {
  local n=$1 tag=$T-$1-$E rc
  case $n in
    partA) PI_REPORT=$L/$tag.json npx playwright test $CFG release-10-1-5.spec.ts --grep-invert "$HALF" --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    partB) PI_REPORT=$L/$tag.json npx playwright test $CFG release-10-1-5.spec.ts --grep "$HALF" --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    g6-4) PI_REPORT=$L/$tag.json npx playwright test $CFG release-10-1-4.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    g6-3) PI_REPORT=$L/$tag.json npx playwright test $CFG release-10-1-3.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    owner) OWNER_OUT=$L/owner-$T-$E PI_REPORT=$L/$tag.json npx playwright test $CFG release-11-0-1.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    dara) OWNER_OUT=$L/owner-$T-$E PI_REPORT=$L/$tag.json npx playwright test $CFG release-11-0-1-daraksha.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    ub7) GLASS_UI_DEMO_PORT=$((BASEPORT+2)) PI_REPORT=$L/$tag.json npx playwright test -c tests-visual/u-b7/playwright.config.ts --project=chromium-desk --project=chromium-coarse --workers=1 > $L/$tag.log 2>&1; rc=$?;;
  esac
  note $tag $rc
}
for s in ${@}; do one $s; done
echo "$(date +%H:%M) chain $E $T done: $*" | tee -a $L/runs.txt
