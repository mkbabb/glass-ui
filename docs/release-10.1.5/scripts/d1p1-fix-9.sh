#!/bin/zsh
# 10.1.5 fix round 9, second cure: in one engine, the 10.1.3 D-1 bottom-anchored ancestor-zoom cell repeated
# N times on the branch, then p1 and n1 on the branch, then p1 on 51af0f9b5's src (restored to HEAD after).
#   ~/.claude/guard/guarded [--exclusive webkit] --timeout 60 -- zsh docs/release-10.1.5/scripts/d1p1-fix-9.sh chromium|webkit [n]
set -u
ENGINE=$1; N=${2:-8}
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/fix-9
export GLASS_UI_DEMO_PORT=5284
if [[ $ENGINE == webkit ]]; then CFG=(-c tests-visual/webkit-2287.config.ts --project=webkit)
else CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); fi
run() { # tag spec grep [repeat]
  npx playwright test $CFG $2 --grep "$3" --repeat-each=${4:-1} --workers=1 > $L/$1-$ENGINE.log 2>&1
  echo "$(date +%H:%M) $1-$ENGINE $(grep -E '^\s+[0-9]+ (passed|failed|flaky|skipped)' $L/$1-$ENGINE.log | tr -s ' ' | tr '\n' ' ') steps: $(grep -E 'Received:' $L/$1-$ENGINE.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/d1p1.txt
}
trap 'git checkout HEAD -- src' EXIT INT TERM
run d1-cure release-10-1-3.spec.ts "bottom-anchored · ancestor zoom" $N
run p1n1-cure release-10-1-5.spec.ts " p1 | n1 "
FILES=(${(f)"$(git diff --name-only --diff-filter=M 51af0f9b5 HEAD -- src/components/dock/composables)"})
git checkout 51af0f9b5 -- $FILES; sleep 3
run p1-red-51af0f9b5 release-10-1-5.spec.ts " p1 "
git checkout HEAD -- $FILES
git status --short src | tee -a $L/d1p1.txt
