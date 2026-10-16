#!/usr/bin/env bash
# MS2-attrib.sh · D3 pass 4, minor split v2: attribute the two dark readings that move from HEAD (G6 dark dock over the
# dark page ΔE 0.0038; G7 dark Dialog fg over white p05 4.51 → 4.46) to W-0.11's values, by putting 10.1.0's dark shadow
# tokens, then 10.1.0's blur ladder, back over the minor v2 build as injections. Chromium, dark, paper and white.
set -u
R=/Users/mkbabb/Programming/glass-ui; W=$R/.claude/worktrees/bl/D3/p4/minor2/wt; M=$R/docs/tranches/BL/design/material
H=$M/harness; P3=$M/pass-3; P4=$M/pass-4; REC=$P4/MS2-records; export D3_OUT=$W/.d3out
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
GC="$HOME/.claude/guard/guarded --timeout 40 --"; [ -n "${MS2_INNER:-}" ] && GC=""
for v in ${MS2_VARIANTS:-dark-head-shadow dark-head-blur}; do
  $GC node "$H/capture.mjs" "$D3_OUT/builds/minor2/dist" --out "$D3_OUT/caps/minor2-$v" --engines chromium --themes dark \
    --grounds paper,white --scenes ladder,dialog --inject "$P4/MS2-variants/$v.css" > "$REC/attrib-$v-capture.log" 2>&1
  echo "capture $v exit $? $(ts)"
  node "$H/m2-text-contrast.mjs" "$D3_OUT/caps/minor2-$v" --gate chromium --verbose > "$REC/verbose/m2-minor2-$v.txt" 2>&1
  node "$H/m6-separable-ladder.mjs" "$D3_OUT/caps/minor2-$v" --gate chromium --verbose > "$REC/verbose/m6-minor2-$v.txt" 2>&1
  echo "-- $v against HEAD:"; node "$P3/MS-g7.mjs" m2 "$REC/verbose/m2-head.txt" "$REC/verbose/m2-minor2-$v.txt" | grep -E "dark white dialog|^G7"
  node "$P3/MS-g7.mjs" dark "$REC/verbose/m6-head.txt" "$REC/verbose/m6-minor2-$v.txt" | tail -3
done
[ -n "${MS2_SKIP_RERUN:-}" ] && exit 0
# The red cells re-captured twice on the minor v2 build (the machine law: a red seen only under load is NOT-REPRODUCED):
# the dark paper/white ladder and dialog (G6 dock, G7 Dialog), the light black ladder and held cells (M-3 wells, M-2h).
for n in 1 2; do
  $GC node "$H/capture.mjs" "$D3_OUT/builds/minor2/dist" --out "$D3_OUT/caps/minor2-rerun$n" --engines chromium --themes light,dark \
    --grounds paper,white,black,aurora --scenes ladder,dialog,held > "$REC/rerun$n-capture.log" 2>&1
  echo "rerun $n capture exit $? $(ts)"
  for w in m2-text-contrast:m2 m3-non-text:m3 m6-separable-ladder:m6 m2-held-window:m2h; do
    node "$H/${w%%:*}.mjs" "$D3_OUT/caps/minor2-rerun$n" --gate chromium --verbose > "$REC/verbose/${w##*:}-minor2-rerun$n.txt" 2>&1; done
  node "$P3/MS-g7.mjs" m2 "$REC/verbose/m2-head.txt" "$REC/verbose/m2-minor2-rerun$n.txt" | grep -E "dark white dialog|^G7"
  node "$P3/MS-g7.mjs" dark "$REC/verbose/m6-head.txt" "$REC/verbose/m6-minor2-rerun$n.txt" | tail -2
  grep -E "chromium light black( held)?:" "$REC/verbose/m3-minor2-rerun$n.txt" | cut -c1-140
  grep -E "halo chromium|release chromium light" "$REC/verbose/m2h-minor2-rerun$n.txt" | cut -c1-200
done
