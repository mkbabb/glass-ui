#!/bin/zsh
# floor-v2/run-battery.sh · HEAD + floor v2 under H3: the four scene-app flavours, the floor-v2 probes, the whole
# battery on `src` in Chromium and Playwright WebKit, and the dist-gated cells (T-5's retired value, W-E's refusal)
# on `dist`. Serialized: every witness and probe takes the harness lock. Each log's first and last lines carry the
# date and the 1-min load average.
#   zsh run-battery.sh <worktree with HEAD+floor-v2 applied and dist built> <out root>
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/harness
F=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-3/floor-v2
WT=$1; O=$2; LG=$F/logs
mkdir -p $LG
stamp() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
for f in src src-dev dist dist-dev; do
  L=$LG/build-fv2-$f.log; stamp > $L
  node $H/build.mjs $WT --label fv2-$f --out $O --flavor $f >> $L 2>&1; echo "exit $? · $(stamp)" >> $L
done
L=$LG/probe-tile-fact-src.log; stamp > $L
node $F/probes/tile-fact.mjs --build $O/builds/fv2-src --part all >> $L 2>&1; echo "exit $? · $(stamp)" >> $L
for f in src-dev dist dist-dev; do
  L=$LG/probe-names-$f.log; stamp > $L
  node $F/probes/tile-fact.mjs --build $O/builds/fv2-$f --part names >> $L 2>&1; echo "exit $? · $(stamp)" >> $L
done
L=$LG/battery-fv2-src.log; stamp > $L
node $H/run.mjs --build $O/builds/fv2-src --out $O --webkit >> $L 2>&1; echo "exit $? · $(stamp)" >> $L
for e in chromium webkit; do for w in we-one-line t5-one-of-n-keys; do
  L=$LG/battery-fv2-dist-$w-$e.log; stamp > $L
  node $H/$w.mjs --build $O/builds/fv2-dist --out $O --engine $e >> $L 2>&1; echo "exit $? · $(stamp)" >> $L
done; done
echo "done $(stamp)" > $LG/battery.done
