#!/bin/bash
# Critic 13 probe run (readings only):  run.sh <tip|red|pre> <project> <log name> [extra playwright args]
# Copies the probe into the tree's tests-visual/critic13-cmd/, runs it there through the guard on
# the tree's own server, and removes the copy.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-13/probe-cmd
L=$W/docs/release-11.1.1/critic-13/logs
case $1 in tip) T=$W; P=5356 ;; red) T=$W/.cache/critic13-red/tree; P=5356 ;; pre) T=$W/.cache/critic13-pre/tree; P=5356 ;; esac
case $2 in webkit-*) EX=(--exclusive webkit) ;; *) EX=() ;; esac
mkdir -p $T/tests-visual/critic13-cmd && cp $D/typed.probe.ts $D/probe.config.ts $T/tests-visual/critic13-cmd/
start=$(date +%s)
cd $T/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=$P GLASS_UI_DEMO_URL=http://localhost:$P PI_REPORT=$L/$3.json \
  ~/.claude/guard/guarded "${EX[@]}" --timeout 30 -- npx playwright test -c critic13-cmd/probe.config.ts --project=$2 --workers=1 "${@:4}" > $L/$3.log 2>&1
rc=$?
rm -rf $T/tests-visual/critic13-cmd
echo "$(date +%T) $3 probe $1 $2 exit $rc $(( $(date +%s) - start ))s load=$(sysctl -n vm.loadavg) $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$3.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
exit $rc
