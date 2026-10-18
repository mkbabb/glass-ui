#!/usr/bin/env bash
# WK-run2.sh · D3 pass 8, the owed-WebKit seat: phases written while WK-run.sh's wk-drift admission was running (a seat
# never edits a script a running phase reads; REGISTRY P7-5). Same worktree, same records.
#   ~/.claude/guard/guarded --light --timeout 10 -- bash WK-run2.sh ringplant-read
set -u
R=/Users/mkbabb/Programming/glass-ui
W=$R/.claude/worktrees/bl/D3/p8/wk/wt
M=$R/docs/tranches/BL/design/material
H=$M/harness
REC=$M/pass-8/WK-records
export D3_OUT=$W/.d3out
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
phase=$1
echo "== $phase start $(ts) (run2)" | tee -a "$REC/phases.log"
case $phase in
ringplant-read)
  # R-14's two real-paint ring plants under M-3 itself. m3-non-text.mjs reads only variant `base`, and capture.mjs labels
  # these captures `ring040` / `ring1px`, so M-3 on them prints 14 of 14 `MISSING … not captured` (here and in the pass-7
  # critic's Chromium files). A copy of each capdir is relabelled `base` in cells.json (FV2/FV3-plants.mjs's relabel; the
  # PNG paths in cells.json are unchanged) and M-3 reads that copy.
  e=webkit
  for v in ring040 ring1px; do
    s=$D3_OUT/caps/fv7-$v-$e; d=$D3_OUT/caps/fv7-$v-$e-asbase; rm -rf "$d"; cp -R "$s" "$d"
    node -e 'const fs=require("fs"),f=process.argv[1]+"/cells.json",d=JSON.parse(fs.readFileSync(f,"utf8"));let n=0;for(const k of ["cells","live","motion","drift"])for(const c of d[k]||[]){c.variant="base";n++}fs.writeFileSync(f,JSON.stringify(d,null,1));console.log("relabelled",n)' "$d"
    node "$H/m3-non-text.mjs" "$d" --gate $e --verbose --cells "dialog$" > "$REC/verbose/m3-fv7-$v-$e-asbase.txt" 2>&1
    echo "M-3 fv7 $v $e (relabelled base): $(tail -1 "$REC/verbose/m3-fv7-$v-$e-asbase.txt") · MISSING $(grep -c MISSING "$REC/verbose/m3-fv7-$v-$e-asbase.txt")"
    grep -E "dialog·ring:close" "$REC/verbose/m3-fv7-$v-$e-asbase.txt" | sort | uniq -c | sed 's/^/    /'
  done
  ;;
wk-rerun-minor-dark)
  # The minor v6's dark Close-ring reds (wk-rings saw them once), re-captured twice: the dialog scene, dark, Playwright
  # WebKit. Its own --exclusive webkit admission.
  e=webkit
  for k in 1 2; do
    node "$H/capture.mjs" "$D3_OUT/builds/minor6/dist" --out "$D3_OUT/caps/rerun-minor6-dark-$e$k" --engines $e --themes dark --scenes dialog > "$REC/cap-rerun-minor6-dark-$e$k.log" 2>&1; echo "rerun minor6 dark $k exit $? $(ts)"
    grep -h "captured\|retired\|STALL" "$REC/cap-rerun-minor6-dark-$e$k.log" | sed 's/^/  /'
  done
  ;;
rerun-minor-dark-read)
  e=webkit
  for k in 1 2; do
    node "$H/m3-non-text.mjs" "$D3_OUT/caps/rerun-minor6-dark-$e$k" --gate $e --verbose --cells "dialog$" > "$REC/verbose/m3-rerun-minor6-dark-$e$k.txt" 2>&1
    echo "rerun minor6 dark $k M-3: $(tail -1 "$REC/verbose/m3-rerun-minor6-dark-$e$k.txt") · MISSING $(grep -c MISSING "$REC/verbose/m3-rerun-minor6-dark-$e$k.txt")"
    grep -E "dark [a-z0-9]+ dialog:" "$REC/verbose/m3-rerun-minor6-dark-$e$k.txt" | sed 's/^/    /'
  done
  for k in 1 2; do diff <(grep -E "webkit\+shim dark .* dialog:|·(ring|perimeter):" "$REC/verbose/m3-minor6-dlg-$e.txt" | grep -A3 "dark" | grep -E "dark|·") <(grep -E "webkit\+shim dark .* dialog:|·(ring|perimeter):" "$REC/verbose/m3-rerun-minor6-dark-$e$k.txt" | grep -A3 "dark" | grep -E "dark|·") > /dev/null; echo "wk-rings dark rows vs re-run $k: diff exit $?"; done
  ;;
esac
echo "== $phase end $(ts) (run2)" | tee -a "$REC/phases.log"
