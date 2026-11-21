#!/usr/bin/env bash
# s6run.sh <engine>: S6's G-8 witness on the candidate tree's dev server (port 5433, run under devtree.sh): trig8's every
# cell on the item (RU-72: WebKit's select-touch, sheet-touch and sheet-touch-scrim were the build's faults, H2), then
# under H2's two plants, each applied to the candidate tree only (plant8.py) and reverted before the next read.
set -uo pipefail
E="$1"; T=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.s8-cand
node m8/trig8.mjs 5433 s8-s6 --engine "$E"
for pl in g8-exempt g8-trigger; do
  python3 s8/plant8.py $T $pl apply; sleep 3
  node m8/trig8.mjs 5433 "s8-s6-$pl" --engine "$E"
  python3 s8/plant8.py $T $pl revert; sleep 2
done
echo "s6run $E done"
