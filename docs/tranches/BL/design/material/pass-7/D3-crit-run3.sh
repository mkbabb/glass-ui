#!/usr/bin/env bash
# D3-crit-run3.sh · D3 pass 7, the critic: phases written while D3-crit-run2.sh was running (never edit a running script).
#   ~/.claude/guard/guarded --timeout 60 -- bash D3-crit-run3.sh fl14-held      (Chromium)
#   ~/.claude/guard/guarded --light --timeout 10 -- bash D3-crit-run3.sh fl14-held-read
set -u
R=/Users/mkbabb/Programming/glass-ui
W=$R/.claude/worktrees/bl/D3/p7/crit/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
REC=$M/pass-7/crit-records
export D3_OUT=$W/.d3out
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
phase=$1
echo "== $phase start $(ts) (run3)" | tee -a "$REC/phases.log"
case $phase in
fl14-held)
  # FL-14's dark held move (fl14-pxdiff.log: dark held over aurora, black, white differ), re-captured twice with FL-14 on
  # and twice off, so a move that is press timing shows as run-to-run spread and a move that is FL-14 does not.
  for n in 1 2; do
    node "$H/capture.mjs" "$D3_OUT/builds/minor5/dist" --out "$D3_OUT/caps/fl14h-on$n" --engines chromium --themes dark --scenes held --grounds black,white,aurora,paper > "$REC/cap-fl14h-on$n.log" 2>&1; echo "on $n exit $? $(ts)"
    node "$H/capture.mjs" "$D3_OUT/builds/minor5/dist" --out "$D3_OUT/caps/fl14h-off$n" --engines chromium --themes dark --scenes held --grounds black,white,aurora,paper --inject "$M/pass-6/MS4-variants/nofl14.css" > "$REC/cap-fl14h-off$n.log" 2>&1; echo "off $n exit $? $(ts)"
  done
  ;;
fl14-held-read)
  for c in fl14h-on1 fl14h-on2 fl14h-off1 fl14h-off2; do
    node "$H/m3-non-text.mjs" "$D3_OUT/caps/$c" --gate chromium --verbose > "$REC/verbose/m3-$c.txt" 2>&1
    node "$H/m2-text-contrast.mjs" "$D3_OUT/caps/$c" --gate chromium --verbose > "$REC/verbose/m2-$c.txt" 2>&1
    echo "$c: $(grep -E 'dark (black|white|aurora|paper) held: perimeter' "$REC/verbose/m3-$c.txt" | sed 's/^ *chromium //; s/ · ring.*//' | tr '\n' ';')"
  done
  node "$M/pass-7/crit-pxdiff.mjs" "$D3_OUT/caps/fl14h-on1" "$D3_OUT/caps/fl14h-on2" > "$REC/fl14h-pxdiff-on1-on2.log"; echo "on1 vs on2: $(tail -1 "$REC/fl14h-pxdiff-on1-on2.log")"
  node "$M/pass-7/crit-pxdiff.mjs" "$D3_OUT/caps/fl14h-off1" "$D3_OUT/caps/fl14h-off2" > "$REC/fl14h-pxdiff-off1-off2.log"; echo "off1 vs off2: $(tail -1 "$REC/fl14h-pxdiff-off1-off2.log")"
  node "$M/pass-7/crit-pxdiff.mjs" "$D3_OUT/caps/fl14h-off1" "$D3_OUT/caps/fl14h-on1" > "$REC/fl14h-pxdiff-off1-on1.log"; echo "off1 vs on1: $(tail -1 "$REC/fl14h-pxdiff-off1-on1.log")"
  grep -E "full.png" "$REC/fl14h-pxdiff-off1-on1.log" "$REC/fl14h-pxdiff-on1-on2.log" | sed "s#$REC/##" | cut -c1-160
  ;;
esac
echo "== $phase end $(ts) (run3)" | tee -a "$REC/phases.log"
