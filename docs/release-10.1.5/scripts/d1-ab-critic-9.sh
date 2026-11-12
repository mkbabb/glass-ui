#!/bin/zsh
# 10.1.5 critic round 9: the 10.1.3 D-1 bottom-anchored ancestor-zoom cell, repeated, on the branch and on
# v10.1.4's src (every src file the branch changed, checked out from v10.1.4 and restored to HEAD after), so
# the intermittent WebKit frame step fix 8 recorded is read against the release it patches.
#   ~/.claude/guard/guarded --exclusive webkit --timeout 60 -- zsh docs/release-10.1.5/scripts/d1-ab-critic-9.sh webkit [n]
set -u
ENGINE=$1
N=${2:-8}
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/critic-9
mkdir -p $L
export GLASS_UI_DEMO_PORT=5313
if [[ $ENGINE == webkit ]]; then CFG=(-c tests-visual/webkit-2287.config.ts --project=webkit)
else CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); fi
FILES=(${(f)"$(git diff --name-only v10.1.4 HEAD -- src)"})
G="bottom-anchored · ancestor zoom"
run() {
  npx playwright test $CFG release-10-1-3.spec.ts --grep "$G" --repeat-each=$N --workers=1 > $L/d1-ab-$1-$ENGINE.log 2>&1
  echo "$(date +%H:%M) d1-ab-$1-$ENGINE exit=$? $(grep -E '^\s+[0-9]+ (passed|failed|flaky)' $L/d1-ab-$1-$ENGINE.log | tr -s ' ' | tr '\n' ' ') steps: $(grep -E 'Received:' $L/d1-ab-$1-$ENGINE.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/d1-ab.txt
}
restore() { git checkout HEAD -- $FILES; }
trap restore EXIT INT TERM
run branch-a
git checkout v10.1.4 -- $FILES
sleep 3
run v1014
restore
sleep 3
run branch-b
git status --short src | tee -a $L/d1-ab.txt
