#!/bin/sh
# pass 2, round 6: the lenses overhang the root (a shrinking glide paints wider than the row's
# layout box) and the rim is flat (restraint). Re-runs the swap in both engines, and the rest
# seam in both engines at the fractional ratios (the rim changed).
cd /Users/mkbabb/Programming/glass-ui
D=docs/tranches/BL/design/dock-cluster/pass2
S=.claude/worktrees/bl/cluster/pass2-build/.p2/site-r6
G=~/.claude/guard/guarded
$G --timeout 20 -- node $D/tools/probe.mjs --engine chromium --site $S --out $D --tag r6 --parts swap,rest --dsfs 2,1.25,1.5,2.2,2.625 > $D/logs/chromium-r6.log 2>&1; echo "rc=$?" >> $D/logs/chromium-r6.log
$G --exclusive webkit --timeout 25 -- node $D/tools/probe.mjs --engine webkit --site $S --out $D --tag r6-swap --parts swap > $D/logs/webkit-r6-swap.log 2>&1; echo "rc=$?" >> $D/logs/webkit-r6-swap.log
$G --exclusive webkit --timeout 25 -- node $D/tools/probe.mjs --engine webkit --site $S --out $D --tag r6-rest --parts rest --dsfs 2,1.25,1.5,2.2,2.625 > $D/logs/webkit-r6-rest.log 2>&1; echo "rc=$?" >> $D/logs/webkit-r6-rest.log
echo DONE > $D/logs/run-r6.done
