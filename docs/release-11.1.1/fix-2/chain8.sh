#!/bin/bash
# The dock Select's reduced-motion entrance in WebKit at 1440, read three times on each tree.
R=$(dirname $0)/run.sh
for i in 1 2 3; do
  $R branch webkit-desktop dsel-green-$i "fade · a dock Select" release-11-1-1-reduce.spec
done
$R red webkit-desktop dsel-red-1 "fade · a dock Select" release-11-1-1-reduce.spec
echo CHAIN8-DONE >> $(dirname $0)/logs/runs.out
