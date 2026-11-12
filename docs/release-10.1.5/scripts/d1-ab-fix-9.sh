#!/bin/zsh
# 10.1.5 fix round 9: the 10.1.3 D-1 bottom-anchored ancestor-zoom cell, repeated in one engine on the
# branch, on the round-9 tip's dock src (51af0f9b5, before the fix-9 publishYield cure) and on v10.1.4's
# src (each checked out and restored to HEAD after), to place the WebKit leaving-summary step.
#   ~/.claude/guard/guarded --exclusive webkit --timeout 60 -- zsh docs/release-10.1.5/scripts/d1-ab-fix-9.sh webkit [n]
set -u
ENGINE=$1; N=${2:-8}
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/fix-9
export GLASS_UI_DEMO_PORT=5283
if [[ $ENGINE == webkit ]]; then CFG=(-c tests-visual/webkit-2287.config.ts --project=webkit)
else CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); fi
G="bottom-anchored · ancestor zoom"
run() {
  npx playwright test $CFG release-10-1-3.spec.ts --grep "$G" --repeat-each=$N --workers=1 > $L/d1-ab-$1-$ENGINE.log 2>&1
  echo "$(date +%H:%M) d1-ab-$1-$ENGINE $(grep -E '^\s+[0-9]+ (passed|failed|flaky)' $L/d1-ab-$1-$ENGINE.log | tr -s ' ' | tr '\n' ' ') steps: $(grep -E 'Received:' $L/d1-ab-$1-$ENGINE.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/d1-ab.txt
}
arm() { # tag rev
  local files=(${(f)"$(git diff --name-only --diff-filter=M $2 HEAD -- src)"})
  git checkout $2 -- $files; sleep 3; run $1; git checkout HEAD -- $files; sleep 3
}
trap 'git checkout HEAD -- src' EXIT INT TERM
run branch-a
arm tip-51af0f9b5 51af0f9b5
arm v1014 v10.1.4
run branch-b
git status --short src | tee -a $L/d1-ab.txt
