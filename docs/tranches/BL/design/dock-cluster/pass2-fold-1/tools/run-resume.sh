#!/bin/sh
# pass2-fold-1 resume (after the 2026-11-09 zone refusal and the reboot): Chromium's interrupt part x3 (the 1-in-7 early
# frame), then run-final.sh's three refused WebKit stages. Same build, rebuilt from pass2/prototype.patch on master.
cd /Users/mkbabb/Programming/glass-ui
G=~/.claude/guard/guarded
R=docs/tranches/BL/design/dock-cluster/pass2-fold-1
S=.claude/worktrees/bl/cluster/pass2-fold-1-resume/.f1/site
C="node $R/tools/probe.mjs --engine chromium --site $S --out $R"
K="node $R/tools/probe.mjs --engine webkit --site $S --out $R"
for i in 1 2 3; do
$G --timeout 15 -- $C --tag r$i --parts interrupt > $R/logs/chromium-r$i.log 2>&1; echo "rc=$?" >> $R/logs/chromium-r$i.log
done
$G --exclusive webkit --timeout 15 -- $K --tag f2rep2 --parts interrupt > $R/logs/webkit-f2rep2.log 2>&1; echo "rc=$?" >> $R/logs/webkit-f2rep2.log
$G --exclusive webkit --timeout 60 -- $K --tag f2rest --dsfs 1,1.25,1.5,2,2.2,2.625,3 --parts rest > $R/logs/webkit-f2rest.log 2>&1; echo "rc=$?" >> $R/logs/webkit-f2rest.log
$G --exclusive webkit --timeout 60 -- $K --tag f2mseam --parts mseam > $R/logs/webkit-f2mseam.log 2>&1; echo "rc=$?" >> $R/logs/webkit-f2mseam.log
echo DONE > $R/logs/run-resume.done
