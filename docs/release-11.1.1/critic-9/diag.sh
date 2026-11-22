#!/bin/bash
# Critic 9: named cells repeated on one tree in one project, with a trace kept for each failure
# in the critic's own output directory.   diag.sh <tip|red> <project> <tag> <grep> <repeat>
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/critic-9/logs
case $1 in tip) T=$W; P=5351 ;; red) T=$W/.cache/critic9-v11.1.0/tree; P=5352 ;; esac
case $2 in webkit-*) EX=(--exclusive webkit) ;; *) EX=() ;; esac
start=$(date +%s); lstart=$(sysctl -n vm.loadavg)
cd $T/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$3.json \
  ~/.claude/guard/guarded "${EX[@]}" --timeout 40 -- npx playwright test -c release-11-1-1.config.ts --project=$2 --workers=1 -g "$4" --repeat-each=$5 --trace retain-on-failure --output=$L/out-$3 > $L/$3.log 2>&1
echo "$(date +%T) $3 diag $1 $2 exit $? $(( $(date +%s) - start ))s load-at-start=$lstart load-end=$(sysctl -n vm.loadavg) $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$3.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
