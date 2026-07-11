#!/bin/bash
cd "$(dirname "$0")"
N=$(ls .cchunk*.json | wc -l | tr -d ' ')
for ((i=0;i<N;i++)); do
  echo "=== CCHUNK $i (dark) START $(date +%T) ==="
  ROUTES_JSON="$(cat .cchunk$i.json)" MODES=dark LABEL=cdark-$i node census.mjs 2>&1
done
echo "=== ALL CURRENT DARK CHUNKS DONE $(date +%T) ==="
