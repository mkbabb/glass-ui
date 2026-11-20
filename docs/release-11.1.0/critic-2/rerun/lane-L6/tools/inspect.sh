#!/usr/bin/env bash
# inspect.sh <port> <query> <expr-file>: serve the worktree and run inspect.mjs once.
set -u
PORT=$1; Q=$2; EXPR=$3
HERE=$(cd "$(dirname "$0")" && pwd); ROOT=$(cd "$HERE/../../../.." && pwd)
( cd "$ROOT" && exec npx vite --host 127.0.0.1 --port "$PORT" --strictPort ) > "$HERE/inspect-server.log" 2>&1 &
SRV=$!; trap 'kill $SRV 2>/dev/null; wait $SRV 2>/dev/null' EXIT
for i in $(seq 1 60); do curl -sf "http://127.0.0.1:$PORT/docs/release-11.1.0/lane-L6/harness/index.html" >/dev/null && break; sleep 2; done
node "$HERE/inspect.mjs" "http://127.0.0.1:$PORT" "$Q" "$EXPR"
