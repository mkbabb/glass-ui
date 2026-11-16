#!/usr/bin/env bash
# step34.sh: MEASURE-6 steps 3 (RU-38's cure read) and 4 (RU-44's states read by G-15) on the page built in dist-wi8.
# RU-38: cost5 on the GPU lane (the trigger frames' layouts and reasons), and five fold and swap cells in both
# engines. RU-44: G-15's instrument on the ten compositions for today's plate, step 1 and step 2 at 0.7 to 0.4, and
# the ink deletion on top of each, both engines (token states as unlayered stylesheets, m6/g15/*.css).
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"; G=~/.claude/guard/guarded
cd "$H"
echo "== $(date '+%H:%M:%S') ru38 cost (load $(sysctl -n vm.loadavg))" >> "$L/m6-step34.log"
$G --timeout 30 --cpu-cores 0 -- ./session2.sh node $H/m6/cost5.mjs 5401 m6-ru38b chromium > "$L/m6-ru38b-cost.log" 2>&1
$G --timeout 20 -- ./session2.sh m6/run7.sh chromium ../lists/m6-ru38.txt m6-ru38 > "$L/m6-ru38-cells-chromium.log" 2>&1
$G --exclusive webkit --timeout 20 -- ./session2.sh m6/run7.sh webkit ../lists/m6-ru38.txt m6-ru38 > "$L/m6-ru38-cells-webkit.log" 2>&1
node m6/judge7.mjs ../rows/m6-ru38/*.rows.json > "$L/m6-ru38-judge.txt" 2>&1; for f in ../rows/m6-ru38/*.rows.json; do gzip -f "$f"; done
printf ':root { --glass-veil-dock: calc(var(--glass-veil-base) - 1 * var(--glass-veil-step)); }\n' > m6/g15/s0-today.css
cat m6/g15/s2-level-0.4.css m6/g15/s3-ink.css > m6/g15/s2-level-0.4-ink.css
# RU-44's order: today, step 1, step 2 at 0.7, 0.6, 0.5, 0.4, stopping at the first state GREEN in both engines;
# step 3 (the ink) on top of 0.4 only if 0.4 is not. Today is read in full as the plant's reading.
pass() { node -e 'const fs=require("fs");let ok=true;for(const f of process.argv.slice(1)){try{const d=JSON.parse(fs.readFileSync(f));if(d.summary.failing!==0)ok=false}catch{ok=false}}process.exit(ok?0:1)' "$L/m6-ink-g15-$1.chromium.json" "$L/m6-ink-g15-$1.webkit.json"; }
for S in s0-today s1-alpha s2-level-0.7 s2-level-0.6 s2-level-0.5 s2-level-0.4 s2-level-0.4-ink; do
  for E in chromium webkit; do
    X=""; [ $E = webkit ] && X="--exclusive webkit"
    echo "== $(date '+%H:%M:%S') ink $S $E (load $(sysctl -n vm.loadavg))" >> "$L/m6-step34.log"
    $G $X --timeout 40 -- ./session2.sh node $H/m6/ink.mjs 5401 g15-$S --engine $E --css $H/m6/g15/$S.css --label $S >> "$L/m6-g15-$E.log" 2>&1
  done
  if [ "$S" != s0-today ] && pass $S; then echo "== GREEN at $S" >> "$L/m6-step34.log"; break; fi
done
echo "== $(date '+%H:%M:%S') done" >> "$L/m6-step34.log"
