#!/usr/bin/env bash
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.0; O=$W/.claude/close/cand; G=$HOME/.claude/guard/guarded
run() { n=$1; R=$2; port=$3; shift 3
  [ $(df -g /System/Volumes/Data | awk 'NR==2{print $4}') -ge 6 ] || { echo "DISK STOP $n" >> $O/summary.txt; exit 9; }
  ( cd $R/tests-visual && GLASS_UI_DEMO_PORT=$port GLASS_UI_DEMO_URL=http://localhost:$port PI_REPORT=$O/$n.json $G --exclusive webkit --timeout 30 -- npx playwright test -c webkit-2287.config.ts --project=webkit --workers=1 "$@" > $O/$n.log 2>&1 )
  echo "$n rc=$? $(date +%T) $(grep -E '^ +[0-9]+ (passed|failed|skipped|flaky)' $O/$n.log | tr -s ' ' | tr '\n' ' ')" >> $O/summary.txt
  rm -rf $R/tests-visual/test-results; }
run 1100-webkit $W 7985 release-10-1-2.spec.ts:432 release-10-1-4.spec.ts:311
run 373-webkit $W/.claude/close/arch-373 7986 release-10-1-2.spec.ts:432
echo DONE-WK >> $O/summary.txt
