#!/bin/zsh
# 11.0.1 critic 2 chain: one Playwright process per step inside ONE guarded call per chain
# (WebKit 2287 under --exclusive webkit), on this worktree's own demo ports.
#   guarded [--exclusive webkit] --timeout 90 -- zsh critic-2-chain.sh <ch|wk> step...
#   steps: partA partB (the 10.1.5 release spec in two processes), g6-4, g6-3, ub7, owner,
#   dara (daraksha's two repro pages, a reading), fix2 (fix 2's f1-f4), c1 (critic 1's paint
#   spec), c2 (critic 2's paint spec)
set -u
WT=${0:A:h:h:h:h}
L=$WT/docs/release-11.0.1/critic-2/runs
mkdir -p $L
E=$1; shift
cd $WT
if [[ $E == wk ]]; then CFG=(-c tests-visual/release-11-0-1-critic-2.config.ts --project=webkit); export GLASS_UI_DEMO_PORT=5412
else CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); export GLASS_UI_DEMO_PORT=5411; fi
HALF='(^| )(n1|p[12]|q[123]|r1|s[1-4]|t1|u1) '
note() { echo "$(date +%H:%M) $1 rc=$2 load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$1.log 2>/dev/null | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt; }
one() {
  local n=$1 tag=$1-$E rc
  case $n in
    partA) PI_REPORT=$L/$tag.json npx playwright test $CFG release-10-1-5.spec.ts --grep-invert "$HALF" --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    partB) PI_REPORT=$L/$tag.json npx playwright test $CFG release-10-1-5.spec.ts --grep "$HALF" --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    g6-4) PI_REPORT=$L/$tag.json npx playwright test $CFG release-10-1-4.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    g6-3) PI_REPORT=$L/$tag.json npx playwright test $CFG release-10-1-3.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    owner) OWNER_OUT=$L/owner-$E PI_REPORT=$L/$tag.json npx playwright test $CFG release-11-0-1.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    dara) OWNER_OUT=$L/owner-$E PI_REPORT=$L/$tag.json npx playwright test $CFG release-11-0-1-daraksha.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    fix2) FIX2_OUT=$L/fix2-$E PI_REPORT=$L/$tag.json npx playwright test $CFG release-11-0-1-fix-2.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    c1) CRITIC_OUT=$L/c1-shots PI_REPORT=$L/$tag.json npx playwright test $CFG release-11-0-1-critic-1.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    c2) CRITIC_OUT=$L/c2-shots PI_REPORT=$L/$tag.json npx playwright test $CFG release-11-0-1-critic-2.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    ub7) GLASS_UI_DEMO_PORT=5413 PI_REPORT=$L/$tag.json npx playwright test -c tests-visual/u-b7/playwright.config.ts --project=chromium-desk --project=chromium-coarse --workers=1 > $L/$tag.log 2>&1; rc=$?;;
  esac
  note $tag $rc
}
for s in ${@}; do one $s; done
echo "$(date +%H:%M) chain $E done: $*" | tee -a $L/runs.txt
