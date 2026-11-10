#!/bin/sh
# pass 2 fold, round 2: the fold-2 build, Chromium then WebKit (--exclusive webkit), one heavy run of this seat at a time.
cd /Users/mkbabb/Programming/glass-ui
G=~/.claude/guard/guarded
R=docs/tranches/BL/design/dock-cluster/pass2-fold-2
S=.claude/worktrees/bl/cluster/pass2-fold-2/.f2/site
cr() { t=$1; shift; $G --timeout ${TO:-30} -- node $R/tools/probe.mjs --engine chromium --site $S --out $R --tag $t "$@" > $R/logs/chromium-$t.log 2>&1; echo "rc=$?" >> $R/logs/chromium-$t.log; }
wk() { t=$1; shift; $G --exclusive webkit --timeout ${TO:-30} -- node $R/tools/probe.mjs --engine webkit --site $S --out $R --tag $t "$@" > $R/logs/webkit-$t.log 2>&1; echo "rc=$?" >> $R/logs/webkit-$t.log; }
for E in cr wk; do
  TO=45 $E f2a --parts clickhold,twocol,shade,interrupt2 --shots 0
  TO=30 $E f2int --parts interrupt --order post --shots 0
  TO=45 $E f2reg --parts trigger,onedock,swap,a11y,g8glide,restraint,sitedock,prm
  TO=40 $E f2rest --dsfs 1.25,2.2,2.625 --parts rest,mseam
done
echo DONE > $R/logs/run-f2.done
