#!/bin/bash
# build.sh (D2-B′ critic, pass 5): on the critic's worktree (HEAD + floor-v4.patch + D2-Bp-proto.patch applied),
# build bp, run F7 (harness/f7.mjs) and PR (prose.mjs); then build fv3 (L1's reference: HEAD + pass-4/floor-v3.patch)
# by reversing both patches, applying floor v3, building, and restoring. Every build/suite in its own guarded slot.
#   bash build.sh <worktree> <out>
set -u
WT=$1; OUT=$2
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock; H=$D/harness; C=$D/pass-5/D2-Bp-crit-records
G="$HOME/.claude/guard/guarded --timeout 90 --"
FV4=$D/pass-5/floor-v4.patch; BP=$D/pass-5/D2-Bp-proto.patch; FV3=$D/pass-4/floor-v3.patch
shasum -a 256 $FV4 $BP $FV3 > $C/apply.log
(uptime; $G node $H/build.mjs $WT --out $OUT --label bp; echo "build exit $?"; uptime) > $C/build-bp.log 2>&1
(uptime; $G node $H/f7.mjs $WT --out $OUT/f7-bp; echo "exit $?"; uptime) > $C/F7-bp.log 2>&1
mkdir -p $C/F7-bp; cp $OUT/f7-bp/runs/F7-wt/* $C/F7-bp/ 2>/dev/null
(uptime; node $H/prose.mjs $WT --out $OUT/pr-bp; echo "exit $?"; uptime) > $C/PR-bp.log 2>&1
mkdir -p $C/PR-bp; cp $OUT/pr-bp/runs/*/PR.json $C/PR-bp/ 2>/dev/null
cd $WT
git apply -R $BP && git apply -R $FV4 && git apply $FV3 && echo "tree now fv3" >> $C/apply.log
(uptime; $G node $H/build.mjs $WT --out $OUT --label fv3; echo "build exit $?"; uptime) > $C/build-fv3.log 2>&1
git apply -R $FV3 && git apply $FV4 && git apply $BP && echo "tree restored to bp" >> $C/apply.log
git status --porcelain --untracked-files=no | wc -l >> $C/apply.log
echo BUILDS-DONE >> $C/apply.log
