#!/bin/bash
# P-E10: cut the patch, then check it: git apply --check on a git archive of the base and of the checkout's HEAD; the src tree back; contains P-A7 (the 16 E-owned files); cost.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; R=$P/pass-10/E10; WT=$G/.claude/worktrees/bl/D5/p10/E10/wt
$R/mkpatch.sh $P/pass-10/P-E10.patch
cd $G; B=$(git -C $WT rev-parse HEAD); H=$(git rev-parse HEAD)
echo "# $(date '+%F %T') · base $B · checkout HEAD $H · src diff base..HEAD lines $(git diff $B $H -- src tests | wc -l | tr -d ' ')"
shasum $P/pass-10/P-E10.patch $P/pass-9/P-E9.patch $P/pass-7/P-A7.patch
for c in $B $H; do T=$(mktemp -d "$WT/.e10out/ck.XXXX"); git archive $c | tar -x -C $T; (cd $T; git init -q; git apply --check $P/pass-10/P-E10.patch; echo "apply --check on a git archive of $c: exit $?"); rm -rf $T; done
A=$(mktemp -d "$WT/.e10out/ck.XXXX"); git archive $H | tar -x -C $A; (cd $A; git init -q; git apply $P/pass-10/P-E10.patch; git add -A; git -c user.name=x -c user.email=x@x commit -qm x; git apply --numstat $P/pass-10/P-E10.patch >/dev/null 2>&1)
git apply --numstat $P/pass-10/P-E10.patch | awk '{a+=$1;d+=$2;n++} $3~/^src\//{sa+=$1;sd+=$2;sn++} END{print "candidate: " n " files +" a "/-" d "; src " sn " files +" sa "/-" sd}'
git apply --numstat $P/pass-9/P-E9.patch | awk '{a+=$1;d+=$2;n++} $3~/^src\//{sa+=$1;sd+=$2;sn++} END{print "P-E9: " n " files +" a "/-" d "; src " sn " files +" sa "/-" sd}'
# E's change over P-E9: the patch's files against HEAD + P-E9
E=$(mktemp -d "$WT/.e10out/ck.XXXX"); git archive $B | tar -x -C $E; (cd $E; git init -q; git apply $P/pass-9/P-E9.patch; git add -A; git -c user.name=x -c user.email=x@x commit -qm p9)
(cd $WT; for f in $(git diff --name-only HEAD; git ls-files -o --exclude-standard | grep -v -E '^(\.e10out|node_modules|tests-visual/node_modules)(/|$)'); do [ -f "$f" ] && ! cmp -s "$f" "$E/$f" && git diff --no-index --numstat "$E/$f" "$f" | awk -v f="$f" '{print $1"\t"$2"\t"f}'; done) | tee $R/logs/numstat-E10-over-PE9.txt
rm -rf $E $A
# contains P-A7: its files that differ in the candidate from HEAD + P-A7
C=$(mktemp -d "$WT/.e10out/ck.XXXX"); git archive $B | tar -x -C $C; (cd $C; git init -q; git apply $P/pass-7/P-A7.patch)
n=0; d=0; for f in $(git apply --numstat $P/pass-7/P-A7.patch | cut -f3); do n=$((n+1)); cmp -s "$C/$f" "$WT/$f" || { d=$((d+1)); echo "differs: $f"; }; done; echo "P-A7: $n files, $d differ in HEAD + P-E10"; rm -rf $C
(cd $WT; { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12 | sed 's/^/src tree /')
