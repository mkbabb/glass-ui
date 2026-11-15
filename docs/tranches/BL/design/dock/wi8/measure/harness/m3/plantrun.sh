#!/usr/bin/env bash
# plantrun.sh <plant>...: MEASURE-3's counter-tests. For each plant: apply it (plants.py), build
# the page to dist-plant, revert it (source is back before any browser runs), read the gate's
# cells in Chromium and in WebKit 2287 against that page on port 5402, and judge them. One
# guarded run at a time. Output: logs/m3-plant-<plant>.txt; rows: rows/plant-<plant>/.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"; R="$H/../rows"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; G=~/.claude/guard/guarded
probe_cells() { case "$1" in
  g2-clock) echo p3-fold-pill-fine;; g2-curve) echo p3-fold-layers-fine;; g2-touch) echo p3-fold-transport-coarse;;
  g2-compact) echo p3-fold-many-coarse;; g2-rim) echo p3-fold-rim-fine;; g3-intent) echo "p3-rev-fold-25-ptr p3-rev-fold-50-ptr";;
  g4-inline) echo p3-seat-fine;; g4-join) echo p3-seatset-fine;; g4-snap) echo "p3-seat-coarse p3-seat-long-coarse";; g4-scroll) echo p3-seat-long-coarse;; g6-flow) echo p3-hover-fine;;
  g9-scope) echo p3-scope-fine;; g10-rm) echo p3-fold-pill-rm;; *) echo "";; esac; }
side_cmd() { case "$1" in
  g1-linger) echo "node clock2.mjs 5402 plant-g1 --engine $2 --only c";;
  g7-provide) echo "env LOG_TAG=plant-g7 node g7.mjs 5402 --engine $2";;
  g8-hold) echo "env LOG_TAG=plant-g8 node g8.mjs 5402 --engine $2";;
  g13-box) echo "env LOG_TAG=plant-g13 node g13.mjs 5402 --engine $2";;
  g11-rest) [ "$2" = chromium ] && echo "node cost2.mjs 5402 plant-g11";;
  *) echo "";; esac; }
judge() { local P="$1" F; F=$(ls "$R/plant-$P"/*.rows.json 2>/dev/null); case "$P" in
  g2-clock|g3-intent|g10-rm) node "$H/m3/judge4.mjs" $F;;
  g4-inline|g4-snap|g4-scroll) node "$H/m3/seat4.mjs" $F;;
  g9-scope) node "$H/g9b.mjs" $F;;
  g2-curve|g2-touch|g2-compact|g2-rim|g4-join|g6-flow) node "$H/m3/read3.mjs" $F;;
  esac; }
for P in "$@"; do
  log="$L/m3-plant-$P.txt"; echo "== $P $(date '+%H:%M:%S') (load $(sysctl -n vm.loadavg))" > "$log"
  python3 "$H/m3/plants.py" "$P" apply >> "$log" 2>&1 || { echo "apply failed" >> "$log"; continue; }
  case "$P" in
    g12-scale) node "$H/g12.mjs" >> "$log" 2>&1; python3 "$H/m3/plants.py" "$P" revert >> "$log"; continue;;
    g14-rmclock) (cd "$W" && $G --timeout 20 -- node_modules/.bin/vitest run tests/components/custom/dock/GlassDock.motion-parity.test.ts --maxWorkers=2) >> "$log" 2>&1; python3 "$H/m3/plants.py" "$P" revert >> "$log"; continue;;
  esac
  (cd "$W" && VITE_DOCK_HOLD=1 $G --timeout 20 -- "$H/build.sh" . dist-plant) > "$L/m3-plant-build.log" 2>&1; echo "build rc=$?" >> "$log"
  python3 "$H/m3/plants.py" "$P" revert >> "$log" 2>&1
  cells=$(probe_cells "$P"); rm -rf "$R/plant-$P"; : > "$H/../lists/plant.txt"; for c in $cells; do echo "proto $c" >> "$H/../lists/plant.txt"; done
  for E in chromium webkit; do
    cmd=""; [ -n "$cells" ] && cmd="m3/run5.sh $E ../lists/plant.txt plant-$P 5402"
    s=$(side_cmd "$P" "$E"); [ -n "$s" ] && cmd="${cmd:+$cmd; }$s"
    [ -z "$cmd" ] && continue
    if [ "$E" = webkit ]; then (cd "$H" && $G --exclusive webkit --timeout 30 -- m3/session3.sh dist-plant 5402 sh -c "$cmd") >> "$log" 2>&1
    else (cd "$H" && $G --timeout 30 --cpu-cores 0 -- m3/session3.sh dist-plant 5402 sh -c "$cmd") >> "$log" 2>&1; fi
    echo "$E rc=$?" >> "$log"
  done
  [ -n "$cells" ] && { echo "-- judge" >> "$log"; judge "$P" >> "$log" 2>&1; }
  for f in "$R/plant-$P"/*.rows.json; do [ -f "$f" ] && gzip -f "$f"; done
  echo "== done $(date '+%H:%M:%S')" >> "$log"
done
rm -rf "$W/dist-plant"
