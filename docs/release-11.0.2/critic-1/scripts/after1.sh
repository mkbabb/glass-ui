#!/bin/bash
# Starts chain2 once chain1 has written its last line.
L=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2/docs/release-11.0.2/critic-1/logs
until grep -q done1 $L/chain.out; do sleep 30; done
exec $(dirname $0)/chain2.sh
