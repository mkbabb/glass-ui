#!/bin/zsh
# 10.1.5 critic round 11: the 10.1.3 bottom-anchored ancestor-zoom D-1 cell A/B in one engine, N repeats per
# arm, back to back: branch, v10.1.4's whole src, branch again. src is restored to HEAD on exit.
#   ~/.claude/guard/guarded [--exclusive webkit] --timeout 60 -- zsh docs/release-10.1.5/scripts/d1-ab-critic-11.sh chromium|webkit [n]
set -u
ENGINE=$1; N=${2:-8}
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/critic-11/d1ab
mkdir -p $L
if [[ $ENGINE == webkit ]]; then CFG=(-c tests-visual/release-10-1-5-critic-11.config.ts --project=webkit); export GLASS_UI_DEMO_PORT=5326
else CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); export GLASS_UI_DEMO_PORT=5325; fi
run() {
  npx playwright test $CFG release-10-1-3.spec.ts --grep "bottom-anchored · ancestor zoom" --repeat-each=$N --workers=1 > $L/$1-$ENGINE.log 2>&1
  echo "$(date +%H:%M) $1-$ENGINE load $(uptime | sed 's/.*averages: //') :: $(grep -E '^\s+[0-9]+ (passed|failed|flaky)' $L/$1-$ENGINE.log | tr -s ' ' | tr '\n' ' ') steps: $(grep -E 'Received:' $L/$1-$ENGINE.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/d1ab.txt
}
trap 'git checkout HEAD -- src; git status --short src | tee -a $L/d1ab.txt' EXIT INT TERM
run branch-a
git checkout v10.1.4 -- src; sleep 3
run v1014
git checkout HEAD -- src; sleep 3
run branch-b
