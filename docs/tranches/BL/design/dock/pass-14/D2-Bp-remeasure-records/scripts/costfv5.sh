#!/bin/bash
# costfv5.sh: fv5 r3 of complete.sh's cost step passed its gate at 10.14 (14:53:34) but was admitted by the guard about 8 min
# later and its cells ran at 24.85-34.83; its one frame over 25 ms (4x40 expand, 28.66) is a red seen only under load. Two
# re-reads of fv5, the load gate (<= 11) checked INSIDE the admitted slot, immediately before the probe starts.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p14/Bp-remeasure; OUT=$B/out; D=$G/docs/tranches/BL/design/dock
AD=$D/pass-3/adapter-floor-v2.mjs; REC=$D/pass-14/D2-Bp-remeasure-records; GD=$HOME/.claude/guard/guarded
L() { echo "$(date '+%F %T') resume-fv5: $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
LK=$B/seat.lock; until mkdir $LK 2>/dev/null; do sleep 5; done; trap 'rmdir $LK 2>/dev/null' EXIT
for k in 4 5; do
  f=$REC/cost/cost-fv5-chromium-r$k
  (uptime; $GD --cpu-cores 0 --timeout 60 -- bash -c 'until [ "$(echo "$(sysctl -n vm.loadavg | awk "{print \$2}") <= 11" | bc)" = 1 ]; do sleep 15; done; echo "in-slot start load $(sysctl -n vm.loadavg | awk "{print \$2}") $(date +%T)"; exec node '"$D/pass-2/D2-Bp-probes.mjs --build $OUT/builds/fv5 --adapter $AD --arm pcost,plead --engine chromium --out $f.json"; echo "exit $?"; uptime) > $f.log 2>&1
  grep -q REFUSED $f.log && { L "GUARD REFUSED fv5 r$k: $(grep -m1 REFUSED $f.log)"; exit 5; }
  L "end cost fv5 r$k: $(grep 'in-slot' $f.log); $(grep '^exit' $f.log)"
done
L "FV5-DONE"
