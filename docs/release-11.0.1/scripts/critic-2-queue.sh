#!/bin/zsh
# Critic 2: the gates on the committed tree, then the Chromium chain, then the WebKit 2287 chain; one guarded call at a time.
cd /Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.1
R=docs/release-11.0.1/critic-2/runs
G=~/.claude/guard/guarded
zsh docs/release-11.0.1/scripts/critic-2-gates.sh
$G --timeout 60 -- zsh docs/release-11.0.1/scripts/critic-2-chain.sh ch owner dara fix2 c1 partA partB g6-4 g6-3 ub7 > $R/chain-ch.guard.log 2>&1
echo "ch guard exit $?" >> $R/runs.txt
$G --exclusive webkit --timeout 80 -- zsh docs/release-11.0.1/scripts/critic-2-chain.sh wk owner dara fix2 c1 partA partB g6-4 g6-3 > $R/chain-wk.guard.log 2>&1
echo "wk guard exit $?" >> $R/runs.txt
echo "queue done" >> $R/runs.txt
