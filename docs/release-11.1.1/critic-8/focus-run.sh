#!/bin/bash
# Critic 8: the focus probe (probe/focus.probe.test.ts) on the tip and on v11.1.0,
# interleaved, three times each; the probe is copied into each tree's tests/ and removed.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-8; L=$D/logs
for i in 4 5 6; do
  for t in tip red; do
    case $t in tip) T=$W ;; red) T=$W/.cache/red-v11.1.0/tree ;; esac
    mkdir -p $T/tests/critic8-probe && cp $D/probe/focus.probe.test.ts $T/tests/critic8-probe/
    cd $T && FOCUS_OUT=$L/focus-$t-$i.json CI=true ~/.claude/guard/guarded --light --timeout 5 -- npx vitest run tests/critic8-probe/focus.probe.test.ts > $L/focus-$t-$i.log 2>&1
    echo "$(date +%T) focus $t $i exit $? load=$(sysctl -n vm.loadavg)" >> $L/runs.out
    rm -rf $T/tests/critic8-probe
  done
done
