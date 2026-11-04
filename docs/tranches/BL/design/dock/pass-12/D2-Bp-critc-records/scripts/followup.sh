#!/bin/bash
# followup.sh (D2 pass 12, COMPLETION CRITIC, after the orphaned chain.sh ended): two attribution A/Bs for the two reds the
# chain's readings drew on bp12. Readings only: neither turns a row (the digest rules the rows), and neither is minted as one.
#   F1  Chromium, W3 `reversal` (+ control), bp12 / bp10 alternating, 8 rounds per theme, each read started at load <= 11
#       (no timeout). The battery's C·l [stub] at "n" 886.9 px, +116.7 ms (main 11.81, re-run 1 9.79): is it bp12's?
#   F2  Playwright WebKit dark, swrev.mjs --at 40 --then 0,16,32,64, bp12 / bp10 alternating, 4 rounds of 2 runs, each read
#       started at load <= 11, in one --exclusive webkit slot. The swrev W·d splice s7|s8 at rev 40 then 32 / 64 (bp12 2 of 40).
# One heavy run at a time: waits for the chain's PID to exit first. Every run guarded; WebKit queued, never cancelled.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p12c/Bp-crit; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
REC=$D/pass-12/D2-Bp-critc-records; F=$REC/followup; GD=$HOME/.claude/guard/guarded; C11=$D/pass-11/D2-Bp-crit-records/scripts
mkdir -p $F/rev $F/swrev
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $F/followup.log; }
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
okl() { [ "$(echo "$(load1) <= 11" | bc)" = 1 ]; }
while kill -0 54942 2>/dev/null; do sleep 30; done
L "START (chain 54942 gone)"
if [ "${SKIP_F1:-}" != 1 ]; then
for t in light dark; do TE=""; [ $t = dark ] && TE="env DOCK_HARNESS_THEME=dark"
  for k in 1 2 3 4 5 6 7 8; do for b in bp12 bp10; do
    until okl; do sleep 10; done
    o=$OUT/fu-rev/$t-$b-r$k
    (uptime; $GD --timeout 15 -- $TE node $H/w3-morph.mjs --build $OUT/builds/$b --adapter $AD --engine chromium --cells '^reversal(·control)?$' --out $o; echo "exit $?"; uptime) > $F/rev/w3rev-chromium-$t-$b-r$k.log 2>&1
    j=$(find $o -name W3.json | head -1); [ -n "$j" ] && cp $j $F/rev/w3rev-chromium-$t-$b-r$k.json
  done; done
  L "end F1 $t"
done
fi
export OUT AD F C11 D
export -f load1 okl
L "queue F2 webkit dark"
$GD --exclusive webkit --timeout 60 -- bash -c '
  echo "admitted F2 $(date "+%F %T") · $(uptime)"
  for k in 1 2 3 4; do for b in bp12 bp10; do
    until okl; do sleep 10; done
    (uptime; node $C11/swrev.mjs --build $OUT/builds/$b --adapter $AD --engine webkit --theme dark --at 40 --then 0,16,32,64 --runs 2 --json $F/swrev/$b-webkit-dark-r$k.json; echo "exit $?"; uptime) > $F/swrev/$b-webkit-dark-r$k.log 2>&1
  done; done
  echo "F2 end $(date "+%F %T") · $(uptime)"' > $F/f2-slot.log 2>&1
L "end F2 exit $?"
L "FOLLOWUP-DONE"
