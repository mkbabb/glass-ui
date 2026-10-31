#!/bin/bash
# build-fs.sh (D2 pass 10, fresh critic): the far-side builds. The scratch harness copy (fs-scene.py) sits at another depth than the
# landed harness, so its lib.mjs resolves REPO and the driver's webkit-lock by relative path wrongly; in the COPY only, both are made
# absolute (the landed harness is not edited). Then bp8fs, bp10fs, bp10fsi; the worktree enters and leaves at bp10.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p10/Bp-crit; WT=$B/wt; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; REC=$D/pass-10/D2-Bp-crit-records; HF=$B/hfs
P9=$D/pass-9/D2-Bp-p9.patch; P10=$D/pass-10/D2-Bp-proto.patch; INS=$D/pass-10/D2-Bp-proto-records/scripts/instrument.py
F=$WT/src/components/dock/composables/useDockScene.ts; GD="$HOME/.claude/guard/guarded --timeout 30 --"; A=$REC/apply.log
sed -i '' -e "s#from \"../../../driver/webkit-lock.mjs\"#from \"$G/docs/tranches/BL/driver/webkit-lock.mjs\"#" -e "s#^export const REPO = path.resolve(HERE, \"../../../../../..\");#export const REPO = \"$G\";#" $HF/lib.mjs
grep -n "webkit-lock\|^export const REPO" $HF/lib.mjs >> $A
build() { (uptime; $GD node $HF/build.mjs $WT --out $OUT --label "$1"; echo "build exit $?"; uptime) > $REC/build-$1.log 2>&1; echo "built $1 $(tail -2 $REC/build-$1.log | head -1)" >> $A; }
build bp10fs
cp $F $B/hold.ts; python3 -I $INS $F; build bp10fsi; cp $B/hold.ts $F; echo "restored scene: $(cmp $F $B/hold.ts && echo equal)" >> $A
(cd $WT && git apply -R $P10 && git apply $P9) && echo "bp10 → bp8" >> $A; build bp8fs
(cd $WT && git apply -R $P9 && git apply $P10) && echo "bp8 → bp10" >> $A
echo "FS-BUILDS-DONE $(date)" >> $A
