#!/bin/sh
# D4-F pass-3 spec, sitting 2 · build route.patch revision 2 (sha1 ea333a12) on HEAD + floor v2: the library dist and
# the four scene flavours as f3r-*, and the plated arm f3rp-src (the one value `plated`, restored after).
# usage: sh build-chain-r2.sh <worktree> <out>
set -u
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/harness
WT=$1; OUT=$2; R=$(dirname "$0")/route
echo "build-chain start $(date +%T) load $(uptime | sed 's/.*averages: //')"
node $H/libbuild.mjs $WT || echo "libbuild exit $?"
for f in src src-dev dist dist-dev; do
  node $H/build.mjs $WT --label f3r-$f --out $OUT --flavor $f --route $R || echo "build $f exit $?"
done
sed -i '' 's/--selection-tile: flush;/--selection-tile: plated;/' $WT/src/components/toggle-group/styles.css
node $H/build.mjs $WT --label f3rp-src --out $OUT --flavor src --route $R || echo "build plated exit $?"
sed -i '' 's/--selection-tile: plated;/--selection-tile: flush;/' $WT/src/components/toggle-group/styles.css
echo "build-chain end $(date +%T) load $(uptime | sed 's/.*averages: //')"
