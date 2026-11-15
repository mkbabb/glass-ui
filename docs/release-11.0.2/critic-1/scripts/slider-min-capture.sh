#!/bin/bash
# Critic 1: serves one tree on its own port, captures the slider-at-minimum harness, stops vite.
#   slider-min-capture.sh <tree: tip|v1101>
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
C=$W/docs/release-11.0.2/critic-1
case $1 in tip) D=$W; P=5345;; v1101) D=$W/.cache/red-v11.0.1/tree; P=5346;; esac
cd "$D" && BROWSER=none npm run dev -- --host localhost --port $P --strictPort > $C/logs/capture-vite-$1.log 2>&1 &
V=$!
trap 'kill $V 2>/dev/null; pkill -P $V 2>/dev/null' EXIT
for i in $(seq 1 60); do curl -sf -o /dev/null http://localhost:$P/ && break; sleep 2; done
cd $W && node $C/scripts/slider-min-capture.mjs http://localhost:$P $C/capture/slider-min-$1
