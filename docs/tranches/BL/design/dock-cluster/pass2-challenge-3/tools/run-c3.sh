#!/bin/sh
# pass 2 challenge 3: Chromium then WebKit (--exclusive webkit), one heavy run of this seat at a time.
cd /Users/mkbabb/Programming/glass-ui
G=~/.claude/guard/guarded
R=docs/tranches/BL/design/dock-cluster/pass2-challenge-3
S=.claude/worktrees/bl/cluster/pass2-challenge-3/.c3/site
$G --timeout 40 -- node $R/tools/c3.mjs --engine chromium --site $S --out $R --tag c3 --parts overlay,touch,forced > $R/logs/chromium-c3.log 2>&1; echo "rc=$?" >> $R/logs/chromium-c3.log
$G --exclusive webkit --timeout 40 -- node $R/tools/c3.mjs --engine webkit --site $S --out $R --tag c3 --parts overlay,touch > $R/logs/webkit-c3.log 2>&1; echo "rc=$?" >> $R/logs/webkit-c3.log
echo DONE > $R/logs/run-c3.done
