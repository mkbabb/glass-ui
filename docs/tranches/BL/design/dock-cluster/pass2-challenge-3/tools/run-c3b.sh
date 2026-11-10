#!/bin/sh
# pass 2 challenge 3, second stage: kbmenu in both engines, and WebKit's overlay + touch re-run (menu opened by Enter where the click does not open it; the 11.0.0 cells crashed in stage 1)
cd /Users/mkbabb/Programming/glass-ui
G=~/.claude/guard/guarded
R=docs/tranches/BL/design/dock-cluster/pass2-challenge-3
S=.claude/worktrees/bl/cluster/pass2-challenge-3/.c3/site
$G --timeout 30 -- node $R/tools/c3.mjs --engine chromium --site $S --out $R --tag c3b --parts kbmenu > $R/logs/chromium-c3b.log 2>&1; echo "rc=$?" >> $R/logs/chromium-c3b.log
$G --exclusive webkit --timeout 40 -- node $R/tools/c3.mjs --engine webkit --site $S --out $R --tag c3b --parts overlay,touch,kbmenu > $R/logs/webkit-c3b.log 2>&1; echo "rc=$?" >> $R/logs/webkit-c3b.log
echo DONE > $R/logs/run-c3b.done
