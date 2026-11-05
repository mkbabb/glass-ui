#!/bin/zsh
# 10.1.5 critic round 5 probes, one engine and one arm, from the worktree root under guarded
# (WebKit under --exclusive webkit):
#   zsh docs/release-10.1.5/scripts/critic-5.sh chromium|webkit [v1014] [grep]
# The v1014 arm needs `git archive v10.1.4 src demo | tar -x -C tests-visual/release-10-1-5/v1014`.
set -u
ENGINE=$1; ARM=${2:-}; GREP=${3:-}
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/critic-5
mkdir -p $L
export GLASS_UI_DEMO_PORT=${GLASS_UI_DEMO_PORT:-5265}
if [[ $ENGINE == webkit ]]; then
  CFG=(-c tests-visual/release-10-1-5-critic-5.config.ts --project=webkit)
else
  CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new)
fi
N=probe${ARM:+-$ARM}-$ENGINE
CRITIC_ARM=$ARM PI_REPORT=$WT/$L/$N.json npx playwright test $CFG release-10-1-5-critic-5.spec.ts ${GREP:+--grep} ${GREP:-} --workers=1 > $L/$N.log 2>&1
echo "$N exit=$? $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$N.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt
