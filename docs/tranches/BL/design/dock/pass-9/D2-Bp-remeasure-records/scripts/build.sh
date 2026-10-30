#!/bin/bash
# build.sh (D2 pass 9, B′ re-measure, §P8-7.3 step 1): every build in the seat worktree, each guarded, one at a time.
#   fv3   = HEAD + pass-4/floor-v3.patch (L1's reference)
#   fv5   = HEAD + pass-6/floor-v5.patch (cost reference)
#   bp7   = fv5 + pass-7/D2-Bp-proto.patch (184a9715…, slot probe and cost reference)
#   bp8ref= fv5 + pass-8/D2-Bp-proto.patch (b1ea7d86…), harness scene/demo build AND the tree's own dist/ + dist-demo/
#   then the header clause (edit-clause.py, prose only) on that tree:
#   bp8   = fv5 + the pass-9 patch (the tree under re-measure); harness scene/demo build. F7 (chain.sh) rebuilds dist/ and
#           dist-demo/ on this tree, and cmp.sh proves them byte-identical to bp8ref's.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p9/Bp-remeasure; WT=$B/wt; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; REC=$D/pass-9/D2-Bp-remeasure-records; S=$REC/scripts
FV3=$D/pass-4/floor-v3.patch; FV5=$D/pass-6/floor-v5.patch; BP7=$D/pass-7/D2-Bp-proto.patch; BP8=$D/pass-8/D2-Bp-proto.patch
GD="$HOME/.claude/guard/guarded --timeout 30 --"
A=$REC/apply.log
ap() { (cd $WT && git apply "$1") >> $A 2>&1 && echo "applied $1" >> $A || { echo "APPLY FAILED $1" >> $A; exit 1; }; }
rv() { (cd $WT && git apply -R "$1") >> $A 2>&1 && echo "reversed $1" >> $A || { echo "REVERSE FAILED $1" >> $A; exit 1; }; }
build() { (uptime; $GD node $H/build.mjs $WT --out $OUT --label "$1"; echo "build exit $?"; uptime) > $REC/build-$1.log 2>&1; }
{ date; git -C $WT rev-parse HEAD; shasum -a 256 $FV3 $FV5 $BP7 $BP8; } > $A
ap $FV3; build fv3; rv $FV3
ap $FV5; build fv5
ap $BP7; build bp7; rv $BP7
ap $BP8; build bp8ref
# the reference tree's own library and demo output (what F7 builds), kept outside the tree for cmp
(uptime; $GD bash -c "cd $WT && npx vite build && npm run demo:dist:build"; echo "exit $?"; uptime) > $REC/build-bp8ref-dist.log 2>&1
rm -rf $OUT/ref-dist $OUT/ref-dist-demo; cp -a $WT/dist $OUT/ref-dist; cp -a $WT/dist-demo $OUT/ref-dist-demo
rm -rf $WT/dist $WT/dist-demo
python3 -I $S/edit-clause.py $WT/src/components/dock/composables/useDockScene.ts >> $A 2>&1 || { echo "CLAUSE EDIT FAILED" >> $A; exit 1; }
build bp8
echo "dirty files at bp8: $(git -C $WT status --porcelain --untracked-files=no | wc -l)" >> $A
echo "BUILDS-DONE $(date)" >> $A
