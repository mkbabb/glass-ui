#!/bin/bash
# build.sh (D2 pass 7, B′ prototype): the three builds the seat reads: bp (the seat worktree: HEAD + floor v5 + this
# patch), fv3 (HEAD + pass-4/floor-v3.patch, L1's reference) and fv5 (HEAD + pass-6/floor-v5.patch, the cost reference),
# each guarded, outputs under the seat's out/builds.
set -u
B=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p7/Bp-proto; O=$B/out; R=$O/rec
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness; mkdir -p $R
for x in "bp $B/wt" "fv3 $B/ref3" "fv5 $B/ref5"; do set -- $x
  (uptime; ~/.claude/guard/guarded --timeout 30 -- node $H/build.mjs $2 --out $O --label $1; echo "build exit $?"; uptime) > $R/build-$1.log 2>&1
done
echo BUILDS-DONE >> $R/build-bp.log
