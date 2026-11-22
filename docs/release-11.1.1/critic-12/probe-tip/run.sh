#!/bin/bash
# Critic 12 probe run (readings only), critic 10's tooltip scale probe:
#   run.sh <tip|red> <project> <log name> [extra playwright args]
# Copies the probe into the tree's tests-visual/critic12-tip/, runs it there through the guard
# on the tree's own server, and removes the copy.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-12/probe-tip
L=$W/docs/release-11.1.1/critic-12/logs
case $1 in tip) T=$W; P=5355 ;; red) T=$W/.cache/critic12-v11.1.0/tree; P=5356 ;; esac
case $2 in webkit-*) EX=(--exclusive webkit) ;; *) EX=() ;; esac
mkdir -p $T/tests-visual/critic12-tip && cp $D/*.probe.ts $D/probe.config.ts $T/tests-visual/critic12-tip/
start=$(date +%s)
cd $T/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$3.json \
  ~/.claude/guard/guarded "${EX[@]}" --timeout 30 -- npx playwright test -c critic12-tip/probe.config.ts --project=$2 --workers=1 "${@:4}" > $L/$3.log 2>&1
rc=$?
rm -rf $T/tests-visual/critic12-tip
echo "$(date +%T) $3 probe $1 $2 exit $rc $(( $(date +%s) - start ))s load=$(sysctl -n vm.loadavg) $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$3.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
exit $rc
