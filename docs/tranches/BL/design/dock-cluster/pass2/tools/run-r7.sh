#!/bin/sh
# pass 2, round 7: the kernel lenses overlap by 1 px across each contacted neck. The rest seam in
# both engines at every ratio, and the swap in Chromium (the lens path changed).
cd /Users/mkbabb/Programming/glass-ui
D=docs/tranches/BL/design/dock-cluster/pass2
S=.claude/worktrees/bl/cluster/pass2-build/.p2/site-r7
G=~/.claude/guard/guarded
$G --timeout 20 -- node $D/tools/probe.mjs --engine chromium --site $S --out $D --tag r7 --parts rest,swap,onedock --dsfs 2,1,3,1.25,1.5,2.2,2.625 > $D/logs/chromium-r7.log 2>&1; echo "rc=$?" >> $D/logs/chromium-r7.log
$G --exclusive webkit --timeout 25 -- node $D/tools/probe.mjs --engine webkit --site $S --out $D --tag r7-rest --parts rest --dsfs 2,1,3,1.25,1.5,2.2,2.625 > $D/logs/webkit-r7-rest.log 2>&1; echo "rc=$?" >> $D/logs/webkit-r7-rest.log
echo DONE > $D/logs/run-r7.done
