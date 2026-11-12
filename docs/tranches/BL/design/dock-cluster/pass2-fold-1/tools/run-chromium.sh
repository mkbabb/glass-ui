#!/bin/sh
# pass2-fold-1: the Chromium battery on the fold build (one heavy run at a time)
cd /Users/mkbabb/Programming/glass-ui
G=~/.claude/guard/guarded
R=docs/tranches/BL/design/dock-cluster/pass2-fold-1
S=.claude/worktrees/bl/cluster/pass2-fold-1/.f1/site
P="node $R/tools/probe.mjs --engine chromium --site $S --out $R"
$G --timeout 40 -- $P --tag f1 --labels p2,v1100 --parts interrupt,trigger,sitedock,reader,g8glide,restraint,onedock,swap,prm,a11y > $R/logs/chromium-f1.log 2>&1; echo "rc=$?" >> $R/logs/chromium-f1.log
$G --timeout 15 -- $P --tag f1rep2 --parts interrupt > $R/logs/chromium-f1rep2.log 2>&1; echo "rc=$?" >> $R/logs/chromium-f1rep2.log
$G --timeout 15 -- $P --tag f1rep3 --parts interrupt > $R/logs/chromium-f1rep3.log 2>&1; echo "rc=$?" >> $R/logs/chromium-f1rep3.log
$G --timeout 40 -- $P --tag f1rest --dsfs 1,1.25,1.5,2,2.2,2.625,3 --parts rest > $R/logs/chromium-f1rest.log 2>&1; echo "rc=$?" >> $R/logs/chromium-f1rest.log
$G --timeout 40 -- $P --tag f1mseam --parts mseam > $R/logs/chromium-f1mseam.log 2>&1; echo "rc=$?" >> $R/logs/chromium-f1mseam.log
echo DONE > $R/logs/run-chromium.done
