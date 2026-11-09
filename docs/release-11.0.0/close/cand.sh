#!/usr/bin/env bash
# cand.sh: the 11.0.0-only suite failures re-run on release/11.0.0 and on 373ed8aba, chromium + coarse.
# arch-373 is a git archive of 373ed8aba (cand-wk.sh: without docs/) with node_modules symlinked, deleted after each step.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.0; O=$W/.claude/close/cand; G=$HOME/.claude/guard/guarded
mkdir -p $O; F=$(tr '\n' ' ' < $W/.claude/close/cand-files.txt)
port=7981
for tree in 1100:$W 373:$W/.claude/close/arch-373; do
  t=${tree%%:*}; R=${tree#*:}
  for proj in chromium-headless-new coarse-touch; do
    n=$t-$proj; port=$((port+1))
    [ $(df -g /System/Volumes/Data | awk 'NR==2{print $4}') -ge 6 ] || { echo "DISK STOP $n" >> $O/summary.txt; exit 9; }
    ( cd $R/tests-visual && GLASS_UI_DEMO_PORT=$port GLASS_UI_DEMO_URL=http://localhost:$port PI_REPORT=$O/$n.json $G --timeout 40 -- npx playwright test --project=$proj --workers=1 $F > $O/$n.log 2>&1 )
    echo "$n rc=$? $(date +%T) $(grep -E '^ +[0-9]+ (passed|failed|skipped|flaky)' $O/$n.log | tr -s ' ' | tr '\n' ' ')" >> $O/summary.txt
    rm -rf $R/tests-visual/test-results
  done
done
echo DONE >> $O/summary.txt
