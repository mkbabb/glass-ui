#!/bin/zsh
# mkpatch.sh <worktree> <out.patch>: the worktree's whole change against HEAD (tracked edits, deletions, and new
# untracked files under src/ and tests/), written without touching any index or the object store.
WT=$1; OUT=$2
cd $WT || exit 1
{ git diff HEAD -- src tests .published-roster docs/design/tunable-anim.md
  for f in $(git ls-files --others --exclude-standard -- src tests | sort); do
    git diff --no-index -- /dev/null "$f" | sed -e "s#^diff --git a/$f b/$f#diff --git a/$f b/$f#"
  done; } > $OUT
echo "$OUT: $(grep -c '^diff --git' $OUT) files"
