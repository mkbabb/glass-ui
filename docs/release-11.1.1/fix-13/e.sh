#!/bin/bash
# Fix seat 13, item (e): the WebKit title the close left open, release-10-1-5 "fix 12, coarse
# phone > t1 O-201 vertical", alone and repeated, on the worktree (the branch) and on the red
# tree (master's tip), each through its own guarded WebKit run.
#   e.sh <tip|red> <repeats> <tag>
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/fix-13/logs
G=~/.claude/guard/guarded
case $1 in
  tip) T=$W; P=5353 ;;
  red) T=$W/.cache/fix13-red/tree; P=5356 ;;
  *) echo "tree?"; exit 2 ;;
esac
start=$(date +%s); lstart=$(sysctl -n vm.loadavg)
cd $T && GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$3.json \
  $G --exclusive webkit --timeout 60 -- npx playwright test -c tests-visual/webkit-2287.config.ts tests-visual/release-10-1-5.spec.ts \
  --project=webkit --workers=1 -g "fix 12, coarse phone" --repeat-each=$2 > $L/$3.log 2>&1
rc=$?
echo "$(date +%T) $3 $1 webkit [fix 12, coarse phone x$2] exit $rc $(( $(date +%s) - start ))s load-at-start=$lstart load-end=$(sysctl -n vm.loadavg) $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$3.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
grep -q '^\[guarded\] REFUSED' $L/$3.log && exit 75
exit $rc
