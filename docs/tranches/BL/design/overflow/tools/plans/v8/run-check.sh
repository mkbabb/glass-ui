#!/usr/bin/env bash
# run-check.sh <outdir>: previews the tree's dist-base (5631) and dist-v8 (5633) and runs
# check-overflow.mjs over the twelve demo routes the critic read, base then v8, Chromium,
# 390 touch and 1440 light; the servers stop on exit. TREE defaults to ../../../trees/v8.
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
TREE="${TREE:-$HERE/../../../trees/v8}"
OUTDIR="$(cd "$1" && pwd)"
CHECK="$HERE/../../../check-overflow.mjs"
cd "$TREE"
for p in 5631 5633; do if curl -s -o /dev/null --max-time 2 "http://127.0.0.1:$p/"; then echo "port $p is served"; exit 2; fi; done
node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir dist-base --host 127.0.0.1 --port 5631 --strictPort > "$TREE/serve-5631.log" 2>&1 &
P1=$!
node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir dist-v8 --host 127.0.0.1 --port 5633 --strictPort > "$TREE/serve-5633.log" 2>&1 &
P2=$!
trap 'kill $P1 $P2 2>/dev/null; wait $P1 $P2 2>/dev/null' EXIT
for p in 5631 5633; do for i in $(seq 1 80); do curl -sf -o /dev/null "http://127.0.0.1:$p/" && break; sleep 0.25; done; done
ROUTES="containers/configurator containers/sheet navigation/tabs motion/springs forms/labeled-field forms/toggle data/timeline dock/nav dock/rail dock/chrome substrates/aurora substrates/blob"
for b in base:5631 v8:5633; do
  name=${b%%:*}; port=${b#*:}
  args=()
  for r in $ROUTES; do args+=(--url "http://127.0.0.1:$port/$r"); done
  node "$CHECK" "${args[@]}" --cells 390t-light,1440-light --settle 1500 --json "$OUTDIR/check-$name.chromium.json" > "$OUTDIR/check-$name.log" 2>&1
  echo "$name check exit $?"
done
