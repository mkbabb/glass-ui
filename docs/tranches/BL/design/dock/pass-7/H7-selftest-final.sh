#!/bin/bash
# H7 · entry 2 of the self-test: FM and FMB re-run on the final holePaint (lib.mjs sha256 2dd81a2a…, after the unread-frame
# cure of §2.1), both engines, each in one guarded slot (WebKit under --exclusive webkit), run after the baseline chain.
#   bash H7-selftest-final.sh chromium|webkit
set -u
E=$1
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p7/H7; OUT=$B/out/selftest2-$E
D=$G/docs/tranches/BL/design/dock; H=$D/harness; REC=$D/pass-7/H7-records; mkdir -p $REC $OUT
AD=$D/pass-3/adapter-floor-v2.mjs
X=""; [ "$E" = webkit ] && X="--exclusive webkit"
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/selftest-slots.log; }
L "queue final $E"
$HOME/.claude/guard/guarded $X --timeout 60 -- bash -c "
  echo \"\$(date '+%F %T') admitted final $E · \$(uptime | sed 's/.*load/load/')\" >> $REC/selftest-slots.log
  shasum -a 256 $H/lib.mjs > $REC/selftest-final-$E-FM+FMB.log
  node $H/selftest.mjs --engine $E --only FM,FMB --bp $B/out/builds/bp --bp-adapter $AD --out $OUT >> $REC/selftest-final-$E-FM+FMB.log 2>&1
  cp $OUT/selftest-$E-FM+FMB.json $REC/selftest-final-$E-FM+FMB.json 2>/dev/null
  true"
L "end final $E exit $?"
