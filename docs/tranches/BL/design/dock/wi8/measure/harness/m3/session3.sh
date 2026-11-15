#!/usr/bin/env bash
# session3.sh <dist-dir> <port> <cmd...>: serves a built page (a plant's) on a port, runs the
# command, stops the server by PID.
set -uo pipefail
HERE="$(cd "$(dirname "$0")/.." && pwd)"
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8
DIST="$1"; PORT="$2"; shift 2
cd "$W"; node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir "$DIST" --host 127.0.0.1 --port "$PORT" --strictPort >/dev/null 2>&1 & P1=$!
trap 'kill $P1 2>/dev/null; wait $P1 2>/dev/null' EXIT
for i in $(seq 1 60); do curl -sf -o /dev/null "http://127.0.0.1:$PORT/" && break; sleep 0.5; done
cd "$HERE"; "$@"
