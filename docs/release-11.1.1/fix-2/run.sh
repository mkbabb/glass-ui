#!/bin/bash
# Fix seat 2: one witness run. Usage: run.sh <tree: branch|red> <project> <log name> [grep] [spec]
# A red run copies the 11.1.1 specs, config and harnesses into the v11.1.0 tree first.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/fix-2/logs
G=~/.claude/guard/guarded
case $1 in
  branch) T=$W; P=5351 ;;
  red) T=$W/.cache/red-v11.1.0/tree; P=5352
       mkdir -p $T/tests-visual/release-11-1-1
       cp $W/tests-visual/release-11-1-1*.ts $T/tests-visual/
       cp $W/tests-visual/release-11-1-1/* $T/tests-visual/release-11-1-1/ ;;
esac
case $2 in webkit-*) EX="--exclusive webkit" ;; *) EX="" ;; esac
cd $T && GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$3.json \
  $G $EX --timeout 40 -- npx playwright test -c tests-visual/release-11-1-1.config.ts --project=$2 --workers=1 ${5:-} ${4:+-g "$4"} > $L/$3.log 2>&1
echo "$3 exit $?" | tee -a $L/runs.out
