#!/bin/zsh
# Critic 2: after queue 2, the D-1 A/B in Chromium; one guarded call.
cd /Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.1
R=docs/release-11.0.1/critic-2/runs
until grep -q "^queue 2 done" $R/runs.txt 2>/dev/null; do sleep 30; done
~/.claude/guard/guarded --timeout 40 -- zsh docs/release-11.0.1/scripts/critic-2-d1-ab.sh 3 > $R/d1-ab.guard.log 2>&1
echo "d1-ab guard exit $?" >> $R/runs.txt
echo "queue 3 done" >> $R/runs.txt
