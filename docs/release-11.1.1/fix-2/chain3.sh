#!/bin/bash
# Row 10's weight cell and the gestalt exit cell, both trees, every project; then the RO reading.
R=$(dirname $0)/run.sh
for p in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
  $R red $p weight-red-$p "weight · " release-11-1-1-controls
  $R branch $p weight-green-$p "weight · " release-11-1-1-controls
done
$(dirname $0)/chain2.sh
echo CHAIN3-DONE >> $(dirname $0)/logs/runs.out
