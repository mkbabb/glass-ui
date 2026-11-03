#!/bin/zsh
# P-E13: cut the patch from the seat's worktree (HEAD -> the worktree: tracked changes plus every untracked file outside the
# node_modules links), then check it: git apply --check on a git archive of the checkout's HEAD; a fresh archive with the patch
# applied against the worktree (diff -rq over src, tests, demo); the files that differ from HEAD + P-E12; numstat; sha1s.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; WT=$G/.claude/worktrees/bl/D5/p13/E13/wt; OUT=$P/pass-13/P-E13.patch
S=$WT/.e13out; mkdir -p $S
cd $WT || exit 1
{ git diff --binary HEAD
  for f in $(git ls-files --others --exclude-standard | grep -v -E '^(\.e13out|node_modules|tests-visual/node_modules)(/|$)' | LC_ALL=C sort); do
    git diff --binary --no-index /dev/null "$f"; done; } > $OUT
echo "# $(date '+%F %T') · load $(sysctl -n vm.loadavg) · worktree HEAD $(git rev-parse --short HEAD) · checkout HEAD $(git -C $G rev-parse --short HEAD)"
shasum $OUT $P/pass-12/P-E12.patch $P/pass-11/P-E11.patch $P/pass-10/P-E10.patch $P/pass-9/P-E9.patch $P/pass-7/P-A7.patch
H=$(git -C $G rev-parse HEAD)
T=$(mktemp -d "$S/ck.XXXX"); git -C $G archive $H | tar -x -C $T; (cd $T; git init -q; git apply --check $OUT; echo "apply --check on a git archive of $H: exit $?"; git apply $OUT); echo "fresh archive + P-E13 against the worktree, diff -rq lines: $(for d in src tests demo; do diff -rq $T/$d $WT/$d; done | wc -l | tr -d ' ')"; rm -rf $T
R=$(mktemp -d "$S/ck.XXXX"); git -C $G archive $H | tar -x -C $R; (cd $R; git init -q; git apply $P/pass-12/P-E12.patch)
echo "# E's change over P-E12 (two-tree numstat)"
for f in $(git diff --name-only HEAD; git ls-files -o --exclude-standard | grep -v -E '^(\.e13out|node_modules|tests-visual/node_modules)(/|$)'); do if [ -f "$f" ]; then cmp -s "$f" "$R/$f" || git diff --no-index --numstat "$R/$f" "$f" | awk -v f="$f" '{print $1"\t"$2"\t"f}'; fi; done
rm -rf $R
for q in P-E12:$P/pass-12/P-E12.patch P-E13:$OUT; do git apply --numstat ${q#*:} | awk -v n=${q%%:*} '{a+=$1;d+=$2;c++} $3~/^src\//{sa+=$1;sd+=$2;sn++} END{print n ": " c " files +" a "/-" d "; src " sn " files +" sa "/-" sd}'; done
echo "src tree in the worktree: $({ git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12)"
echo "# $(date '+%F %T') · load $(sysctl -n vm.loadavg)"
