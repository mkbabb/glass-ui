#!/bin/sh
# challenge-1 round 2: the refined interrupt + the trigger baseline in Chromium; every part in WebKit; the motion seam in both
cd /Users/mkbabb/Programming/glass-ui
G=~/.claude/guard/guarded
$G --timeout 25 -- node docs/tranches/BL/design/dock-cluster/pass2-challenge-1/tools/probe.mjs --engine chromium --site .claude/worktrees/bl/cluster/challenge2-r1/.c1/site --out docs/tranches/BL/design/dock-cluster/pass2-challenge-1 --tag c2 --parts interrupt,trigger,mseam > docs/tranches/BL/design/dock-cluster/pass2-challenge-1/logs/chromium-c2.log 2>&1; echo "rc=$?" >> docs/tranches/BL/design/dock-cluster/pass2-challenge-1/logs/chromium-c2.log
$G --exclusive webkit --timeout 40 -- node docs/tranches/BL/design/dock-cluster/pass2-challenge-1/tools/probe.mjs --engine webkit --site .claude/worktrees/bl/cluster/challenge2-r1/.c1/site --out docs/tranches/BL/design/dock-cluster/pass2-challenge-1 --tag c2 --parts interrupt,trigger,sitedock,reader,g8glide,mseam > docs/tranches/BL/design/dock-cluster/pass2-challenge-1/logs/webkit-c2.log 2>&1; echo "rc=$?" >> docs/tranches/BL/design/dock-cluster/pass2-challenge-1/logs/webkit-c2.log
echo DONE > docs/tranches/BL/design/dock-cluster/pass2-challenge-1/logs/run-2.done
