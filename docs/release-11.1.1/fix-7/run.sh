#!/bin/bash
# Fix seat 7: one witness run with its own report, its own server, never a server it did
# not start.
#   run.sh <branch|tip|red> <project> <log name> <part 0-3 | grep> [extra playwright args]
# branch is the worktree as it stands; tip is the snapshot of a commit (sync-tip.sh,
# .cache/fix7-tip/tree, its commit in TIP-SHA); red is v11.1.0: the git-archive tree at .cache/red-v11.1.0/tree with the tip's 11.1.1
# specs, config and harnesses copied in, so the same cells read that tree's source. The
# branch serves on 5351, v11.1.0 on 5352, the tip snapshot on 5353.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/fix-7/logs
G=~/.claude/guard/guarded
parts=(
    "(form|glass|exit|routes|round|weight|lift|sheet) · "
    "(reverse|tooltip|expand|leave) · "
    "standing · "
    "(site|fade|fold|mark|press|still) · "
)
case $1 in
  branch) T=$W; P=5351 ;;
  tip) T=$W/.cache/fix7-tip/tree; P=5353 ;;
  red) T=$W/.cache/red-v11.1.0/tree; P=5352
       mkdir -p $T/tests-visual/release-11-1-1
       cp $W/tests-visual/release-11-1-1*.ts $T/tests-visual/
       cp $W/tests-visual/release-11-1-1/* $T/tests-visual/release-11-1-1/ ;;
esac
case $4 in [0-3]) GREP="${parts[$4]}" ;; *) GREP="$4" ;; esac
case $2 in webkit-*) EX=(--exclusive webkit) ;; *) EX=() ;; esac
start=$(date +%s)
cd $T/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$3.json \
  $G "${EX[@]}" --timeout 60 -- npx playwright test -c release-11-1-1.config.ts --project=$2 --workers=1 -g "$GREP" ${5:-} > $L/$3.log 2>&1
rc=$?
tag=$1; [[ $1 == tip ]] && tag="tip@$(cat $T/TIP-SHA)"
echo "$(date +%T) $3 $tag $2 [$4] exit $rc $(( $(date +%s) - start ))s load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$3.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
exit $rc
