#!/bin/bash
# Build seat B: one witness run. Usage: build-B-run.sh <tree: branch|red> <project> <log name> [grep]
# Copies the 11.1.1 spec, config and harness into the v11.1.0 tree before a red run.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/logs
G=~/.claude/guard/guarded
case $1 in
  branch) T=$W; P=5351 ;;
  red) T=$W/.cache/red-v11.1.0/tree; P=5352
       mkdir -p $T/tests-visual/release-11-1-1
       cp $W/tests-visual/release-11-1-1.spec.ts $W/tests-visual/release-11-1-1.config.ts $T/tests-visual/
       cp $W/tests-visual/release-11-1-1/* $T/tests-visual/release-11-1-1/ ;;
esac
case $2 in webkit-*) EX="--exclusive webkit" ;; *) EX="" ;; esac
cd $T && GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$3.json \
  $G $EX --timeout 30 -- npx playwright test -c tests-visual/release-11-1-1.config.ts --project=$2 --workers=1 ${4:+-g "$4"} > $L/$3.log 2>&1
echo "$3 exit $?" | tee -a $L/runs-B.out
