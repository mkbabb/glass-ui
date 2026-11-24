#!/usr/bin/env bash
# serve.sh <tree-dir> <out-dir-name> <port>
# vite preview of <tree>/<out-dir-name> on 127.0.0.1:<port>; the server is exec'd in
# place and its PID written to trees/.serve-<port>.pid. Run in the background:
#   ~/.claude/guard/guarded --light --timeout 90 -- tools/serve.sh trees/v11.1.1 dist-base 5391 &
# Stop: tools/stop.sh 5391
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
TREE="$(cd "$1" && pwd)"; OUTDIR="$2"; PORT="$3"
[ -f "$TREE/$OUTDIR/index.html" ] || { echo "build first" >&2; exit 2; }
cd "$TREE"
echo $$ > "$HERE/../trees/.serve-$PORT.pid"
exec node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir "$OUTDIR" --host 127.0.0.1 --port "$PORT" --strictPort
