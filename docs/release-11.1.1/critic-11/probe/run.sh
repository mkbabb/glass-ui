#!/bin/bash
# Critic 11: fix seat 11's boundary probe (copied unchanged but for this header), run on the tip
# in one project.  run.sh <project> <log name>
# It copies the probe into the worktree's tests-visual/critic11-probe/, which a dev server
# watching the checkout would reload on: it refuses to run while one is rooted at the worktree.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-11/probe
L=$W/docs/release-11.1.1/critic-11/logs
T=$W/tests-visual/critic11-probe
for pid in $(pgrep -f "vite"); do
  cwd=$(lsof -a -p $pid -d cwd -Fn 2>/dev/null | grep ^n | cut -c2-)
  if [[ $cwd == "$W" || $cwd == "$W/tests-visual" ]]; then
    echo "$(date +%T) $2 SKIPPED: a dev server (pid $pid) watches $cwd" >> $L/runs.out; exit 3
  fi
done
case $1 in webkit-*) EX=(--exclusive webkit) ;; *) EX=() ;; esac
rm -rf $T && mkdir -p $T && cp $D/*.probe.ts $D/probe.config.ts $T/
start=$(date +%s); lstart=$(sysctl -n vm.loadavg)
cd $W/tests-visual && GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=5354 GLASS_UI_DEMO_URL=http://localhost:5354 PI_REPORT=$L/$2.json \
  ~/.claude/guard/guarded "${EX[@]}" --timeout 20 -- npx playwright test -c critic11-probe/probe.config.ts --project=$1 --workers=1 > $L/$2.log 2>&1
rc=$?
rm -rf $T
echo "$(date +%T) $2 probe $1 exit $rc $(( $(date +%s) - start ))s load-at-start=$lstart load-end=$(sysctl -n vm.loadavg) $(grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky)' $L/$2.log | tr -s ' ' | tr '\n' ' ')" >> $L/runs.out
exit $rc
