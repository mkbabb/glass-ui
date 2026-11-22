#!/bin/bash
# Critic 11: one part of the exits gate on one tree in one project, through the run guard,
# with its own report and its own server (GLASS_UI_DEMO_OWN: never a server it did not start).
#   part.sh <tip|red> <project> <part 0-3 | grep> <tag> [extra playwright args]
# tip is the worktree at HEAD (port 5351); red is the critic's own v11.1.0 git-archive tree
# at .cache/critic11-v11.1.0/tree with HEAD's 11.1.1 specs and harnesses copied in (5352).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/critic-11/logs
G=~/.claude/guard/guarded
parts=(
    "(form|glass|exit|routes|round|weight|lift|sheet) · "
    "(reverse|tooltip|expand|leave) · "
    "standing · "
    "(site|fade|fold|mark|press|still) · "
)
case $1 in
  tip) T=$W; P=5351 ;;
  red) T=$W/.cache/critic11-v11.1.0/tree; P=5352 ;;
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
