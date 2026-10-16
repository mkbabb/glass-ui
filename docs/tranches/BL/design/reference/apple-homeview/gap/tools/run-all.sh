#!/bin/sh
# Serial driver: one headless Chromium at a time, each run contained by the guard.
# Light mode with an RSS cap and a 3-4 min timeout (the heavy queue was held by other
# repos' 20-90 min runs; each probe here is one browser for 10-25 s).
cd "$(dirname "$0")" || exit 1
G="$HOME/.claude/guard/guarded --light --rss-gb 4 --timeout 4 --"
for run in r1 r2; do
  for sc in rest enter autoplay click retarget hover idle drag-snapback drag-fling overscroll resize reduced dark deck worm-hero; do
    $G node probe.mjs $sc $run || echo "FAIL $sc $run"
  done
  $G node probe.mjs rest $run 390 844 || echo "FAIL rest390 $run"
  $G node probe.mjs dock-scroll $run 834 900 || echo "FAIL dock-scroll $run"
  $G node probe.mjs enter $run 834 900 || echo "FAIL enter834 $run"
done
