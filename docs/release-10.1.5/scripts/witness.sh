#!/bin/zsh
# 10.1.5 witness arms for one engine: the branch (g1-g5 and the g6 release specs), then
# the RED arm (g1-g5 with the cured src files checked out from v10.1.4, restored after).
# Usage (from the worktree root, under guarded; WebKit under --exclusive webkit):
#   zsh docs/release-10.1.5/scripts/witness.sh chromium|webkit
set -u
ENGINE=$1
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/logs
export GLASS_UI_DEMO_PORT=${GLASS_UI_DEMO_PORT:-5231}
if [[ $ENGINE == webkit ]]; then
  CFG=(-c tests-visual/webkit-2287.config.ts --project=webkit)
else
  CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new)
fi
FILES=(${(f)"$(git diff --name-only v10.1.4 HEAD -- src)"})
restore() { git checkout HEAD -- $FILES; }
trap restore EXIT INT TERM
run() { # name spec
  PI_REPORT=$WT/$L/$1-$ENGINE.json npx playwright test $CFG $2 --workers=1 > $L/$1-$ENGINE.log 2>&1
  echo "$1-$ENGINE exit=$? $(grep -E '^\s+[0-9]+ (passed|failed|skipped)' $L/$1-$ENGINE.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/witness-$ENGINE.txt
}
: > $L/witness-$ENGINE.txt
run g1-g5-branch release-10-1-5.spec.ts
run g6-10-1-4 release-10-1-4.spec.ts
run g6-10-1-3 release-10-1-3.spec.ts
git checkout v10.1.4 -- $FILES
sleep 3
run g1-g5-v1014 release-10-1-5.spec.ts
restore
git status --short src | tee -a $L/witness-$ENGINE.txt
echo "witness-$ENGINE done" | tee -a $L/witness-$ENGINE.txt
