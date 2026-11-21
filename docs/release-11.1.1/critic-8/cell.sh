#!/bin/bash
# Critic 8: named cells of the exits spec on one tree, as the gate runs them, with any
# extra Playwright arguments (a repeat count).   cell.sh <tip|red> <project> <log name> <grep> [extra args]
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/critic-8/logs
case $1 in tip) T=$W; P=5355 ;; red) T=$W/.cache/red-v11.1.0/tree; P=5356 ;; esac
case $2 in webkit-*) EX=(--exclusive webkit) ;; *) EX=() ;; esac
lstart=$(sysctl -n vm.loadavg); start=$(date +%s)
cd $T/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$3.json \
  ~/.claude/guard/guarded "${EX[@]}" --timeout 60 -- npx playwright test -c release-11-1-1.config.ts --project=$2 --workers=1 -g "$4" "${@:5}" > $L/$3.log 2>&1
echo "$(date +%T) $3 cells $1 $2 exit $? $(( $(date +%s) - start ))s load-at-start=$lstart load-end=$(sysctl -n vm.loadavg) $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$3.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
