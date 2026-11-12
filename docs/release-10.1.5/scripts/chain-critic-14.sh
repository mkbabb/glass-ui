#!/bin/zsh
# 10.1.5 critic round 14: browser runs on the fix-13 tip, one Playwright process per step, inside ONE guarded
# call per chain (WebKit 2287 under --exclusive webkit).
#   ~/.claude/guard/guarded [--exclusive webkit] --timeout 90 -- zsh docs/release-10.1.5/scripts/chain-critic-14.sh ch|wk step...
# steps: branch (the release spec), g6-4, g6-3, c12a, c12b (critic 12's cells, banked under critic-14/probe/<project>/),
#   u1 (the release spec's u1 alone, U1_N repeats), n1 (n1 alone, both pointers, N1_N repeats), q2 (q2 alone, Q2_N repeats),
#   c13b (critique 13's per-frame reading of the 332 px coarse collapse start, 24 collapses, HEAD's src),
#   partA, partB (the release spec split in two processes by title; the two counts sum to the whole spec),
#   c13b5 (c13b at its five stages, 8 collapses each, HEAD's src),
#   u1-tip (u1 on the round-13 tip's src, c788bbca7, swapped in and restored: the RED arm of fix 13's witness)
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/critic-14
mkdir -p $L
E=$1; shift
if [[ $E == wk ]]; then CFG=(-c tests-visual/release-10-1-5-fix-13.config.ts --project=webkit); PROJ=webkit; export GLASS_UI_DEMO_PORT=5372
  C12CFG=(-c tests-visual/release-10-1-5-critic-12.config.ts --project=webkit)
else CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); PROJ=chromium-headless-new; export GLASS_UI_DEMO_PORT=5371
  C12CFG=($CFG); fi
# partA / partB: the release spec in two Playwright processes (two browsers), split by title, so neither browser
# reaches the navigation count at which q2's page.goto has hung in every whole WebKit pass since fix 11
HALF='(^| )(n1|p[12]|q[123]|r1|s[1-4]|t1|u1) '
note() { echo "$(date +%H:%M) $1 rc=$2 load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$1.log 2>/dev/null | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt; }
one() {
  local n=$1 tag=$1-$E rc
  case $n in
    c12a|c12b)
      npx playwright test $C12CFG release-10-1-5-critic-12.spec.ts --grep "$n (O-201|horizontal)" --workers=1 > $L/$tag.log 2>&1; rc=$?
      mkdir -p $L/probe/$PROJ
      local src=docs/release-10.1.5/critic-12/probe/branch/$PROJ
      [[ -f $src/$n.json ]] && cp $src/$n.json $L/probe/$PROJ/$n.json
      for f in $src/$n-*.png(N); do cp $f $L/probe/$PROJ/; done
      git checkout HEAD -- docs/release-10.1.5/critic-12/probe 2>/dev/null
      git clean -fq docs/release-10.1.5/critic-12/probe 2>/dev/null
      note $tag $rc;;
    c13b)
      C13B_ARMS=tip C13B_LABEL=branch C13B_STAGES=332 C13B_N=24 C13B_OUT=$WT/$L/c13b-branch.json npx playwright test -c tests-visual/release-10-1-5-critic-13.config.ts --project=webkit release-10-1-5-critic-13.spec.ts --grep "c13b" --workers=1 > $L/$tag.log 2>&1; rc=$?; note $tag $rc;;
    c13b5)
      C13B_ARMS=tip C13B_LABEL=branch C13B_N=8 C13B_OUT=$WT/$L/c13b5-branch.json npx playwright test -c tests-visual/release-10-1-5-critic-13.config.ts --project=webkit release-10-1-5-critic-13.spec.ts --grep "c13b" --workers=1 > $L/$tag.log 2>&1; rc=$?; note $tag $rc;;
    u1-tip)
      trap 'git checkout HEAD -- src; git status --short src | tee -a $L/runs.txt' EXIT INT TERM
      git checkout c788bbca7 -- src; sleep 2
      PI_REPORT=$WT/$L/$tag.json npx playwright test $CFG release-10-1-5.spec.ts --grep "u1 a collapsing" --workers=1 > $L/$tag.log 2>&1; rc=$?
      git checkout HEAD -- src; trap - EXIT INT TERM
      note $tag $rc;;
    u1) PI_REPORT=$WT/$L/$tag.json npx playwright test $CFG release-10-1-5.spec.ts --grep "u1 a collapsing" --repeat-each=${U1_N:-2} --workers=1 > $L/$tag.log 2>&1; rc=$?; note $tag $rc;;
    n1) PI_REPORT=$WT/$L/$tag.json npx playwright test $CFG release-10-1-5.spec.ts --grep "n1 a fitting vertical" --repeat-each=${N1_N:-12} --workers=1 > $L/$tag.log 2>&1; rc=$?; note $tag $rc;;
    q2) PI_REPORT=$WT/$L/$tag.json npx playwright test $CFG release-10-1-5.spec.ts --grep "q2 O-187" --repeat-each=${Q2_N:-4} --workers=1 > $L/$tag.log 2>&1; rc=$?; note $tag $rc;;
    partA) PI_REPORT=$WT/$L/$tag.json npx playwright test $CFG release-10-1-5.spec.ts --grep-invert "$HALF" --workers=1 > $L/$tag.log 2>&1; rc=$?; note $tag $rc;;
    partB) PI_REPORT=$WT/$L/$tag.json npx playwright test $CFG release-10-1-5.spec.ts --grep "$HALF" --workers=1 > $L/$tag.log 2>&1; rc=$?; note $tag $rc;;
    branch) PI_REPORT=$WT/$L/$tag.json npx playwright test $CFG release-10-1-5.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?; note $tag $rc;;
    g6-4) PI_REPORT=$WT/$L/$tag.json npx playwright test $CFG release-10-1-4.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?; note $tag $rc;;
    g6-3) PI_REPORT=$WT/$L/$tag.json npx playwright test $CFG release-10-1-3.spec.ts --workers=1 > $L/$tag.log 2>&1; rc=$?; note $tag $rc;;
  esac
}
for s in ${@}; do one $s; done
echo "$(date +%H:%M) chain $E done: $*" | tee -a $L/runs.txt
