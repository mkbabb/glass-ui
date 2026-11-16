#!/usr/bin/env bash
# session7.sh <tree> <out-dir-name> <port> <cmd...>: session2.sh for any tree: starts `vite preview` of <tree>/<out> on
# 127.0.0.1:<port>, runs the command from the harness directory, stops the server by PID.
set -uo pipefail
HERE="$(cd "$(dirname "$0")/.." && pwd)"
T="$1"; O="$2"; P="$3"; shift 3
cd "$T"; node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir "$O" --host 127.0.0.1 --port "$P" --strictPort >/dev/null 2>&1 & P1=$!
trap 'kill $P1 2>/dev/null; wait $P1 2>/dev/null' EXIT
for i in $(seq 1 60); do curl -sf -o /dev/null "http://127.0.0.1:$P/" && break; sleep 0.5; done
cd "$HERE"; "$@"
