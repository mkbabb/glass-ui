#!/bin/zsh
# 10.1.5 critic round 7, WebKit 2287 resume: each remaining cell in its own Playwright process (a fresh WebKit per
# cell: the first pass stalled in page calls after ~25 min in one process), under one --exclusive webkit lock.
#   ~/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh docs/release-10.1.5/scripts/webkit-rest-critic-7.sh <part>
# part a: the branch's remaining round-7 cells; part b: the v10.1.4 arm; part c: the battery rerun and g6.
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/critic-7
export GLASS_UI_DEMO_PORT=5277
WK=(-c tests-visual/release-10-1-5-critic-7.config.ts --project=webkit --workers=1)
sum() { echo "$(date +%H:%M) $1 exit=$2 $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|timed out)' $L/$1.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.txt; }
cells=("r7 coarse r7f" "r7 coarse r7g" "r7 coarse r7h" "r7 coarse r7i" "r7 coarse r7j" "r7d hover paint dark 0" "r7d hover paint dark 1" "r7e static" "r7l fine" "r7l coarse")
cellsv=("r7 fine r7a" "r7 fine r7b" "r7 fine r7c" "r7 fine r7g" "r7 fine r7h" "r7 fine r7i" "r7 fine r7j" "r7 fine r7k" "r7 coarse r7a" "r7 coarse r7b" "r7 coarse r7c" "r7 coarse r7k" "${cells[@]}")
run() { # arm tag grep
  local n=r7-$1-webkit-$2
  CRITIC_ARM=${1:#branch} PI_REPORT=$WT/$L/$n.json npx playwright test $WK release-10-1-5-critic-7b.spec.ts --grep "$3" > $L/$n.log 2>&1; sum $n $?
}
case $1 in
a) i=0; for g in "${cells[@]}"; do i=$((i+1)); run branch $i "$g"; done ;;
b) i=0; for g in "${cellsv[@]}"; do i=$((i+1)); run v1014 $i "$g"; done ;;
c) PI_REPORT=$WT/$L/battery-webkit-rerun.json npx playwright test $WK release-10-1-5-critic-7.spec.ts --grep "dock postures fine 320" > $L/battery-webkit-rerun.log 2>&1; sum battery-webkit-rerun $?
   for s in release-10-1-4 release-10-1-3 release-10-1-5; do
     PI_REPORT=$WT/$L/g6-$s-webkit.json npx playwright test -c tests-visual/webkit-2287.config.ts --project=webkit --workers=1 $s.spec.ts > $L/g6-$s-webkit.log 2>&1; sum g6-$s-webkit $?
   done ;;
d) run branch 11 "r7l coarse" ;;
esac
echo "$(date +%H:%M) webkit-rest $1 done" >> $L/runs.txt
