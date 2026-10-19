#!/bin/bash
# f7.sh (D2-G critic): F7 (harness/f7.mjs, H5-10) and PR (prose.mjs, H5-8) on the g tree.
#   bash f7.sh <worktree> <out>
set -u
WT=$1; OUT=$2
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock; H=$D/harness; C=$D/pass-5/D2-G-crit-records
(uptime; ~/.claude/guard/guarded --timeout 90 -- node $H/f7.mjs $WT --out $OUT/f7-g; echo "exit $?"; uptime) > $C/F7-g.log 2>&1
mkdir -p $C/F7-g; cp $OUT/f7-g/runs/*/* $C/F7-g/ 2>/dev/null
(uptime; node $H/prose.mjs $WT --out $OUT/pr-g; echo "exit $?"; uptime) > $C/PR-g.log 2>&1
mkdir -p $C/PR-g; cp $OUT/pr-g/runs/*/PR.json $C/PR-g/ 2>/dev/null
echo F7-DONE >> $C/F7-g.log
