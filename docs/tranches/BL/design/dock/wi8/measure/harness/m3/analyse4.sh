#!/usr/bin/env bash
# analyse4.sh <engine>: judges MEASURE-3's rows of one engine (no browser), then gzips them.
# judge4 + gates3 over every cell but the open-seat and overlay cells; seat4 over the open-seat
# and seat-set cells; read2 (faces) and read3 (the five behaviours) over every cell; g9b over
# the scope cells and the layer change.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; R="$H/../rows/m3"; L="$H/../logs"; E="$1"
all=$(ls "$R"/p3-*.wi8.$E.*.rows.json* 2>/dev/null) || { echo "no rows for $E"; exit 1; }
F=$(echo "$all" | grep -vE -- "/p3-seat-|-overlay-")
node "$H/m3/judge4.mjs" $F > "$L/m3-judge-$E.txt"
node "$H/m3/judge4.mjs" $F --json > "$L/m3-judge-$E.json"
node "$H/gates3.mjs" "$L/m3-judge-$E.json" > "$L/m3-gates-$E.txt"
node "$H/m3/seat4.mjs" $(echo "$all" | grep -E -- "/p3-(seat|seatset)-") > "$L/m3-seat-$E.txt"
node "$H/g9b.mjs" $(echo "$all" | grep -- "p3-scope\|p3-swap-xf-fine") > "$L/m3-g9-$E.txt"
node "$H/read2.mjs" $all > "$L/m3-read2-$E.txt"
node "$H/m3/read3.mjs" $all > "$L/m3-read3-$E.txt"
node "$H/overlay3.mjs" $(echo "$all" | grep -- "-overlay-") > "$L/m3-overlay-$E.txt" 2>&1
node "$H/m3/judge4.mjs" $(echo "$all" | grep -- "-overlay-") >> "$L/m3-overlay-$E.txt" 2>&1
for f in "$R"/p3-*.wi8.$E.*.rows.json; do [ -f "$f" ] && gzip -f "$f"; done
echo done
