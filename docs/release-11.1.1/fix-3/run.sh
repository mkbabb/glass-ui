#!/bin/bash
# Fix seat 3: one witness run. Usage: run.sh <tree: branch|red|tip> <project> <log name> [grep] [config]
# A red run (v11.1.0) or a tip run (235b80e4c, before this seat's cures) copies the 11.1.1
# specs, config and harnesses into that tree first.
# The config defaults to the release config; a probe passes its own (relative to the tree).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/fix-3/logs
G=~/.claude/guard/guarded
case $1 in
  branch) T=$W; P=5351 ;;
  red|tip) if [ $1 = red ]; then T=$W/.cache/red-v11.1.0/tree; P=5352; else T=$W/.cache/tip-235b80e/tree; P=5353; fi
       mkdir -p $T/tests-visual/release-11-1-1
       cp $W/tests-visual/release-11-1-1*.ts $T/tests-visual/
       cp $W/tests-visual/release-11-1-1/* $T/tests-visual/release-11-1-1/ ;;
esac
case $2 in webkit-*) EX="--exclusive webkit" ;; *) EX="" ;; esac
C=${5:-tests-visual/release-11-1-1.config.ts}
cd $T && GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$3.json \
  $G $EX --timeout 40 -- npx playwright test -c $C --project=$2 --workers=1 ${4:+-g "$4"} > $L/$3.log 2>&1
rc=$?
echo "$(date +%T) $3 exit $rc" >> $L/runs.out
echo "$3 exit $rc"
