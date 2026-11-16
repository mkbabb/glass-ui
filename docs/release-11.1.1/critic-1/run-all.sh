#!/bin/bash
# Critic 1: waits for the library gates, then runs the chain.
C=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/critic-1
until grep -q GATES-DONE $C/logs/gates.txt; do sleep 15; done
$C/chain.sh "$@"
