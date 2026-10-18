#!/usr/bin/env bash
# D3-crit-run2.sh · D3 pass 8 critic, the one WebKit check: the owed-WebKit seat's Close-ring records read against
# fresh raw pixels (WK-run.sh's raw captures were removed with its worktree). Floor v7's specimen (built by
# D3-crit-run.sh `same`, CSS sha256 347288745da7cf97) is captured in Playwright WebKit, dialog scene, both themes,
# one browser for the run (capture.mjs closes it in its finally, fresh context per cell). Witnesses run --light.
#   ~/.claude/guard/guarded --exclusive webkit --timeout 60 -- bash D3-crit-run2.sh wk-dlg
#   ~/.claude/guard/guarded --light --timeout 20 -- bash D3-crit-run2.sh dlg-read
set -u
R=/Users/mkbabb/Programming/glass-ui
W=$R/.claude/worktrees/bl/D3/p8/crit/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
REC=$M/pass-8/crit-records
D3_OUT=$W/.d3out
export D3_OUT
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
phase=$1
echo "== $phase start $(ts)" | tee -a "$REC/phases.log"
case $phase in
wk-dlg)
  node "$H/capture.mjs" "$D3_OUT/same/fv7/dist" --out "$D3_OUT/caps/fv7-dlg-webkit" --engines webkit --themes light,dark --scenes dialog > "$REC/cap-fv7-dlg-webkit.log" 2>&1
  echo "capture fv7 dialog webkit exit $? $(ts)" | tee -a "$REC/phases.log"
  grep -h "retired\|STALL\|captured\|crash" "$REC/cap-fv7-dlg-webkit.log" | tail -3
  ;;
dlg-read)
  C=$D3_OUT/caps/fv7-dlg-webkit
  node "$H/m3-non-text.mjs" "$C" --gate webkit --verbose --cells "dialog$" > "$REC/m3-fv7-dlg-webkit.txt" 2>&1; echo "M-3 fv7 dialog webkit: $(tail -1 "$REC/m3-fv7-dlg-webkit.txt")"
  grep -E "dialog·ring:close" "$REC/m3-fv7-dlg-webkit.txt" | sort | uniq -c
  node "$M/pass-7/crit-ringpx.mjs" "$C" --engine webkit > "$REC/ringpx-fv7-dlg-webkit.log" 2>&1; echo "ringpx exit $?"
  grep -E "^RING webkit (light|dark) (paper|black)" "$REC/ringpx-fv7-dlg-webkit.log"
  diff <(grep -E "dialog·ring:close" "$REC/m3-fv7-dlg-webkit.txt") <(grep -E "dialog·ring:close" "$M/pass-8/WK-records/verbose/m3-fv7-dlg-webkit.txt") > /dev/null; echo "Close-ring rows, crit vs WK seat: diff exit $?"
  diff <(grep -E "^RING" "$REC/ringpx-fv7-dlg-webkit.log") <(grep -E "^RING" "$M/pass-8/WK-records/ringpx-fv7-dlg-webkit.log") > /dev/null; echo "ringpx RING rows, crit vs WK seat: diff exit $?"
  ;;
esac
echo "== $phase end $(ts)" | tee -a "$REC/phases.log"
