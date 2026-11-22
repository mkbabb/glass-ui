#!/bin/bash
# Critic 11, after chain.sh: critic 10's row B mouse probe on both trees in WebKit 390, one heavy
# run at a time, each through the run guard.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-11; L=$D/logs
until grep -q "CHAIN-DONE" $L/runs.out; do sleep 30; done
echo "CHAIN2-START $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
bash $D/probe-rowb/run.sh tip webkit-phone rowb-tip-wp
bash $D/probe-rowb/run.sh red webkit-phone rowb-red-wp
echo "CHAIN2-DONE $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
