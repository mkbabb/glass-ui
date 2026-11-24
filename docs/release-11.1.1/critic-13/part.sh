#!/bin/bash
# Critic 13: one part of the exits gate on one tree in one project, through the run guard,
# with its own report and its own server (GLASS_UI_DEMO_OWN: never a server it did not start).
#   part.sh <tip|red|pre> <project> <part 0-3 | grep> <tag> [extra playwright args]
# tip: the worktree at HEAD (5351); red: .cache/critic13-red/tree, v11.1.0's src under the
# tip's demo, specs and harnesses (5352); pre: .cache/critic13-pre/tree, the tip with
# CommandInput.vue as before 4c30732a0 (5353).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/critic-13/logs
G=~/.claude/guard/guarded
parts=(
    "(form|glass|exit|routes|round|weight|lift|sheet) · "
    "(reverse|tooltip|expand|leave) · "
    "standing · "
    "(site|fade|fold|mark|press|still) · "
)
case $1 in
  tip) T=$W; P=5351 ;;
  red) T=$W/.cache/critic13-red/tree; P=5352 ;;
  pre) T=$W/.cache/critic13-pre/tree; P=5353 ;;
  *) echo "tree?"; exit 2 ;;
esac
# Between parts: a queued extra.sh (readings this seat adds while the chain runs) runs once,
# before this part, so no two heavy runs of this seat overlap.
if [ -f $W/docs/release-11.1.1/critic-13/extra.sh ]; then
  mv $W/docs/release-11.1.1/critic-13/extra.sh $W/docs/release-11.1.1/critic-13/extra.ran.$(date +%H%M%S).sh
  bash $(ls -t $W/docs/release-11.1.1/critic-13/extra.ran.*.sh | head -1)
fi
case $3 in [0-3]) GREP="${parts[$3]}" ;; *) GREP="$3" ;; esac
case $2 in webkit-*) EX=(--exclusive webkit) ;; *) EX=() ;; esac
start=$(date +%s); lstart=$(sysctl -n vm.loadavg)
cd $T/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$4.json \
  $G "${EX[@]}" --timeout 60 -- npx playwright test -c release-11-1-1.config.ts --project=$2 --workers=1 -g "$GREP" "${@:5}" > $L/$4.log 2>&1
rc=$?
echo "$(date +%T) $4 $1 $2 [$3] exit $rc $(( $(date +%s) - start ))s load-at-start=$lstart load-end=$(sysctl -n vm.loadavg) $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$4.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
grep -q '^\[guarded\] REFUSED' $L/$4.log && echo "$(date +%T) REFUSED $4" >> $L/runs.out
exit $rc
