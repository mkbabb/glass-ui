#!/usr/bin/env bash
# One guarded browser run: serve the scratch worktree with vite, run the probe in one engine, stop the server.
#   run.sh <port> <engine> <out-dir> <modes>
set -u
PORT=$1; ENGINE=$2; OUT=$3; MODES=$4
HERE=$(cd "$(dirname "$0")" && pwd)
TREE=$(cd "$HERE/../.." && pwd)
mkdir -p "$OUT"
( cd "$TREE" && exec npx vite --host 127.0.0.1 --port "$PORT" --strictPort ) > "$OUT/$ENGINE-server.log" 2>&1 &
SRV=$!
trap 'kill $SRV 2>/dev/null; wait $SRV 2>/dev/null' EXIT
for i in $(seq 1 90); do
  curl -sf "http://127.0.0.1:$PORT/proto/challenge/index.html" > /dev/null && break
  kill -0 $SRV 2>/dev/null || { echo "server exited early"; exit 3; }
  sleep 2
done
cd "$HERE" && node "$HERE/probe.mjs" "$ENGINE" "http://127.0.0.1:$PORT" "$OUT" "$MODES" "${5:-}" "${6:-}"
