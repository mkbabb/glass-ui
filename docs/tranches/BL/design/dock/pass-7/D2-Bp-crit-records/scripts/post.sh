#!/bin/bash
# post.sh (D2 pass 7, B′ critic): after the battery, one heavy run at a time: F7 on the seat tree (bp), the boot graph,
# PR (source-only, --light), then cost (pass-2/D2-Bp-probes.mjs --arm pcost,plead, Chromium traced) on bp and bp6
# (pass 6's B′) and fv5, alternating, three runs each, each started at a 1-minute load <= 15, --cpu-cores 0 (timing seat).
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p7/Bp-crit; O=$B/out; WT=$B/wt
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs; R=$D/pass-7/D2-Bp-crit-records
GD=$HOME/.claude/guard/guarded; mkdir -p $R/F7-bp $R/PR-bp $R/cost
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $R/post.log; }
if [ -z "${SKIP_F7:-}" ]; then
L "start F7"; (uptime; $GD --timeout 60 -- node $H/f7.mjs $WT --out $O/f7; echo "exit $?"; uptime) > $R/F7-bp/F7.log 2>&1
find $O/f7 -name F7.json -exec cp {} $R/F7-bp/F7.json \;
(cd $WT && node $R/scripts/bg.mjs dist-demo) > $R/F7-bp/boot-graph.txt 2>&1; L "end F7"
L "start PR"; (uptime; $GD --light --timeout 10 -- node $H/prose.mjs $WT --out $O/pr; echo "exit $?"; uptime) > $R/PR-bp/PR.log 2>&1
find $O/pr -name PR.json -exec cp {} $R/PR-bp/PR.json \; ; L "end PR"
fi
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
for k in $(seq 1 ${RUNS:-3}); do for b in bp bp6 fv5; do
  while [ "$(echo "$(load1) > ${MAXLOAD:-15}" | bc)" = 1 ]; do sleep 30; done
  L "cost $b r$k"
  (uptime; $GD --cpu-cores 0 --timeout 30 -- node $D/pass-2/D2-Bp-probes.mjs --build $O/builds/$b --adapter $AD --arm pcost,plead --engine chromium --out $R/cost/cost-$b-chromium-r$k.json; echo "exit $?"; uptime) > $R/cost/cost-$b-chromium-r$k.log 2>&1
done; done
L "POST-DONE"
