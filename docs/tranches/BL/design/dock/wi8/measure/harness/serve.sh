#!/usr/bin/env bash
# serve.sh <tree-dir> <out-dir-name> <port>   vite preview of a built page; PID in harness/.serve-<port>.pid
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
TREE="$(cd "$1" && pwd)"
cd "$TREE"
echo $$ > "$HERE/.serve-$3.pid"
exec node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir "$2" --host 127.0.0.1 --port "$3" --strictPort
