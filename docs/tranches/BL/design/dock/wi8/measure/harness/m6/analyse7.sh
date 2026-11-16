#!/usr/bin/env bash
# analyse7.sh <engine> <rows-dir-name> <log-tag>: m5/analyse6.sh with MEASURE-6's judges (judge7, read6, g6b,
# words), then gzips the rows. Also lists the cells read at a load over 36 (void, to read again).
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; R="$H/../rows/$2"; L="$H/../logs"; E="$1"; T="$3"
all=$(ls "$R"/p[3456]-*.wi8.$E.*.rows.json* 2>/dev/null) || { echo "no rows for $E"; exit 1; }
F=$(echo "$all" | grep -vE -- "/p[3456]-seat-|-overlay-|/p6-")
node "$H/m6/judge7.mjs" $F > "$L/$T-judge-$E.txt"
node "$H/m6/judge7.mjs" $F --json > "$L/$T-judge-$E.json"
node "$H/m4/gates4.mjs" "$L/$T-judge-$E.json" > "$L/$T-gates-$E.txt"
S=$(echo "$all" | grep -E -- "/p[345]-(seat|seatset)-"); [ -n "$S" ] && node "$H/m3/seat4.mjs" $S > "$L/$T-seat-$E.txt"
S=$(echo "$all" | grep -- "p3-scope\|p3-swap-xf-fine"); [ -n "$S" ] && node "$H/g9b.mjs" $S > "$L/$T-g9-$E.txt"
node "$H/read2.mjs" $all > "$L/$T-read2-$E.txt"
node "$H/m6/read6.mjs" $all > "$L/$T-read6-$E.txt"
S=$(echo "$all" | grep -E -- "-hover-|p6-press"); [ -n "$S" ] && node "$H/m6/g6b.mjs" $S > "$L/$T-g6-$E.txt"
S=$(echo "$all" | grep -- "p6-words"); [ -n "$S" ] && node "$H/m6/words.mjs" $S > "$L/$T-words-$E.txt"
S=$(echo "$all" | grep -- "-overlay-"); [ -n "$S" ] && { node "$H/overlay3.mjs" $S > "$L/$T-overlay-$E.txt" 2>&1; node "$H/m6/judge7.mjs" $S >> "$L/$T-overlay-$E.txt" 2>&1; }
node -e '
const fs=require("fs"),z=require("zlib");const out=[];
for(const f of process.argv.slice(1)){const raw=fs.readFileSync(f);const d=JSON.parse((f.endsWith(".gz")?z.gunzipSync(raw):raw).toString());const l=d.meta.load||[0,0];if(Math.max(...l)>36)out.push(d.meta.scenario+" "+l.join("/"));}
console.log(out.length?out.join("\n"):"none");' $all > "$L/$T-void-$E.txt"
for f in "$R"/p[3456]-*.wi8.$E.*.rows.json; do [ -f "$f" ] && gzip -f "$f"; done
echo done
