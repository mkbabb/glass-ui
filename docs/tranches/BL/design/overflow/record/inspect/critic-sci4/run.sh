#!/usr/bin/env bash
# run.sh <engine> <out.json>: previews the tree's dist-base, dist-v8 and dist-alt on 5741-5743
# as children of this (guarded) call, runs probe-sci4.mjs, and stops all three on exit.
# TREE defaults to ../../../trees/critic-sci-d.
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
TREE="${TREE:-$HERE/../../../trees/critic-sci-d}"
ENGINE="$1"; OUT="$2"
cd "$TREE"
for p in 5741 5742 5743; do if curl -s -o /dev/null --max-time 2 "http://127.0.0.1:$p/"; then echo "port $p is served"; exit 2; fi; done
PIDS=()
for b in base:5741 v8:5742 alt:5743; do
  d=dist-${b%%:*}; p=${b#*:}
  node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir "$d" --host 127.0.0.1 --port "$p" --strictPort > "$TREE/serve-$p.log" 2>&1 &
  PIDS+=($!)
done
trap 'kill "${PIDS[@]}" 2>/dev/null; wait "${PIDS[@]}" 2>/dev/null' EXIT
for p in 5741 5742 5743; do for i in $(seq 1 80); do curl -sf -o /dev/null "http://127.0.0.1:$p/sci4.html" && break; sleep 0.25; done; done
node "$HERE/probe-sci4.mjs" "$ENGINE" "$OUT" base=http://127.0.0.1:5741 v8=http://127.0.0.1:5742 alt=http://127.0.0.1:5743
echo "probe exit $?"
