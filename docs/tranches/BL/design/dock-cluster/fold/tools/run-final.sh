#!/bin/sh
# fold: essentials first. The full-precision margin re-read (both engines), then the optional WebKit cells.
cd /Users/mkbabb/Programming/glass-ui
D=docs/tranches/BL/design/dock-cluster/fold
W=.claude/worktrees/bl/cluster/fold/.fold
G=~/.claude/guard/guarded
P="node $D/tools/probe.mjs"
$G --timeout 20 -- $P --engine chromium --site $W/base/site --out $D --tag fold-p --parts dpr,minsize --dsfs 1,2,3,1.25,1.5,2.2,2.625 > $D/logs/chromium-fold-p.log 2>&1; echo "rc=$?" >> $D/logs/chromium-fold-p.log
$G --exclusive webkit --timeout 25 -- $P --engine webkit --site $W/base/site --out $D --tag fold-p --parts dpr,minsize --dsfs 1,2,3,1.25,1.5,2.2,2.625 > $D/logs/webkit-fold-p.log 2>&1; echo "rc=$?" >> $D/logs/webkit-fold-p.log
echo ESSENTIAL > $D/logs/run-final.essential
$G --exclusive webkit --timeout 20 -- $P --engine webkit --site $W/base/site --out $D --tag fold-p-onetone --parts dpr --dsfs 1.25,2.2,2.625 --query tone=one > $D/logs/webkit-fold-p-onetone.log 2>&1; echo "rc=$?" >> $D/logs/webkit-fold-p-onetone.log
$G --exclusive webkit --timeout 20 -- $P --engine webkit --site $W/goo/site --out $D --tag plant-goo --parts g8 > $D/logs/webkit-plant-goo.log 2>&1; echo "rc=$?" >> $D/logs/webkit-plant-goo.log
echo ALLDONE > $D/logs/run-final.done
