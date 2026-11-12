#!/bin/zsh
# 11.0.1 fix 2 chain: one Playwright process per step inside ONE guarded call per engine
# (WebKit 2287 under --exclusive webkit).
#   guarded [--exclusive webkit] --timeout 90 -- zsh fix-2-chain.sh <ch|wk> <arm> step...
#   arm: before-tree runs in ./fix2-before (a git archive of the pre-fix commit with the
#   fix seat's specs copied in, deleted when done); any other arm runs in this worktree
#   steps: fix2 (release-11-0-1-fix-2.spec.ts), critic (critic 1 cells d and e), frames (critic 1 cell c, light 1440),
#   owner (release-11-0-1.spec.ts), g6-4 g6-3 (release-10-1-4, release-10-1-3), partA partB (the 10.1.5 release spec in two processes)
set -u
WT=${0:A:h:h:h:h}
L=$WT/docs/release-11.0.1/fix-2/runs
mkdir -p $L
E=$1; A=$2; shift 2
if [[ $A == before-tree ]]; then cd $WT/fix2-before; P=5405; else cd $WT; P=5401; fi
if [[ $E == wk ]]; then CFG=(-c tests-visual/release-11-0-1-fix-2.config.ts --project=webkit); export GLASS_UI_DEMO_PORT=$((P+1))
else CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); export GLASS_UI_DEMO_PORT=$P; fi
HALF='(^| )(n1|p[12]|q[123]|r1|s[1-4]|t1|u1) '
note() { echo "$(date +%H:%M) $A $1 rc=$2 load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$1.log 2>/dev/null | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt; }
one() {
  local n=$1 tag=$A-$1-$E rc
  case $n in
    fix2) FIX2_OUT=$L/shots-$A PI_REPORT=$L/$tag.json npx playwright test $CFG release-11-0-1-fix-2.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    critic) CRITIC_OUT=$L/shots-$A PI_REPORT=$L/$tag.json npx playwright test $CFG release-11-0-1-critic-1.spec.ts --grep "painted corner per frame|before the script publishes" --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    frames) CRITIC_OUT=$L/shots-$A PI_REPORT=$L/$tag.json npx playwright test $CFG release-11-0-1-critic-1.spec.ts --grep "light-1440f: frames through" --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    owner) OWNER_OUT=$L/owner-$A-$E PI_REPORT=$L/$tag.json npx playwright test $CFG release-11-0-1.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    g6-4) PI_REPORT=$L/$tag.json npx playwright test $CFG release-10-1-4.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    g6-3) PI_REPORT=$L/$tag.json npx playwright test $CFG release-10-1-3.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    partA) PI_REPORT=$L/$tag.json npx playwright test $CFG release-10-1-5.spec.ts --grep-invert "$HALF" --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    partB) PI_REPORT=$L/$tag.json npx playwright test $CFG release-10-1-5.spec.ts --grep "$HALF" --workers=1 > $L/$tag.log 2>&1; rc=$?;;
  esac
  note $tag $rc
}
for s in ${@}; do one $s; done
echo "$(date +%H:%M) chain $E $A done: $*" | tee -a $L/runs.txt
