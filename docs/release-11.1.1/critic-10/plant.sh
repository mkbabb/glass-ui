#!/bin/bash
# Critic 10: the three frost cells on the planted tree (HEAD with a closing Sheet's frost span
# unmounted once its fade falls below 0.5, the plate still fading), twice each.
#   plant.sh <project> <tag>
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
T=$W/.cache/critic10-plant/tree; L=$W/docs/release-11.1.1/critic-10/logs; P=5356
case $1 in webkit-*) EX=(--exclusive webkit) ;; *) EX=() ;; esac
start=$(date +%s)
cd $T/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$2.json \
  ~/.claude/guard/guarded "${EX[@]}" --timeout 20 -- npx playwright test -c release-11-1-1.config.ts --project=$1 --workers=1 -g "fade · a (Sheet right|Sheet bottom|detented Sheet) " --repeat-each=2 > $L/$2.log 2>&1
echo "$(date +%T) $2 plant $1 exit $? $(( $(date +%s) - start ))s load=$(sysctl -n vm.loadavg) $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$2.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
