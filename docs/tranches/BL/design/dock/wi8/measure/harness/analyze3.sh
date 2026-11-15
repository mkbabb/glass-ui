#!/usr/bin/env bash
# analyze3.sh <engine>: judges the PROTOTYPE-3 rows of one engine (no browser), then gzips them.
set -u
H="$(cd "$(dirname "$0")" && pwd)"; R="$H/../rows/p3"; L="$H/../logs"; E="$1"
ls "$R"/p3-*.wi8.$E.*.rows.json* > /dev/null 2>&1 || { echo "no rows for $E"; exit 1; }
F=$(ls "$R"/p3-*.wi8.$E.*.rows.json* | grep -v -- "-seat-\|-overlay-" )
node "$H/judge3.mjs" $F > "$L/judge-p3-$E.txt"
node "$H/judge3.mjs" $F --json > "$L/judge-p3-$E.json"
node "$H/gates3.mjs" "$L/judge-p3-$E.json" > "$L/gates-p3-$E.txt"
node "$H/seat3.mjs" $(ls "$R"/p3-seat-*.wi8.$E.*.rows.json* "$R"/p3-seatset-*.wi8.$E.*.rows.json* 2>/dev/null) > "$L/seat-p3-$E.txt"
node "$H/g9b.mjs" $(ls "$R"/p3-scope*.wi8.$E.*.rows.json* "$R"/p3-swap-xf-fine.wi8.$E.*.rows.json*) > "$L/g9-p3-$E.txt"
for f in "$R"/p3-*.wi8.$E.*.rows.json; do [ -f "$f" ] && gzip -f "$f"; done
node "$H/overlay3.mjs" "$R"/p3-overlay-*.wi8.$E.*.rows.json.gz > "$L/overlay-p3-$E.txt"
node "$H/judge3.mjs" "$R"/p3-overlay-*.wi8.$E.*.rows.json.gz >> "$L/overlay-p3-$E.txt"
echo done
