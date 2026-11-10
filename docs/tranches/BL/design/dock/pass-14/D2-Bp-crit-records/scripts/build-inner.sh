#!/bin/bash
# build-inner.sh: runs INSIDE the one guarded slot build.sh opens (no nested guard); the body is the first build.sh unchanged.
# build.sh (D2 pass 14, FRESH CRITIC of D2-B′, REGISTRY §P13-7.4; after the pass-13 critic's build.sh): every build this seat
# reads, each guarded, one at a time, in the seat worktree detached at 392ff1e3c. Arms staged with `git apply` only (--check
# first), no commit. Disk is read before every build (under 15 GB free: DISK-STOP).
#   fv3  = base + pass-4/floor-v3.patch (L1)        fv5 = base + pass-6/floor-v5.patch (cost)
#   bp12 = fv5 + pass-12/D2-Bp-p12.patch (5318a3dc…), the reference arm      bp13 = fv5 + pass-13/D2-Bp-p13.patch (bb7cb08d…)
#   bp13t, bp12t  lane trace (pass-12 builder's lanetrace.py), never landed: the window attack (lanes.mjs)
#   bp13i         pass-10 builder's instrument.py (heir probe)
#   bp13fs, bp12fs, bp13fsi  through a scratch harness copy (pass-9 critic's fs-scene.py)
#   bp13x         lanetrace.py --units + the pass-13 builder's edgetrace.py: the edge law's own range (revtrace.mjs), never landed
# The worktree enters at the base and leaves at bp13 (F7, PR and the boot graph read it there).
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p14/Bp-crit; WT=$B/wt; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; REC=$D/pass-14/D2-Bp-crit-records
FV3=$D/pass-4/floor-v3.patch; FV5=$D/pass-6/floor-v5.patch; P12=$D/pass-12/D2-Bp-p12.patch; P13=$D/pass-13/D2-Bp-p13.patch
INS=$D/pass-10/D2-Bp-proto-records/scripts/instrument.py; FSS=$D/pass-9/D2-Bp-crit-records/seat-2/scripts/fs-scene.py
LT=$D/pass-12/D2-Bp-build-records/scripts/lanetrace.py; ET=$D/pass-13/D2-Bp-build-records/scripts/edgetrace.py; HF=$B/hfs
SC=$WT/src/components/dock/composables/useDockScene.ts; BO=$WT/src/components/dock/composables/useDockBody.ts
A=$REC/apply.log
ap() { (cd $WT && git apply --check "$1" && git apply "$1") >> $A 2>&1 && echo "applied $(basename $1)" >> $A || { echo "APPLY FAILED $1" >> $A; exit 1; }; }
rv() { (cd $WT && git apply -R "$1") >> $A 2>&1 && echo "reversed $(basename $1)" >> $A || { echo "REVERSE FAILED $1" >> $A; exit 1; }; }
disk() { local a; a=$(df -g /System/Volumes/Data | tail -1 | awk '{print $4}'); echo "disk free $a GB before $1 $(date '+%T')" >> $A; [ "$a" -lt 15 ] && { echo "DISK-STOP $a GB before $1" >> $A; exit 3; }; return 0; }
build() { disk $1; (uptime; df -h /System/Volumes/Data | tail -1; node ${2:-$H}/build.mjs $WT --out $OUT --label "$1"; echo "build exit $?"; uptime) > $REC/build-$1.log 2>&1; echo "built $1: $(grep 'build exit' $REC/build-$1.log) $(date '+%T')" >> $A; grep -q '^\[guarded\] REFUSED' $REC/build-$1.log && { echo "GUARD-REFUSED at build $1" >> $A; exit 5; }; return 0; }
hold() { cp $SC $B/hold-scene.ts; cp $BO $B/hold-body.ts; }
restore() { cp $B/hold-scene.ts $SC; cp $B/hold-body.ts $BO; echo "restored: $(cmp $SC $B/hold-scene.ts && cmp $BO $B/hold-body.ts && echo equal)" >> $A; }
{ echo "inner start (one guarded slot for every build) $(date) · $(uptime)"; date; echo "HEAD $(git -C $WT rev-parse HEAD)"; shasum -a 256 $FV3 $FV5 $P12 $P13 $INS $FSS $LT $ET; } >> $A
python3 -I $FSS $H $HF >> $A 2>&1
sed -i '' -e "s#from \"../../../driver/webkit-lock.mjs\"#from \"$G/docs/tranches/BL/driver/webkit-lock.mjs\"#" -e "s#^export const REPO = path.resolve(HERE, \"../../../../../..\");#export const REPO = \"$G\";#" $HF/lib.mjs
grep -n "webkit-lock\|^export const REPO" $HF/lib.mjs >> $A
ap $FV3; build fv3; rv $FV3
ap $FV5; build fv5
ap $P12; build bp12; build bp12fs $HF
hold; python3 -I $LT $WT >> $A 2>&1; build bp12t; restore
rv $P12; ap $P13
echo "numstat p13 over fv5: $(cd $WT && git diff --numstat | wc -l | tr -d ' ') paths" >> $A
build bp13; build bp13fs $HF
hold; python3 -I $LT $WT >> $A 2>&1; build bp13t; restore
hold; python3 -I $INS $SC >> $A 2>&1; build bp13i; build bp13fsi $HF; restore
hold; python3 -I $LT $WT --units >> $A 2>&1; python3 -I $ET $WT >> $A 2>&1; build bp13x; restore
echo "dirty files at bp13: $(git -C $WT status --porcelain --untracked-files=no | wc -l | tr -d ' ')" >> $A
for b in bp12 bp13; do echo "scene chunk $b: $(ls -l $OUT/builds/$b/demo/assets/useDockScene-*.js 2>/dev/null | awk '{print $5, $9}')" >> $A; done
echo "BUILDS-DONE $(date)" >> $A
