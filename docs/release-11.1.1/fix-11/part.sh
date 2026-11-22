#!/bin/bash
# Fix seat 11: one grep of the exits spec on one tree in one project, through the run guard,
# with its own report and its own server (GLASS_UI_DEMO_OWN: never a server it did not start).
#   part.sh <tip|red> <project> <grep> <tag> [extra playwright args]
# tip is the worktree at HEAD (port 5351); red is this seat's v11.1.0 tree (port 5352).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/fix-11/logs
case $1 in
  tip) T=$W; P=5351 ;;
  red) T=$W/.cache/fix11-v11.1.0/tree; P=5352 ;;
  *) echo "tree?"; exit 2 ;;
esac
case $2 in webkit-*) EX=(--exclusive webkit) ;; *) EX=() ;; esac
start=$(date +%s); lstart=$(sysctl -n vm.loadavg)
cd $T/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$4.json \
  ~/.claude/guard/guarded "${EX[@]}" --timeout 60 -- npx playwright test -c release-11-1-1.config.ts --project=$2 --workers=1 -g "$3" "${@:5}" > $L/$4.log 2>&1
rc=$?
echo "$(date +%T) $4 $1 $2 exit $rc $(( $(date +%s) - start ))s load-at-start=$lstart load-end=$(sysctl -n vm.loadavg) $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$4.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
exit $rc
