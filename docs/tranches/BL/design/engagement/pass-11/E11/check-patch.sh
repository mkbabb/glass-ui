#!/bin/bash
# P-E11: cut the patch (HEAD -> the worktree: tracked changes plus every untracked file outside the seat's scratch), then check it:
# git apply --check on a git archive of the build base and of the checkout's HEAD (src and tests only, which is all the patch touches
# besides the demo; the archive carries the whole tree); contains P-A7; cost; E's change over P-E10. Run under `guarded --light`.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; R=$P/pass-11/E11; WT=$G/.claude/worktrees/bl/D5/p11/E11/wt
OUT=$P/pass-11/P-E11.patch; S=$WT/.e11out
cd $WT
{ git diff --binary HEAD
  for f in $(git ls-files --others --exclude-standard | grep -v -E '^(\.e11out|node_modules|tests-visual/node_modules)(/|$)' | LC_ALL=C sort); do
    git diff --binary --no-index /dev/null "$f"; done; } > $OUT
cd $G; B=$(git -C $WT rev-parse HEAD); H=$(git rev-parse HEAD)
echo "# $(date '+%F %T') · load $(sysctl -n vm.loadavg) · base $B · checkout HEAD $H · src/tests diff base..HEAD lines $(git diff $B $H -- src tests demo | wc -l | tr -d ' ')"
shasum $OUT $P/pass-10/P-E10.patch $P/pass-9/P-E9.patch $P/pass-7/P-A7.patch
for c in $B $H; do T=$(mktemp -d "$S/ck.XXXX"); git archive $c | tar -x -C $T; (cd $T; git init -q; git apply --check $OUT; echo "apply --check on a git archive of $c: exit $?"); rm -rf $T; done
git apply --numstat $OUT | awk '{a+=$1;d+=$2;n++} $3~/^src\//{sa+=$1;sd+=$2;sn++} END{print "candidate: " n " files +" a "/-" d "; src " sn " files +" sa "/-" sd}'
git apply --numstat $P/pass-10/P-E10.patch | awk '{a+=$1;d+=$2;n++} $3~/^src\//{sa+=$1;sd+=$2;sn++} END{print "P-E10: " n " files +" a "/-" d "; src " sn " files +" sa "/-" sd}'
# E's change over P-E10: the worktree's files against HEAD + P-E10
E=$(mktemp -d "$S/ck.XXXX"); git archive $B | tar -x -C $E; (cd $E; git init -q; git apply $P/pass-10/P-E10.patch)
(cd $WT; for f in $(git diff --name-only HEAD; git ls-files -o --exclude-standard | grep -v -E '^(\.e11out|node_modules|tests-visual/node_modules)(/|$)'); do [ -f "$f" ] && ! cmp -s "$f" "$E/$f" && git diff --no-index --numstat "$E/$f" "$f" | awk -v f="$f" '{print $1"\t"$2"\t"f}'; done) | tee $R/logs/numstat-E11-over-PE10.txt
rm -rf $E
# contains P-A7: its files that differ in the candidate from HEAD + P-A7
C=$(mktemp -d "$S/ck.XXXX"); git archive $B | tar -x -C $C; (cd $C; git init -q; git apply $P/pass-7/P-A7.patch)
n=0; d=0; for f in $(git apply --numstat $P/pass-7/P-A7.patch | cut -f3); do n=$((n+1)); cmp -s "$C/$f" "$WT/$f" || { d=$((d+1)); echo "differs: $f"; }; done; echo "P-A7: $n files, $d differ in HEAD + P-E11"; rm -rf $C
# the patch re-applied on a fresh archive of the checkout's HEAD gives the worktree byte for byte (src, tests, demo; diff -rq prints nothing)
A=$(mktemp -d "$S/ck.XXXX"); git archive $H | tar -x -C $A; (cd $A; git init -q; git apply $OUT); echo "fresh archive of $H + P-E11 against the worktree, diff -rq lines: $(for d in src tests demo; do diff -rq $A/$d $WT/$d; done | wc -l | tr -d ' ')"; rm -rf $A
(cd $WT; { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12 | sed 's/^/src tree in the worktree: /')
echo "# $(date '+%F %T') · load $(sysctl -n vm.loadavg)"
