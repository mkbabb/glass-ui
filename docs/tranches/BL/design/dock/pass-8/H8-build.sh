#!/bin/bash
# H8 · the two builds the H8 baseline reads, in the seat worktree: fv3 (L1's reference: HEAD + pass-4/floor-v3.patch) and
# bp (pass 7's B′: HEAD + pass-6/floor-v5.patch + pass-7/D2-Bp-proto.patch). Each build guarded.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p8/H8; WT=$B/wt; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; REC=$D/pass-8/H8-records
FV3=$D/pass-4/floor-v3.patch; FV5=$D/pass-6/floor-v5.patch; BP=$D/pass-7/D2-Bp-proto.patch
GD="$HOME/.claude/guard/guarded --timeout 60 --"
mkdir -p $REC
ap() { (cd $WT && git apply "$1") >> $REC/apply.log 2>&1 && echo "applied $(basename $(dirname $1))/$(basename $1)" >> $REC/apply.log; }
rv() { (cd $WT && git apply -R "$1") >> $REC/apply.log 2>&1 && echo "reversed $(basename $(dirname $1))/$(basename $1)" >> $REC/apply.log; }
build() { (uptime; $GD node $H/build.mjs $WT --out $OUT --label "$1"; echo "build exit $?"; uptime) > $REC/build-$1.log 2>&1; }
{ git -C $WT rev-parse HEAD; shasum -a 256 $FV3 $FV5 $BP; } >> $REC/apply.log
ap $FV3 && build fv3; rv $FV3
ap $FV5 && ap $BP && build bp
echo "dirty files after bp: $(git -C $WT status --porcelain --untracked-files=no | wc -l)" >> $REC/apply.log
echo "BUILDS-DONE $(date)" >> $REC/apply.log
