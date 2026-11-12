#!/bin/zsh
# 10.1.5 fix round 9 witness steps for one engine, in order, on a committed tree:
#   branch     the whole release spec (p1, n1 and the q gates with the rest)
#   g6         the 10.1.4 and 10.1.3 release specs
#   red        p1 with the src files fix 9 changed checked out from the round-9 tip 51af0f9b5
#   q          q1-q3 on the branch alone
#   v1014      q1-q3 with every src file the branch changed checked out from v10.1.4
# (src is restored to HEAD after each RED arm.)
#   ~/.claude/guard/guarded [--exclusive webkit] --timeout 90 -- zsh docs/release-10.1.5/scripts/witness-fix-9.sh chromium|webkit step...
set -u
ENGINE=$1; shift
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/fix-9${FIX9_SUB:+/$FIX9_SUB}
mkdir -p $L
export GLASS_UI_DEMO_PORT=${GLASS_UI_DEMO_PORT:-5281}
if [[ $ENGINE == webkit ]]; then CFG=(-c tests-visual/webkit-2287.config.ts --project=webkit)
else CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); fi
run() { # name spec [grep]
  PI_REPORT=$WT/$L/$1-$ENGINE.json npx playwright test $CFG $2 ${3:+--grep} ${3:-} --workers=1 > $L/$1-$ENGINE.log 2>&1
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
    g6) run g6-10-1-4 release-10-1-4.spec.ts; run g6-10-1-3 release-10-1-3.spec.ts;;
    q) run branch-q release-10-1-5.spec.ts " q[123] ";;
    red) red red-51af0f9b5 51af0f9b5 " p1 ";;
    v1014) red red-v1014-q v10.1.4 " q[123] ";;
  esac
done
git status --short src | tee -a $L/witness-$ENGINE.txt
echo "$(date +%H:%M) witness-$ENGINE done: $*" | tee -a $L/witness-$ENGINE.txt
