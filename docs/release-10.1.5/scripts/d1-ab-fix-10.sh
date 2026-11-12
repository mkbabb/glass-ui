#!/bin/zsh
# 10.1.5 fix round 10: the 10.1.3 bottom-anchored ancestor-zoom D-1 cell A/B in one engine, N repeats per arm,
# back to back: branch, the round-10 tip 932823b85's dock composables, branch again; then the 10.1.4 F-4
# DataTable cell x4 on the branch. (src restored to HEAD after the tip arm.)
#   ~/.claude/guard/guarded --exclusive webkit --timeout 60 -- zsh docs/release-10.1.5/scripts/d1-ab-fix-10.sh webkit [n]
set -u
ENGINE=$1; N=${2:-16}
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/fix-10/d1ab
mkdir -p $L
export GLASS_UI_DEMO_PORT=${GLASS_UI_DEMO_PORT:-5295}
if [[ $ENGINE == webkit ]]; then CFG=(-c tests-visual/release-10-1-5-fix-10.config.ts --project=webkit)
else CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); fi
run() { # tag spec grep repeat
  npx playwright test $CFG $2 --grep "$3" --repeat-each=$4 --workers=1 > $L/$1-$ENGINE.log 2>&1
  echo "$(date +%H:%M) $1-$ENGINE $(uptime | sed 's/.*averages: //') :: $(grep -E '^\s+[0-9]+ (passed|failed|flaky)' $L/$1-$ENGINE.log | tr -s ' ' | tr '\n' ' ') steps: $(grep -E 'Received:' $L/$1-$ENGINE.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/d1ab.txt
}
trap 'git checkout HEAD -- src' EXIT INT TERM
run branch-a release-10-1-3.spec.ts "bottom-anchored · ancestor zoom" $N
FILES=(${(f)"$(git diff --name-only --diff-filter=M 932823b85 HEAD -- src/components/dock/composables)"})
git checkout 932823b85 -- $FILES; sleep 3
run tip-932823b85 release-10-1-3.spec.ts "bottom-anchored · ancestor zoom" $N
git checkout HEAD -- $FILES; sleep 3
run branch-b release-10-1-3.spec.ts "bottom-anchored · ancestor zoom" $N
run f4-branch release-10-1-4.spec.ts "F-4" 4
git status --short src | tee -a $L/d1ab.txt
