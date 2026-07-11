#!/bin/bash
cd "$(dirname "$0")"
for i in 0 1 2 3 4 5; do
  echo "=== CHUNK $i (dark) START $(date +%T) ==="
  ROUTES_JSON="$(cat .jchunk$i.json)" MODES=dark LABEL=jdark-$i node census.mjs 2>&1
done
echo "=== ALL DARK CHUNKS DONE $(date +%T) ==="
