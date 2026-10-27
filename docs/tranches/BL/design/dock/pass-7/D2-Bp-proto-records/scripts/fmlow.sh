#!/bin/bash
# fmlow.sh (D2 pass 7, B′ prototype): B2's hole re-read at low load. FM's six B2 cells, three runs per theme, Playwright
# WebKit, each theme in one --exclusive webkit slot started only when the 1-minute load is <= MAXLOAD (default 15).
# Then the display-frame slot probe (slotink.mjs) on bp, three runs, in the same slot.
# Supplementary to the battery's reads (which ran at load 17-69); enters the record beside them, not the digest.
set -u
B=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p7/Bp-proto; O=$B/out; R=$O/rec/fmlow; mkdir -p $R
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
CF='^film·(first-expand|warm-expand|warm-collapse|content-add|swap-short|swap-long)$'
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
for t in light dark; do
  while [ "$(echo "$(load1) > ${MAXLOAD:-15}" | bc)" = 1 ]; do sleep 30; done
  (echo "queued $(date) $(uptime)"; $HOME/.claude/guard/guarded --exclusive webkit --timeout 40 -- env DOCK_HARNESS_THEME=$t bash -c "echo admitted \$(date) \$(uptime); for k in 1 2 3; do node $H/film.mjs --build $O/builds/bp --adapter $AD --engine webkit --out $O/fmlow-$t-r\$k --cells '$CF'; uptime; done; node $O/scripts/slotink.mjs --build $O/builds/bp --adapter $AD --engine webkit --runs 3 --json $R/si-bp-webkit-$t.json $([ $t = dark ] && echo --theme dark)"; echo "exit $? $(date) $(uptime)") > $R/fmlow-webkit-$t.log 2>&1
done
echo FMLOW-DONE >> $R/done.txt
