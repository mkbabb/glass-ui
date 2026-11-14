#!/bin/bash
# Fix seat 3: serves one tree on its own port, runs one probe script against it, stops vite.
# Run the whole script under guarded.
#   serve-probe.sh <tree: tip|v1101> <port> <probe.mjs> [probe args...]
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
F=$W/docs/release-11.0.2/fix-3
T=$1; P=$2; S=$3; shift 3
case $T in tip) D=$W;; v1101) D=$W/.cache/red-v11.0.1/tree;; esac
cd "$D" && BROWSER=none npx vite --host localhost --port $P --strictPort > $F/logs/vite-$T-$P.log 2>&1 &
V=$!
trap 'kill $V 2>/dev/null; pkill -P $V 2>/dev/null' EXIT
for i in $(seq 1 60); do curl -sf -o /dev/null http://localhost:$P/ && break; sleep 2; done
cd $W && node "$S" http://localhost:$P "$@"
