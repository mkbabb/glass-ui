#!/bin/bash
# Critic 5 probe run (readings only), on the tip: run.sh <project> <log name> <grep> [extra playwright args]
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-5/probe
L=$W/docs/release-11.1.1/critic-5/logs
case $1 in webkit-*) EX="--exclusive webkit" ;; *) EX="" ;; esac
cd $W && GLASS_UI_DEMO_PORT=5353 GLASS_UI_DEMO_URL=http://localhost:5353 PI_REPORT=$L/$2.json \
  ~/.claude/guard/guarded $EX --timeout 40 -- npx playwright test -c $D/probe.config.ts --project=$1 --workers=1 -g "$3" ${4:-} > $L/$2.log 2>&1
echo "$(date +%T) $2 exit $? load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$2.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
