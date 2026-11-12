#!/bin/zsh
# 10.1.5 fix round 10 witness steps for one engine, in order:
#   branch   the whole release spec (p2, r1 and g4 with the rest)
#   red      p2, r1 and g4 with the src files fix 10 changed checked out from the round-10 tip 932823b85
#   v1014    r1 with every src file the branch changed checked out from v10.1.4
#   d1       the 10.1.3 bottom-anchored ancestor-zoom D-1 cell, repeated $D1_N (default 16)
#   g6       the 10.1.4 and 10.1.3 release specs
#   p4       the P4 attribution probe (layered first expands, $P4_N per width)
# (src is restored to HEAD after each RED arm.)
#   ~/.claude/guard/guarded [--exclusive webkit] --timeout 90 -- zsh docs/release-10.1.5/scripts/witness-fix-10.sh chromium|webkit step...
set -u
ENGINE=$1; shift
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/fix-10${FIX10_SUB:+/$FIX10_SUB}
mkdir -p $L
export GLASS_UI_DEMO_PORT=${GLASS_UI_DEMO_PORT:-5291}
if [[ $ENGINE == webkit ]]; then CFG=(-c tests-visual/release-10-1-5-fix-10.config.ts --project=webkit)
else CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); fi
run() { # name spec [grep] [repeat]
  PI_REPORT=$WT/$L/$1-$ENGINE.json npx playwright test $CFG $2 ${3:+--grep} ${3:-} --repeat-each=${4:-1} --workers=1 > $L/$1-$ENGINE.log 2>&1
  echo "$(date +%H:%M) $1-$ENGINE exit=$? $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$1-$ENGINE.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/witness-$ENGINE.txt
}
red() { # tag rev grep
  local files=(${(f)"$(git diff --name-only --diff-filter=M $2 HEAD -- src)"})
  git checkout $2 -- $files
  sleep 3
  run $1 release-10-1-5.spec.ts "$3"
  git checkout HEAD -- $files
}
trap 'git checkout HEAD -- src' EXIT INT TERM
for s in $@; do
  case $s in
    branch) run branch release-10-1-5.spec.ts;;
    red) red red-932823b85 932823b85 " p2 | r1 | g4 ";;
    v1014) red red-v1014-r1 v10.1.4 " r1 ";;
    d1) run d1 release-10-1-3.spec.ts "bottom-anchored · ancestor zoom" ${D1_N:-16};;
    g6) run g6-10-1-4 release-10-1-4.spec.ts; run g6-10-1-3 release-10-1-3.spec.ts;;
    p4) run p4 release-10-1-5-fix-10-p4.spec.ts;;
  esac
done
git status --short src | tee -a $L/witness-$ENGINE.txt
echo "$(date +%H:%M) witness-$ENGINE done: $*" | tee -a $L/witness-$ENGINE.txt
