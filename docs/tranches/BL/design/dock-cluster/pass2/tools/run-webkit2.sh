#!/bin/sh
# pass 2, WebKit motion cells re-run in fresh browsers: r5's single run hit WebKit's page.goto hang
# after ~90 navigations (the known akd stall), so each part gets its own browser.
cd /Users/mkbabb/Programming/glass-ui
D=docs/tranches/BL/design/dock-cluster/pass2
S=.claude/worktrees/bl/cluster/pass2-build/.p2/site-r5
G=~/.claude/guard/guarded
P="node $D/tools/probe.mjs --engine webkit --site $S --out $D"
for part in onedock swap prm a11y; do
  $G --exclusive webkit --timeout 25 -- $P --tag r5-$part --parts $part > $D/logs/webkit-r5-$part.log 2>&1; echo "rc=$?" >> $D/logs/webkit-r5-$part.log
done
echo DONE > $D/logs/run-webkit2.done
# Chromium PRM again with the painted-state sampler
C="node $D/tools/probe.mjs --engine chromium --site $S --out $D"
$G --timeout 10 -- $C --tag r5-prm --parts prm > $D/logs/chromium-r5-prm.log 2>&1; echo "rc=$?" >> $D/logs/chromium-r5-prm.log
echo ALLDONE >> $D/logs/run-webkit2.done
