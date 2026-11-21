#!/bin/bash
# Critic 8: the contract menu's focus probe (probe/focus2.probe.test.ts) beside the aurora
# fuzz test, two workers, on the tip and on v11.1.0, interleaved, four times each.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-8; L=$D/logs
for i in 1 2 3 4; do
  for t in tip red; do
    case $t in tip) T=$W ;; red) T=$W/.cache/red-v11.1.0/tree ;; esac
    mkdir -p $T/tests/critic8-probe && cp $D/probe/focus2.probe.test.ts $T/tests/critic8-probe/
    cd $T && FOCUS_OUT=$L/focus2-$t-$i.json CI=true ~/.claude/guard/guarded --light --timeout 5 -- npx vitest run --maxWorkers=2 \
      tests/critic8-probe/focus2.probe.test.ts tests/components/custom/aurora/atoms.test.ts > $L/focus2-$t-$i.log 2>&1
    echo "$(date +%T) focus2 $t $i exit $? load=$(sysctl -n vm.loadavg)" >> $L/runs.out
    rm -rf $T/tests/critic8-probe
  done
done
