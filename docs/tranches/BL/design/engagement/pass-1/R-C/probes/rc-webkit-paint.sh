#!/bin/sh
# rc-webkit-paint.sh <rc2-build> <head-build> <capture-out> : the WebKit captures (pinned mid-motion frames; the Chromium captures are rc-paint-cost.sh), the
# after-drag read (both engines), and the c-cost re-reads (N 2000, WebKit twice, Chromium once).
P=$(cd "$(dirname "$0")" && pwd); LG=$P/../logs; B=$1; HB=$2; C=$3
rm -f $C/*webkit*
(node $P/c-captures.mjs --build $B --out $C --engine webkit --label rc; node $P/c-captures.mjs --build $HB --out $C --engine webkit --label head) > $LG/c-captures-webkit.log 2>&1
(node $P/c-afterdrag.mjs --build $B; node $P/c-afterdrag.mjs --build $B --engine webkit; node $P/c-afterdrag.mjs --build $HB) > $LG/c-afterdrag.log 2>&1
(node $P/c-cost.mjs --engine webkit --n 2000; node $P/c-cost.mjs --engine webkit --n 2000; node $P/c-cost.mjs --engine chromium --n 2000) > $LG/c-cost-reread.log 2>&1
echo done > $LG/rc-webkit-paint.done
