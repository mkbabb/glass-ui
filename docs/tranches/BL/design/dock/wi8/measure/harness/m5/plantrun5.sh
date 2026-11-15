#!/usr/bin/env bash
# plantrun5.sh <plant>...: MEASURE-5's counter-tests (m4/plantrun4.sh with plants5.py, run6.sh,
# judge6 and read5). For each plant: apply it, build the page to dist-plant, revert it (source is
# back before any browser runs), read the gate's cells in Chromium and in WebKit 2287 on port 5402,
# and judge them. One guarded run at a time. Output: logs/m5-plant-<plant>.txt; rows: rows/plant5-<plant>/.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"; R="$H/../rows"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; G=~/.claude/guard/guarded
probe_cells() { case "$1" in
  g2-clock) echo p3-fold-pill-fine;; g2-curve) echo p3-fold-layers-fine;; g2-touch) echo p3-fold-transport-coarse;;
  g2-rim) echo p3-fold-rim-fine;; g3-intent) echo "p3-rev-fold-25-ptr p3-rev-fold-50-ptr";;
  g4-inline) echo p3-seat-fine;; g2-held) echo p3-fold-pill-fine;; g4-join) echo p3-seatset-fine;;
  g2-lane) echo "p3-region-fine p3-region-rm p3-fold-outlet-fine p3-fold-fourier-fine";; g4-ghost) echo "p3-seatset-fine p3-seatset-coarse";;
  g4-snap2) echo "p3-seat-coarse p3-seat-long-coarse";; g4-scroll) echo p3-seat-long-coarse;; g6-flow) echo "p3-hover-fine p4-hover-390 p4-hover-key";;
  g9-scope) echo p3-scope-fine;; g10-rm) echo "p3-fold-pill-rm p3-swap-xf-rm p3-swap-layers-rm";;
  g2-fitwhole) echo "p3-fold-pill-fine p3-fold-ctl6-c360 p3-fold-transport-rm";; g2-whole-never) echo "p3-fold-many-coarse p3-fold-many-c360";;
  g2-whole-length) echo p5-many-lift-fine;; g4-openseat) echo "p3-seat-fine";;
  g2-laneinset) echo "p3-fold-pill-fine";; g2-nocut) echo "p3-fold-outlet-fine p3-region-fine";;
  *) echo "";; esac; }
side_cmd() { case "$1" in
  g1-linger) echo "node clock2.mjs 5402 plant5-g1 --engine $2 --only c";;
  g7-provide) echo "env LOG_TAG=plant5-g7 node g7.mjs 5402 --engine $2";;
  g8-hold) echo "env LOG_TAG=plant5-g8 node g8.mjs 5402 --engine $2; node m4/cells.mjs 5402 plant5-g8 --engine $2 --only hoveresc,sheetout";;
  g1-lift) echo "node m4/cells.mjs 5402 plant5-g1-lift --engine $2 --only finger,tapseat,c390";;
  g13-safe) [ "$2" = chromium ] && echo "node m4/cells.mjs 5402 plant5-g13-safe --engine $2 --only safearea";;
  g13-box) echo "env LOG_TAG=plant5-g13 node g13.mjs 5402 --engine $2";;
  g11-rest) [ "$2" = chromium ] && echo "node m4/cost3.mjs 5402 plant5-g11";;
  *) echo "";; esac; }
judge() { local P="$1" F; F=$(ls "$R/plant5-$P"/*.rows.json 2>/dev/null); case "$P" in
  g2-clock|g3-intent|g10-rm|g2-laneinset|g2-nocut) node "$H/m5/judge6.mjs" $F;;
  g4-inline|g4-snap2|g4-scroll) node "$H/m3/seat4.mjs" $F; node "$H/m5/read5.mjs" $F;;
  g9-scope) node "$H/g9b.mjs" $F;;
  g2-curve|g2-touch|g2-rim|g4-join|g2-held|g4-ghost|g2-lane|g2-fitwhole|g2-whole-never|g2-whole-length|g4-openseat) node "$H/m5/read5.mjs" $F;;
  g6-flow) node "$H/m4/g6.mjs" $F; node "$H/m5/read5.mjs" $F;;
  esac; }
for P in "$@"; do
  log="$L/m5-plant-$P.txt"; echo "== $P $(date '+%H:%M:%S') (load $(sysctl -n vm.loadavg))" > "$log"
  python3 "$H/m5/plants5.py" "$P" apply >> "$log" 2>&1 || { echo "apply failed" >> "$log"; continue; }
  case "$P" in
    g12-scale) node "$H/g12.mjs" >> "$log" 2>&1; python3 "$H/m5/plants5.py" "$P" revert >> "$log"; continue;;
    g14-rmclock) (cd "$W" && $G --timeout 20 -- node_modules/.bin/vitest run tests/components/custom/dock/GlassDock.motion-parity.test.ts --maxWorkers=2) >> "$log" 2>&1; python3 "$H/m5/plants5.py" "$P" revert >> "$log"; continue;;
  esac
  (cd "$W" && VITE_DOCK_HOLD=1 $G --timeout 20 -- "$H/build.sh" . dist-plant) > "$L/m5-plant-build.log" 2>&1; echo "build rc=$?" >> "$log"
  python3 "$H/m5/plants5.py" "$P" revert >> "$log" 2>&1
  cells=$(probe_cells "$P"); rm -rf "$R/plant5-$P"; : > "$H/../lists/plant5.txt"; for c in $cells; do echo "proto $c" >> "$H/../lists/plant5.txt"; done
  for E in chromium webkit; do
    cmd=""; [ -n "$cells" ] && cmd="m5/run6.sh $E ../lists/plant5.txt plant5-$P 5402"
    s=$(side_cmd "$P" "$E"); [ -n "$s" ] && cmd="${cmd:+$cmd; }$s"
    [ -z "$cmd" ] && continue
    if [ "$E" = webkit ]; then (cd "$H" && $G --exclusive webkit --timeout 30 -- m3/session3.sh dist-plant 5402 sh -c "$cmd") >> "$log" 2>&1
    else (cd "$H" && $G --timeout 30 --cpu-cores 0 -- m3/session3.sh dist-plant 5402 sh -c "$cmd") >> "$log" 2>&1; fi
    echo "$E rc=$?" >> "$log"
  done
  [ -n "$cells" ] && { echo "-- judge" >> "$log"; judge "$P" >> "$log" 2>&1; }
  for f in "$R/plant5-$P"/*.rows.json; do [ -f "$f" ] && gzip -f "$f"; done
  echo "== done $(date '+%H:%M:%S')" >> "$log"
done
rm -rf "$W/dist-plant"
