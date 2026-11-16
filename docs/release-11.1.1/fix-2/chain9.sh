#!/bin/bash
# The reduced-motion spec on the branch tip, every project, after the anchor reading.
R=$(dirname $0)/run.sh
for i in 1 2 3; do
  $R branch webkit-desktop dsel2-green-$i "fade · a dock Select" release-11-1-1-reduce.spec
done
for p in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
  $R branch $p reduce2-green-$p "(site|fade|fold|mark) · " release-11-1-1-reduce.spec
done
echo CHAIN9-DONE >> $(dirname $0)/logs/runs.out
