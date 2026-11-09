#!/usr/bin/env bash
# Serve the branch and trace which calls read style or layout in the mount task.
set -u
HERE=$(cd "$(dirname "$0")" && pwd); TREE=$1; PORT=$2
( cd "$TREE" && exec npx vite --host 127.0.0.1 --port "$PORT" --strictPort ) > /dev/null 2>&1 &
SRV=$!; trap 'kill $SRV 2>/dev/null; wait $SRV 2>/dev/null' EXIT
for i in $(seq 1 60); do curl -sf "http://127.0.0.1:$PORT/docs/release-11.1.0/lane-L2/harness/index.html" >/dev/null && break; sleep 2; done
node "$HERE/mount-trace-probe.mjs" "http://127.0.0.1:$PORT"
