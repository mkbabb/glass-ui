#!/bin/bash
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p8/Bp-proto; O=$B/out; R=$O/rec
H=$G/docs/tranches/BL/design/dock/harness
for x in "bp7 $B/wt" "fv5 $B/ref5" "fv3 $B/ref3"; do set -- $x
  (uptime; ~/.claude/guard/guarded --timeout 30 -- node $H/build.mjs $2 --out $O --label $1; echo "build exit $?"; uptime) > $R/build-$1.log 2>&1
done
echo BUILDS-DONE >> $R/build-bp7.log
