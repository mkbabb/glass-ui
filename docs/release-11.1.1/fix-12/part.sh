#!/bin/bash
# Fix seat 12: cells of the 11.1.1 specs on one tree in one project, through the run guard,
# with its own report and its own server (GLASS_UI_DEMO_OWN: never a server it did not start).
#   part.sh <tip|ce5|red> <project> <grep> <tag> [extra playwright args]
# tip is the worktree (port 5351); ce5 is a git archive of ce5f320b7 and red one of v11.1.0,
# each with the worktree's 11.1.1 specs and harnesses copied in (trees.sh; 5353 and 5352).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/fix-12/logs
G=~/.claude/guard/guarded
case $1 in
  tip) T=$W; P=5351 ;;
  red) T=$W/.cache/fix12-v11.1.0/tree; P=5352 ;;
  ce5) T=$W/.cache/fix12-ce5f320b7/tree; P=5353 ;;
  *) echo "tree?"; exit 2 ;;
esac
case $2 in webkit-*) EX=(--exclusive webkit) ;; *) EX=() ;; esac
start=$(date +%s); lstart=$(sysctl -n vm.loadavg)
cd $T/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$4.json \
  $G "${EX[@]}" --timeout 30 -- npx playwright test -c release-11-1-1.config.ts --project=$2 --workers=1 -g "$3" "${@:5}" > $L/$4.log 2>&1
rc=$?
echo "$(date +%T) $4 $1 $2 [$3] exit $rc $(( $(date +%s) - start ))s load-at-start=$lstart load-end=$(sysctl -n vm.loadavg) $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$4.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
exit $rc
