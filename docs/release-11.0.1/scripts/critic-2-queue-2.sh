#!/bin/zsh
# Critic 2: after the first queue ends, the critic's own paint spec in Chromium, then in WebKit 2287; one guarded call each.
cd /Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.1
R=docs/release-11.0.1/critic-2/runs
G=~/.claude/guard/guarded
until grep -q "^queue done" $R/runs.txt 2>/dev/null; do sleep 30; done
$G --timeout 20 -- zsh docs/release-11.0.1/scripts/critic-2-chain.sh ch c2 > $R/chain-ch-c2.guard.log 2>&1
echo "ch c2 guard exit $?" >> $R/runs.txt
$G --exclusive webkit --timeout 30 -- zsh docs/release-11.0.1/scripts/critic-2-chain.sh wk c2 > $R/chain-wk-c2.guard.log 2>&1
echo "wk c2 guard exit $?" >> $R/runs.txt
echo "queue 2 done" >> $R/runs.txt
