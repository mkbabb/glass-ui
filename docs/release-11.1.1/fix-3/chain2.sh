#!/bin/bash
# Fix seat 3: the pre-fix tip's Chromium cells (its first server start lacked scripts/), and
# the Slider cell, restated to prove its press lands, on every tree at 1440 in both engines.
cd "$(dirname "$0")"
G="(still · |dragged off|fade · a dock Select)"
for p in chromium-desktop chromium-phone; do ./run.sh tip $p w-tip-$p "$G"; done
for p in chromium-desktop webkit-desktop; do
    for tree in branch tip red; do ./run.sh $tree $p still-$tree-$p "still · "; done
done
echo chain2 done
