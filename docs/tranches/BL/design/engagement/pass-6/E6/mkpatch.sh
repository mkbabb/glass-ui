#!/bin/zsh
# P-E6: cut the four arm patches from the seat's worktree against HEAD (tracked changes, then every untracked file),
# with no write to any git index; each checked by `git apply --check` on a clean archived HEAD tree. The worktree
# goes back to the candidate (noveil-coarse) at the end.
E6=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6/E6
P6=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6
R=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p6/E6
WT=$R/wt
cd $WT
C=$R/check; rm -rf $C; mkdir -p $C; git archive HEAD | tar -x -C $C
for a in noveil-coarse veil-coarse noveil-every veil-every; do
  zsh $E6/run-e6.sh arm $a > /dev/null
  OUT=$P6/P-E6-$a.patch
  { git diff --binary HEAD; for f in $(git status --short --untracked-files=all | awk '$1=="??"{print $2}'); do git diff --no-index --binary /dev/null $f; done; } > $OUT
  ( cd $C && GIT_CEILING_DIRECTORIES=$R git apply --check $OUT ) && echo "$a apply --check: clean on a HEAD tree ($(git rev-parse --short HEAD))"
  shasum $OUT; grep -E "^\+export const (STAGE_VEIL|POINTER_STAGE)" $OUT
  git apply --numstat $OUT 2>/dev/null | awk '{a+=$1; d+=$2; n++} END {print n" files, +"a"/-"d}'
  git apply --numstat $OUT | awk '$3 ~ /^src\// {a+=$1; d+=$2; n++} END {print "src: "n" files, +"a"/-"d}'
done
zsh $E6/run-e6.sh arm noveil-coarse
rm -rf $C
