#!/bin/zsh
# 10.1.5 fix round 6: the WebKit release-10-1-3 D-1 bottom-anchored cell, repeated, on the
# branch and on the round-6 tip's src (4c9c15008, checked out and restored to HEAD after).
# Usage (worktree root, under guarded --exclusive webkit): zsh docs/release-10.1.5/scripts/d1-ab-fix-6.sh [repeat]
set -u
N=${1:-6}
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/fix-6
RED=4c9c15008
export GLASS_UI_DEMO_PORT=${GLASS_UI_DEMO_PORT:-5281}
FILES=(${(f)"$(git diff --name-only $RED HEAD -- src)"})
run() {
  npx playwright test -c tests-visual/webkit-2287.config.ts --project=webkit release-10-1-3.spec.ts --grep "bottom-anchored.*D-1 \\(critique-7\\)" --repeat-each $N --workers=1 > $L/d1-$1-webkit.log 2>&1
  echo "d1-$1 exit=$? $(grep -E '^\s+[0-9]+ (passed|failed)' $L/d1-$1-webkit.log | tr -s ' ' | tr '\n' ' ') $(grep -E 'Received:' $L/d1-$1-webkit.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/d1-ab.txt
}
run branch
restore() { git checkout HEAD -- $FILES; }
trap restore EXIT INT TERM
git checkout $RED -- $FILES
sleep 3
run red-4c9c15008
restore
git status --short src | tee -a $L/d1-ab.txt
