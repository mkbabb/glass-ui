#!/bin/sh
# pass2-fold-1 final: Chromium f2 (every part the seat stand-down and the controls clip touch), then the
# whole WebKit battery under --exclusive webkit. One heavy run at a time.
cd /Users/mkbabb/Programming/glass-ui
G=~/.claude/guard/guarded
R=docs/tranches/BL/design/dock-cluster/pass2-fold-1
S=.claude/worktrees/bl/cluster/pass2-fold-1/.f1/site
C="node $R/tools/probe.mjs --engine chromium --site $S --out $R"
K="node $R/tools/probe.mjs --engine webkit --site $S --out $R"
$G --timeout 40 -- $C --tag f2 --labels p2,v1100 --parts interrupt,g8glide,restraint,onedock,swap,a11y,trigger,sitedock > $R/logs/chromium-f2.log 2>&1; echo "rc=$?" >> $R/logs/chromium-f2.log
$G --timeout 15 -- $C --tag f2rep2 --parts interrupt > $R/logs/chromium-f2rep2.log 2>&1; echo "rc=$?" >> $R/logs/chromium-f2rep2.log
$G --exclusive webkit --timeout 60 -- $K --tag f2 --labels p2,v1100 --parts interrupt,trigger,sitedock,reader,g8glide,restraint,onedock,swap,prm,a11y > $R/logs/webkit-f2.log 2>&1; echo "rc=$?" >> $R/logs/webkit-f2.log
$G --exclusive webkit --timeout 15 -- $K --tag f2rep2 --parts interrupt > $R/logs/webkit-f2rep2.log 2>&1; echo "rc=$?" >> $R/logs/webkit-f2rep2.log
$G --exclusive webkit --timeout 60 -- $K --tag f2rest --dsfs 1,1.25,1.5,2,2.2,2.625,3 --parts rest > $R/logs/webkit-f2rest.log 2>&1; echo "rc=$?" >> $R/logs/webkit-f2rest.log
$G --exclusive webkit --timeout 60 -- $K --tag f2mseam --parts mseam > $R/logs/webkit-f2mseam.log 2>&1; echo "rc=$?" >> $R/logs/webkit-f2mseam.log
echo DONE > $R/logs/run-final.done
