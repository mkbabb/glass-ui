#!/bin/sh
# pass2-fold-1 resume, the one-clock cure (R-14): Chromium, then WebKit, on the rebuilt site. One heavy run of
# this seat at a time: a Chromium run waits while this seat's WebKit probe runs.
cd /Users/mkbabb/Programming/glass-ui
G=~/.claude/guard/guarded
R=docs/tranches/BL/design/dock-cluster/pass2-fold-1
S=.claude/worktrees/bl/cluster/pass2-fold-1-resume/.f1/site
C="node $R/tools/probe.mjs --engine chromium --site $S --out $R"
K="node $R/tools/probe.mjs --engine webkit --site $S --out $R"
idle() { while pgrep -f "^node $R/tools/probe.mjs --engine webkit" >/dev/null; do sleep 30; done; }
cr() { idle; t=$1; shift; $G --timeout ${TO:-15} -- $C --tag $t "$@" > $R/logs/chromium-$t.log 2>&1; echo "rc=$?" >> $R/logs/chromium-$t.log; }
for o in def pre post; do for i in 1 2 3; do
  if [ $o = def ]; then cr c$o$i --parts interrupt; else cr c$o$i --order $o --parts interrupt; fi
done; done
TO=40 cr c3 --labels p2,v1100 --parts trigger,sitedock,reader,g8glide,restraint,onedock,swap,prm,a11y
TO=40 cr c3mseam --parts mseam
TO=40 cr c3rest --dsfs 1,1.25,1.5,2,2.2,2.625,3 --parts rest
echo DONE > $R/logs/run-cure-chromium.done
while [ ! -f $R/logs/run-resume.done ]; do sleep 30; done
wk() { t=$1; shift; $G --exclusive webkit --timeout ${TO:-15} -- $K --tag $t "$@" > $R/logs/webkit-$t.log 2>&1; echo "rc=$?" >> $R/logs/webkit-$t.log; }
for i in 1 2 3; do wk cpost$i --order post --parts interrupt; done
wk cdef1 --parts interrupt
wk cpre1 --order pre --parts interrupt
TO=60 wk c3 --labels p2,v1100 --parts trigger,sitedock,reader,g8glide,restraint,onedock,swap,prm,a11y
echo DONE > $R/logs/run-cure.done
