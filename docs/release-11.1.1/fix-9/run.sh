#!/bin/bash
# Fix seat 9: one witness run with its own report and its own server.
#   run.sh <branch|red|d0> <project> <log name> <grep> [extra playwright args]
# branch is the worktree as it stands (port 5351). red is v11.1.0: the git-archive tree at
# .cache/red-v11.1.0/tree with the branch's 11.1.1 specs, config and harnesses copied in
# (port 5352). d0 is d0f85bd29's src in the snapshot tree .cache/fix7-tip/tree, with the
# branch's specs copied in the same way (port 5353; sync with sync-d0.sh).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/fix-9/logs
G=~/.claude/guard/guarded
case $1 in
  branch) T=$W; P=5351 ;;
  red) T=$W/.cache/red-v11.1.0/tree; P=5352 ;;
  d0) T=$W/.cache/fix7-tip/tree; P=5353 ;;
esac
if [[ $1 != branch ]]; then
  rm -rf $T/tests-visual/release-11-1-1 $T/tests-visual/release-11-1-1*.ts
  mkdir -p $T/tests-visual/release-11-1-1
  cp $W/tests-visual/release-11-1-1*.ts $T/tests-visual/
  cp -R $W/tests-visual/release-11-1-1/. $T/tests-visual/release-11-1-1/
fi
case $2 in webkit-*) EX=(--exclusive webkit) ;; *) EX=() ;; esac
start=$(date +%s)
cd $T/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$3.json \
  $G "${EX[@]}" --timeout 60 -- npx playwright test -c release-11-1-1.config.ts --project=$2 --workers=1 -g "$4" ${5:-} > $L/$3.log 2>&1
rc=$?
tag=$1; [[ $1 == d0 ]] && tag="d0@$(cat $T/TIP-SHA)"
echo "$(date +%T) $3 $tag $2 [$4] exit $rc $(( $(date +%s) - start ))s load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$3.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
exit $rc
