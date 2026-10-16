#!/bin/sh
# Second serial pass: the scenarios corrected after the first pass (see GAP.md §0).
cd "$(dirname "$0")" || exit 1
G="$HOME/.claude/guard/guarded --light --rss-gb 4 --timeout 4 --"
for run in r1 r2; do
  for sc in click resize reduced drag-snapback drag-fling pager-next smooth; do
    $G node probe.mjs $sc $run || echo "FAIL $sc $run"
  done
  $G node probe.mjs dock-scroll $run 834 900 || echo "FAIL dock-scroll $run"
  $G node probe.mjs enter $run 834 900 || echo "FAIL enter834 $run"
  $G node probe.mjs enter $run || echo "FAIL enter $run"
done
