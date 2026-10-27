#!/bin/bash
# wkiter.sh <label> [theme]: one Playwright WebKit iteration under the machine-wide WebKit lock: W3 (exchange cells, no faces),
# FM (the six B2 cells) and the display-frame slot probe, in one --exclusive webkit slot.
set -u
L=$1; T=${2:-light}
B=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p7/Bp-proto; O=$B/out; R=$O/iter
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
CW='^(first-expand|warm-collapse|warm-expand|content-add|content-remove|lead-add|lead-remove|swap-long|swap-short|compaction|reversal|retarget·(40|80|120))$'
CF='^film·(first-expand|warm-expand|warm-collapse|content-add|swap-short|swap-long)$'
(echo "queued $(date) · $(uptime)"; DOCK_HARNESS_THEME=$T ~/.claude/guard/guarded --exclusive webkit --timeout 40 -- bash -c "echo admitted \$(date) \$(uptime); node $H/w3-morph.mjs --build $O/builds/$L --adapter $AD --engine webkit --no-faces --out $O/w3-$L-webkit-$T --cells '$CW'; node $H/film.mjs --build $O/builds/$L --adapter $AD --engine webkit --out $O/fm-$L-webkit-$T --cells '$CF'; node $O/scripts/slotink.mjs --build $O/builds/$L --adapter $AD --engine webkit --runs 2 --json $O/si/$L-webkit-$T.json \$( [ $T = dark ] && echo --theme dark )"; echo "end $(date) · $(uptime)") > $R/run-$L-webkit-$T.log 2>&1
node $O/scripts/sum.mjs $(find $O/w3-$L-webkit-$T -name W3.json | head -1) $(find $O/fm-$L-webkit-$T -name FM.json | head -1) > $R/sum-$L-webkit-$T.txt 2>&1
