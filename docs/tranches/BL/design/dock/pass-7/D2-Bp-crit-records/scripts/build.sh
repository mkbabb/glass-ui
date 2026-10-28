#!/bin/bash
# build.sh (D2 pass 7, B′ critic): four builds in the seat worktree, by apply / reverse on HEAD, each guarded:
#   fv3 = HEAD + pass-4/floor-v3.patch (L1's reference), fv5 = HEAD + pass-6/floor-v5.patch (cost reference),
#   bp6 = fv5 + pass-6/D2-Bp-proto.patch (pass 6's B′, cost reference, scene only), bp = fv5 + pass-7/D2-Bp-proto.patch (judged).
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p7/Bp-crit; WT=$B/wt; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; REC=$D/pass-7/D2-Bp-crit-records
FV3=$D/pass-4/floor-v3.patch; FV5=$D/pass-6/floor-v5.patch; BP6=$D/pass-6/D2-Bp-proto.patch; BP=$D/pass-7/D2-Bp-proto.patch
GD="$HOME/.claude/guard/guarded --timeout 60 --"
ap() { (cd $WT && git apply "$1") >> $REC/apply.log 2>&1 && echo "applied $(basename $(dirname $1))/$(basename $1)" >> $REC/apply.log; }
rv() { (cd $WT && git apply -R "$1") >> $REC/apply.log 2>&1 && echo "reversed $(basename $(dirname $1))/$(basename $1)" >> $REC/apply.log; }
build() { (uptime; $GD node $H/build.mjs $WT --out $OUT --label "$1" ${2:-}; echo "build exit $?"; uptime) > $REC/build-$1.log 2>&1; }
ap $FV3 && build fv3; rv $FV3
ap $FV5 && build fv5
ap $BP6 && build bp6 --no-demo; rv $BP6
ap $BP && build bp
echo "dirty files after bp: $(git -C $WT status --porcelain --untracked-files=no | wc -l)" >> $REC/apply.log
echo "BUILDS-DONE $(date)" >> $REC/apply.log
