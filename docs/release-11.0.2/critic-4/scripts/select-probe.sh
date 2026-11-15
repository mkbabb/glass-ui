#!/bin/bash
# Critic 4: the Select probe (docs/release-11.0.2/o212/probe.mjs) against one tree on its own
# vite, started and stopped inside this one call. Run under guarded (WebKit: --exclusive webkit).
#   select-probe.sh <tree: tip|v1101> <engine: chromium|webkit>
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
C=$W/docs/release-11.0.2/critic-4
case $1 in tip) D=$W; P=5343;; v1101) D=$W/.cache/red-v11.0.1/tree; P=5344;; esac
cd "$D" && BROWSER=none npm run dev -- --host localhost --port $P --strictPort > $C/logs/select-vite-$1-$2.log 2>&1 &
V=$!
trap 'kill $V 2>/dev/null; pkill -P $V 2>/dev/null' EXIT
for i in $(seq 1 60); do curl -sf -o /dev/null http://localhost:$P/ && break; sleep 2; done
cd $W && node docs/release-11.0.2/o212/probe.mjs $2 http://localhost:$P $C/select/$1 $1
