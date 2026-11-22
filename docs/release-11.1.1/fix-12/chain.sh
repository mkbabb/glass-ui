#!/bin/bash
# Fix seat 12: the tooltip cells on ce5f320b7 and v11.1.0 (RED), then on the committed
# branch (GREEN, three times each), four projects, one heavy run at a time.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-12; L=$D/logs
short() { echo $1 | sed 's/chromium-/c/;s/webkit-/w/;s/desktop/d/;s/phone/p/'; }
echo "CHAIN-START $(date +%T) head $(git -C $D rev-parse --short HEAD) load $(sysctl -n vm.loadavg)" >> $L/runs.out
for tree in ce5 red; do
  for p in chromium-desktop chromium-phone webkit-desktop webkit-phone; do
    bash $D/part.sh $tree $p "tooltip · " tt-$tree-$(short $p)
  done
done
for p in chromium-desktop chromium-phone webkit-desktop webkit-phone; do
  bash $D/part.sh tip $p "tooltip · " tt-tip-$(short $p) --repeat-each=3
done
echo "CHAIN-DONE $(date +%T)" >> $L/runs.out
