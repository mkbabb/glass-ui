#!/bin/sh
# rc-paint-cost.sh <rc2-build> <head-build> <capture-out> : C-0/Q-1/Q-3 on rc2 (both engines), the style-recalc cost
# (N 200 and 2000, both engines), the owner-glance captures for rc2 and HEAD (both engines). Logs to ../logs/.
P=$(cd "$(dirname "$0")" && pwd); LG=$P/../logs; B=$1; HB=$2; C=$3
(node $P/c-scalar.mjs --build $B; node $P/c-scalar.mjs --build $B --engine webkit) > $LG/c-scalar-rc2.log 2>&1
(for e in chromium webkit; do for n in 200 2000; do node $P/c-cost.mjs --engine $e --n $n; done; done) > $LG/c-cost.log 2>&1
(node $P/c-captures.mjs --build $B --out $C --engine chromium --label rc; node $P/c-captures.mjs --build $HB --out $C --engine chromium --label head) > $LG/c-captures.log 2>&1
echo done > $LG/rc-paint-cost.done
