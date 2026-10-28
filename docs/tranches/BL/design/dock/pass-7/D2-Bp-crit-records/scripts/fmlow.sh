#!/bin/bash
# fmlow.sh (D2 pass 7, B′ critic): the B2 hole re-read in Playwright WebKit outside the battery, at the lowest load the
# machine gives: FM's six B2 cells three runs per theme, each theme in one --exclusive webkit slot started at a 1-minute
# load <= MAXLOAD (default 15), then the prototype's display-frame slot probe (slotink.mjs, a DOM model; enters no row)
# three runs in the same slot. Supplementary to the battery's reads.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p7/Bp-crit; O=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs; R=$D/pass-7/D2-Bp-crit-records/fmlow; S=$D/pass-7/D2-Bp-crit-records/scripts
mkdir -p $R
CF='^film·(first-expand|warm-expand|warm-collapse|content-add|swap-short|swap-long)$'
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
for t in ${THEMES:-light dark}; do
  while [ "$(echo "$(load1) > ${MAXLOAD:-15}" | bc)" = 1 ]; do sleep 30; done
  (echo "queued $(date) $(uptime)"; $HOME/.claude/guard/guarded --exclusive webkit --timeout 40 -- env DOCK_HARNESS_THEME=$t bash -c "echo admitted \$(date) \$(uptime); for k in 1 2 3; do node $H/film.mjs --build $O/builds/bp --adapter $AD --engine webkit --out $O/fmlow-$t-r\$k --cells '$CF'; uptime; done; node $S/slotink.mjs --build $O/builds/bp --adapter $AD --engine webkit --runs 3 --json $R/si-bp-webkit-$t.json $([ $t = dark ] && echo --theme dark)"; echo "exit $? $(date) $(uptime)") > $R/fmlow-webkit-$t.log 2>&1
  for k in 1 2 3; do mkdir -p $R/$t-r$k; find $O/fmlow-$t-r$k \( -name 'strip-*.png' -o -name FM.json \) -exec cp {} $R/$t-r$k/ \; ; done
done
echo FMLOW-DONE >> $R/done.txt
