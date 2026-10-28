#!/bin/zsh
# P-A7: cut the one patch (HEAD → the worktree), tracked changes plus every untracked file outside the seat's scratch.
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p7/A7/wt; OUT=$1
cd $WT
{ git diff --binary HEAD
  for f in $(git ls-files --others --exclude-standard | grep -v -E '^(\.a7out|\.a7plant|node_modules|tests-visual/node_modules)(/|$)' | LC_ALL=C sort); do
    git diff --binary --no-index /dev/null "$f"; done; } > $OUT
