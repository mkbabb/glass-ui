#!/bin/bash
# build.sh (D2 pass 11, B′ re-measure, REGISTRY §P10-7.3 item 1): every build in the seat worktree, each guarded, one at a time.
#   fv3    = HEAD + pass-4/floor-v3.patch (L1's reference)
#   fv5    = HEAD + pass-6/floor-v5.patch (cost reference)
#   bp8    = fv5 + pass-9/D2-Bp-p9.patch (dd5d9f5f…), the A/B, probe and cost control
#   bp10ref= fv5 + pass-10/D2-Bp-proto.patch (09aa6b3b…): harness scene/demo build AND the tree's own dist/ + dist-demo/
#            (vite build + demo:dist:build, what F7 builds), kept outside the tree for cmp
#   then the two prose edits (edit-p11.py, comments only) on that tree:
#   bp10   = fv5 + the pass-11 patch (the tree under re-measure); harness scene/demo build. F7 (step1.sh) rebuilds dist/ and
#            dist-demo/ on this tree, and step1.sh proves them byte-identical to bp10ref's.
# The worktree enters at HEAD + floor v5 + 09aa6b3b (applied by hand to read the header) and is first returned to HEAD.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p11/Bp-remeasure; WT=$B/wt; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; REC=$D/pass-11/D2-Bp-remeasure-records; S=$REC/scripts
FV3=$D/pass-4/floor-v3.patch; FV5=$D/pass-6/floor-v5.patch; P9=$D/pass-9/D2-Bp-p9.patch; P10=$D/pass-10/D2-Bp-proto.patch
GD="$HOME/.claude/guard/guarded --timeout 30 --"
A=$REC/apply.log
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
ap() { (cd $WT && git apply "$1") >> $A 2>&1 && echo "applied $(basename $(dirname $1))/$(basename $1)" >> $A || { echo "APPLY FAILED $1" >> $A; exit 1; }; }
rv() { (cd $WT && git apply -R "$1") >> $A 2>&1 && echo "reversed $(basename $(dirname $1))/$(basename $1)" >> $A || { echo "REVERSE FAILED $1" >> $A; exit 1; }; }
build() { (uptime; $GD node $H/build.mjs $WT --out $OUT --label "$1"; echo "build exit $?"; uptime) > $REC/build-$1.log 2>&1; echo "built $1: $(grep 'build exit' $REC/build-$1.log)" >> $A; }
{ date; git -C $WT rev-parse HEAD; shasum -a 256 $FV3 $FV5 $P9 $P10 $S/edit-p11.py; } > $A
L "BUILD start"
rv $P10; rv $FV5
echo "dirty files at HEAD: $(git -C $WT status --porcelain --untracked-files=no | wc -l | tr -d ' ')" >> $A
ap $FV3; build fv3; rv $FV3
ap $FV5; build fv5
ap $P9; build bp8; rv $P9
ap $P10; build bp10ref
(uptime; $GD bash -c "cd $WT && npx vite build && npm run demo:dist:build"; echo "exit $?"; uptime) > $REC/build-bp10ref-dist.log 2>&1
echo "bp10ref dist: $(grep '^exit' $REC/build-bp10ref-dist.log)" >> $A
rm -rf $OUT/ref-dist $OUT/ref-dist-demo; cp -a $WT/dist $OUT/ref-dist; cp -a $WT/dist-demo $OUT/ref-dist-demo
rm -rf $WT/dist $WT/dist-demo
cp $WT/src/components/dock/composables/useDockScene.ts $OUT/useDockScene.bp10ref.ts
python3 -I $S/edit-p11.py $WT/src/components/dock/composables/useDockScene.ts >> $A 2>&1 || { echo "PROSE EDIT FAILED" >> $A; exit 1; }
diff -u $OUT/useDockScene.bp10ref.ts $WT/src/components/dock/composables/useDockScene.ts > $REC/edit-p11.diff
build bp10
echo "dirty files at bp10: $(git -C $WT status --porcelain --untracked-files=no | wc -l | tr -d ' ')" >> $A
echo "BUILDS-DONE $(date)" >> $A
L "BUILD done"
