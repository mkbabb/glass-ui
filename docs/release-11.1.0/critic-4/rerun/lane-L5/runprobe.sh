#!/usr/bin/env bash
# One guarded browser run: serve <tree> with vite on <port>, run probe.mjs in <engine>,
# and stop the server.
#   runprobe.sh <tree-root> <port> <engine> <label> <green|red>
set -u
TREE=$1; PORT=$2; ENGINE=$3; LABEL=$4; KIND=$5
HERE=$(cd "$(dirname "$0")" && pwd)
OUT=$HERE/out
mkdir -p "$OUT"
( cd "$TREE" && exec npx vite --host 127.0.0.1 --port "$PORT" --strictPort ) > "$OUT/$LABEL-$ENGINE-server.log" 2>&1 &
SRV=$!
trap 'kill $SRV 2>/dev/null; wait $SRV 2>/dev/null' EXIT
for i in $(seq 1 90); do
  curl -sf "http://127.0.0.1:$PORT/docs/release-11.1.0/lane-L5/harness/index.html" > /dev/null && break
  kill -0 $SRV 2>/dev/null || { echo "server exited early"; exit 3; }
  sleep 2
done
node "$HERE/probe.mjs" "$ENGINE" "http://127.0.0.1:$PORT" "$OUT" "$LABEL" "$KIND"
