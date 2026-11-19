#!/bin/bash
# Fix seat 7, resumed: after chain 17, the exits gate on the worktree at its commit as
# scripts/release.sh runs it; if a part fails, the parts after it run one by one
# (gate-rest.sh); then chain 18.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-7
until grep -q "CHAIN17-DONE" $D/logs/runs.out; do sleep 15; done
echo "CHAIN19-START $(date +%T)" >> $D/logs/runs.out
$D/gate.sh
if ! tail -1 $D/logs/gate.out | grep -q "gate exit 0"; then
    n=$(grep -c "^== exits" $D/logs/gate.log)
    echo "$(date +%T) gate stopped at part index $((n - 1)); gate-rest from $n" >> $D/logs/runs.out
    $D/gate-rest.sh $n
fi
echo "$(date +%T) gate done: $(tail -1 $D/logs/gate.out)" >> $D/logs/runs.out
$D/chain18.sh
echo "CHAIN19-DONE $(date +%T)" >> $D/logs/runs.out
