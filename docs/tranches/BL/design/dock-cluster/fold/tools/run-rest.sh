#!/bin/sh
# fold: the remaining runs, one at a time (one heavy run per seat).
cd /Users/mkbabb/Programming/glass-ui
D=docs/tranches/BL/design/dock-cluster/fold
W=.claude/worktrees/bl/cluster/fold/.fold
G=~/.claude/guard/guarded
P="node $D/tools/probe.mjs"
$G --timeout 20 -- $P --engine chromium --site $W/prmspring/site --out $D --tag plant-prmspring --parts prm > $D/logs/chromium-plant-prmspring.log 2>&1; echo "rc=$?" >> $D/logs/chromium-plant-prmspring.log
$G --timeout 20 -- $P --engine chromium --site $W/goo/site --out $D --tag plant-goo --parts g8 > $D/logs/chromium-plant-goo.log 2>&1; echo "rc=$?" >> $D/logs/chromium-plant-goo.log
$G --exclusive webkit --timeout 45 -- $P --engine webkit --site $W/base/site --out $D --tag fold --parts minsize,interrupt,pagechange,router,vertical,rtl,narrow,prm,g8,coarse,dpr --dsfs 1,2,3,1.25,2.2,2.625 > $D/logs/webkit-fold.log 2>&1; echo "rc=$?" >> $D/logs/webkit-fold.log
$G --exclusive webkit --timeout 20 -- $P --engine webkit --site $W/base/site --out $D --tag fold-dpr-onetone --parts dpr --dsfs 2,1.25,2.2,2.625 --query tone=one > $D/logs/webkit-fold-dpr-onetone.log 2>&1; echo "rc=$?" >> $D/logs/webkit-fold-dpr-onetone.log
$G --exclusive webkit --timeout 20 -- $P --engine webkit --site $W/prmspring/site --out $D --tag plant-prmspring --parts prm > $D/logs/webkit-plant-prmspring.log 2>&1; echo "rc=$?" >> $D/logs/webkit-plant-prmspring.log
$G --exclusive webkit --timeout 20 -- $P --engine webkit --site $W/goo/site --out $D --tag plant-goo --parts g8 > $D/logs/webkit-plant-goo.log 2>&1; echo "rc=$?" >> $D/logs/webkit-plant-goo.log
echo ALLDONE > $D/logs/run-rest.done
