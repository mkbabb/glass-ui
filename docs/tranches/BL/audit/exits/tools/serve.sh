#!/usr/bin/env bash
# serve.sh <tree> <port>: vite preview of <tree>/dist-demo on 127.0.0.1:<port>; PID in logs/.serve-<port>.pid
#   ~/.claude/guard/guarded --light --timeout 90 -- ./serve.sh v11.0.2 5431 &     stop: ./stop.sh 5431
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
cd "$HERE/../trees/$1"
echo $$ > "$HERE/../logs/.serve-$2.pid"
exec node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --host 127.0.0.1 --port "$2" --strictPort
