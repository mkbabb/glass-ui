#!/bin/zsh
# 10.1.5 critic round 9: browser runs on the fix-8 tip, one Playwright process per spec, run inside ONE guarded
# call per engine (WebKit 2287 under --exclusive webkit). The critic-8 cells write to critic-8/probe/; this
# driver moves them to critic-9/c8cells/ after the run.
#   ~/.claude/guard/guarded [--exclusive webkit] --timeout 90 -- zsh docs/release-10.1.5/scripts/chain-critic-9.sh ch|wk [step ...]
# steps: branch g6-4 g6-3 probe9 probe8 r7
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/critic-9
mkdir -p $L/m5
E=$1; shift
if [[ $E == wk ]]; then CFG=(-c tests-visual/release-10-1-5-critic-9.config.ts --project=webkit); export GLASS_UI_DEMO_PORT=5312
else CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); export GLASS_UI_DEMO_PORT=5311; fi
one() {
  local n=$1 spec arm="" grep=""
  case $n in
    branch) spec=release-10-1-5.spec.ts;;
    g6-4) spec=release-10-1-4.spec.ts;;
    g6-3) spec=release-10-1-3.spec.ts;;
    probe9) spec=release-10-1-5-critic-9.spec.ts;;
    probe8) spec=release-10-1-5-critic-9b.spec.ts;;
    r7) spec=release-10-1-5-critic-9c.spec.ts;;
  esac
  local tag=$n-$E
  M5_DUMP=$WT/$L/m5 CRITIC_ARM=$arm PI_REPORT=$WT/$L/$tag.json npx playwright test $CFG $spec ${grep:+--grep} ${grep:-} --workers=1 > $L/$tag.log 2>&1
  local rc=$?
  echo "$(date +%H:%M) $tag rc=$rc $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$tag.log 2>/dev/null | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt
}
for s in ${@}; do one $s; done
echo "$(date +%H:%M) chain $E done: $*" | tee -a $L/runs.txt
