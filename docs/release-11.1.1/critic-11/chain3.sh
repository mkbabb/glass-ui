#!/bin/bash
# Critic 11, after chain2.sh: the tooltip scale probe on both trees at 1440, Chromium then WebKit,
# one heavy run at a time, each through the run guard.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-11; L=$D/logs
until grep -q "CHAIN2-DONE" $L/runs.out; do sleep 30; done
echo "CHAIN3-START $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
bash $D/probe-tip/run.sh tip chromium-desktop tt-tip-cd
bash $D/probe-tip/run.sh red chromium-desktop tt-red-cd
bash $D/probe-tip/run.sh tip webkit-desktop tt-tip-wd
bash $D/probe-tip/run.sh red webkit-desktop tt-red-wd
echo "CHAIN3-DONE $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
