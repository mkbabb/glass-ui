#!/bin/bash
# Critic 4: the edge paint probe on one tree and one engine. Run under guarded
# (WebKit: --exclusive webkit).  paint.sh <tree: tip|v1101> <chromium|webkit>
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
C=$W/docs/release-11.0.2/critic-4
case $1 in tip) P=5343;; v1101) P=5344;; esac
exec $C/scripts/serve-probe.sh $1 $P $C/edge-paint-probe.mjs $2 $C/capture $1
