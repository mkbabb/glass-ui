#!/bin/bash
# Row 8 and row 13 (a): the reduced-motion witnesses, both trees, every project.
R=$(dirname $0)/run.sh
for p in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
  $R red $p reduce-red-$p "(site|fade|fold|mark) · " release-11-1-1-reduce.spec
  $R branch $p reduce-green-$p "(site|fade|fold|mark) · " release-11-1-1-reduce.spec
done
echo CHAIN7-DONE >> $(dirname $0)/logs/runs.out
