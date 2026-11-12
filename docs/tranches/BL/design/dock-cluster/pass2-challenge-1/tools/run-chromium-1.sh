#!/bin/sh
cd /Users/mkbabb/Programming/glass-ui
~/.claude/guard/guarded --timeout 25 -- node docs/tranches/BL/design/dock-cluster/pass2-challenge-1/tools/probe.mjs --engine chromium --site .claude/worktrees/bl/cluster/challenge2-r1/.c1/site --out docs/tranches/BL/design/dock-cluster/pass2-challenge-1 --tag c1 --parts sitedock,reader,restraint,g8glide,interrupt,trigger > docs/tranches/BL/design/dock-cluster/pass2-challenge-1/logs/chromium-c1.log 2>&1; echo "rc=$?" >> docs/tranches/BL/design/dock-cluster/pass2-challenge-1/logs/chromium-c1.log
