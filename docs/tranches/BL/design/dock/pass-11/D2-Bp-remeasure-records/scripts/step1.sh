#!/bin/bash
# step1.sh (D2 pass 11, B′ re-measure, REGISTRY §P10-7.3 item 1, after build.sh): on the prose-edited tree,
#   PR (source, --light), F7 (lib build → dist/, demo build → dist-demo/, typecheck, units, gates), the boot graph, then cmp:
#   · the tree's dist/ and dist-demo/ against bp10ref's (the 09aa6b3b tree's own build, build.sh), byte for byte;
#   · the harness builds out/builds/bp10/{scene,demo} against out/builds/bp10ref/{scene,demo} (build.json excluded);
#   the grep of B′'s added lines in src/components/dock for REGISTRY and harness ids; then the pass-11 patch (mkpatch.sh).
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p11/Bp-remeasure; WT=$B/wt; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; REC=$D/pass-11/D2-Bp-remeasure-records; S=$REC/scripts; GD=$HOME/.claude/guard/guarded
BS=$D/pass-10/D2-Bp-proto-records/scripts
mkdir -p $REC/PR-bp10 $REC/F7-bp10 $REC/cmp
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
L "STEP1 start; harness $(cd $D && find harness -type f | sort | xargs shasum -a 256 | shasum -a 256 | cut -c1-16)"
L "start PR"
(uptime; $GD --light --timeout 10 -- node $H/prose.mjs $WT --out $OUT/pr; echo "exit $?"; uptime) > $REC/PR.log 2>&1
find $OUT/pr -name PR.json -exec cp {} $REC/PR-bp10/PR.json \;
while [ "$(echo "$(load1) > 20" | bc)" = 1 ]; do sleep 30; done
L "start F7"
(uptime; $GD --timeout 60 -- node $H/f7.mjs $WT --out $OUT/f7; echo "exit $?"; uptime) > $REC/F7-bp10/F7.log 2>&1
F=$(find $OUT/f7 -name F7.json | head -1); cp $F $REC/F7-bp10/F7.json; cp $(dirname $F)/steps.json $REC/F7-bp10/ 2>/dev/null
for s in lib demo typecheck units; do tail -40 $(dirname $F)/$s.log > $REC/F7-bp10/$s.tail.log 2>/dev/null; done
python3 -I $BS/bootsize.py $WT > $REC/F7-bp10/boot-graph.txt
mkdir -p $OUT/refroot; ln -sfn $OUT/ref-dist-demo $OUT/refroot/dist-demo; python3 -I $BS/bootsize.py $OUT/refroot > $REC/F7-bp10/boot-graph-bp10ref.txt 2>&1
L "end F7"
C=$REC/cmp/cmp.txt
{
  echo "== dist/ (p11 tree, F7's lib build) vs bp10ref's dist/ (09aa6b3b tree)"
  diff -rq $OUT/ref-dist $WT/dist && echo "dist: IDENTICAL ($(find $WT/dist -type f | wc -l | tr -d ' ') files)"
  echo "== dist-demo/ vs bp10ref's"
  diff -rq $OUT/ref-dist-demo $WT/dist-demo && echo "dist-demo: IDENTICAL ($(find $WT/dist-demo -type f | wc -l | tr -d ' ') files)"
  echo "== per-file cmp (every file, both trees)"
  n=0; bad=0
  for d in dist dist-demo; do
    for f in $(cd $WT/$d && find . -type f | sort); do n=$((n+1)); cmp -s "$OUT/ref-$d/$f" "$WT/$d/$f" || { bad=$((bad+1)); echo "DIFFERS $d/$f"; }; done
    echo "$d: ref has $(find $OUT/ref-$d -type f | wc -l | tr -d ' ') files, p11 has $(find $WT/$d -type f | wc -l | tr -d ' ')"
  done
  echo "cmp: $n files, $bad differ"
  echo "== harness builds: out/builds/bp10 vs out/builds/bp10ref (scene/, demo/)"
  for d in scene demo; do diff -rq $OUT/builds/bp10ref/$d $OUT/builds/bp10/$d && echo "$d: IDENTICAL ($(find $OUT/builds/bp10/$d -type f | wc -l | tr -d ' ') files)"; done
  echo "== sha256 of the manifest of each dist tree"
  for t in ref-dist ref-dist-demo; do echo "$t $(cd $OUT/$t && find . -type f | sort | xargs shasum -a 256 | shasum -a 256 | cut -c1-64)"; done
  for t in dist dist-demo; do echo "p11-$t $(cd $WT/$t && find . -type f | sort | xargs shasum -a 256 | shasum -a 256 | cut -c1-64)"; done
} > $C 2>&1
L "cmp done: $(grep '^cmp:' $C)"
bash $S/mkpatch.sh > $REC/patch.log 2>&1
L "patch: $(tail -1 $REC/patch.log)"
python3 -I $S/grep-added.py $D/pass-11/D2-Bp-p11.patch > $REC/grep-added.txt 2>&1
L "STEP1 done"
