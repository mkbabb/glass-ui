#!/bin/zsh
# 10.1.5 critic round 9: c9e (the host resizes mid-expand) on three arms in one engine: the branch, v10.1.4
# (the critic-7-v1014 harness), and the round-8 tip's dock src (3592aeb0d: dockMorphMeasure.ts and run.css,
# checked out and restored to HEAD after). Banks to critic-9/probe/<arm>/.
#   ~/.claude/guard/guarded [--exclusive webkit] --timeout 60 -- zsh docs/release-10.1.5/scripts/c9e-arms-critic-9.sh ch|wk
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/critic-9
E=$1
if [[ $E == wk ]]; then CFG=(-c tests-visual/release-10-1-5-critic-9.config.ts --project=webkit); export GLASS_UI_DEMO_PORT=5314
else CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); export GLASS_UI_DEMO_PORT=5315; fi
FILES=(src/components/dock/composables/dockMorphMeasure.ts src/components/dock/styles/run.css)
run() { CRITIC_LABEL=$1 CRITIC_ARM=${2:-} npx playwright test $CFG release-10-1-5-critic-9.spec.ts --grep c9e --workers=1 > $L/c9e-$1-$E.log 2>&1
  echo "$(date +%H:%M) c9e-$1-$E exit=$? $(grep -E '^\s+[0-9]+ (passed|failed)' $L/c9e-$1-$E.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/runs.txt; }
restore() { git checkout HEAD -- $FILES; }
trap restore EXIT INT TERM
run branch ""
run v1014 v1014
git checkout 3592aeb0d -- $FILES
sleep 3
run tip3592 ""
restore
git status --short src | tee -a $L/runs.txt
