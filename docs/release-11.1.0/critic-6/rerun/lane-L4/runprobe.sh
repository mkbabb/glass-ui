#!/usr/bin/env bash
# One guarded browser run: serve <tree> with vite on <port>, run probe.mjs in <engine>,
# then fontprobe.mjs (it serves <package-root> itself), and stop the server.
#   runprobe.sh <tree-root> <package-root> <port> <engine> <label> <green|red>
set -u
TREE=$1; PKG=$2; PORT=$3; ENGINE=$4; LABEL=$5; KIND=$6
HERE=$(cd "$(dirname "$0")" && pwd)
OUT=$HERE/out
mkdir -p "$OUT"
( cd "$TREE" && exec npx vite --host 127.0.0.1 --port "$PORT" --strictPort ) > "$OUT/$LABEL-$ENGINE-server.log" 2>&1 &
SRV=$!
trap 'kill $SRV 2>/dev/null; wait $SRV 2>/dev/null' EXIT
for i in $(seq 1 90); do
  curl -sf "http://127.0.0.1:$PORT/docs/release-11.1.0/lane-L4/harness/index.html" > /dev/null && break
  kill -0 $SRV 2>/dev/null || { echo "server exited early"; exit 3; }
  sleep 2
done
node "$HERE/probe.mjs" "$ENGINE" "http://127.0.0.1:$PORT" "$OUT" "$LABEL" "$KIND"; rc1=$?
node "$HERE/fontprobe.mjs" "$ENGINE" "$PKG" "$OUT" "$LABEL"; rc2=$?
echo "probe exit $rc1, fontprobe exit $rc2"
[ $rc1 -eq 0 ] && [ $rc2 -eq 0 ]
