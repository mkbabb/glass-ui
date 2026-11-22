#!/bin/bash
# Fix seat 12, resumed: the committed tree's tooltip cells three times in the three projects
# the guard refused, then a fresh build, pack and size read of the committed tree (sizes.sh).
# One heavy run at a time, each through the guard.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-12; L=$D/logs
echo "CHAIN2-START $(date +%T) head $(git -C $D rev-parse --short HEAD) load $(sysctl -n vm.loadavg)" >> $L/runs.out
bash $D/part.sh tip chromium-phone "tooltip · " tt-tip-cp --repeat-each=3
bash $D/part.sh tip webkit-desktop "tooltip · " tt-tip-wd --repeat-each=3
bash $D/part.sh tip webkit-phone "tooltip · " tt-tip-wp --repeat-each=3
bash $D/sizes.sh
echo "CHAIN2-DONE $(date +%T)" >> $L/runs.out
