#!/usr/bin/env bash
# session.sh <cmd...>: starts the two preview servers (proto 5401, RED 5402), runs the
# command, and stops both servers by PID on exit. Run the whole thing under one guarded call.
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8
cd "$W"; node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir dist-wi8 --host 127.0.0.1 --port 5401 --strictPort >/dev/null 2>&1 & P1=$!
cd "$W/.red-v11.0.1"; node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir dist-wi8 --host 127.0.0.1 --port 5402 --strictPort >/dev/null 2>&1 & P2=$!
trap 'kill $P1 $P2 2>/dev/null; wait $P1 $P2 2>/dev/null' EXIT
for i in $(seq 1 60); do curl -sf -o /dev/null http://127.0.0.1:5401/ && curl -sf -o /dev/null http://127.0.0.1:5402/ && break; sleep 0.5; done
cd "$HERE"; "$@"
