#!/usr/bin/env bash
# serve.sh <tree-dir> <port>: vite preview of the tree's dist-demo on 127.0.0.1:<port>.
# Run in the background under the guard:
#   ~/.claude/guard/guarded --light --timeout 60 -- ./serve.sh <tree> 5371 &
# Stop it by the guard's PID (the guard kills the whole tree).
set -euo pipefail
TREE="$(cd "$1"; pwd)"
PORT="$2"
[ -f "$TREE/dist-demo/index.html" ] || { echo "build first" >&2; exit 2; }
cd "$TREE"
exec node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --host 127.0.0.1 --port "$PORT" --strictPort
