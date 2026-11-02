#!/bin/zsh
# P-E12: cut the patch from the seat's worktree (HEAD -> the worktree: tracked changes plus every untracked file outside the seat's
# scratch and the node_modules links). `cut-patch.sh` writes pass-12/P-E12.patch and prints its sha1 (shasum).
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; WT=$G/.claude/worktrees/bl/D5/p12/E12/wt; OUT=$P/pass-12/P-E12.patch
cd $WT || exit 1
{ git diff --binary HEAD
  for f in $(git ls-files --others --exclude-standard | grep -v -E '^(\.e12out|node_modules|tests-visual/node_modules)(/|$)' | LC_ALL=C sort); do
    git diff --binary --no-index /dev/null "$f"; done; } > $OUT
shasum $OUT
