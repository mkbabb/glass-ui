#!/bin/bash
# step1.sh (D2 pass 9, B′ re-measure, §P8-7.3 step 1, after build.sh): on the clause-edited tree, PR (source, --light),
# then F7 (lib build → dist/, demo build → dist-demo/, typecheck, units, gates), then cmp:
#   · the tree's dist/ and dist-demo/ against bp8ref's (the b1ea7d86 tree's own build, build.sh), byte for byte;
#   · the harness builds out/builds/bp8/{scene,demo} against out/builds/bp8ref/{scene,demo} (build.json excluded: label/time).
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p9/Bp-remeasure; WT=$B/wt; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; REC=$D/pass-9/D2-Bp-remeasure-records; GD=$HOME/.claude/guard/guarded
mkdir -p $REC/PR-bp8 $REC/F7-bp8 $REC/cmp
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
L "STEP1 start; harness $(cd $D && find harness -type f | sort | xargs shasum -a 256 | shasum -a 256 | cut -c1-16)"
L "start PR"
(uptime; $GD --light --timeout 10 -- node $H/prose.mjs $WT --out $OUT/pr; echo "exit $?"; uptime) > $REC/PR.log 2>&1
find $OUT/pr -name PR.json -exec cp {} $REC/PR-bp8/PR.json \;
L "start F7"
(uptime; $GD --timeout 60 -- node $H/f7.mjs $WT --out $OUT/f7; echo "exit $?"; uptime) > $REC/F7-bp8/F7.log 2>&1
F=$(find $OUT/f7 -name F7.json | head -1); cp $F $REC/F7-bp8/F7.json; cp $(dirname $F)/steps.json $REC/F7-bp8/ 2>/dev/null
for s in lib demo typecheck units; do tail -40 $(dirname $F)/$s.log > $REC/F7-bp8/$s.tail.log 2>/dev/null; done
L "end F7"
C=$REC/cmp/cmp.txt
{
  echo "== dist/ (p9 tree, F7's lib build) vs bp8ref's dist/ (b1ea7d86 tree)"
  diff -rq $OUT/ref-dist $WT/dist && echo "dist: IDENTICAL ($(find $WT/dist -type f | wc -l | tr -d ' ') files)"
  echo "== dist-demo/ vs bp8ref's"
  diff -rq $OUT/ref-dist-demo $WT/dist-demo && echo "dist-demo: IDENTICAL ($(find $WT/dist-demo -type f | wc -l | tr -d ' ') files)"
  echo "== per-file cmp (every file, both trees)"
  n=0; bad=0
  for d in dist dist-demo; do
    for f in $(cd $WT/$d && find . -type f | sort); do n=$((n+1)); cmp -s "$OUT/ref-$d/$f" "$WT/$d/$f" || { bad=$((bad+1)); echo "DIFFERS $d/$f"; }; done
  done
  echo "cmp: $n files, $bad differ"
  echo "== harness builds: out/builds/bp8 vs out/builds/bp8ref (scene/, demo/)"
  for d in scene demo; do diff -rq $OUT/builds/bp8ref/$d $OUT/builds/bp8/$d && echo "$d: IDENTICAL ($(find $OUT/builds/bp8/$d -type f | wc -l | tr -d ' ') files)"; done
  echo "== sha256 of the manifest of each dist tree"
  for t in ref-dist ref-dist-demo; do echo "$t $(cd $OUT/$t && find . -type f | sort | xargs shasum -a 256 | shasum -a 256 | cut -c1-64)"; done
  for t in dist dist-demo; do echo "p9-$t $(cd $WT/$t && find . -type f | sort | xargs shasum -a 256 | shasum -a 256 | cut -c1-64)"; done
} > $C 2>&1
L "STEP1 done"
