#!/bin/zsh
# P-E10: cut a patch HEAD → the worktree (tracked changes plus every untracked file outside the seat's scratch). `mkpatch.sh <absolute output path>`.
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p10/E10/wt; OUT=$1
[[ $OUT == /* ]] || { echo "mkpatch: absolute output path required"; exit 2; }
cd $WT
{ git diff --binary HEAD
  for f in $(git ls-files --others --exclude-standard | grep -v -E '^(\.e10out|node_modules|tests-visual/node_modules)(/|$)' | LC_ALL=C sort); do
    git diff --binary --no-index /dev/null "$f"; done; } > $OUT
