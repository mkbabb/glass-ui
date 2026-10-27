#!/bin/zsh
# P-A6: cut the patch from the seat's worktree against HEAD (tracked changes, then every untracked file outside
# the scratch .a6out), with no write to any git index; then check it applies to a clean HEAD tree.
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p6/A6/wt
OUT=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6/P-A6.patch
cd $WT
{ git diff --binary HEAD; for f in $(git status --short --untracked-files=all | awk '$1=="??"{print $2}' | grep -v '^\.a6out/'); do git diff --no-index --binary /dev/null $f; done; } > $OUT
C=$WT/.a6out/check; rm -rf $C; mkdir -p $C; git archive HEAD | tar -x -C $C
cd $C && GIT_CEILING_DIRECTORIES=$WT/.a6out git apply --check $OUT && echo "apply --check: clean on a HEAD tree ($(git -C $WT rev-parse --short HEAD))"
shasum $OUT; git -C $WT apply --numstat $OUT 2>/dev/null | awk '{a+=$1; d+=$2; n++} END {print n" files, +"a"/-"d}'
git -C $WT apply --numstat $OUT | awk '$3 ~ /^src\// {a+=$1; d+=$2; n++} END {print "src: "n" files, +"a"/-"d}'
rm -rf $C
