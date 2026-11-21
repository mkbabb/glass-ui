#!/bin/bash
# Fix seat 9, chain 3: the five gates on the committed tree, then the exits gate whole.
F=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-9
$F/gates.sh
$F/gate.sh
echo "$(date +%T) chain3 done" >> $F/logs/runs.out
