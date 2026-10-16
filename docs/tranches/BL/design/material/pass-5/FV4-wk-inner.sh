#!/usr/bin/env bash
# FV4-wk-inner.sh · the WebKit work of floor v4 under ONE `guarded --exclusive webkit` admission (the lock queue held the
# battery 33 min; queuing each item separately would multiply that). Run as:
#   ~/.claude/guard/guarded --timeout 90 --exclusive webkit -- bash FV4-wk-inner.sh
# (1) FV4-hover-probe.mjs in Playwright WebKit on floor v4 and on the R-4-as-built plant; (2) every Playwright WebKit red
# cell re-captured twice (M-3 light checker, M-8 dark stripes, M-6), its witnesses re-read.
set -u
R=/Users/mkbabb/Programming/glass-ui; B=$R/.claude/worktrees/bl/D3/p5/floor4; W=$B/wt
M=$R/docs/tranches/BL/design/material; H=$M/harness; P5=$M/pass-5; REC=$P5/FV4-records
export D3_OUT=$W/.d3out
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
echo "admitted $(ts)"
for v in "fv4 $W" "r4 $B/scratch/plant-r4"; do set -- $v
  node "$P5/FV4-hover-probe.mjs" "$2" --label "$1" --skip-build --engines webkit --shot "$D3_OUT/shots" --out "$REC/hover-$1-webkit.json" > "$REC/hover-$1-webkit.log" 2>&1
  echo "probe $1 webkit exit $? $(ts)"; grep -E "^POINTER|^PARKED|^BARE" "$REC/hover-$1-webkit.log"
done
for n in 1 2; do
  node "$H/capture.mjs" "$D3_OUT/builds/fv4/dist" --out "$D3_OUT/caps/rerun-webkit$n" --engines webkit --scenes ladder,dialog --grounds checker,stripes,paper > "$REC/rerun-webkit$n-capture.log" 2>&1
  echo "capture webkit $n exit $? $(ts)"
  for w in m3-non-text m8-chrome-calm m6-separable-ladder; do node "$H/$w.mjs" "$D3_OUT/caps/rerun-webkit$n" --gate webkit > "$REC/rerun-webkit$n-$w.log" 2>&1; echo "rerun webkit $n $w $(ts): $(tail -1 "$REC/rerun-webkit$n-$w.log")"; done
done
echo "done $(ts)"
