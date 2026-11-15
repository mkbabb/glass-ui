#!/usr/bin/env bash
# analyse5.sh <engine>: judges MEASURE-4's rows of one engine (no browser), then gzips them.
# As m3/analyse4.sh, with judge5 (RU-21), read4 (RU-21 on a removed control), gates4 (p3- and
# p4- names), and g6.mjs over the hover cells.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; R="$H/../rows/m4"; L="$H/../logs"; E="$1"
all=$(ls "$R"/p[34]-*.wi8.$E.*.rows.json* 2>/dev/null) || { echo "no rows for $E"; exit 1; }
F=$(echo "$all" | grep -vE -- "/p[34]-seat-|-overlay-")
node "$H/m4/judge5.mjs" $F > "$L/m4-judge-$E.txt"
node "$H/m4/judge5.mjs" $F --json > "$L/m4-judge-$E.json"
node "$H/m4/gates4.mjs" "$L/m4-judge-$E.json" > "$L/m4-gates-$E.txt"
node "$H/m3/seat4.mjs" $(echo "$all" | grep -E -- "/p[34]-(seat|seatset)-") > "$L/m4-seat-$E.txt"
node "$H/g9b.mjs" $(echo "$all" | grep -- "p3-scope\|p3-swap-xf-fine") > "$L/m4-g9-$E.txt"
node "$H/read2.mjs" $all > "$L/m4-read2-$E.txt"
node "$H/m4/read4.mjs" $all > "$L/m4-read4-$E.txt"
node "$H/m4/g6.mjs" $(echo "$all" | grep -- "-hover-") > "$L/m4-g6-$E.txt"
node "$H/overlay3.mjs" $(echo "$all" | grep -- "-overlay-") > "$L/m4-overlay-$E.txt" 2>&1
node "$H/m4/judge5.mjs" $(echo "$all" | grep -- "-overlay-") >> "$L/m4-overlay-$E.txt" 2>&1
for f in "$R"/p[34]-*.wi8.$E.*.rows.json; do [ -f "$f" ] && gzip -f "$f"; done
echo done
