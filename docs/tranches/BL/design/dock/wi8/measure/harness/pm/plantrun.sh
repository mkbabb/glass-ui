#!/usr/bin/env bash
# plantrun.sh <plant>: MEASURE-8 part M, one counter-test. m8/plantrun8.sh's and m7/plantrun7.sh's cells and judges, on the
# measure's tree of the tip (.pm-tip, pm/plant.py), never the worktree: apply the plant, read its gate's cells in Chromium
# and in WebKit 2287 against the tree's dev server (127.0.0.1:5404, pm/runq.py's `plant` server, which reads the tree's src
# live), revert it (also on exit), check the tree's src equals HEAD, judge. Each browser run under the guard (WebKit under
# `--exclusive webkit`; Chromium with `--cpu-cores 0`, as plantrun8 ran them). A unit plant runs the unit in the tree.
# Output: logs/pm-plant-<plant>.txt (its first line carries the load); rows: rows/pm-plant-<plant>/.
set -u
H="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"; L="$H/../logs"; R="$H/../rows"; T=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.pm-tip; G=~/.claude/guard/guarded
P="$1"; log="$L/pm-plant-$P.txt"; tmp="$L/pm-plant-$P.txt.part"
probe_cells() { case "$1" in
  g2-clock|g2-held|g2-laneinset) echo p3-fold-pill-fine;; g2-curve) echo p3-fold-layers-fine;; g2-touch) echo p3-fold-transport-coarse;;
  g2-rim) echo p3-fold-rim-fine;; g3-retarget) echo "p3-rev-fold-25-ptr p3-rev-fold-50-ptr p3-rev-unfold-50-out";;
  g4-join) echo p3-seatset-fine;; g2-lane) echo "p3-region-fine p3-region-rm p3-fold-outlet-fine p3-fold-fourier-fine";;
  g4-ghost) echo "p3-seatset-fine p3-seatset-coarse";; g4-snap2) echo "p3-seat-coarse p3-seat-long-coarse";; g4-scroll) echo p3-seat-long-coarse;;
  g6-flow|g6-overflow) echo "p3-hover-fine p4-hover-390 p4-hover-key p6-press-fine";; g9-scope) echo p3-scope-fine;;
  g10-rm) echo "p3-fold-pill-rm p3-swap-xf-rm p3-swap-layers-rm";; g2-fitwhole) echo "p3-fold-pill-fine p3-fold-ctl6-c360 p3-fold-transport-rm";;
  g2-whole-never) echo "p3-fold-many-coarse p3-fold-many-c360";; g2-whole-length|g2-room) echo p5-many-lift-fine;; g4-openseat) echo p3-seat-fine;;
  g2-nocut) echo "p3-fold-outlet-fine p3-region-fine";; g2-facehalf) echo "p3-fold-pill-fine p3-fold-rim-coarse p3-fold-ctl-te-parent-coarse";;
  *) echo "";; esac; }
side_cmd() { local E="$2"; case "$1" in
  g1-linger) echo "node clock2.mjs 5404 pm-g1-linger --engine $E --only c";;
  g1-lift) echo "node m6/cells6.mjs 5404 pm-g1-lift --engine $E --only finger,tapseat,c390";;
  g7-provide) echo "env LOG_TAG=pm-g7-provide node g7.mjs 5404 --engine $E";;
  g8-hold) echo "env LOG_TAG=pm-g8-hold node g8.mjs 5404 --engine $E; node m6/cells6.mjs 5404 pm-g8-hold --engine $E --only hoveresc,sheetout";;
  g8-exempt|g8-trigger) echo "node m8/trig8.mjs 5404 pm-$1 --engine $E";;
  touchcure) echo "node m8/trig8.mjs 5404 pm-touchcure --engine $E --only select-touch,sheet-touch,sheet-touch-scrim";;
  g13-safe) [ "$E" = chromium ] && echo "node m6/cells6.mjs 5404 pm-g13-safe --engine $E --only safearea";;
  g13-box) echo "env LOG_TAG=pm-g13-box node g13.mjs 5404 --engine $E";;
  g11-rest) [ "$E" = chromium ] && echo "node m8/cost8.mjs 5404 pm-g11-rest --reps 1" || echo "node m8/cost8.mjs 5404 pm-g11-rest --engine webkit";;
  g14-fitmemory|g14-fitsibs) echo "node m7/fit7.mjs 5404 pm-$1 --engine $E";;
  g15-baked|g15-onestep) echo "node m8/ink8.mjs 5404 pm-$1 --engine $E --pages nav,rail,figure-tools,dials,canvas-tools,action-row,loose --base ../logs/m8-ink-base.$E.json";;
  g13-tabsvg|iconword) echo "node m8/census8.mjs 5404 pm-$1 --engine $E";;
  facerule) echo "node s8/face8.mjs 5404 pm-facerule --engine $E";;
  g13-trigseat|g4-groupframe) echo "node m7/adds7.mjs 5404 pm-$1 --engine $E";;
  dark) echo "node s8/level8.mjs 5404 pm-dark --engine $E";;
  fold) echo "node s8/fold8b.mjs 5404 pm-fold --engine $E";;
  mark) echo "node s8/mark8.mjs 5404 pm-mark --engine $E";;
  *) echo "";; esac; }
unit_cmd() { case "$1" in
  g1-lift) echo "tests/components/custom/dock/GlassDock.posture.test.ts -t G-1";;
  mark) echo "tests/components/custom/dock/GlassDock.run-mark.test.ts";;
  g14-rmclock) echo "tests/components/custom/dock/GlassDock.motion-parity.test.ts";;
  *) echo "";; esac; }
judge() { local F; F=$(ls "$R/pm-plant-$P"/*.rows.json 2>/dev/null); [ -z "$F" ] && return; case "$P" in
  g2-clock|g3-retarget|g10-rm|g2-laneinset|g2-nocut|g2-facehalf) for E in chromium webkit; do echo "-- judge8 $E"; node "$H/m8/judge8.mjs" $(ls "$R/pm-plant-$P"/*.$E.*.rows.json 2>/dev/null); done;;
  g4-snap2|g4-scroll) node "$H/m3/seat4.mjs" $F; node "$H/m6/read6.mjs" $F;;
  g9-scope) node "$H/g9b.mjs" $F;;
  g2-room) node "$H/m6/read6.mjs" $F; node "$H/m8/judge8.mjs" $F;;
  g4-ghost) node "$H/m6/read6.mjs" $F; node "$H/m8/judge8.mjs" $F | tail -30;;
  g6-flow|g6-overflow) node "$H/m7/g6c.mjs" $F;;
  *) node "$H/m6/read6.mjs" $F;;
  esac; }
revert() { if [ -d "$T/.pm-orig/$P" ]; then python3 "$H/pm/plant.py" "$T" "$P" revert >> "$tmp" 2>&1; fi; }
trap revert EXIT INT TERM
echo "== $P $(date '+%F %T') (load $(sysctl -n vm.loadavg))" > "$tmp"
python3 "$H/pm/plant.py" "$T" "$P" check >> "$tmp" 2>&1 || { echo "plant site not on the tip" >> "$tmp"; mv "$tmp" "$log"; trap - EXIT; exit 0; }
if [ "$P" = g12-scale ]; then
  echo "-- the tree's src as built" >> "$tmp"; G12_TREE="$T" node "$H/pm/g12.mjs" >> "$tmp" 2>&1
  python3 "$H/pm/plant.py" "$T" "$P" apply >> "$tmp" 2>&1
  echo "-- under the plant" >> "$tmp"; G12_TREE="$T" node "$H/pm/g12.mjs" >> "$tmp" 2>&1
  revert; python3 "$H/pm/clean.py" "$T" >> "$tmp" 2>&1 || { mv "$tmp" "$log"; exit 3; }
  echo "== done $(date '+%F %T')" >> "$tmp"; mv "$tmp" "$log"; exit 0
fi
python3 "$H/pm/plant.py" "$T" "$P" apply >> "$tmp" 2>&1 || { echo "apply failed" >> "$tmp"; mv "$tmp" "$log"; exit 0; }
sleep 4
u=$(unit_cmd "$P")
if [ -n "$u" ]; then (cd "$T" && $G --timeout 15 -- node_modules/.bin/vitest run $u --maxWorkers=2 --reporter=verbose 2>&1 | grep -E "✓|×|✗|FAIL|Tests |Test Files|AssertionError|expected" | head -60) >> "$tmp" 2>&1; echo "unit rc=$?" >> "$tmp"; fi
cells=$(probe_cells "$P"); rm -rf "$R/pm-plant-$P"; lst="$H/../lists/pm-plant-$P.txt"; : > "$lst"; for c in $cells; do echo "proto $c" >> "$lst"; done
for E in chromium webkit; do
  cmd=""; [ -n "$cells" ] && cmd="m6/run7.sh $E ../lists/pm-plant-$P.txt pm-plant-$P 5404"
  s=$(side_cmd "$P" "$E"); [ -n "$s" ] && cmd="${cmd:+$cmd; }$s"
  [ -z "$cmd" ] && continue
  echo "-- $E $(date '+%T') (load $(sysctl -n vm.loadavg))" >> "$tmp"
  if [ "$E" = webkit ]; then (cd "$H" && $G --exclusive webkit --timeout 45 -- sh -c "$cmd") >> "$tmp" 2>&1
  else (cd "$H" && $G --timeout 45 --cpu-cores 0 -- sh -c "$cmd") >> "$tmp" 2>&1; fi
  echo "$E rc=$?" >> "$tmp"
done
revert
python3 "$H/pm/clean.py" "$T" >> "$tmp" 2>&1 || { echo "TREE NOT CLEAN after $P" >> "$tmp"; mv "$tmp" "$log"; exit 3; }
[ -n "$cells" ] && { echo "-- judge" >> "$tmp"; (cd "$H" && judge) >> "$tmp" 2>&1; }
for f in "$R/pm-plant-$P"/*.rows.json; do [ -f "$f" ] && gzip -f "$f"; done
echo "== done $(date '+%F %T')" >> "$tmp"
mv "$tmp" "$log"
