#!/bin/bash
# Critic 6: named cells of the exits spec on the tip, as the gate runs them, with any
# extra Playwright arguments (a repeat count).
#   run-cell.sh <project> <log name> <grep> [extra playwright args...]
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/critic-6/logs
G=~/.claude/guard/guarded
P=5356
case $1 in webkit-*) EX=(--exclusive webkit) ;; *) EX=() ;; esac
start=$(date +%s)
cd $W/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$2.json \
  $G "${EX[@]}" --timeout 60 -- npx playwright test -c release-11-1-1.config.ts --project=$1 --workers=1 -g "$3" "${@:4}" > $L/$2.log 2>&1
rc=$?
echo "$(date +%T) $2 cells $1 exit $rc $(( $(date +%s) - start ))s load=$(uptime | sed 's/.*averages: //') $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $L/$2.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
