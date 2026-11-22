#!/bin/bash
# Critic 9 probe run (readings only): run.sh <tip|red> <project> <log name> [extra playwright args]
# Copies the probe into the tree's tests-visual/critic9-probe/, runs it there through the guard
# on the tree's own server, and moves the copy back out.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-9/probe
L=$W/docs/release-11.1.1/critic-9/logs
case $1 in tip) T=$W; P=5355 ;; red) T=$W/.cache/critic9-v11.1.0/tree; P=5356 ;; esac
case $2 in webkit-*) EX=(--exclusive webkit) ;; *) EX=() ;; esac
mkdir -p $T/tests-visual/critic9-probe && cp $D/*.probe.ts $D/probe.config.ts $T/tests-visual/critic9-probe/
start=$(date +%s)
cd $T/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$3.json \
  ~/.claude/guard/guarded "${EX[@]}" --timeout 30 -- npx playwright test -c critic9-probe/probe.config.ts --project=$2 --workers=1 "${@:4}" > $L/$3.log 2>&1
rc=$?
mkdir -p $D/../moved/$3 && mv $T/tests-visual/critic9-probe $D/../moved/$3/
echo "$(date +%T) $3 probe $1 $2 exit $rc $(( $(date +%s) - start ))s load=$(sysctl -n vm.loadavg) $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$3.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
