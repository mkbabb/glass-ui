#!/bin/zsh
# 10.1.5 critic round 13: browser runs on the fix-12 tip, one Playwright process per step, inside ONE guarded
# call per chain (WebKit 2287 under --exclusive webkit).
#   ~/.claude/guard/guarded [--exclusive webkit] --timeout 90 -- zsh docs/release-10.1.5/scripts/chain-critic-13.sh ch|wk step...
# steps: branch (the release spec), g6-4, g6-3, c12a, c12b (critic 12's cells, banked under critic-13/probe/<project>/),
#   shard1, shard2 (the release spec in two processes, so no one browser reaches its 179th request),
#   c13b (n1's collapse start per frame, the tip and the v10.1.4 harness),
#   c13b-f11 (c13b's tip arm on the fix-11 tip's src, swapped in and restored; WebKit),
#   n1 (the release spec's n1 alone, both pointers, N1_N repeats),
#   q2 (the release spec's q2 alone, Q2_N repeats; the p4 step runs it first),
#   obs (the root-style observer's frame cost, Chromium only), p4 (c9f, P4_RUNS runs of 32 first expands per arm,
#   the tip and the v10.1.4 harness alternating, WebKit)
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/critic-13
mkdir -p $L
E=$1; shift
if [[ $E == wk ]]; then CFG=(-c tests-visual/release-10-1-5-critic-12.config.ts --project=webkit); PROJ=webkit; export GLASS_UI_DEMO_PORT=5352
  C9CFG=(-c tests-visual/release-10-1-5-critic-9.config.ts --project=webkit)
else CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); PROJ=chromium-headless-new; export GLASS_UI_DEMO_PORT=5351
  C9CFG=($CFG); fi
note() { echo "$(date +%H:%M) $1 rc=$2 load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$1.log 2>/dev/null | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt; }
one() {
  local n=$1 tag=$1-$E rc
  case $n in
    c12a|c12b)
      npx playwright test $CFG release-10-1-5-critic-12.spec.ts --grep "$n (O-201|horizontal)" --workers=1 > $L/$tag.log 2>&1; rc=$?
      mkdir -p $L/probe/$PROJ
      local src=docs/release-10.1.5/critic-12/probe/branch/$PROJ
      [[ -f $src/$n.json ]] && cp $src/$n.json $L/probe/$PROJ/$n.json
      for f in $src/$n-*.png(N); do cp $f $L/probe/$PROJ/; done
      git checkout HEAD -- docs/release-10.1.5/critic-12/probe 2>/dev/null
      git clean -fq docs/release-10.1.5/critic-12/probe 2>/dev/null
      note $tag $rc;;
    obs)
      OBS_OUT=$WT/$L/${OBS_NAME:-obs2}.json npx playwright test $CFG release-10-1-5-critic-13.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?; note $tag $rc;;
    c13b)
      local c=($CFG); [[ $E == wk ]] && c=(-c tests-visual/release-10-1-5-critic-13.config.ts --project=webkit)
      npx playwright test $c release-10-1-5-critic-13.spec.ts --grep "c13b" --workers=1 > $L/$tag.log 2>&1; rc=$?; note $tag $rc;;
    c13b-f11)
      # the fix-11 tip's src (192c549cf) swapped in for one run of c13b's tip arm, and HEAD's restored after
      trap 'git checkout HEAD -- src; git status --short src | tee -a $L/runs.txt' EXIT INT TERM
      git checkout 192c549cf -- src; sleep 2
      C13B_ARMS=tip C13B_LABEL=fix11 C13B_OUT=$WT/$L/c13b-fix11.json npx playwright test -c tests-visual/release-10-1-5-critic-13.config.ts --project=webkit release-10-1-5-critic-13.spec.ts --grep "c13b" --workers=1 > $L/$tag.log 2>&1; rc=$?
      git checkout HEAD -- src; trap - EXIT INT TERM
      note $tag $rc;;
    n1)
      PI_REPORT=$WT/$L/$tag.json npx playwright test $CFG release-10-1-5.spec.ts --grep "n1 a fitting vertical" --repeat-each=${N1_N:-12} --workers=1 > $L/$tag.log 2>&1; rc=$?; note $tag $rc;;
    q2)
      PI_REPORT=$WT/$L/$tag.json npx playwright test $CFG release-10-1-5.spec.ts --grep "q2 O-187" --repeat-each=${Q2_N:-4} --workers=1 > $L/$tag.log 2>&1; rc=$?; note $tag $rc;;
    p4)
      one q2
      for i in {1..${P4_RUNS:-10}}; do
        for arm in tip v1014; do
          local a=""; [[ $arm == v1014 ]] && a=v1014
          CRITIC_LABEL=../../critic-13/p4/$arm-$i CRITIC_ARM=$a npx playwright test $C9CFG release-10-1-5-critic-9.spec.ts --grep "c9f" --workers=1 > $L/p4-$arm-$i-$E.log 2>&1; rc=$?
          note p4-$arm-$i-$E $rc
        done
      done;;
    shard1|shard2) PI_REPORT=$WT/$L/$tag.json npx playwright test $CFG release-10-1-5.spec.ts --shard=${n#shard}/2 --workers=1 > $L/$tag.log 2>&1; rc=$?; note $tag $rc;;
    branch) PI_REPORT=$WT/$L/$tag.json npx playwright test $CFG release-10-1-5.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?; note $tag $rc;;
    g6-4) PI_REPORT=$WT/$L/$tag.json npx playwright test $CFG release-10-1-4.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?; note $tag $rc;;
    g6-3) PI_REPORT=$WT/$L/$tag.json npx playwright test $CFG release-10-1-3.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?; note $tag $rc;;
  esac
}
for s in ${@}; do one $s; done
echo "$(date +%H:%M) chain $E done: $*" | tee -a $L/runs.txt
