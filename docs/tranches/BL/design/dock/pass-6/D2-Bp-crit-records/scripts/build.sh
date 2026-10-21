#!/bin/bash
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p6/Bp-crit; WT=$B/wt; OUT=$B/out; REC=$B/rec
D=$G/docs/tranches/BL/design/dock; H=$D/harness
FV3=$D/pass-4/floor-v3.patch; FV5=$D/pass-6/floor-v5.patch; BP=$D/pass-6/D2-Bp-proto.patch
GD="$HOME/.claude/guard/guarded --timeout 60 --"
ap() { (cd $WT && git apply "$1") >> $REC/apply.log 2>&1 && echo "applied $(basename $1)" >> $REC/apply.log; }
rv() { (cd $WT && git apply -R "$1") >> $REC/apply.log 2>&1 && echo "reversed $(basename $1)" >> $REC/apply.log; }
build() { (uptime; $GD node $H/build.mjs $WT --out $OUT --label "$1"; echo "build exit $?"; uptime) > $REC/build-$1.log 2>&1; }
git -C $WT rev-parse HEAD >> $REC/apply.log
ap $FV3 && build fv3; rv $FV3
ap $FV5 && build fv5 && ap $BP && build bp
git -C $WT status --porcelain --untracked-files=no | wc -l >> $REC/apply.log
echo "BUILDS-DONE $(date)" >> $REC/apply.log
