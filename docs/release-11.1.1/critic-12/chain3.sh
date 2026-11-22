#!/bin/bash
# Critic 12, after chain2.sh: this seat's gestalt probe (every surface's entrance and one exit,
# filmed with its computed scale, transform and filter) on both trees in the four projects,
# one heavy run at a time, each through the run guard.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-12; L=$D/logs
until grep -q "CHAIN2-DONE" $L/runs.out; do sleep 30; done
echo "CHAIN3-START $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
for p in chromium-desktop chromium-phone webkit-desktop webkit-phone; do
  bash $D/probe-gestalt/run.sh tip $p gestalt-tip-$p
  bash $D/probe-gestalt/run.sh red $p gestalt-red-$p
done
echo "CHAIN3-DONE $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
