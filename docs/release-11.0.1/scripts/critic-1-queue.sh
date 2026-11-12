#!/bin/zsh
# Critic 1: the Chromium re-run of the critic's paint spec, then the WebKit 2287 chain, one guarded call each.
cd /Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.1
R=docs/release-11.0.1/critic-1/runs
~/.claude/guard/guarded --timeout 20 -- zsh docs/release-11.0.1/scripts/critic-1-chain.sh ch merged critic > $R/chain-ch-2.guard.log 2>&1
echo "ch-2 guard exit $?" >> $R/runs.txt
~/.claude/guard/guarded --exclusive webkit --timeout 80 -- zsh docs/release-11.0.1/scripts/critic-1-chain.sh wk merged critic owner dara partA partB g6-4 g6-3 > $R/chain-wk.guard.log 2>&1
echo "wk guard exit $?" >> $R/runs.txt
