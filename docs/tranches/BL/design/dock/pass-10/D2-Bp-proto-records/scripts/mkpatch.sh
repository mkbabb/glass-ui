#!/bin/bash
# mkpatch.sh: the patch of record, from a plain copy of HEAD + floor v5 to the worktree tree (no git object written), checked by applying it to a fresh copy.
set -eu
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p10/Bp-build; WT=$B/wt; D=$G/docs/tranches/BL/design/dock
P=$D/pass-10/D2-Bp-proto.patch; X=${TMPDIR:-/tmp}/d2p10-patch-$$; PATHS="src demo tests docs/design package.json"
mkdir -p $X/a $X/b $X/c; git -C $G archive HEAD $PATHS | tar -x -C $X/a; (cd $X/a && git apply $D/pass-6/floor-v5.patch)
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
(cd $X/c && git apply --check $P && git apply $P); diff -r $X/b $X/c && echo "applied tree equals the worktree tree"
grep -c '^diff --git' $P; git apply --numstat $P 2>/dev/null | awk '{a+=$1;d+=$2} END{print "+"a" -"d}' ; shasum -a 256 $P
rm -rf $X
