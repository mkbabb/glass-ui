#!/bin/bash
# H7 · self-test of H7-1..H7-3 per engine, each group in one guarded slot (WebKit under --exclusive webkit).
#   bash H7-selftest.sh chromium|webkit
# Groups: ST, FM and FMB (B′ as the hole's build plant, light and dark); W3's pass fixture (the DOM hole struck); and, once
# (chromium), the engine-independent SYN (digest) and RUN (runner) plants.
set -u
E=$1
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p7/H7; OUT=$B/out/selftest-$E
D=$G/docs/tranches/BL/design/dock; H=$D/harness; REC=$D/pass-7/H7-records; mkdir -p $REC $OUT
AD=$D/pass-3/adapter-floor-v2.mjs
X=""; [ "$E" = webkit ] && X="--exclusive webkit"
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/selftest-slots.log; }
L "queue $E"
$HOME/.claude/guard/guarded $X --timeout 90 -- bash -c "
  echo \"\$(date '+%F %T') admitted $E · \$(uptime | sed 's/.*load/load/')\" >> $REC/selftest-slots.log
  node $H/selftest.mjs --engine $E --only ST,FM,FMB --bp $B/out/builds/bp --bp-adapter $AD --out $OUT > $REC/selftest-$E-ST+FM+FMB.log 2>&1
  node $H/selftest.mjs --engine $E --only W3 --faults pass --out $OUT > $REC/selftest-$E-W3-pass.log 2>&1
  [ $E = chromium ] && node $H/selftest.mjs --only SYN,RUN --out $OUT > $REC/selftest-source-SYN+RUN.log 2>&1
  cp $OUT/selftest-*.json $REC/ 2>/dev/null
  true"
L "end $E exit $?"
