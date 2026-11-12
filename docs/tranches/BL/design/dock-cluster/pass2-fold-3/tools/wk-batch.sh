#!/bin/sh
# WebKit, one lock for the lot (run under guarded --exclusive webkit): the crash isolation first, then the controls it
# allows, the 390 cluster cells the crash aborted, and the regressions on the fold-2 fixture (no crash there)
cd /Users/mkbabb/Programming/glass-ui
R=docs/tranches/BL/design/dock-cluster/pass2-fold-3
W=.claude/worktrees/bl/cluster/pass2-fold-3
L=$R/logs
n() { t=$1; shift; node "$@" > $L/webkit-$t.log 2>&1; echo "rc=$?" >> $L/webkit-$t.log; }
n iso-noprov $R/tools/f3.mjs --engine webkit --site $W/.f3iso/site --out $R --tag iso-noprov --parts touch --comps before --ws 1440 --q noprov=1
n iso-f2fx $R/tools/f3.mjs --engine webkit --site $W/.f2fx/site --out $R --tag iso-f2fx --parts touch --comps before --ws 1440
n ctl-noprov $R/tools/f3.mjs --engine webkit --site $W/.f3iso/site --out $R --tag ctl-noprov --parts overlay,touch,kbmenu2 --comps before --kinds menu --ws 1440,390 --q noprov=1
n f3-390 $R/tools/f3.mjs --engine webkit --site $W/.f3/site --out $R --tag f3-390 --parts overlay,touch,kbmenu2 --comps after,after-sitedock --ws 390
n f3reg $R/tools/probe-f2.mjs --engine webkit --site $W/.f2fx/site --out $R --tag f3reg --parts clickhold,trigger,a11y --shots 0
n p2kb $R/tools/f3.mjs --engine webkit --site $W/.f3p2/site --out $R --tag p2kb --parts kbmenu2 --comps after,after-sitedock
echo DONE > $L/wk-batch.done
