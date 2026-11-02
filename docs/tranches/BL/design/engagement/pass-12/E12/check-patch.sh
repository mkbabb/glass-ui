#!/bin/bash
# P-E12: check the patch. git apply --check on a git archive of the checkout's HEAD (the stated base); contains P-A7 (its files that
# differ in HEAD + P-E12, against P-E11's 16); contains P-E11 (P-E12 over HEAD + P-E11: E's change, numstat); cost; and a fresh
# archive of HEAD with the patch applied against the worktree byte for byte. Run under `guarded --light`.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; R=$P/pass-12/E12; WT=$G/.claude/worktrees/bl/D5/p12/E12/wt
OUT=$P/pass-12/P-E12.patch; S=$WT/.e12out; mkdir -p $S
cd $G; H=$(git rev-parse HEAD); B=$(git -C $WT rev-parse HEAD)
echo "# $(date '+%F %T') · load $(sysctl -n vm.loadavg) · worktree base $B · checkout HEAD $H · src/tests/demo diff base..HEAD lines $(git diff $B $H -- src tests demo | wc -l | tr -d ' ')"
shasum $OUT $P/pass-11/P-E11.patch $P/pass-10/P-E10.patch $P/pass-9/P-E9.patch $P/pass-7/P-A7.patch
T=$(mktemp -d "$S/ck.XXXX"); git archive $H | tar -x -C $T; (cd $T; git init -q; git apply --check $OUT; echo "apply --check on a git archive of $H: exit $?"); rm -rf $T
git apply --numstat $OUT | awk '{a+=$1;d+=$2;n++} $3~/^src\//{sa+=$1;sd+=$2;sn++} END{print "candidate: " n " files +" a "/-" d "; src " sn " files +" sa "/-" sd}'
git apply --numstat $P/pass-11/P-E11.patch | awk '{a+=$1;d+=$2;n++} $3~/^src\//{sa+=$1;sd+=$2;sn++} END{print "P-E11: " n " files +" a "/-" d "; src " sn " files +" sa "/-" sd}'
E=$(mktemp -d "$S/ck.XXXX"); git archive $H | tar -x -C $E; (cd $E; git init -q; git apply $P/pass-11/P-E11.patch)
echo "# E's change over P-E11 (two-tree numstat)"
(cd $WT; for f in $(git diff --name-only HEAD; git ls-files -o --exclude-standard | grep -v -E '^(\.e12out|node_modules|tests-visual/node_modules)(/|$)'); do [ -f "$f" ] && ! cmp -s "$f" "$E/$f" && git diff --no-index --numstat "$E/$f" "$f" | awk -v f="$f" '{print $1"\t"$2"\t"f}'; done) | tee $R/logs/numstat-E12-over-PE11.txt
rm -rf $E
C=$(mktemp -d "$S/ck.XXXX"); git archive $H | tar -x -C $C; (cd $C; git init -q; git apply $P/pass-7/P-A7.patch)
n=0; d=0; for f in $(git apply --numstat $P/pass-7/P-A7.patch | cut -f3); do n=$((n+1)); cmp -s "$C/$f" "$WT/$f" || { d=$((d+1)); echo "differs: $f"; }; done; echo "P-A7: $n files, $d differ in HEAD + P-E12"; rm -rf $C
A=$(mktemp -d "$S/ck.XXXX"); git archive $H | tar -x -C $A; (cd $A; git init -q; git apply $OUT); echo "fresh archive of $H + P-E12 against the worktree, diff -rq lines: $(for d in src tests demo; do diff -rq $A/$d $WT/$d; done | wc -l | tr -d ' ')"; rm -rf $A
(cd $WT; { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12 | sed 's/^/src tree in the worktree: /')
echo "# $(date '+%F %T') · load $(sysctl -n vm.loadavg)"
