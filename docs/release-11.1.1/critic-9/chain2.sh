#!/bin/bash
# Critic 9, after chain.sh: the ExpandableContainer reversal cell repeated with traces on both
# trees, the frost cells on the planted tree, and the row B mouse probe on both trees in
# WebKit 390; one heavy run at a time, each through the run guard.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-9; L=$D/logs
until grep -q "CHAIN-DONE" $L/runs.out; do sleep 30; done
echo "CHAIN2-START $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
G="expand · an ExpandableContainer reopened while it leaves"
bash $D/diag.sh tip chromium-phone diag-expand-tip-cp "$G" 30
bash $D/plant.sh chromium-phone plant-frost-cp
bash $D/plant.sh webkit-phone plant-frost-wp
bash $D/probe/run.sh tip webkit-phone rowb-tip-wp
bash $D/probe/run.sh red webkit-phone rowb-red-wp
bash $D/diag.sh red chromium-phone diag-expand-red-cp "$G" 10
echo "CHAIN2-DONE $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
