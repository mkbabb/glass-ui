#!/bin/bash
# cost.sh (D2 pass 8, B′ prototype; obligation 3): pass-2/D2-Bp-probes.mjs --arm pcost,plead, Chromium traced, on bp8 (this
# patch), bp7 (pass 7's B′) and fv5 (floor v5), alternating in one session, three runs each, each a guarded run with the
# CPU renice off (--cpu-cores 0, a timing seat), each started only at a 1-minute load <= MAXLOAD (default 15); waiting past DEADLINE (epoch s) ends it, logged DEFERRED.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p8/Bp-proto; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; AD=$D/pass-3/adapter-floor-v2.mjs; C=$D/pass-8/D2-Bp-proto-records/cost; mkdir -p $C
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
for k in $(seq 1 ${1:-3}); do for b in bp8 bp7 fv5; do
  while [ "$(echo "$(load1) > ${MAXLOAD:-15}" | bc)" = 1 ]; do
    [ "$(date +%s)" -ge "${DEADLINE:-9999999999}" ] && { echo "DEFERRED $(date) cost-$b r$k: the 1-minute load never fell to ${MAXLOAD:-15} before the deadline · $(uptime)" >> $C/done.txt; exit 0; }
    sleep 30; done
  (uptime; ~/.claude/guard/guarded --cpu-cores 0 --timeout 30 -- node $D/pass-2/D2-Bp-probes.mjs --build $OUT/builds/$b --adapter $AD --arm pcost,plead --engine chromium --out $C/cost-$b-chromium-r$k.json; echo "exit $?"; uptime) > $C/cost-$b-chromium-r$k.log 2>&1
done; done
echo COST-DONE >> $C/done.txt
