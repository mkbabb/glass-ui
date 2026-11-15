#!/usr/bin/env bash
# analyse6.sh <engine> <rows-dir-name> <log-tag> [nogzip]: judges one engine's rows (no browser) with
# MEASURE-5's judges (m5/judge6.mjs, m5/read5.mjs), then gzips them. As m4/analyse5.sh otherwise.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; R="$H/../rows/$2"; L="$H/../logs"; E="$1"; T="$3"
all=$(ls "$R"/p[345]-*.wi8.$E.*.rows.json* 2>/dev/null) || { echo "no rows for $E"; exit 1; }
F=$(echo "$all" | grep -vE -- "/p[345]-seat-|-overlay-")
node "$H/m5/judge6.mjs" $F > "$L/$T-judge-$E.txt"
node "$H/m5/judge6.mjs" $F --json > "$L/$T-judge-$E.json"
node "$H/m4/gates4.mjs" "$L/$T-judge-$E.json" > "$L/$T-gates-$E.txt"
S=$(echo "$all" | grep -E -- "/p[345]-(seat|seatset)-"); [ -n "$S" ] && node "$H/m3/seat4.mjs" $S > "$L/$T-seat-$E.txt"
S=$(echo "$all" | grep -- "p3-scope\|p3-swap-xf-fine"); [ -n "$S" ] && node "$H/g9b.mjs" $S > "$L/$T-g9-$E.txt"
node "$H/read2.mjs" $all > "$L/$T-read2-$E.txt"
node "$H/m5/read5.mjs" $all > "$L/$T-read5-$E.txt"
S=$(echo "$all" | grep -- "-hover-"); [ -n "$S" ] && node "$H/m4/g6.mjs" $S > "$L/$T-g6-$E.txt"
S=$(echo "$all" | grep -- "-overlay-"); [ -n "$S" ] && { node "$H/overlay3.mjs" $S > "$L/$T-overlay-$E.txt" 2>&1; node "$H/m5/judge6.mjs" $S >> "$L/$T-overlay-$E.txt" 2>&1; }
[ "${4:-}" = nogzip ] || for f in "$R"/p[345]-*.wi8.$E.*.rows.json; do [ -f "$f" ] && gzip -f "$f"; done
echo done
