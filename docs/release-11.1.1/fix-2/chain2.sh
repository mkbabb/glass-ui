#!/bin/bash
R=$(dirname $0)/run.sh
for i in 1 2; do
  $R red webkit-desktop ro-red-webkit-desktop-$i "" release-11-1-1-ro
  $R branch webkit-desktop ro-green-webkit-desktop-$i "" release-11-1-1-ro
done
echo CHAIN2-DONE >> $(dirname $0)/logs/runs.out
