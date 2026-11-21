#!/bin/bash
# Critic 8: one part of the exits gate on one tree in one project, through the run guard,
# with its own report and its own server (GLASS_UI_DEMO_OWN: never a server it did not start).
#   part.sh <tip|red> <project> <part 0-3 | grep> <tag> [extra playwright args]
# tip is the worktree at its HEAD (serves on 5355); red is the v11.1.0 git-archive tree at
# .cache/red-v11.1.0/tree with HEAD's 11.1.1 specs and harnesses (redspecs.sh), on 5356.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/critic-8/logs
G=~/.claude/guard/guarded
parts=(
    "(form|glass|exit|routes|round|weight|lift|sheet) · "
    "(reverse|tooltip|expand|leave) · "
    "standing · "
    "(site|fade|fold|mark|press|still) · "
)
case $1 in
  tip) T=$W; P=5355 ;;
  red) T=$W/.cache/red-v11.1.0/tree; P=5356 ;;
  *) echo "tree?"; exit 2 ;;
esac
# The standing part is item 2's and the tip's: on v11.1.0 it is not run (load).
if [ "$1" = red ] && [ "$3" = 2 ]; then echo "$(date +%T) $4 red $2 [2] not run" >> $L/runs.out; exit 0; fi
case $3 in [0-3]) GREP="${parts[$3]}" ;; *) GREP="$3" ;; esac
case $2 in webkit-*) EX=(--exclusive webkit) ;; *) EX=() ;; esac
# A queued probe (hook.sh) runs before the part, one heavy run at a time.
D=$W/docs/release-11.1.1/critic-8
if [ -f $D/hook.sh ]; then mv $D/hook.sh $D/hook.ran.sh; bash $D/hook.ran.sh >> $L/hook.out 2>&1; fi
while ! ~/.dev-logs/owner-1112/power-ok.sh 2>>$L/power.txt; do sleep 60; done
start=$(date +%s)
lstart=$(sysctl -n vm.loadavg)
cd $T/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$4.json \
  $G "${EX[@]}" --timeout 60 -- npx playwright test -c release-11-1-1.config.ts --project=$2 --workers=1 -g "$GREP" "${@:5}" > $L/$4.log 2>&1
rc=$?
echo "$(date +%T) $4 $1 $2 [$3] exit $rc $(( $(date +%s) - start ))s load-at-start=$lstart load-end=$(sysctl -n vm.loadavg) $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$4.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
exit $rc
