#!/bin/bash
# st-wd.sh (D2 pass 7, B′ critic): re-read the two Playwright WebKit dark ST cells the battery left UNMEASURED
# (stall·2raf: undefined collapsed rest; stall·nb·1raf: missing marker), twice, in one --exclusive webkit slot,
# so R4 and R8 close in that column by this seat's own measurement. Supplementary; the digest does not read it.
set -u
G=/Users/mkbabb/Programming/glass-ui; O=$G/.claude/worktrees/bl/D2/p7/Bp-crit/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs; R=$D/pass-7/D2-Bp-crit-records/st-wd; mkdir -p $R
(echo "queued $(date) $(uptime)"; $HOME/.claude/guard/guarded --exclusive webkit --timeout 30 -- env DOCK_HARNESS_THEME=dark bash -c "echo admitted \$(date) \$(uptime); for k in 1 2; do node $H/stall.mjs --build $O/builds/bp --adapter $AD --engine webkit --out $O/st-wd-r\$k --cells '^stall·(2raf|nb·1raf)\$'; uptime; done"; echo "exit $? $(date) $(uptime)") > $R/st-wd.log 2>&1
echo ST-WD-DONE >> $R/st-wd.log
