#!/bin/zsh
# 10.1.5 fix round 11 witness steps for one engine, in order:
#   s        the s1-s4 witnesses on the branch
#   branch   the whole release spec
#   red      s1-s4 with the src files fix 11 changed checked out from the round-11 tip 1e0f9d879
#   g6       the 10.1.4 and 10.1.3 release specs
#   p2       critique 10's p2 cells, repeated $P2_N (default 3)
#   f4       the 10.1.4 F-4 DataTable settle cell, repeated $F4_N (default 16)
# (src is restored to HEAD after each RED arm.)
#   ~/.claude/guard/guarded [--exclusive webkit] --timeout 90 -- zsh docs/release-10.1.5/scripts/witness-fix-11.sh chromium|webkit step...
set -u
ENGINE=$1; shift
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/fix-11${FIX11_SUB:+/$FIX11_SUB}
mkdir -p $L
export GLASS_UI_DEMO_PORT=${GLASS_UI_DEMO_PORT:-5293}
if [[ $ENGINE == webkit ]]; then CFG=(-c tests-visual/release-10-1-5-critic-11.config.ts --project=webkit)
else CFG=(-c tests-visual/playwright.config.ts --project=chromium-headless-new); fi
run() { # name spec [grep] [repeat]
  PI_REPORT=$WT/$L/$1-$ENGINE.json npx playwright test $CFG $2 ${3:+--grep} ${3:-} --repeat-each=${4:-1} --workers=1 > $L/$1-$ENGINE.log 2>&1
  echo "$(date +%H:%M) $1-$ENGINE exit=$? load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$1-$ENGINE.log | tr -s ' ' | tr '\n' ' ')" | tee -a $L/witness-$ENGINE.txt
}
red() { # tag rev grep
  local files=(${(f)"$(git diff --name-only --diff-filter=M $2 HEAD -- src)"})
  git checkout $2 -- $files
  sleep 3
  run $1 release-10-1-5.spec.ts "$3"
  git checkout HEAD -- $files
}
# The restore trap is armed only for a RED arm, which needs a committed tree.
if (( ${@[(Ie)red]} )); then
  [[ -z "$(git status --porcelain -- src)" ]] || { echo "red needs a committed src tree"; exit 2; }
  trap 'git checkout HEAD -- src' EXIT INT TERM
fi
for s in $@; do
  case $s in
    s) run s release-10-1-5.spec.ts " s[1-4] ";;
    branch) run branch release-10-1-5.spec.ts;;
    red) red red-1e0f9d879 1e0f9d879 " s[1-4] ";;
    g6) run g6-10-1-4 release-10-1-4.spec.ts; run g6-10-1-3 release-10-1-3.spec.ts;;
    p2) run p2 release-10-1-5.spec.ts " p2 " ${P2_N:-3};;
    f4) run f4 release-10-1-4.spec.ts "F-4" ${F4_N:-16};;
  esac
done
git status --short src | tee -a $L/witness-$ENGINE.txt
echo "$(date +%H:%M) witness-$ENGINE done: $*" | tee -a $L/witness-$ENGINE.txt
