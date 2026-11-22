#!/bin/bash
# The 11.1.1 close: one part (or a grep) of the exits gate on one tree in one project, through the
# run guard, with its own report and its own server (GLASS_UI_DEMO_OWN). critic 12's part.sh.
#   part.sh <tip|red> <project> <part 0-3 | grep> <tag> [extra playwright args]
# tip is the worktree (port 5352); red is .cache/close-red/tree (port 5355).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/close/exits/logs
G=~/.claude/guard/guarded
mkdir -p $L
parts=(
    "(form|glass|exit|routes|round|weight|lift|sheet) · "
    "(reverse|tooltip|expand|leave) · "
    "standing · "
    "(site|fade|fold|mark|press|still) · "
)
case $1 in
  tip) T=$W; P=5352 ;;
  red) T=$W/.cache/close-red/tree; P=5355 ;;
  *) echo "tree?"; exit 2 ;;
esac
case $3 in [0-3]) GREP="${parts[$3]}" ;; *) GREP="$3" ;; esac
case $2 in webkit-*) EX=(--exclusive webkit) ;; *) EX=() ;; esac
start=$(date +%s); lstart=$(sysctl -n vm.loadavg)
cd $T/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$4.json \
  $G "${EX[@]}" --timeout 60 -- npx playwright test -c release-11-1-1.config.ts --project=$2 --workers=1 -g "$GREP" "${@:5}" > $L/$4.log 2>&1
rc=$?
echo "$(date +%T) $4 $1 $2 [$3] exit $rc $(( $(date +%s) - start ))s load-at-start=$lstart load-end=$(sysctl -n vm.loadavg) $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$4.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
exit $rc
