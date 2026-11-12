#!/bin/zsh
# 10.1.5 fix round 12: browser runs, one Playwright process per step, inside ONE guarded call per engine
# (WebKit 2287 under --exclusive webkit).
#   ~/.claude/guard/guarded [--exclusive webkit] --timeout 90 -- zsh docs/release-10.1.5/scripts/witness-fix-12.sh ch|wk tip|branch step...
# arm `tip` runs HEAD's src (the working src is saved to fix-12/<engine>-wip-src.patch and restored on exit);
# arm `branch` runs the working src.
# steps: c12a c12b (critic 12's cells, banked under fix-12/<arm>/<project>/), d1 (fix 9's D-1 per-frame
# probe, D1_N repeats), w (s2, t1, m2), branch (the release spec), g6-4, g6-3
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/fix-12
mkdir -p $L
E=$1; ARM=$2; shift 2
if [[ $E == wk ]]; then CFG=(-c tests-visual/release-10-1-5-critic-12.config.ts --project=webkit); PROJ=webkit; export GLASS_UI_DEMO_PORT=5346
  D1CFG=(-c tests-visual/release-10-1-5-d1-probe.config.ts --project=webkit)
else CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); PROJ=chromium-headless-new; export GLASS_UI_DEMO_PORT=5345
  D1CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); fi
if [[ $ARM == tip ]]; then
  git diff HEAD -- src > $L/$E-wip-src.patch
  trap 'git checkout HEAD -- src; git apply $L/$E-wip-src.patch; git status --short src' EXIT INT TERM
  git checkout HEAD -- src
  sleep 2
fi
one() {
  local n=$1 tag=$1-$ARM-$E rc
  case $n in
    c12a|c12b)
      rm -f docs/release-10.1.5/critic-12/probe/branch/$PROJ/$n.json docs/release-10.1.5/critic-12/probe/branch/$PROJ/$n-*.png(N)
      npx playwright test $CFG release-10-1-5-critic-12.spec.ts --grep "$n (O-201|horizontal)" --workers=1 > $L/$tag.log 2>&1; rc=$?
      mkdir -p $L/$ARM/$PROJ
      local src=docs/release-10.1.5/critic-12/probe/branch/$PROJ
      [[ -f $src/$n.json ]] && cp $src/$n.json $L/$ARM/$PROJ/$n.json
      for f in $src/$n-*.png(N); do cp $f $L/$ARM/$PROJ/; done
      git checkout HEAD -- docs/release-10.1.5/critic-12/probe 2>/dev/null
      git clean -fq docs/release-10.1.5/critic-12/probe 2>/dev/null;;
    d1)
      : > $L/d1probe-$ARM-$E.jsonl
      PROBE_OUT=$WT/$L/d1probe-$ARM-$E.jsonl npx playwright test $D1CFG release-10-1-5-d1-probe.spec.ts --repeat-each=${D1_N:-16} --workers=1 > $L/$tag.log 2>&1; rc=$?;;
    w)
      PI_REPORT=$WT/$L/$tag.json npx playwright test $CFG release-10-1-5.spec.ts --grep "s2 O-201|t1 O-201|m2 a vertical" --workers=1 > $L/$tag.log 2>&1; rc=$?;;
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
