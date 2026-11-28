#!/usr/bin/env bash
# run.sh <engine> <out.json>: previews dist-base on 5591 and dist-cure on 5592 as children
# of this guarded call, runs probe.mjs, and stops both on exit.
set -uo pipefail
cd "$(dirname "$0")"
ENGINE="$1"; OUT="$2"; SCRIPT="${3:-probe.mjs}"
for p in 5591 5592; do if curl -s -o /dev/null --max-time 2 "http://127.0.0.1:$p/"; then echo "port $p is served"; exit 2; fi; done
node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir dist-base --host 127.0.0.1 --port 5591 --strictPort > serve-5591.log 2>&1 &
P1=$!
node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir dist-cure --host 127.0.0.1 --port 5592 --strictPort > serve-5592.log 2>&1 &
P2=$!
trap 'kill $P1 $P2 2>/dev/null; wait $P1 $P2 2>/dev/null' EXIT
for p in 5591 5592; do for i in $(seq 1 80); do curl -sf -o /dev/null "http://127.0.0.1:$p/sci.html" && break; sleep 0.25; done; done
node "$SCRIPT" "$ENGINE" "$OUT" base=http://127.0.0.1:5591 v7=http://127.0.0.1:5592
echo "probe exit $?"
