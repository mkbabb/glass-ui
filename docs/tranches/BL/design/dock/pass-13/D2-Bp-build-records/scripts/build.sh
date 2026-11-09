#!/bin/bash
# build.sh (D2 pass 13, BUILDER of D2-B′, REGISTRY §P12c-7.3): the arms and diagnosis builds, each guarded, one at a time, in
# the seat worktree. Arms staged with `git apply` only (--check first), never a commit.
#   fv3  = HEAD + pass-4/floor-v3.patch (L1)          fv5  = HEAD + pass-6/floor-v5.patch (cost)
#   bp10 = fv5 + pass-11/D2-Bp-p11.patch (trace carrier only; not an arm)
#   bp12 = fv5 + pass-12/D2-Bp-p12.patch (5318a3dc…), the reference arm
#   bp12x, bp10x  the pass-12 builder's lanetrace.py --units + this seat's edgetrace.py (diagnosis only, never landed)
# ONLY=<labels> builds a subset. The worktree enters at fv5 + p12 and leaves the same way.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p13/Bp-build; WT=$B/wt; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; REC=$D/pass-13/D2-Bp-build-records; S=$REC/scripts
FV3=$D/pass-4/floor-v3.patch; FV5=$D/pass-6/floor-v5.patch; P11=$D/pass-11/D2-Bp-p11.patch; P12=$D/pass-12/D2-Bp-p12.patch
LT=$D/pass-12/D2-Bp-build-records/scripts/lanetrace.py; INS=$D/pass-10/D2-Bp-proto-records/scripts/instrument.py
SC=$WT/src/components/dock/composables/useDockScene.ts; BO=$WT/src/components/dock/composables/useDockBody.ts
GD="$HOME/.claude/guard/guarded --timeout 30 --"; A=$REC/apply.log
# OUT2=1 (the final bp13): builds go to out2/, beside symlinks to out/builds/{fv3,fv5,bp12}
[ -n "${OUT2:-}" ] && { mkdir -p $B/out2/builds; for l in fv3 fv5 bp12; do [ -e $B/out2/builds/$l ] || ln -s $OUT/builds/$l $B/out2/builds/$l; done; OUT=$B/out2; }
want() { case " ${ONLY:-fv3 fv5 bp10 bp10x bp12 bp12x} " in *" $1 "*) return 0;; esac; return 1; }
ap() { (cd $WT && git apply --check "$1" && git apply "$1") >> $A 2>&1 && echo "applied $(basename $1)" >> $A || { echo "APPLY FAILED $1" >> $A; exit 1; }; }
rv() { (cd $WT && git apply -R "$1") >> $A 2>&1 && echo "reversed $(basename $1)" >> $A || { echo "REVERSE FAILED $1" >> $A; exit 1; }; }
build() { (uptime; $GD node $H/build.mjs $WT --out $OUT --label "$1"; echo "build exit $?"; uptime) > $REC/build-$1.log 2>&1; echo "built $1: $(grep 'build exit' $REC/build-$1.log) $(date '+%T')" >> $A; }
hold() { cp $SC $B/hold-scene.ts; cp $BO $B/hold-body.ts; }
restore() { cp $B/hold-scene.ts $SC; cp $B/hold-body.ts $BO; echo "restored: $(cmp $SC $B/hold-scene.ts && cmp $BO $B/hold-body.ts && echo equal)" >> $A; }
instr() { hold; python3 -I $LT $WT --units >> $A 2>&1; python3 -I $S/edgetrace.py $WT >> $A 2>&1; build $1; restore; }
{ date; echo "HEAD $(git -C $WT rev-parse HEAD)"; shasum -a 256 $FV3 $FV5 $P11 $P12 $LT $S/edgetrace.py 2>/dev/null; } >> $A
if [ "${ONLY:-}" != bp13 ]; then
  want bp12 && build bp12
  want bp12x && instr bp12x
  rv $P12
  want fv5 && build fv5
  if want bp10 || want bp10x; then ap $P11; want bp10 && build bp10; want bp10x && instr bp10x; rv $P11; fi
  if want fv3; then rv $FV5; ap $FV3; build fv3; rv $FV3; ap $FV5; fi
  ap $P12
  echo "dirty at exit: $(git -C $WT status --porcelain --untracked-files=no | wc -l | tr -d ' ') paths" >> $A
  echo "BUILDS-DONE $(date)" >> $A
fi
# bp13 = the worktree's tree as edited (bp12 + this seat's cure); bp13x its diagnosis build. ONLY=bp13
if [ "${ONLY:-}" = bp13 ]; then
  build bp13; instr bp13x
  hold; python3 -I $INS $SC >> $A 2>&1; build bp13i; restore
  echo "scene chunk bp13: $(ls -l $OUT/builds/bp13/demo/assets/useDockScene-*.js 2>/dev/null | awk '{print $5}')" >> $A
  echo "BP13-DONE $(date)" >> $A
fi
