#!/bin/bash
# Fix seat 11 probe run: run.sh <project> <log name>
# Copies the probe into the worktree's tests-visual/fix11-probe/, runs it through the guard on
# port 5354 with its own server, and removes the copy.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/fix-11/probe
L=$W/docs/release-11.1.1/fix-11/logs
T=$W/tests-visual/fix11-probe
case $1 in webkit-*) EX=(--exclusive webkit) ;; *) EX=() ;; esac
rm -rf $T && mkdir -p $T && cp $D/*.probe.ts $D/probe.config.ts $T/
start=$(date +%s); lstart=$(sysctl -n vm.loadavg)
cd $W/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=5354 GLASS_UI_DEMO_URL=http://localhost:5354 PI_REPORT=$L/$2.json \
  ~/.claude/guard/guarded "${EX[@]}" --timeout 20 -- npx playwright test -c fix11-probe/probe.config.ts --project=$1 --workers=1 > $L/$2.log 2>&1
rc=$?
rm -rf $T
echo "$(date +%T) $2 probe $1 exit $rc $(( $(date +%s) - start ))s load-at-start=$lstart load-end=$(sysctl -n vm.loadavg) $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$2.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
exit $rc
