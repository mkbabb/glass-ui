#!/bin/bash
# mkpatch.sh (D2 pass 11, after the pass-10 builder's): the patch of record, from a plain copy of HEAD + floor v5 to the seat
# worktree's tree (no git object written), checked by `git apply --check` and by applying it to a fresh copy of HEAD + floor v5.
# Scratch trees live in the seat directory, never /tmp. Then: the patch against 09aa6b3b, line by line.
set -eu
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p11/Bp-remeasure; WT=$B/wt; D=$G/docs/tranches/BL/design/dock
P=$D/pass-11/D2-Bp-p11.patch; P10=$D/pass-10/D2-Bp-proto.patch; X=$B/chk; PATHS="src demo tests docs/design package.json"
rm -rf $X; mkdir -p $X/a $X/b $X/c
# git apply / diff --no-index inside $X must not discover the checkout around the seat directory: stop discovery at $X
export GIT_CEILING_DIRECTORIES=$X
git -C $G archive HEAD $PATHS | tar -x -C $X/a; (cd $X/a && git apply $D/pass-6/floor-v5.patch)
(cd $WT && tar -cf - $PATHS) | tar -x -C $X/b
git -C $G archive HEAD $PATHS | tar -x -C $X/c; (cd $X/c && git apply $D/pass-6/floor-v5.patch)
(cd $X && git diff --no-index --no-renames --full-index a b > raw.patch || true)
python3 -I - "$X/raw.patch" "$P" <<'PY'
import re,sys
s=open(sys.argv[1],encoding='utf8',errors='surrogateescape').read()
s=re.sub(r'^diff --git a/[ab]/(.*?) b/[ab]/(.*)$',r'diff --git a/\1 b/\2',s,flags=re.M)
s=re.sub(r'^--- a/[ab]/',r'--- a/',s,flags=re.M); s=re.sub(r'^\+\+\+ b/[ab]/',r'+++ b/',s,flags=re.M)
open(sys.argv[2],'w',encoding='utf8',errors='surrogateescape').write(s)
PY
echo "HEAD $(env -u GIT_CEILING_DIRECTORIES git -C $G rev-parse HEAD)"
(cd $X/c && git apply --check $P && echo "git apply --check: clean on HEAD + floor v5" && git apply $P)
diff -r $X/b $X/c && echo "applied tree equals the worktree tree"
echo "files: $(grep -c '^diff --git' $P)"; git apply --numstat $P 2>/dev/null | awk '{a+=$1;d+=$2} END{print "+"a" -"d}'
echo "== the pass-11 patch against 09aa6b3b (diff of the two patch files)"
diff $P10 $P > $B/p10-p11.diff || true; cat $B/p10-p11.diff; cp $B/p10-p11.diff $D/pass-11/D2-Bp-remeasure-records/p10-p11-patch.diff
rm -rf $X
shasum -a 256 $P
