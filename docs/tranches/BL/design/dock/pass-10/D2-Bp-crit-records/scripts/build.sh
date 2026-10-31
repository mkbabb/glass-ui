#!/bin/bash
# build.sh (D2 pass 10, fresh critic of D2-B′): every build this seat reads, each guarded, one at a time, in the seat worktree.
#   fv3  = HEAD + pass-4/floor-v3.patch (L1's reference)
#   bp8  = HEAD + pass-6/floor-v5.patch + pass-9/D2-Bp-p9.patch (dd5d9f5f…), the base build
#   bp10 = HEAD + pass-6/floor-v5.patch + pass-10/D2-Bp-proto.patch (09aa6b3b…), the build under read
#   bp10i      bp10 with the builder's diagnosis trace (pass-10 builder scripts/instrument.py), never landed
#   bp10fs, bp8fs, bp10fsi  the same trees through a scratch harness copy whose `swap` scene takes &fs=1 (pass-9 critic's
#              fs-scene.py: a 132 px tab centred on the middle of three 40 px icons, a true far side)
# The worktree enters at HEAD + floor v5 (applied by hand) and leaves at bp10.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p10/Bp-crit; WT=$B/wt; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; REC=$D/pass-10/D2-Bp-crit-records
FV3=$D/pass-4/floor-v3.patch; FV5=$D/pass-6/floor-v5.patch; P9=$D/pass-9/D2-Bp-p9.patch; P10=$D/pass-10/D2-Bp-proto.patch
INS=$D/pass-10/D2-Bp-proto-records/scripts/instrument.py; FSS=$D/pass-9/D2-Bp-crit-records/seat-2/scripts/fs-scene.py; HF=$B/hfs
F=$WT/src/components/dock/composables/useDockScene.ts
GD="$HOME/.claude/guard/guarded --timeout 30 --"; A=$REC/apply.log
ap() { (cd $WT && git apply "$1") >> $A 2>&1 && echo "applied $(basename $(dirname $1))/$(basename $1)" >> $A || { echo "APPLY FAILED $1" >> $A; exit 1; }; }
rv() { (cd $WT && git apply -R "$1") >> $A 2>&1 && echo "reversed $(basename $(dirname $1))/$(basename $1)" >> $A || { echo "REVERSE FAILED $1" >> $A; exit 1; }; }
build() { (uptime; $GD node ${2:-$H}/build.mjs $WT --out $OUT --label "$1"; echo "build exit $?"; uptime) > $REC/build-$1.log 2>&1; echo "built $1 $(tail -2 $REC/build-$1.log | head -1)" >> $A; }
{ date; git -C $WT rev-parse HEAD; shasum -a 256 $FV3 $FV5 $P9 $P10 $INS $FSS; } >> $A
python3 -I $FSS $H $HF
rv $FV5; ap $FV3; build fv3; rv $FV3
ap $FV5; ap $P9; build bp8; build bp8fs $HF; rv $P9
ap $P10; build bp10; build bp10fs $HF
cp $F $B/hold.ts; python3 -I $INS $F; build bp10i; build bp10fsi $HF; cp $B/hold.ts $F
echo "restored scene: $(cmp $F $B/hold.ts && echo equal)" >> $A
(cd $WT && git diff --stat HEAD | tail -1) >> $A
echo "BUILDS-DONE $(date)" >> $A
