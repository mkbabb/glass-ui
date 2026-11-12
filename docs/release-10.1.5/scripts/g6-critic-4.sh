#!/bin/zsh
# 10.1.5 critic round 4: the release specs on the tip, one engine, src untouched.
# From the worktree root under guarded (WebKit under --exclusive webkit):
#   zsh docs/release-10.1.5/scripts/g6-critic-4.sh chromium|webkit
set -u
ENGINE=$1
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/critic-4
export GLASS_UI_DEMO_PORT=${GLASS_UI_DEMO_PORT:-5265}
if [[ $ENGINE == webkit ]]; then CFG=(-c tests-visual/webkit-2287.config.ts --project=webkit)
else CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); fi
for s in release-10-1-5 release-10-1-4 release-10-1-3; do
  PI_REPORT=$WT/$L/g6-$s-$ENGINE.json npx playwright test $CFG $s.spec.ts --workers=1 > $L/g6-$s-$ENGINE.log 2>&1
  echo "g6 $s-$ENGINE exit=$? $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/g6-$s-$ENGINE.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt
done
