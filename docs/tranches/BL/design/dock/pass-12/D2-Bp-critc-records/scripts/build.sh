#!/bin/bash
# build.sh (D2 pass 12, COMPLETION CRITIC of D2-B′, REGISTRY §P12-7.2 step 2): every build this seat reads, each guarded,
# one at a time, in the seat worktree. Arms staged with `git apply` only (--check first), never a commit (C12 §1's incident).
#   fv3  = HEAD + pass-4/floor-v3.patch (L1's reference)
#   fv5  = HEAD + pass-6/floor-v5.patch (cost)
#   bp10 = fv5 + pass-11/D2-Bp-p11.patch (b5d5c9db…), the reference arm
#   bp12 = fv5 + pass-12/D2-Bp-p12.patch (5318a3dc…), the build under read
#   bp12t, bp10t   lane trace (pass-12 builder's lanetrace.py), never landed: the window attack (lanes.mjs)
#   bp12i          the pass-10 builder's instrument.py (heir probe)
#   bp12fs, bp10fs, bp12fsi  through a scratch harness copy (pass-9 critic's fs-scene.py: the constructed far side); in the COPY
#                  only, lib.mjs's REPO and the webkit-lock import are made absolute (as the pass-11 critic's build.sh)
# The worktree enters at HEAD and leaves at bp12.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p12c/Bp-crit; WT=$B/wt; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; REC=$D/pass-12/D2-Bp-critc-records
FV3=$D/pass-4/floor-v3.patch; FV5=$D/pass-6/floor-v5.patch; P11=$D/pass-11/D2-Bp-p11.patch; P12=$D/pass-12/D2-Bp-p12.patch
INS=$D/pass-10/D2-Bp-proto-records/scripts/instrument.py; FSS=$D/pass-9/D2-Bp-crit-records/seat-2/scripts/fs-scene.py
LT=$D/pass-12/D2-Bp-build-records/scripts/lanetrace.py; HF=$B/hfs
SC=$WT/src/components/dock/composables/useDockScene.ts; BO=$WT/src/components/dock/composables/useDockBody.ts
GD="$HOME/.claude/guard/guarded --timeout 30 --"; A=$REC/apply.log
ap() { (cd $WT && git apply --check "$1" && git apply "$1") >> $A 2>&1 && echo "applied $(basename $1)" >> $A || { echo "APPLY FAILED $1" >> $A; exit 1; }; }
rv() { (cd $WT && git apply -R "$1") >> $A 2>&1 && echo "reversed $(basename $1)" >> $A || { echo "REVERSE FAILED $1" >> $A; exit 1; }; }
build() { (uptime; $GD node ${2:-$H}/build.mjs $WT --out $OUT --label "$1"; echo "build exit $?"; uptime) > $REC/build-$1.log 2>&1; echo "built $1: $(grep 'build exit' $REC/build-$1.log)" >> $A; }
hold() { cp $SC $B/hold-scene.ts; cp $BO $B/hold-body.ts; }
restore() { cp $B/hold-scene.ts $SC; cp $B/hold-body.ts $BO; echo "restored: $(cmp $SC $B/hold-scene.ts && cmp $BO $B/hold-body.ts && echo equal)" >> $A; }
{ date; echo "HEAD $(git -C $WT rev-parse HEAD)"; shasum -a 256 $FV3 $FV5 $P11 $P12 $INS $FSS $LT; } > $A
python3 -I $FSS $H $HF >> $A 2>&1
sed -i '' -e "s#from \"../../../driver/webkit-lock.mjs\"#from \"$G/docs/tranches/BL/driver/webkit-lock.mjs\"#" -e "s#^export const REPO = path.resolve(HERE, \"../../../../../..\");#export const REPO = \"$G\";#" $HF/lib.mjs
grep -n "webkit-lock\|^export const REPO" $HF/lib.mjs >> $A
ap $FV3; build fv3; rv $FV3
ap $FV5; build fv5
ap $P11; build bp10; build bp10fs $HF
hold; python3 -I $LT $WT >> $A 2>&1; build bp10t; restore
rv $P11; ap $P12
echo "numstat p12 over fv5: $(cd $WT && git diff --numstat | wc -l | tr -d ' ') paths" >> $A
build bp12; build bp12fs $HF
hold; python3 -I $LT $WT >> $A 2>&1; build bp12t; restore
hold; python3 -I $INS $SC >> $A 2>&1; build bp12i; build bp12fsi $HF; restore
echo "dirty files at bp12: $(git -C $WT status --porcelain --untracked-files=no | wc -l | tr -d ' ')" >> $A
echo "scene chunk: $(ls -l $OUT/builds/bp12/demo/assets/useDockScene-*.js 2>/dev/null | awk '{print $5, $9}')" >> $A
echo "BUILDS-DONE $(date)" >> $A
