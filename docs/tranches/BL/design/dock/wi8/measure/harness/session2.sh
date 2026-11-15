#!/usr/bin/env bash
# session2.sh <cmd...>: starts the prototype preview (5401), runs the command, stops it by PID.
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8
cd "$W"; node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir dist-wi8 --host 127.0.0.1 --port 5401 --strictPort >/dev/null 2>&1 & P1=$!
trap 'kill $P1 2>/dev/null; wait $P1 2>/dev/null' EXIT
for i in $(seq 1 60); do curl -sf -o /dev/null http://127.0.0.1:5401/ && break; sleep 0.5; done
cd "$HERE"; "$@"
