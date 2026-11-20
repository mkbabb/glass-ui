#!/usr/bin/env bash
# prevtree.sh <tree-dir> <out-dir-name> <port> <command...>: the eighth pass's source seat. vite preview of a tree's
# demo build (m8/build8.sh's <out-dir-name>) on 127.0.0.1:<port>, <command> run from the harness directory, the server
# stopped and the build deleted on exit (the disk rule: a build's dist goes once its cells are read).
set -uo pipefail
H="$(cd "$(dirname "$0")/.." && pwd)"; T="$(cd "$1" && pwd)"; O="$2"; P="$3"; shift 3
(cd "$T" && exec node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir "$O" --host 127.0.0.1 --port "$P" --strictPort >/dev/null 2>&1) & S=$!
trap 'kill $S 2>/dev/null; wait $S 2>/dev/null; rm -rf "$T/$O"; echo "$(date "+%F %T") prevtree: removed $T/$O" >> "$H/../logs/s8-disk.log"' EXIT INT TERM
for i in $(seq 1 240); do curl -sf -o /dev/null "http://127.0.0.1:$P/" && break; sleep 0.5; done
cd "$H" && "$@"
