#!/bin/bash
# build.sh (D2 pass 14, RE-MEASURE seat of D2-B′, REGISTRY §P13-7.3 item 1; after the pass-13 critic's build.sh): every build
# this seat reads, each guarded, one at a time, in the seat worktree detached at 392ff1e3c. Arms staged with `git apply` only
# (--check first), no commit.
#   fv3  = base + pass-4/floor-v3.patch (L1)        fv5 = base + pass-6/floor-v5.patch (cost)
#   bp12 = fv5 + pass-12/D2-Bp-p12.patch (5318a3dc…), the reference arm      bp13 = fv5 + pass-13/D2-Bp-p13.patch (bb7cb08d…)
# The worktree enters at the base and leaves at bp13 (F7, PR and the boot graph read it there).
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p14/Bp-remeasure; WT=$B/wt; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; REC=$D/pass-14/D2-Bp-remeasure-records
FV3=$D/pass-4/floor-v3.patch; FV5=$D/pass-6/floor-v5.patch; P12=$D/pass-12/D2-Bp-p12.patch; P13=$D/pass-13/D2-Bp-p13.patch
GD="$HOME/.claude/guard/guarded --timeout 30 --"; A=$REC/apply.log
ap() { (cd $WT && git apply --check "$1" && git apply "$1") >> $A 2>&1 && echo "applied $(basename $1)" >> $A || { echo "APPLY FAILED $1" >> $A; exit 1; }; }
rv() { (cd $WT && git apply -R "$1") >> $A 2>&1 && echo "reversed $(basename $1)" >> $A || { echo "REVERSE FAILED $1" >> $A; exit 1; }; }
build() { (uptime; df -h /System/Volumes/Data | tail -1; $GD node $H/build.mjs $WT --out $OUT --label "$1"; echo "build exit $?"; uptime) > $REC/build-$1.log 2>&1; echo "built $1: $(grep 'build exit' $REC/build-$1.log) $(date '+%T')" >> $A; }
{ date; echo "HEAD $(git -C $WT rev-parse HEAD)"; shasum -a 256 $FV3 $FV5 $P12 $P13; df -h /System/Volumes/Data | tail -1; } > $A
ap $FV3; build fv3; rv $FV3
ap $FV5; build fv5
ap $P12; build bp12
rv $P12; ap $P13
echo "numstat p13 over fv5: $(cd $WT && git diff --numstat | wc -l | tr -d ' ') paths" >> $A
build bp13
echo "dirty files at bp13: $(git -C $WT status --porcelain --untracked-files=no | wc -l | tr -d ' ')" >> $A
for b in bp12 bp13; do echo "scene chunk $b: $(ls -l $OUT/builds/$b/demo/assets/useDockScene-*.js 2>/dev/null | awk '{print $5, $9}')" >> $A; done
echo "BUILDS-DONE $(date)" >> $A
