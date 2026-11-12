#!/bin/zsh
# P-E15 part B: write the candidate's patch over the base from the seat's worktree: the tracked diff, then every untracked file as a new
# file (the seat's own scratch `.pe15out/` excluded). No git write: `git diff` only. usage: mkpatch.sh <worktree> <out.patch>
WT=$1; OUT=$2; cd $WT || exit 1
{ git diff --binary HEAD -- . ':(exclude).pe15out'
  git ls-files -o --exclude-standard | grep -v '^\.pe15out/' | LC_ALL=C sort | while read -r f; do git diff --binary --no-index /dev/null "$f"; done
} > $OUT
echo "$(shasum $OUT | cut -c1-40) $(wc -l < $OUT | tr -d ' ') lines · $(grep -c '^diff --git' $OUT) files"
