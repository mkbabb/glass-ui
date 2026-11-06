#!/bin/zsh
# 10.1.5 fix round 7 witness arms for one engine: the branch (the whole release spec, then
# the g6 release specs with `g6`), then the RED arm (the spec with the src files this round
# changed checked out from the round-7 tip fd1c2443a, restored to HEAD after).
# Usage (from the worktree root, under guarded; WebKit under --exclusive webkit):
#   zsh docs/release-10.1.5/scripts/witness-fix-7.sh chromium|webkit [g6|branch-only|red-only] [grep]
# (g6 runs the branch, the g6 specs and the RED arm; run it on a committed tree.)
set -u
ENGINE=$1
MODE=${2:-}
GREP=${3:-}
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/fix-7
mkdir -p $L
RED=fd1c2443a
export GLASS_UI_DEMO_PORT=${GLASS_UI_DEMO_PORT:-5281}
if [[ $ENGINE == webkit ]]; then
  CFG=(-c tests-visual/webkit-2287.config.ts --project=webkit)
else
  CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new)
fi
FILES=(${(f)"$(git diff --name-only $RED HEAD -- src)"})
run() { # name spec [grep]
  PI_REPORT=$WT/$L/$1-$ENGINE.json npx playwright test $CFG $2 ${3:+--grep} ${3:-} --workers=1 > $L/$1-$ENGINE.log 2>&1
  echo "$1-$ENGINE exit=$? $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$1-$ENGINE.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/witness-$ENGINE.txt
}
if [[ $MODE != red-only ]]; then
  run branch release-10-1-5.spec.ts "$GREP"
  if [[ $MODE == g6 ]]; then
    run g6-10-1-4 release-10-1-4.spec.ts
    run g6-10-1-3 release-10-1-3.spec.ts
  fi
fi
if [[ $MODE == red-only || $MODE == g6 ]]; then
  # The RED arm runs on a committed tree: the src files this round changed are checked
  # out from the round-6 tip and restored to HEAD after.
  restore() { git checkout HEAD -- $FILES; }
  trap restore EXIT INT TERM
  git checkout $RED -- $FILES
  sleep 3
  run red-fd1c2443a release-10-1-5.spec.ts " m[1-4] | m3 "
  restore
fi
git status --short src | tee -a $L/witness-$ENGINE.txt
echo "witness-$ENGINE done" | tee -a $L/witness-$ENGINE.txt
