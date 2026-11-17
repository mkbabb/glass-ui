#!/bin/bash
# Fix seat 7 probe run (readings only): run.sh <branch|red> <project> <log name> <grep> [extra args]
# branch is the worktree on 5354; red is the v11.1.0 tree on 5355 with the tip's 11.1.1
# harnesses and this probe directory copied in at the same relative paths.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/fix-7/probe
L=$W/docs/release-11.1.1/fix-7/logs
case $1 in
  branch) T=$W; P=5354 ;;
  red) T=$W/.cache/red-v11.1.0/tree; P=5355
       mkdir -p $T/tests-visual/release-11-1-1 $T/docs/release-11.1.1/fix-7/probe
       cp $W/tests-visual/release-11-1-1*.ts $T/tests-visual/
       cp $W/tests-visual/release-11-1-1/* $T/tests-visual/release-11-1-1/
       cp $D/*.ts $T/docs/release-11.1.1/fix-7/probe/ ;;
esac
case $2 in webkit-*) EX=(--exclusive webkit) ;; *) EX=() ;; esac
cd $T && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$3.json \
  ~/.claude/guard/guarded "${EX[@]}" --timeout 30 -- npx playwright test -c docs/release-11.1.1/fix-7/probe/probe.config.ts --project=$2 --workers=1 -g "$4" ${5:-} > $L/$3.log 2>&1
echo "$(date +%T) $3 probe $1 $2 exit $? load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$3.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
