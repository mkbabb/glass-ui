#!/bin/bash
# fresh.sh — remove the seat's worktree and add it again at HEAD, with the two node_modules links.
set -euo pipefail
P=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D1/p2/B-proto; R=/Users/mkbabb/Programming/glass-ui
git -C $R worktree remove --force $P/wt 2>/dev/null || true
git -C $R worktree add --detach $P/wt HEAD > /dev/null 2>&1
ln -s $R/node_modules $P/wt/node_modules
ln -s $R/tests-visual/node_modules $P/wt/tests-visual/node_modules
git -C $P/wt rev-parse HEAD
