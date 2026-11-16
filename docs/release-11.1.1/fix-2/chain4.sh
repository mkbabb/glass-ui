#!/bin/bash
# The exits spec on the branch in its three gate parts, and on v11.1.0 the exit and reversal
# parts, in every project.
R=$(dirname $0)/run.sh
A="(form|glass|exit|routes) · "
B="(reverse|tooltip|expand|leave) · "
C="standing · "
for p in chromium-phone chromium-desktop webkit-phone webkit-desktop; do
  $R branch $p tipA-$p "$A" release-11-1-1.spec
  $R branch $p tipB-$p "$B" release-11-1-1.spec
  $R branch $p tipC-$p "$C" release-11-1-1.spec
  $R red $p redA-$p "exit · " release-11-1-1.spec
  $R red $p redB-$p "reverse · " release-11-1-1.spec
done
echo CHAIN4-DONE >> $(dirname $0)/logs/runs.out
