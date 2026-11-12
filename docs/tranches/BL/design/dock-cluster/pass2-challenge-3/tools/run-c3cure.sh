#!/bin/sh
# the cure sketch (C3-1, C3-2) on the same cells, cluster compositions only, both engines
cd /Users/mkbabb/Programming/glass-ui
G=~/.claude/guard/guarded
R=docs/tranches/BL/design/dock-cluster/pass2-challenge-3
S=.claude/worktrees/bl/cluster/pass2-challenge-3/.c3cure/site
$G --timeout 30 -- node $R/tools/c3.mjs --engine chromium --site $S --out $R --tag cure --parts overlay,touch > $R/logs/chromium-cure.log 2>&1; echo "rc=$?" >> $R/logs/chromium-cure.log
$G --exclusive webkit --timeout 40 -- node $R/tools/c3.mjs --engine webkit --site $S --out $R --tag cure --parts overlay,touch > $R/logs/webkit-cure.log 2>&1; echo "rc=$?" >> $R/logs/webkit-cure.log
echo DONE > $R/logs/run-cure.done
