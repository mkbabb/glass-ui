#!/usr/bin/env bash
# devsession.sh <port> <cmd...>: starts the worktree's vite dev server on <port>, runs the command,
# stops the server by PID.
set -uo pipefail
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; P="$1"; shift
cd "$W"; BROWSER=none node node_modules/vite/bin/vite.js --host localhost --port "$P" --strictPort >/dev/null 2>&1 & P1=$!
trap 'kill $P1 2>/dev/null; wait $P1 2>/dev/null' EXIT
for i in $(seq 1 120); do curl -sf -o /dev/null "http://localhost:$P/" && break; sleep 0.5; done
"$@"
