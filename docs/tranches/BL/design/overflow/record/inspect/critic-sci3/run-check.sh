#!/usr/bin/env bash
# run-check.sh: previews dist-base (5591) and dist-cure (5592) and runs check-overflow.mjs
# over the demo routes the patch touches, base then cure; the servers stop on exit.
set -uo pipefail
cd "$(dirname "$0")"
CHECK=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/overflow/check-overflow.mjs
for p in 5591 5592; do if curl -s -o /dev/null --max-time 2 "http://127.0.0.1:$p/"; then echo "port $p is served"; exit 2; fi; done
node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir dist-base --host 127.0.0.1 --port 5591 --strictPort > serve-5591.log 2>&1 &
P1=$!
node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir dist-cure --host 127.0.0.1 --port 5592 --strictPort > serve-5592.log 2>&1 &
P2=$!
trap 'kill $P1 $P2 2>/dev/null; wait $P1 $P2 2>/dev/null' EXIT
for p in 5591 5592; do for i in $(seq 1 80); do curl -sf -o /dev/null "http://127.0.0.1:$p/" && break; sleep 0.25; done; done
ROUTES="containers/configurator containers/sheet navigation/tabs motion/springs forms/labeled-field forms/toggle data/timeline dock/nav dock/rail dock/chrome substrates/aurora substrates/blob"
for b in base:5591 cure:5592; do
  name=${b%%:*}; port=${b#*:}
  args=()
  for r in $ROUTES; do args+=(--url "http://127.0.0.1:$port/$r"); done
  node "$CHECK" "${args[@]}" --cells 390t-light,1440-light --settle 1500 --json "check-$name.json" > "check-$name.log" 2>&1
  echo "$name check exit $?"
done
