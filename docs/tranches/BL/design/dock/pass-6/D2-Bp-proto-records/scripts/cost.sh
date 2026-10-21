#!/bin/bash
# cost.sh (D2 pass 6, B′ prototype; obligation 6): the cost arm of pass 5 (pass-2/D2-Bp-probes.mjs --arm pcost,plead),
# Chromium traced, 1x and 4x throttle, 0-40 seats, on `bp` (this seat) and `fv5` (floor v5, FLOOR-V5's build), three
# runs each, alternating builds, each a guarded run with the CPU renice off (--cpu-cores 0, a timing seat). A run
# starts only when the 1-minute load is <= MAXLOAD (default 15); it waits otherwise.   bash cost.sh [runs]
set -u
B=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p6/Bp-proto; OUT=$B/out; C=$OUT/rec/cost; mkdir -p $C
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock; AD=$D/pass-3/adapter-floor-v2.mjs
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
for k in $(seq 1 ${1:-3}); do for b in bp fv5; do
  while [ "$(echo "$(load1) > ${MAXLOAD:-15}" | bc)" = 1 ]; do sleep 30; done
  (uptime; ~/.claude/guard/guarded --cpu-cores 0 --timeout 30 -- node $D/pass-2/D2-Bp-probes.mjs --build $OUT/builds/$b --adapter $AD --arm pcost,plead --engine chromium --out $C/cost-$b-chromium-r$k.json; echo "exit $?"; uptime) > $C/cost-$b-chromium-r$k.log 2>&1
done; done
echo COST-DONE >> $C/done.txt
