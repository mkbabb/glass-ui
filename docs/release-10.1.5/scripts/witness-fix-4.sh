#!/bin/zsh
# 10.1.5 fix round 4 witness arms for one engine: the branch (the whole release spec, g1-g5,
# c1-c4, e1-e4, f1-f2 and h1-h4, then the g6 release specs), then the RED arm (the spec with
# the src files this round changed checked out from the round-4 tip 463b0e42a, restored to
# HEAD after).
# Usage (from the worktree root, under guarded; WebKit under --exclusive webkit):
#   zsh docs/release-10.1.5/scripts/witness-fix-4.sh chromium|webkit [g6]
set -u
ENGINE=$1
G6=${2:-}
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/fix-4
mkdir -p $L
RED=463b0e42a
export GLASS_UI_DEMO_PORT=${GLASS_UI_DEMO_PORT:-5263}
if [[ $ENGINE == webkit ]]; then
  CFG=(-c tests-visual/webkit-2287.config.ts --project=webkit)
else
  CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new)
fi
FILES=(${(f)"$(git diff --name-only $RED HEAD -- src)"})
restore() { git checkout HEAD -- $FILES; }
trap restore EXIT INT TERM
run() { # name spec [grep]
  PI_REPORT=$WT/$L/$1-$ENGINE.json npx playwright test $CFG $2 ${3:+--grep} ${3:-} --workers=1 > $L/$1-$ENGINE.log 2>&1
  echo "$1-$ENGINE exit=$? $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$1-$ENGINE.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/witness-$ENGINE.txt
}
: > $L/witness-$ENGINE.txt
run branch release-10-1-5.spec.ts
if [[ -n $G6 ]]; then
  run g6-10-1-4 release-10-1-4.spec.ts
  run g6-10-1-3 release-10-1-3.spec.ts
fi
git checkout $RED -- $FILES
sleep 3
run red-463b0e42a release-10-1-5.spec.ts " (f[12]|h[1-4]) "
restore
git status --short src | tee -a $L/witness-$ENGINE.txt
echo "witness-$ENGINE done" | tee -a $L/witness-$ENGINE.txt
