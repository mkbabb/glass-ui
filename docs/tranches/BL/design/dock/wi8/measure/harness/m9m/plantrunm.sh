#!/usr/bin/env bash
# plantrunm.sh <plant>: MEASURE-9 part M, one counter-test (pm/plantrun.sh's frame with the ninth's cells and judges). The
# plant (m9m/plantm.py) is applied to the measure's tree of the ninth tip (.m9m-tip), never the worktree; its gate's cells
# are read in Chromium and in WebKit 2287 against the tree's dev server (127.0.0.1:5474, runqm.py's `plant` server, which
# reads the tree's src live); it is reverted (also on exit), the tree's src checked equal to HEAD, and judged. Each browser
# run under the guard (WebKit `--exclusive webkit`; Chromium `--cpu-cores 0`, as part M of the eighth ran them; the cost
# plants' Chromium on the GPU lane). A unit plant runs the unit in the tree. Log: logs/m9m-plant-<plant>.txt (its first
# line carries the load); rows: rows/m9m-plant-<plant>/.
set -u
H="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"; L="$H/../logs"; R="$H/../rows"; T=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.m9m-tip; G=~/.claude/guard/guarded
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8
P="$1"; log="$L/m9m-plant-$P.txt"; tmp="$log.part"; PL="$H/m9m/plantm.py"
probe_cells() { case "$1" in
  g2-clock|g2-held|g2-laneinset|g2-step) echo p3-fold-pill-fine;; g2-curve) echo "p9-tall-fine p9-tall-dark p3-swap-layers-fine p3-fold-flow-fine";;
  g2-touch) echo p3-fold-transport-coarse;; g2-rim) echo p3-fold-rim-fine;; g3-hold) echo "p3-rev-fold-25-ptr p3-rev-fold-50-ptr p3-rev-unfold-50-out";;
  g4-join) echo p3-seatset-fine;; g2-lane) echo "p9-persist-fine p3-region-fine";;
  g4-ghost) echo "p3-seatset-fine p3-seatset-coarse";; g4-snap2) echo "p3-seat-coarse p3-seat-long-coarse";; g4-scroll) echo p3-seat-long-coarse;;
  g6-flow) echo "p3-hover-fine p4-hover-390 p4-hover-key";; g6-overflow) echo "p4-hover-key p9-press-fine";;
  g9-scope|g9-three) echo "p3-fold-pill-fine p9-tiers-fine";;
  g10-rm) echo "p3-fold-pill-rm p3-swap-xf-rm p3-swap-layers-rm";; g2-fitwhole) echo "p3-fold-pill-fine p3-fold-ctl6-c360 p3-fold-transport-rm";;
  g2-whole-never) echo "p3-fold-many-coarse p3-fold-many-c360";; g2-whole-length|g2-room) echo p5-many-lift-fine;; g4-openseat) echo p3-seat-fine;;
  g2-nocut) echo "p3-fold-outlet-fine p3-region-fine";; g2-facehalf) echo "p3-fold-pill-fine p3-fold-rim-coarse p3-fold-ctl-te-parent-coarse";;
  s6-words) echo p6-words-fine;; s6-nogate) echo p9-press-fine;;
  *) echo "";; esac; }
side_cmd() { local E="$2"; case "$1" in
  g1-linger) echo "node m9/h1.mjs 5474 m9m-plant-g1-linger --engine $E --only k";;
  g1-afterseat) echo "node m9/h1.mjs 5474 m9m-plant-g1-afterseat --engine $E --only k2";;
  g1-presshold) echo "node m9/h1.mjs 5474 m9m-plant-g1-presshold --engine $E --only finger";;
  g8-nohold) echo "node m9/h1.mjs 5474 m9m-plant-g8-nohold --engine $E --only menu";;
  g1-lift) echo "node m6/cells6.mjs 5474 m9m-g1-lift --engine $E --only finger,tapseat,c390";;
  g7-provide) echo "env LOG_TAG=m9m-g7-provide node g7.mjs 5474 --engine $E";;
  g8-hold) echo "env LOG_TAG=m9m-g8-hold node g8.mjs 5474 --engine $E; node m6/cells6.mjs 5474 m9m-g8-hold --engine $E --only hoveresc,sheetout";;
  g8-exempt|g8-trigger) echo "node m8/trig8.mjs 5474 m9m-$1 --engine $E";;
  touchcure) echo "node m8/trig8.mjs 5474 m9m-touchcure --engine $E --only select-touch,sheet-touch,sheet-touch-scrim";;
  g13-safe) [ "$E" = chromium ] && echo "node m6/cells6.mjs 5474 m9m-g13-safe --engine $E --only safearea";;
  g13-shown) echo "node m9/g13b.mjs 5474 m9m-plant-g13-shown --engine $E";;
  g11-rest) [ "$E" = chromium ] && echo "node s9/cost9.mjs 5474 m9m-g11-rest --reps 1" || echo "node s9/cost9.mjs 5474 m9m-g11-rest --engine webkit";;
  s7-nogate) [ "$E" = chromium ] && echo "node s9/cost9.mjs 5474 m9m-s7-nogate --reps 1 --cells w-pill,w-flow";;
  g14-fitmemory|g14-fitsibs) echo "node m7/fit7.mjs 5474 m9m-$1 --engine $E";;
  g15-baked|g15-onestep) echo "node m9/ink9.mjs 5474 m9m-plant-$1 --engine $E --pages nav,action-row,canvas-tools,dials --grounds field,flat --base ../logs/m8-ink-base.$E.json";;
  s4-cureqhover) echo "node m9/ink9.mjs 5474 m9m-plant-s4-cureqhover --engine $E --pages nav --grounds flat";;
  g13-tabsvg|iconword) echo "node m8/census8.mjs 5474 m9m-$1 --engine $E";;
  facerule|s1-facepad) echo "node m9/face9.mjs 5474 m9m-plant-$1 --engine $E";;
  g13-trigseat|g4-groupframe) echo "node m7/adds7.mjs 5474 m9m-$1 --engine $E";;
  s5-tab38|s5-trigrun|s5-ctlglyph) echo "node s9/trig9.mjs 5474 m9m-plant-$1 --engine $E";;
  s4-channel|s4-toggle08) echo "node s9/seg9.mjs 5474 m9m-plant-$1 --engine $E";;
  dark|s3-nodark) echo "node s9/level9.mjs 5474 m9m-plant-$1 --engine $E";;
  fold) echo "node s8/fold8b.mjs 5474 m9m-fold --engine $E";;
  mark) echo "node s8/mark8.mjs 5474 m9m-mark --engine $E";;
  *) echo "";; esac; }
unit_cmd() { case "$1" in
  g1-lift|g1-presshold|g1-frompress) echo "tests/components/custom/dock/GlassDock.posture.test.ts -t G-1";;
  mark) echo "tests/components/custom/dock/GlassDock.run-mark.test.ts";;
  g14-rmclock) echo "tests/components/custom/dock/GlassDock.motion-parity.test.ts";;
  *) echo "";; esac; }
judge() { local F; F=$(ls "$R/m9m-plant-$P"/*.rows.json 2>/dev/null); [ -z "$F" ] && return; case "$P" in
  g2-clock|g3-hold|g10-rm|g2-laneinset|g2-nocut|g2-facehalf) for E in chromium webkit; do echo "-- judge8 $E"; node "$H/m8/judge8.mjs" $(ls "$R/m9m-plant-$P"/*.$E.*.rows.json 2>/dev/null); done;;
  g2-step|g9-scope|g9-three) for E in chromium webkit; do echo "-- op9 $E"; node "$H/m9/op9.mjs" $(ls "$R/m9m-plant-$P"/*.$E.*.rows.json 2>/dev/null); done;;
  g4-snap2|g4-scroll) node "$H/m3/seat4.mjs" $F; node "$H/m6/read6.mjs" $F;;
  g2-room) node "$H/m6/read6.mjs" $F; node "$H/m8/judge8.mjs" $F;;
  g4-ghost) node "$H/m6/read6.mjs" $F; node "$H/m8/judge8.mjs" $F | tail -30;;
  g6-flow) node "$H/m7/g6c.mjs" $F;;
  g6-overflow) node "$H/m7/g6c.mjs" $(ls "$R/m9m-plant-$P"/p4-*.rows.json); node "$H/m9/g6d.mjs" $(ls "$R/m9m-plant-$P"/p9-press-*.rows.json);;
  s6-nogate) node "$H/m9/g6d.mjs" $F;;
  g2-curve) node "$H/m6/read6.mjs" $F; node "$H/m9/corner9.mjs" $F;;
  *) node "$H/m6/read6.mjs" $F;;
  esac; }
scen() { for d in scenarios-m9 scenarios-m6 scenarios-m5 scenarios-m3; do [ -f "$H/$d/$1.json" ] && { echo "$d/$1.json"; return; }; done; echo "MISSING-$1"; }
revert() { if [ -d "$T/.s9-orig/$P" ]; then python3 "$PL" "$T" "$P" revert >> "$tmp" 2>&1; fi; }
trap revert EXIT INT TERM
echo "== $P $(date '+%F %T') (load $(sysctl -n vm.loadavg))" > "$tmp"
python3 "$PL" "$T" "$P" check >> "$tmp" 2>&1 || { echo "plant site not on the tip" >> "$tmp"; mv "$tmp" "$log"; trap - EXIT; exit 0; }
if [ "$P" = g12-scale ]; then
  echo "-- the tree's src" >> "$tmp"; G12_TREE="$T" node "$H/pm/g12.mjs" >> "$tmp" 2>&1
  python3 "$PL" "$T" "$P" apply >> "$tmp" 2>&1
  echo "-- under the plant" >> "$tmp"; G12_TREE="$T" node "$H/pm/g12.mjs" >> "$tmp" 2>&1
  revert; python3 "$H/pm/clean.py" "$T" >> "$tmp" 2>&1 || { mv "$tmp" "$log"; exit 3; }
  echo "== done $(date '+%F %T')" >> "$tmp"; mv "$tmp" "$log"; exit 0
fi
python3 "$PL" "$T" "$P" apply >> "$tmp" 2>&1 || { echo "apply failed" >> "$tmp"; mv "$tmp" "$log"; exit 0; }
sleep 4
u=$(unit_cmd "$P")
if [ -n "$u" ]; then (cd "$T" && $G --timeout 15 -- node_modules/.bin/vitest run $u --maxWorkers=2 --reporter=verbose 2>&1 | grep -E "✓|×|✗|FAIL|Tests |Test Files|AssertionError|expected" | head -60) >> "$tmp" 2>&1; echo "unit rc=$?" >> "$tmp"; fi
cells=$(probe_cells "$P"); rm -rf "$R/m9m-plant-$P"; mkdir -p "$R/m9m-plant-$P"
for E in chromium webkit; do
  cmd=""
  for c in $cells; do cmd="${cmd:+$cmd; }node probe.mjs $W dock-wi8 $(scen $c) --port 5474 --engine $E --out ../rows/m9m-plant-$P --no-strip 2>&1 | cut -c1-200"; done
  s=$(side_cmd "$P" "$E"); [ -n "$s" ] && cmd="${cmd:+$cmd; }$s"
  [ -z "$cmd" ] && continue
  echo "-- $E $(date '+%T') (load $(sysctl -n vm.loadavg))" >> "$tmp"
  if [ "$E" = webkit ]; then (cd "$H" && $G --exclusive webkit --timeout 45 -- sh -c "$cmd") >> "$tmp" 2>&1
  else (cd "$H" && $G --timeout 45 --cpu-cores 0 -- sh -c "$cmd") >> "$tmp" 2>&1; fi
  rc=$?; echo "$E rc=$rc" >> "$tmp"
  [ $rc = 75 ] && { echo "guard REFUSED" >> "$tmp"; revert; mv "$tmp" "$log"; exit 75; }
done
revert
python3 "$H/pm/clean.py" "$T" >> "$tmp" 2>&1 || { echo "TREE NOT CLEAN after $P" >> "$tmp"; mv "$tmp" "$log"; exit 3; }
[ -n "$cells" ] && { echo "-- judge" >> "$tmp"; (cd "$H" && judge) >> "$tmp" 2>&1; }
for f in "$R/m9m-plant-$P"/*.rows.json; do [ -f "$f" ] && gzip -f "$f"; done
echo "== done $(date '+%F %T')" >> "$tmp"
mv "$tmp" "$log"
