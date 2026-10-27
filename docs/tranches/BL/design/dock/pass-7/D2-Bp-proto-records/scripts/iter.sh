#!/bin/bash
# iter.sh (D2 pass 7, B′ prototype): one development iteration: build <label> from the seat worktree (scene only),
# then W3 (exchange cells) and FM (the six B2 cells) in one engine, each guarded (WebKit under --exclusive webkit),
# and print each cell's verdict with its leaving, vanish, blank, splice and hole readings.
#   bash iter.sh <label> [engine] [theme]
set -u
L=$1; E=${2:-chromium}; T=${3:-light}
B=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p7/Bp-proto; WT=$B/wt; O=$B/out; R=$O/iter
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs; mkdir -p $R
if [ ! -d $O/builds/$L ]; then
  ~/.claude/guard/guarded --timeout 10 -- node $H/build.mjs $WT --out $O --label $L --no-demo > $R/build-$L.log 2>&1 || { echo BUILD-FAILED; tail -20 $R/build-$L.log; exit 1; }
fi
X=""; [ "$E" = webkit ] && X="--exclusive webkit"
CW='^(first-expand|warm-collapse|warm-expand|content-add|content-remove|lead-add|lead-remove|swap-long|swap-short|compaction|reversal|retarget·(40|80|120))$'
CF='^film·(first-expand|warm-expand|warm-collapse|content-add|swap-short|swap-long)$'
(uptime; DOCK_HARNESS_THEME=$T ~/.claude/guard/guarded $X --timeout 30 -- bash -c "node $H/w3-morph.mjs --build $O/builds/$L --adapter $AD --engine $E --no-faces --out $O/w3-$L-$E-$T --cells '$CW'; node $H/film.mjs --build $O/builds/$L --adapter $AD --engine $E --out $O/fm-$L-$E-$T --cells '$CF'"; uptime) > $R/run-$L-$E-$T.log 2>&1
: 
head -1 $R/run-$L-$E-$T.log; tail -1 $R/run-$L-$E-$T.log
node $O/../out/scripts/sum.mjs $(find $O/w3-$L-$E-$T -name W3.json | head -1) $(find $O/fm-$L-$E-$T -name FM.json | head -1) 2>/dev/null
