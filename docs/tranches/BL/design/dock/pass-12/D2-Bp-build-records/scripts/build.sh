#!/bin/bash
# build.sh (D2 pass 12, BUILDER of D2-B′, REGISTRY §P11-7.3): the reference and trace builds, each guarded, one at a time, in the
# seat worktree (which enters at HEAD + floor v5 + pass-11/D2-Bp-p11.patch and leaves the same way).
#   fv3  = HEAD + pass-4/floor-v3.patch (L1)        fv5 = HEAD + pass-6/floor-v5.patch (cost)
#   bp8  = fv5 + pass-9/D2-Bp-p9.patch (dd5d9f5f…)  bp10 = fv5 + pass-11/D2-Bp-p11.patch (b5d5c9db…)
#   bp8t, bp10t: the same trees with scripts/lanetrace.py (per-frame lanes + window marks), never landed
#   bp10i: bp10 with the pass-10 builder's instrument.py (heir probe)
# ONLY=<labels> builds a subset.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p12/Bp-build; WT=$B/wt; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; REC=$D/pass-12/D2-Bp-build-records; S=$REC/scripts
FV3=$D/pass-4/floor-v3.patch; FV5=$D/pass-6/floor-v5.patch; P9=$D/pass-9/D2-Bp-p9.patch; P11=$D/pass-11/D2-Bp-p11.patch
INS=$D/pass-10/D2-Bp-proto-records/scripts/instrument.py
SC=$WT/src/components/dock/composables/useDockScene.ts; BO=$WT/src/components/dock/composables/useDockBody.ts
GD="$HOME/.claude/guard/guarded --timeout 30 --"; A=$REC/apply.log
want() { case " ${ONLY:-fv3 fv5 bp8 bp8t bp10 bp10t bp10i} " in *" $1 "*) return 0;; esac; return 1; }
ap() { (cd $WT && git apply --check "$1" && git apply "$1") >> $A 2>&1 && echo "applied $(basename $1)" >> $A || { echo "APPLY FAILED $1" >> $A; exit 1; }; }
rv() { (cd $WT && git apply -R "$1") >> $A 2>&1 && echo "reversed $(basename $1)" >> $A || { echo "REVERSE FAILED $1" >> $A; exit 1; }; }
build() { (uptime; $GD node $H/build.mjs $WT --out $OUT --label "$1"; echo "build exit $?"; uptime) > $REC/build-$1.log 2>&1; echo "built $1: $(grep 'build exit' $REC/build-$1.log)" >> $A; }
hold() { cp $SC $B/hold-scene.ts; cp $BO $B/hold-body.ts; }
restore() { cp $B/hold-scene.ts $SC; cp $B/hold-body.ts $BO; echo "restored: $(cmp $SC $B/hold-scene.ts && cmp $BO $B/hold-body.ts && echo equal)" >> $A; }
{ date; git -C $WT rev-parse HEAD; shasum -a 256 $FV3 $FV5 $P9 $P11 $INS $S/lanetrace.py; } >> $A
if [ "${ONLY:-}" != bp12 ]; then
rv $P11; rv $FV5
if want fv3; then ap $FV3; build fv3; rv $FV3; fi
ap $FV5
want fv5 && build fv5
ap $P9
want bp8 && build bp8
if want bp8t; then hold; python3 -I $S/lanetrace.py $WT >> $A 2>&1; build bp8t; restore; fi
rv $P9; ap $P11
want bp10 && build bp10
if want bp10t; then hold; python3 -I $S/lanetrace.py $WT >> $A 2>&1; build bp10t; restore; fi
if want bp10i; then hold; python3 -I $INS $SC >> $A 2>&1; build bp10i; restore; fi
echo "dirty files at bp10: $(git -C $WT status --porcelain --untracked-files=no | wc -l | tr -d ' ')" >> $A
echo "BUILDS-DONE $(date)" >> $A
fi
# (added 13:36, before any B2 read) bp10u / bp8u: lanetrace.py --units (each unit's written clip, mask, reveal, gift), ONLY=units
if [ "${ONLY:-}" = units ]; then
  hold; python3 -I $S/lanetrace.py $WT --units >> $A 2>&1; build bp10u; restore
  rv $P11; ap $P9; hold; python3 -I $S/lanetrace.py $WT --units >> $A 2>&1; build bp8u; restore; rv $P9; ap $P11
  echo "UNITS-DONE $(date)" >> $A
fi
# (added 14:40, before any read on it) bp10c: lanetrace.py --units + checktrace.py, ONLY=checks
if [ "${ONLY:-}" = checks ]; then
  hold; python3 -I $S/lanetrace.py $WT --units >> $A 2>&1; python3 -I $S/checktrace.py $WT >> $A 2>&1; build bp10c; restore
  echo "CHECKS-DONE $(date)" >> $A
fi
# (added 15:05) bp12 = the worktree's tree as edited (bp10 + this seat's cure), and its diagnosis builds, ONLY=bp12. Leaves the tree at bp12.
if [ "${ONLY:-}" = bp12 ]; then
  cp $B/hold-scene.ts $B/bp10-scene.ts; cp $SC $B/bp12-scene.ts; cp $SC $B/hold-scene.ts; cp $BO $B/hold-body.ts
  build bp12
  hold; python3 -I $S/lanetrace.py $WT >> $A 2>&1; build bp12t; restore
  hold; python3 -I $S/lanetrace.py $WT --units >> $A 2>&1; build bp12u; restore
  hold; python3 -I $S/lanetrace.py $WT --units >> $A 2>&1; python3 -I $S/checktrace.py $WT >> $A 2>&1; build bp12c; restore
  hold; python3 -I $INS $SC >> $A 2>&1; build bp12i; restore
  echo "BP12-DONE $(date)" >> $A
fi
