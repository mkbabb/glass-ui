#!/bin/bash
# Critic 10, after chain.sh: the row B mouse probe on both trees in WebKit 390, then row A's
# cell repeated on the tip in Chromium 390; one heavy run at a time, each through the run guard.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
D=$W/docs/release-11.1.1/critic-10; L=$D/logs
until grep -q "CHAIN-DONE" $L/runs.out; do sleep 30; done
echo "CHAIN2-START $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
bash $D/probe/run.sh tip webkit-phone rowb-tip-wp
bash $D/probe/run.sh red webkit-phone rowb-red-wp
bash $D/part.sh tip chromium-phone "sheet · a detented Sheet rises into place at its rung's size" rowa-tip-cp --repeat-each=4
echo "CHAIN2-DONE $(date +%T) load $(sysctl -n vm.loadavg)" >> $L/runs.out
