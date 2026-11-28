#!/usr/bin/env bash
# run.sh <engine> <out.json> [probe.mjs]: previews the tree's dist-base, dist-v7 and dist-v8
# on 5631-5633 as children of this (guarded) call, runs the probe, and stops all three on
# exit. TREE defaults to ../../../trees/v8.
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
TREE="${TREE:-$HERE/../../../trees/v8}"
ENGINE="$1"; OUT="$2"; SCRIPT="${3:-probe.mjs}"
cd "$TREE"
for p in 5631 5632 5633; do if curl -s -o /dev/null --max-time 2 "http://127.0.0.1:$p/"; then echo "port $p is served"; exit 2; fi; done
PIDS=()
for b in base:5631 v7:5632 v8:5633; do
  d=dist-${b%%:*}; p=${b#*:}
  node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir "$d" --host 127.0.0.1 --port "$p" --strictPort > "$TREE/serve-$p.log" 2>&1 &
  PIDS+=($!)
done
trap 'kill "${PIDS[@]}" 2>/dev/null; wait "${PIDS[@]}" 2>/dev/null' EXIT
for p in 5631 5632 5633; do for i in $(seq 1 80); do curl -sf -o /dev/null "http://127.0.0.1:$p/sci.html" && break; sleep 0.25; done; done
node "$HERE/$SCRIPT" "$ENGINE" "$OUT" base=http://127.0.0.1:5631 v7=http://127.0.0.1:5632 v8=http://127.0.0.1:5633
echo "probe exit $?"
