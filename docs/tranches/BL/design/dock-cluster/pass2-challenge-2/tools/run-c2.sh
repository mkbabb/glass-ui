#!/bin/sh
# pass 2 challenge, round 2: Chromium, then WebKit (--exclusive webkit), one heavy run of this seat at a time.
cd /Users/mkbabb/Programming/glass-ui
G=~/.claude/guard/guarded
R=docs/tranches/BL/design/dock-cluster/pass2-challenge-2
S=.claude/worktrees/bl/cluster/challenge2-r2/.c2/site
cr() { t=$1; shift; $G --timeout ${TO:-20} -- node $R/tools/probe.mjs --engine chromium --site $S --out $R --tag $t "$@" > $R/logs/chromium-$t.log 2>&1; echo "rc=$?" >> $R/logs/chromium-$t.log; }
wk() { t=$1; shift; $G --exclusive webkit --timeout ${TO:-20} -- node $R/tools/probe.mjs --engine webkit --site $S --out $R --tag $t "$@" > $R/logs/webkit-$t.log 2>&1; echo "rc=$?" >> $R/logs/webkit-$t.log; }
TO=30 cr c2a --parts twocol,shade,interrupt2,clickhold
TO=30 cr c2rest --dsfs 1.25,2.2,2.625 --parts rest
TO=40 wk c2a --parts twocol,shade,interrupt2,clickhold
TO=30 wk c2rest --dsfs 1.25,2.2,2.625 --parts rest
echo DONE > $R/logs/run-c2.done
