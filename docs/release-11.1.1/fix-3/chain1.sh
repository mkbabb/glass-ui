#!/bin/bash
# Fix seat 3: the three witnesses on the branch, the pre-fix tip and v11.1.0, every project.
cd "$(dirname "$0")"
G="(still · |dragged off|fade · a dock Select)"
for p in chromium-desktop chromium-phone webkit-desktop webkit-phone; do
    for tree in branch tip red; do
        ./run.sh $tree $p w-$tree-$p "$G"
    done
done
# Two more readings of the dock Select's WebKit cell on the branch.
for i in 2 3; do ./run.sh branch webkit-desktop dsel-branch-$i "fade · a dock Select"; done
echo chain1 done
