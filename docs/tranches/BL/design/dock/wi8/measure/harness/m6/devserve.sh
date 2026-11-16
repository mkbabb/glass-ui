#!/usr/bin/env bash
# devserve.sh <port> <minutes>: the worktree's vite dev server on 127.0.0.1:<port> with VITE_DOCK_HOLD=1 (the hold
# build's marks), which reads src/ live, for <minutes>, then stops it by PID. Run under the guard, in the background,
# and stop it when done. MEASURE-6 reads the plants on it (no build per plant).
set -uo pipefail
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; P="$1"; M="${2:-85}"
cd "$W"; VITE_DOCK_HOLD=1 BROWSER=none node node_modules/vite/bin/vite.js --host 127.0.0.1 --port "$P" --strictPort >/dev/null 2>&1 & P1=$!
trap 'kill $P1 2>/dev/null; wait $P1 2>/dev/null' EXIT INT TERM
for i in $(seq 1 120); do curl -sf -o /dev/null "http://127.0.0.1:$P/" && break; sleep 0.5; done
echo "dev up on $P"
sleep $((M * 60))
