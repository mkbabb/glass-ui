#!/bin/sh
# after run-c2.sh: the 11.0.0 interrupt controls in Chromium, and value's collapsible dock (vcol=1) in both engines.
cd /Users/mkbabb/Programming/glass-ui
G=~/.claude/guard/guarded
R=docs/tranches/BL/design/dock-cluster/pass2-challenge-2
S=.claude/worktrees/bl/cluster/challenge2-r2/.c2/site
SB=.claude/worktrees/bl/cluster/challenge2-r2/.c2b/site
while [ ! -f $R/logs/run-c2.done ]; do sleep 30; done
cr() { t=$1; s=$2; shift 2; $G --timeout 20 -- node $R/tools/probe.mjs --engine chromium --site $s --out $R --tag $t "$@" > $R/logs/chromium-$t.log 2>&1; echo "rc=$?" >> $R/logs/chromium-$t.log; }
wk() { t=$1; s=$2; shift 2; $G --exclusive webkit --timeout 20 -- node $R/tools/probe.mjs --engine webkit --site $s --out $R --tag $t "$@" > $R/logs/webkit-$t.log 2>&1; echo "rc=$?" >> $R/logs/webkit-$t.log; }
cr c2b $S --parts interrupt2 --only v1100 --shots 0
cr c2v $SB --parts interrupt2 --vcol 1 --only swap --shots 0
wk c2v $SB --parts interrupt2 --vcol 1 --only swap --shots 0
echo DONE > $R/logs/run-c2b.done
