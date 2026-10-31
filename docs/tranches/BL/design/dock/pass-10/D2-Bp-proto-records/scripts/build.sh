#!/bin/bash
# build.sh (D2 pass 10, builder of D2-B′): the reference builds, each guarded, one at a time, in the seat worktree.
#   fv3 = HEAD + pass-4/floor-v3.patch (L1); fv5 = HEAD + pass-6/floor-v5.patch (cost); bp8 = fv5 + pass-9/D2-Bp-p9.patch (dd5d9f5f…)
# Leaves the worktree at bp8.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p10/Bp-build; WT=$B/wt; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; REC=$D/pass-10/D2-Bp-proto-records
FV3=$D/pass-4/floor-v3.patch; FV5=$D/pass-6/floor-v5.patch; P9=$D/pass-9/D2-Bp-p9.patch
GD="$HOME/.claude/guard/guarded --timeout 30 --"; A=$REC/apply.log
ap() { (cd $WT && git apply "$1") >> $A 2>&1 && echo "applied $1" >> $A || { echo "APPLY FAILED $1" >> $A; exit 1; }; }
rv() { (cd $WT && git apply -R "$1") >> $A 2>&1 && echo "reversed $1" >> $A || { echo "REVERSE FAILED $1" >> $A; exit 1; }; }
build() { (uptime; $GD node $H/build.mjs $WT --out $OUT --label "$1"; echo "build exit $?"; uptime) > $REC/build-$1.log 2>&1; }
{ date; git -C $WT rev-parse HEAD; shasum -a 256 $FV3 $FV5 $P9; } > $A
build_bp8=1
rv $P9; rv $FV5        # the worktree came up at bp8
ap $FV3; build fv3; rv $FV3
ap $FV5; build fv5
ap $P9; build bp8
echo "BUILDS-DONE $(date)" >> $A
