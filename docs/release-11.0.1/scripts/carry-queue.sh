#!/bin/zsh
# Carry critic queue: gates, then the chains, one guarded call at a time.
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.1
S=$WT/docs/release-11.0.1/scripts
R=$WT/docs/release-11.0.1/critic-carry/runs
G=~/.claude/guard/guarded
zsh $S/carry-gates.sh
$G --timeout 60 -- zsh $S/carry-chain.sh ch r2 rev6 > $R/chain-ch-1.guard.log 2>&1; echo "ch-1 guard exit $?" >> $R/runs.txt
$G --timeout 30 -- zsh $S/carry-chain.sh co r2 rev6 > $R/chain-co-1.guard.log 2>&1; echo "co-1 guard exit $?" >> $R/runs.txt
$G --exclusive webkit --timeout 40 -- zsh $S/carry-chain.sh wk r2 rev6 > $R/chain-wk-1.guard.log 2>&1; echo "wk-1 guard exit $?" >> $R/runs.txt
$G --timeout 80 -- zsh $S/carry-chain.sh ch owner fix2 c2 g6-4 g6-3 partA partB > $R/chain-ch-2.guard.log 2>&1; echo "ch-2 guard exit $?" >> $R/runs.txt
$G --exclusive webkit --timeout 90 -- zsh $S/carry-chain.sh wk owner fix2 c2 g6-4 g6-3 partA partB > $R/chain-wk-2.guard.log 2>&1; echo "wk-2 guard exit $?" >> $R/runs.txt
echo "queue done" >> $R/runs.txt
