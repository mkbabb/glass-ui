#!/usr/bin/env bash
# s7run.sh <engine> <tree-dir> <port>: S7, RU-61's second prototype round (RU-84 as amended for R7-4), on the item's dev
# server (run under devtree.sh on <port>; Chromium on the GPU lane for the cost cell). For the build as it stands, then
# for each prototype form (s8/ru61b.py: m7, MEASURE-7's margin ported, and arith, the second round's margin with no read
# of the root after it moves), each applied to the tree only and reverted after: s8/ru61read.mjs on atlas's head row,
# the in-flow cell beside a legend and keyframes's transport (centre and anchor="start"), and in Chromium m8/cost8.mjs on
# the in-flow cell (the trigger frames' layouts, RU-74's bound).
set -uo pipefail
E="$1"; T="$2"; P="$3"
node s8/ru61read.mjs "$P" s7-base --engine "$E"
[ "$E" = chromium ] && node m8/cost8.mjs "$P" s7-base --cells w-inflow
for form in m7 arith; do
  python3 s8/ru61b.py "$T" $form apply; sleep 4
  node s8/ru61read.mjs "$P" "s7-$form" --engine "$E"
  [ "$E" = chromium ] && node m8/cost8.mjs "$P" "s7-$form" --cells w-inflow
  python3 s8/ru61b.py "$T" $form revert; sleep 2
done
echo "s7run $E done"
