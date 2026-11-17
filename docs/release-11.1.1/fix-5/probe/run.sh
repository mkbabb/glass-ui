#!/bin/bash
# Fix seat 5 probe run: run.sh <branch|red> <project> <log name> [extra playwright args]
# A red run copies the probe into v11.1.0's tree, beside the 11.1.1 config already copied
# there, so the server and the source are that tree's.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/fix-5/probe
L=$W/docs/release-11.1.1/fix-5/logs
case $1 in
  branch) T=$W; P=5351; C=$D/probe.config.ts ;;
  red) T=$W/.cache/red-v11.1.0/tree; P=5352; C=$T/tests-visual/fix5-probe/probe.config.ts
       mkdir -p $T/tests-visual/fix5-probe
       cp $D/stall.probe.ts $T/tests-visual/fix5-probe/
       sed 's#../../../../tests-visual/release-11-1-1.config#../release-11-1-1.config#' $D/probe.config.ts > $C ;;
esac
case $2 in webkit-*) EX="--exclusive webkit" ;; *) EX="" ;; esac
cd $T && GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$3.json \
  ~/.claude/guard/guarded $EX --timeout 30 -- npx playwright test -c $C --project=$2 --workers=1 ${4:-} > $L/$3.log 2>&1
echo "$(date +%T) $3 exit $? $(grep -E '^\s+[0-9]+ (passed|failed|skipped)' $L/$3.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
