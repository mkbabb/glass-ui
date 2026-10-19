#!/bin/bash
# build.sh (D2-G critic, pass 5): on the critic's worktree (HEAD + floor-v4.patch + D2-G-proto.patch), build g,
# then fv3 (L1's reference: HEAD + pass-4/floor-v3.patch) by reversing both patches, applying floor v3, building and
# restoring. Each build in its own guarded slot. Output under <out> (inside the worktree).
#   bash build.sh <worktree> <out>
set -u
WT=$1; OUT=$2
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock; H=$D/harness; C=$D/pass-5/D2-G-crit-records
G="$HOME/.claude/guard/guarded --timeout 90 --"
FV4=$D/pass-5/floor-v4.patch; GP=$D/pass-5/D2-G-proto.patch; FV3=$D/pass-4/floor-v3.patch
(shasum -a 256 $FV4 $GP $FV3; git -C $WT rev-parse HEAD) > $C/apply.log
(uptime; $G node $H/build.mjs $WT --out $OUT --label g; echo "build exit $?"; uptime) > $C/build-g.log 2>&1
cd $WT
git apply -R $GP && git apply -R $FV4 && git apply $FV3 && echo "tree now fv3" >> $C/apply.log
(uptime; $G node $H/build.mjs $WT --out $OUT --label fv3; echo "build exit $?"; uptime) > $C/build-fv3.log 2>&1
git apply -R $FV3 && git apply $FV4 && git apply $GP && echo "tree restored to g" >> $C/apply.log
git status --porcelain --untracked-files=no | wc -l >> $C/apply.log
echo BUILDS-DONE >> $C/apply.log
