#!/bin/bash
# trace.sh (D2 pass 12, BUILDER, §P11-7.3 items 1 and 3): the lane trace, bp10t and bp8t alternating, in one guarded slot per engine
# (Playwright WebKit under --exclusive webkit, queued, never cancelled). Each read started at 1-min load <= 11 after a wait of at most
# 180 s (Chromium) / 60 s (WebKit). ROUNDS rounds; both themes; scenes morph and swap.
#   E=<engine> ROUNDS=<n> bash trace.sh
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p12/Bp-build; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; AD=$D/pass-3/adapter-floor-v2.mjs; R=$D/pass-12/D2-Bp-build-records; S=$R/scripts
mkdir -p $R/trace
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
softload() { local t0=$SECONDS; while [ "$(echo "$(load1) > $1" | bc)" = 1 ] && [ $((SECONDS - t0)) -lt ${2:-180} ]; do sleep 10; done; }
SOFT=180; [ $E = webkit ] && SOFT=60
echo "trace $E admitted $(date '+%F %T') · $(uptime)"
for t in light dark; do for sc in ${SCENES:-morph swap}; do for k in $(seq 1 $ROUNDS); do for b in bp10t bp8t; do
  softload 11 $SOFT
  TH=""; [ $t = dark ] && TH="--theme dark"
  echo "$(date '+%T') $E $t $sc $b r$k start load $(load1)"
  node $S/lanes.mjs --build $OUT/builds/$b --adapter $AD --engine $E $TH --runs 1 --scene $sc --json $R/trace/$sc-$E-$t-$b-r$k.json 2>&1 | tail -3
done; done; done; done
echo "trace $E end $(date '+%F %T') · $(uptime)"
