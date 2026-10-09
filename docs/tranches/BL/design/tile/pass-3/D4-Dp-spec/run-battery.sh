#!/bin/zsh
# D4-Dp-spec/run-battery.sh · HEAD + floor v2 + the D′ sketch (route.patch) under H3: the library build, the four
# scene-app flavours with this route's migrated arms, the floor's name and unmigrated probes, the whole battery on
# `src` in Chromium and Playwright WebKit, the dist-gated cells, and a `plated` twin build for the Q-2 film pair.
# Serialized by the harness lock. Each log's first and last lines carry the date and the 1-min load average.
#   zsh run-battery.sh <worktree with HEAD+floor-v2+route.patch> <out root (scratch)>
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/harness
F=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-3/floor-v2
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-3/D4-Dp-spec
WT=$1; O=$2; LG=$D/logs; R=$D/route
mkdir -p $LG $D/run
stamp() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
L=$LG/libbuild.log; stamp > $L; node $H/libbuild.mjs $WT >> $L 2>&1; echo "exit $? · $(stamp)" >> $L
for f in src src-dev dist dist-dev; do
  L=$LG/build-dp-$f.log; stamp > $L
  node $H/build.mjs $WT --label dp-$f --out $O --flavor $f --route $R >> $L 2>&1; echo "exit $? · $(stamp)" >> $L
done
for f in src-dev dist dist-dev; do
  L=$LG/probe-names-$f.log; stamp > $L
  node $F/probes/tile-fact.mjs --build $O/builds/dp-$f --part names >> $L 2>&1; echo "exit $? · $(stamp)" >> $L
done
L=$LG/probe-unmigrated-dist.log; stamp > $L
node $F/probes/unmigrated.mjs --build $O/builds/dp-dist >> $L 2>&1; echo "exit $? · $(stamp)" >> $L
L=$LG/battery-dp-src.log; stamp > $L
node $H/run.mjs --build $O/builds/dp-src --out $O --webkit >> $L 2>&1; echo "exit $? · $(stamp)" >> $L
for e in chromium webkit; do for w in we-one-line t5-one-of-n-keys; do
  L=$LG/battery-dp-dist-$w-$e.log; stamp > $L
  node $H/$w.mjs --build $O/builds/dp-dist --out $O --engine $e >> $L 2>&1; echo "exit $? · $(stamp)" >> $L
done; done
rm -rf $D/run/dp-src $D/run/dp-dist; cp -R $O/runs/dp-src $D/run/dp-src; cp -R $O/runs/dp-dist $D/run/dp-dist 2>/dev/null
# the Q-2 twin: the same sketch with the tile set `plated` (one word), built, then restored
S=$WT/src/components/toggle-group/styles.css; cp $S $WT/../styles.flush
sed -i '' 's/--selection-tile: flush;/--selection-tile: plated;/' $S
L=$LG/build-dp-plated-src.log; stamp > $L
grep -c "selection-tile: plated" $S >> $L
node $H/build.mjs $WT --label dp-plated-src --out $O --flavor src --route $R >> $L 2>&1; echo "exit $? · $(stamp)" >> $L
cp $WT/../styles.flush $S; cmp -s $S $WT/../styles.flush && echo "restored flush · $(stamp)" >> $L
echo "done $(stamp)" > $LG/battery.done
