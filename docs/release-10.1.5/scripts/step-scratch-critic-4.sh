#!/bin/zsh
# 10.1.5 critic round 4: fix-3's 1px scroll step removed in a scratch tree (run.css
# `--dock-run-step-inline: 1px` and the vertical `--dock-run-step-block: 1px` set to 0px),
# then the release spec's e1-e4 in one engine. run.css is restored from HEAD on exit.
# From the worktree root under guarded (WebKit under --exclusive webkit):
#   zsh docs/release-10.1.5/scripts/step-scratch-critic-4.sh chromium|webkit
set -u
ENGINE=$1
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/critic-4
F=src/components/dock/styles/run.css
export GLASS_UI_DEMO_PORT=${GLASS_UI_DEMO_PORT:-5267}
trap 'git checkout HEAD -- $F' EXIT INT TERM
sed -i '' -e 's/--dock-run-step-inline: 1px;/--dock-run-step-inline: 0px;/' -e 's/--dock-run-step-block: 1px;/--dock-run-step-block: 0px;/' $F
grep -c "dock-run-step-[a-z]*: 1px" $F | sed 's/^/step lines still 1px: /'
if [[ $ENGINE == webkit ]]; then CFG=(-c tests-visual/webkit-2287.config.ts --project=webkit)
else CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); fi
PI_REPORT=$WT/$L/step0-$ENGINE.json npx playwright test $CFG release-10-1-5.spec.ts --grep " e[1-4] at" --workers=1 > $L/step0-$ENGINE.log 2>&1
echo "step0 e1-e4 $ENGINE exit=$? $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/step0-$ENGINE.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt
