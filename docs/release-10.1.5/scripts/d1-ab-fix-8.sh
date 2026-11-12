#!/bin/zsh
# 10.1.5 fix round 8: the 10.1.3 D-1 bottom-anchored ancestor-zoom cell, repeated, on the branch
# and on the round-8 tip's src (3592aeb0d), restored to HEAD after. Usage (under guarded):
#   zsh docs/release-10.1.5/scripts/d1-ab-fix-8.sh webkit|chromium
set -u
ENGINE=$1
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/fix-8
RED=3592aeb0d
if [[ $ENGINE == webkit ]]; then CFG=(-c tests-visual/webkit-2287.config.ts --project=webkit)
else CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); fi
FILES=(${(f)"$(git diff --name-only $RED HEAD -- src)"})
G="bottom-anchored · ancestor zoom"
run() {
  npx playwright test $CFG release-10-1-3.spec.ts --grep "$G" --repeat-each=4 --workers=1 > $L/d1-ab-$1-$ENGINE.log 2>&1
  echo "d1-ab-$1-$ENGINE exit=$? $(grep -E '^\s+[0-9]+ (passed|failed|flaky)' $L/d1-ab-$1-$ENGINE.log | tr -s ' ' | tr '\n' ' ') steps: $(grep -E 'Received:' $L/d1-ab-$1-$ENGINE.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/d1-ab.txt
}
run branch
restore() { git checkout HEAD -- $FILES; }
trap restore EXIT INT TERM
git checkout $RED -- $FILES
sleep 3
run tip-3592aeb0d
restore
git status --short src | tee -a $L/d1-ab.txt
