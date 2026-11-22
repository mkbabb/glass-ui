#!/usr/bin/env bash
# analysem.sh: MEASURE-9 part M, the probes' judges on rows/m9m in each engine (no browser). pm/analyse.sh (judge8, gates4,
# seat4, read2, read6 with H10's overlap clause and S6's visible extent, g6c on the hover cells, words7, the overlay, the
# void list), then the ninth's: g6d on the press cell (Home last, read to the lift), corner9 on the tall and one-row
# cells, op9 on every fold row (op60 with each engine's sample interval, and G-9's root clause), and RU-71's return run
# twenty times (m6/r30.mjs). Logs: logs/m9m-*-<engine>.txt.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; R="$H/../rows/m9m"; L="$H/../logs"
cd "$H"
for E in chromium webkit; do
  ls "$R"/*.wi8.$E.*.rows.json* > /dev/null 2>&1 || { echo "no rows for $E"; continue; }
  pm/analyse.sh "$E" m9m m9m
  node m9/g6d.mjs "$R"/p9-press-fine.wi8.$E.*.rows.json* > "$L/m9m-g6d-$E.txt" 2>&1
  node m9/corner9.mjs $(ls "$R"/{p9-tall-fine,p9-tall-dark,p3-swap-layers-fine,p3-fold-flow-fine,p3-swap-xf-fine,p3-fold-vert-fine,p3-fold-rail-fine,p9-tallrow-fine,p3-fold-pill-fine}.wi8.$E.*.rows.json* 2>/dev/null) > "$L/m9m-corner9-$E.txt" 2>&1
  node m9/op9.mjs $(ls "$R"/p3-fold-*.wi8.$E.*.rows.json* "$R"/p3-swap-*.wi8.$E.*.rows.json* "$R"/p9-tiers-fine.wi8.$E.*.rows.json* 2>/dev/null | grep -v -- '-rm\.') > "$L/m9m-op9-$E.txt" 2>&1
done
node m6/r30.mjs ../rows/m9m-r30 > "$L/m9m-r30.txt" 2>&1
echo analysed
