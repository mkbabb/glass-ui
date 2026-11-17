#!/usr/bin/env bash
# plantrun7.sh <plant>...: MEASURE-7's counter-tests (m6/plantrun6.sh with plants7.py, g6c for g6b, and RULINGS-6's
# instruments for the new plants: fit7 for RU-54's two, g6c's cells for RU-52's, ink7 at the level taken for RU-56's,
# census7 for RU-65's, trig7 and the sheet-out cell for RU-62's, adds7 for step 7's two). Each WebKit run under
# `--exclusive webkit`; the load at each plant's start is in its log's first line. The plants are read on the worktree's dev server (m6/devserve.sh, 127.0.0.1:5402, which
# reads src/ live with the hold build's flag), not on a build per plant: for each plant, apply it, read the gate's
# cells in Chromium and in WebKit 2287, revert it, judge. One guarded browser run at a time. A plant's bite is a
# logic reading; the gate's own readings are the pass's, on the built page. The dev server must be up on 5402.
# Output: logs/m7-plant-<plant>.txt; rows: rows/plant7-<plant>/.
set -u
H="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"; L="$H/../logs"; R="$H/../rows"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; G=~/.claude/guard/guarded
probe_cells() { case "$1" in
  g2-clock) echo p3-fold-pill-fine;; g2-curve) echo p3-fold-layers-fine;; g2-touch) echo p3-fold-transport-coarse;;
  g2-rim) echo p3-fold-rim-fine;; g3-retarget) echo "p3-rev-fold-25-ptr p3-rev-fold-50-ptr p3-rev-unfold-50-out";;
  g2-held) echo p3-fold-pill-fine;; g4-join) echo p3-seatset-fine;;
  g2-lane) echo "p3-region-fine p3-region-rm p3-fold-outlet-fine p3-fold-fourier-fine";; g4-ghost) echo "p3-seatset-fine p3-seatset-coarse";;
  g4-snap2) echo "p3-seat-coarse p3-seat-long-coarse";; g4-scroll) echo p3-seat-long-coarse;; g6-flow|g6-overflow) echo "p3-hover-fine p4-hover-390 p4-hover-key p6-press-fine";;
  g9-scope) echo p3-scope-fine;; g10-rm) echo "p3-fold-pill-rm p3-swap-xf-rm p3-swap-layers-rm";;
  g2-fitwhole) echo "p3-fold-pill-fine p3-fold-ctl6-c360 p3-fold-transport-rm";; g2-whole-never) echo "p3-fold-many-coarse p3-fold-many-c360";;
  g2-whole-length|g2-room) echo p5-many-lift-fine;; g4-openseat) echo "p3-seat-fine";;
  g2-laneinset) echo "p3-fold-pill-fine";; g2-nocut) echo "p3-fold-outlet-fine p3-region-fine";;
  *) echo "";; esac; }
side_cmd() { case "$1" in
  g1-linger) echo "node clock2.mjs 5402 plant7-g1 --engine $2 --only c";;
  g7-provide) echo "env LOG_TAG=plant7-g7 node g7.mjs 5402 --engine $2";;
  g8-hold) echo "env LOG_TAG=plant7-g8 node g8.mjs 5402 --engine $2; node m6/cells6.mjs 5402 plant7-g8 --engine $2 --only hoveresc,sheetout";;
  g1-lift) echo "node m6/cells6.mjs 5402 plant7-g1-lift --engine $2 --only finger,tapseat,c390";;
  g13-safe) [ "$2" = chromium ] && echo "node m6/cells6.mjs 5402 plant7-g13-safe --engine $2 --only safearea";;
  g13-box) echo "env LOG_TAG=plant7-g13 node g13.mjs 5402 --engine $2";;
  g11-rest) [ "$2" = chromium ] && echo "node m7/cost7.mjs 5402 plant7-g11";;
  g14-fitmemory|g14-fitsibs) echo "node m7/fit7.mjs 5402 plant7-$1 --engine $2";;
  g15-baked) echo "node m7/ink7.mjs 5402 plant7-baked --engine $2 --base ../logs/m7-ink-base1102.$2.json";;
  g13-tabsvg) echo "node m7/census7.mjs 5402 plant7-tabsvg --engine $2";;
  g8-trigger) echo "node m7/trig7.mjs 5402 plant7-trigger --engine $2; node m6/cells6.mjs 5402 plant7-trigger --engine $2 --only sheetout,hoveresc";;
  g13-trigseat|g4-groupframe) echo "node m7/adds7.mjs 5402 plant7-$1 --engine $2";;
  *) echo "";; esac; }
judge() { local P="$1" F; F=$(ls "$R/plant7-$P"/*.rows.json 2>/dev/null); case "$P" in
  g2-clock|g3-retarget|g10-rm|g2-laneinset|g2-nocut) node "$H/m6/judge7.mjs" $F;;
  g4-snap2|g4-scroll) node "$H/m3/seat4.mjs" $F; node "$H/m6/read6.mjs" $F;;
  g9-scope) node "$H/g9b.mjs" $F;;
  g2-room) node "$H/m6/read6.mjs" $F; node "$H/m6/judge7.mjs" $F;;
  g2-curve|g2-touch|g2-rim|g4-join|g2-held|g4-ghost|g2-lane|g2-fitwhole|g2-whole-never|g2-whole-length|g4-openseat) node "$H/m6/read6.mjs" $F;;
  g6-flow|g6-overflow) node "$H/m7/g6c.mjs" $F;;
  esac; }
for P in "$@"; do
  log="$L/m7-plant-$P.txt"; echo "== $P $(date '+%H:%M:%S') (load $(sysctl -n vm.loadavg))" > "$log"
  python3 "$H/m7/plants7.py" "$P" apply >> "$log" 2>&1 || { echo "apply failed" >> "$log"; continue; }
  case "$P" in
    g12-scale) node "$H/g12.mjs" >> "$log" 2>&1; python3 "$H/m7/plants7.py" "$P" revert >> "$log"; continue;;
    g14-rmclock) (cd "$W" && $G --timeout 20 -- node_modules/.bin/vitest run tests/components/custom/dock/GlassDock.motion-parity.test.ts --maxWorkers=2) >> "$log" 2>&1; python3 "$H/m7/plants7.py" "$P" revert >> "$log"; continue;;
  esac
  if [ "$P" = g1-lift ]; then (cd "$W" && $G --timeout 10 -- node_modules/.bin/vitest run tests/components/custom/dock/GlassDock.posture.test.ts -t "G-1" --maxWorkers=2) >> "$log" 2>&1; echo "unit rc=$?" >> "$log"; fi
  sleep 3
  cells=$(probe_cells "$P"); rm -rf "$R/plant7-$P"; : > "$H/../lists/plant7.txt"; for c in $cells; do echo "proto $c" >> "$H/../lists/plant7.txt"; done
  for E in chromium webkit; do
    cmd=""; [ -n "$cells" ] && cmd="m6/run7.sh $E ../lists/plant7.txt plant7-$P 5402"
    s=$(side_cmd "$P" "$E"); [ -n "$s" ] && cmd="${cmd:+$cmd; }$s"
    [ -z "$cmd" ] && continue
    if [ "$E" = webkit ]; then (cd "$H" && $G --exclusive webkit --timeout 30 -- sh -c "$cmd") >> "$log" 2>&1
    else (cd "$H" && $G --timeout 30 --cpu-cores 0 -- sh -c "$cmd") >> "$log" 2>&1; fi
    echo "$E rc=$?" >> "$log"
  done
  python3 "$H/m7/plants7.py" "$P" revert >> "$log" 2>&1
  (cd "$W" && git diff --quiet -- src) || { echo "SOURCE NOT CLEAN after $P" >> "$log"; exit 3; }
  [ -n "$cells" ] && { echo "-- judge" >> "$log"; judge "$P" >> "$log" 2>&1; }
  for f in "$R/plant7-$P"/*.rows.json; do [ -f "$f" ] && gzip -f "$f"; done
  echo "== done $(date '+%H:%M:%S')" >> "$log"
done
