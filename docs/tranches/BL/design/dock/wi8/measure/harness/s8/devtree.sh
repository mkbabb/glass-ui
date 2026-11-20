#!/usr/bin/env bash
# devtree.sh <tree-dir> <port> <command...>: the eighth pass's source seat. MEASURE-8's pages copied into a `git archive`
# tree (m8/pages8.sh), the tree's vite dev server started on 127.0.0.1:<port> with VITE_DOCK_HOLD=1 (it reads the tree's
# src live, so a plant applied to the tree is read without a build), the harness page warmed, <command> run from the
# harness directory, and the server stopped on exit. Run under the guard as a browser run.
set -uo pipefail
H="$(cd "$(dirname "$0")/.." && pwd)"; T="$(cd "$1" && pwd)"; P="$2"; shift 2
"$H/m8/pages8.sh" "$T" >/dev/null
(cd "$T" && VITE_DOCK_HOLD=1 BROWSER=none exec node node_modules/vite/bin/vite.js --host 127.0.0.1 --port "$P" --strictPort >/dev/null 2>&1) & S=$!
trap 'kill $S 2>/dev/null; wait $S 2>/dev/null' EXIT INT TERM
for i in $(seq 1 240); do curl -sf -o /dev/null "http://127.0.0.1:$P/" && break; sleep 0.5; done
curl -sf -o /dev/null -m 120 "http://127.0.0.1:$P/?c=dock-wi8&cell=w-std"
cd "$H" && "$@"
