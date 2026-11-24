#!/usr/bin/env bash
# serve.sh <tree-dir> <port>
# Serves the tree's built dist-demo with vite preview on 127.0.0.1:<port> and writes the
# server's PID to ../trees/.serve-<port>.pid (vite is exec'd in place, so the PID is the
# server). Run in the background under the guard:
#   ~/.claude/guard/guarded --light --timeout 90 -- ./serve.sh ../trees/red 5381 &
# Stop: kill "$(cat ../trees/.serve-5381.pid)"
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
TREE="$(cd "$1" && pwd)"
PORT="$2"
[ -f "$TREE/dist-demo/index.html" ] || { echo "build first: ./build-tree.sh $1" >&2; exit 2; }
cd "$TREE"
echo $$ > "$HERE/../trees/.serve-$PORT.pid"
exec node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --host 127.0.0.1 --port "$PORT" --strictPort
