#!/usr/bin/env bash
# dev9.sh <port> <command...>: the ninth pass's source seat. .s9-cand's vite dev server on 127.0.0.1:<port> with
# VITE_DOCK_HOLD=1 (it reads the tree's src live, so a plant applied to the tree is read without a build), the harness
# pages warmed, <command> run from the harness directory, the server stopped on exit. Run inside the guard as a browser run.
set -uo pipefail
H="$(cd "$(dirname "$0")/.." && pwd)"; T=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.s9-cand; P="$1"; shift
(cd "$T" && VITE_DOCK_HOLD=1 BROWSER=none exec node node_modules/vite/bin/vite.js --host 127.0.0.1 --port "$P" --strictPort >/dev/null 2>&1) & S=$!
trap 'kill $S 2>/dev/null; wait $S 2>/dev/null' EXIT INT TERM
for i in $(seq 1 240); do curl -sf -o /dev/null "http://127.0.0.1:$P/" && break; sleep 0.5; done
for u in "?c=dock-wi8&cell=w-std" "?c=dock-comp&page=nav&ground=field"; do curl -sf -o /dev/null -m 120 "http://127.0.0.1:$P/$u"; done
cd "$H" && sh -c "$*"
