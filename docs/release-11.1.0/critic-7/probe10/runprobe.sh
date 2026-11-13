#!/usr/bin/env bash
# One guarded browser run: serve <tree> on <port>, run the critic-7 probe in <engine>, stop the server.
#   runprobe.sh <tree-root> <port> <engine> <label>
set -u
TREE=$1; PORT=$2; ENGINE=$3; LABEL=$4
HERE=$(cd "$(dirname "$0")" && pwd)
OUT=$HERE/out; mkdir -p "$OUT"
D=$TREE/docs/release-11.1.0/critic-7/probe10
if [ "$D" != "$HERE" ]; then mkdir -p "$D"; rm -rf "$D/harness"; cp -R "$HERE/harness" "$D/"; fi
# Every tree here shares one Vite optimize cache (node_modules is one symlinked folder),
# so a server started after another tree's re-optimizes its dependencies. A page loaded
# while that runs can hold two copies of Vue (state changes, nothing re-renders). So:
# a first server pass loads the harness modules and settles the cache, and is stopped;
# the probe runs against a second server that starts on a settled cache.
( cd "$TREE" && exec npx vite --host 127.0.0.1 --port "$PORT" --strictPort ) > "$OUT/$LABEL-$ENGINE-warm.log" 2>&1 &
WARM=$!
for i in $(seq 1 90); do
  curl -sf "http://127.0.0.1:$PORT/docs/release-11.1.0/critic-7/probe10/harness/index.html" > /dev/null && break
  kill -0 $WARM 2>/dev/null || { echo "warm server exited early"; exit 3; }
  sleep 2
done
curl -sf "http://127.0.0.1:$PORT/docs/release-11.1.0/critic-7/probe10/harness/harness.ts" > /dev/null
sleep 20
curl -sf "http://127.0.0.1:$PORT/docs/release-11.1.0/critic-7/probe10/harness/harness.ts" > /dev/null
kill $WARM 2>/dev/null; wait $WARM 2>/dev/null
( cd "$TREE" && exec npx vite --host 127.0.0.1 --port "$PORT" --strictPort ) > "$OUT/$LABEL-$ENGINE-server.log" 2>&1 &
SRV=$!
trap 'kill $SRV 2>/dev/null; wait $SRV 2>/dev/null' EXIT
for i in $(seq 1 90); do
  curl -sf "http://127.0.0.1:$PORT/docs/release-11.1.0/critic-7/probe10/harness/index.html" > /dev/null && break
  kill -0 $SRV 2>/dev/null || { echo "server exited early"; exit 3; }
  sleep 2
done
node "$HERE/probe.mjs" "$ENGINE" "http://127.0.0.1:$PORT" "$OUT" "$LABEL"
