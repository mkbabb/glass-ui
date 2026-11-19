#!/bin/bash
# Fix seat 7, resumed: row A's cell on the worktree, Chromium 390 and WebKit 390, each
# started at a 1-minute load under 16.
D=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/docs/release-11.1.1/fix-7
echo "CHAIN16-START $(date +%T)" >> $D/logs/runs.out
low() { until [[ $(sysctl -n vm.loadavg | awk '{print int($2)}') -lt $1 ]]; do sleep 15; done; echo "$(date +%T) load at start $(sysctl -n vm.loadavg)" >> $D/logs/runs.out; }
A="sheet · a detented Sheet rises"
low 16; $D/run.sh branch chromium-phone h3-branch-chromium-phone "$A"
low 16; $D/run.sh branch webkit-phone h3-branch-webkit-phone "$A"
echo "CHAIN16-DONE $(date +%T)" >> $D/logs/runs.out
