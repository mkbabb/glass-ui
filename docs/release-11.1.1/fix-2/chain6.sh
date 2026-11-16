#!/bin/bash
# The overlay register's entrance and exit, both trees, every project; the overlay
# register's other cells re-read on the branch.
R=$(dirname $0)/run.sh
for p in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
  $R red $p plain-red-$p "its slide alone" release-11-1-1.spec
  $R branch $p plain-green-$p "(exit|reverse|standing|leave) · (a )?(Popover|Toast|brief Toast|hover card)" release-11-1-1.spec
done
echo CHAIN6-DONE >> $(dirname $0)/logs/runs.out
