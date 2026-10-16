#!/bin/sh
# Third pass: drags with the demo's 4200 ms autoplay timer blocked, and worm stills.
cd "$(dirname "$0")" || exit 1
G="$HOME/.claude/guard/guarded --light --rss-gb 4 --timeout 4 --"
for run in r1 r2; do for sc in drag-snapback drag-fling; do $G node probe.mjs $sc $run || echo "FAIL $sc $run"; done; done
$G node probe.mjs worm-frames r1 || echo "FAIL worm-frames"
