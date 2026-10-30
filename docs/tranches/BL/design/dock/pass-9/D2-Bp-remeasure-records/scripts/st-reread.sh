#!/bin/bash
# st-reread.sh (D2 pass 9, B′ re-measure): ST's five stall·nb cells, Playwright WebKit, both themes, two re-reads each, in
# ONE --exclusive webkit slot. The battery read all ten UNMEASURED by H7-2 (residual scale 1.049-1.059 outside 1 ± 0.01: the
# cast's collapsed rest 107 px against the DOM's 102 px), where the pass-8 critic read them measured. A reading for R4 / R8;
# H7-2 never turns UNMEASURED into PASS or FAIL, and this enters the digest only as these records.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p9/Bp-remeasure; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
REC=$D/pass-9/D2-Bp-remeasure-records; O=$REC/st-reread; mkdir -p $O
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
L "queue st-reread webkit (light, dark × 2)"
$HOME/.claude/guard/guarded --exclusive webkit --timeout 40 -- bash -c "
  echo \"admitted \$(date) \$(uptime)\";
  for t in light dark; do for k in 1 2; do
    (uptime; if [ \$t = dark ]; then env DOCK_HARNESS_THEME=dark node $H/stall.mjs --build $OUT/builds/bp8 --adapter $AD --engine webkit --cells '^stall·nb·' --out $OUT/st-reread/\$t-r\$k;
     else node $H/stall.mjs --build $OUT/builds/bp8 --adapter $AD --engine webkit --cells '^stall·nb·' --out $OUT/st-reread/\$t-r\$k; fi; echo \"exit \$?\"; uptime) > $O/st-webkit-\$t-r\$k.log 2>&1
  done; done" > $O/slot.log 2>&1
L "end st-reread webkit exit $?"
