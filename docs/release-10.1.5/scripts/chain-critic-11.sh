#!/bin/zsh
# 10.1.5 critic round 11: browser runs on the fix-10 tip, one Playwright process per spec, inside ONE guarded
# call per engine (WebKit 2287 under --exclusive webkit).
#   ~/.claude/guard/guarded [--exclusive webkit] --timeout 90 -- zsh docs/release-10.1.5/scripts/chain-critic-11.sh ch|wk [step ...]
# steps: branch g6-4 g6-3 r10 r10-v1014 r10b r10c d1 c11 c11-v1014 c11x c11x-v1014 (c11x: the c11c/c11h cells only)
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/critic-11
mkdir -p $L/m5
E=$1; shift
if [[ $E == wk ]]; then CFG=(-c tests-visual/release-10-1-5-critic-11.config.ts --project=webkit); export GLASS_UI_DEMO_PORT=5324
else CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); export GLASS_UI_DEMO_PORT=5323; fi
one() {
  local n=$1 spec arm="" extra=()
  case $n in
    branch) spec=release-10-1-5.spec.ts;;
    g6-4) spec=release-10-1-4.spec.ts;;
    g6-3) spec=release-10-1-3.spec.ts;;
    r10) spec=release-10-1-5-critic-11-r10.spec.ts;;
    r10-v1014) spec=release-10-1-5-critic-11-r10.spec.ts; arm=v1014;;
    r10b) spec=release-10-1-5-critic-11-r10b.spec.ts;;
    r10c) spec=release-10-1-5-critic-11-r10c.spec.ts;;
    d1) spec=release-10-1-3.spec.ts; extra=(--grep "bottom-anchored · ancestor zoom" --repeat-each=8);;
    c11) spec=release-10-1-5-critic-11.spec.ts;;
    c11-v1014) spec=release-10-1-5-critic-11.spec.ts; arm=v1014;;
    c11x) spec=release-10-1-5-critic-11.spec.ts; extra=(--grep "c11c|c11h|c11i");;
    c11x-v1014) spec=release-10-1-5-critic-11.spec.ts; arm=v1014; extra=(--grep "c11c|c11h|c11i");;
  esac
  local tag=$n-$E
  M5_DUMP=$WT/$L/m5 CRITIC_ARM=$arm PI_REPORT=$WT/$L/$tag.json npx playwright test $CFG $spec $extra --workers=1 > $L/$tag.log 2>&1
  local rc=$?
  echo "$(date +%H:%M) $tag rc=$rc load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$tag.log 2>/dev/null | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt
}
for s in ${@}; do one $s; done
echo "$(date +%H:%M) chain $E done: $*" | tee -a $L/runs.txt
