#!/usr/bin/env bash
# pass7.sh [steps]: MEASURE-7 step 8, the whole pass on ONE build (m6/pass6.sh with RULINGS-6's instruments). The page
# built once with VITE_DOCK_HOLD=1 (build7.sh: dock-wi8, the ten compositions with m7/comp's, the loose cell), every probe
# cell in Chromium and WebKit 2287 (m6/run7.sh, lists/m6.txt), the side cells in two guarded runs per engine (a: clock2,
# cells6, g13, g7, g8, c2; b: census7, comp58, fit7, trig7, inflow7, adds7, ink7 against the engine's v11.0.2 reading, crop),
# in Chromium cost7 on the GPU lane (its renderer string in the log), return-30 twenty times per engine, the library
# build and G-12, the units, and the judges (m7/analyse8.sh: judge7, read6, gates4, seat4, g9b, read2, g6c, words7).
# Each probe records the 1-minute load over its cell (meta.load). Logs logs/m7p-*; rows rows/m7p/, rows/m7p-r30/.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"; R="$H/../rows"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; G=~/.claude/guard/guarded
step() { echo "== $(date '+%H:%M:%S') $1 (load $(sysctl -n vm.loadavg))" >> "$L/m7p-pass.log"; }
only="${1:-all}"
want() { [ "$only" = all ] || [[ ",$only," == *",$1,"* ]]; }
SIDEA='export LOG_TAG=m7p; node clock2.mjs 5401 m7p --engine E; node m6/cells6.mjs 5401 m7p --engine E; node g13.mjs 5401 --engine E; node g7.mjs 5401 --engine E; node g8.mjs 5401 --engine E; node c2.mjs 5401 m7p --engine E'
SIDEB='node m7/census7.mjs 5401 m7p --engine E; node m7/comp58.mjs 5401 m7p --engine E;node m7/fit7.mjs 5401 m7p --engine E; node m7/trig7.mjs 5401 m7p --engine E; node m7/inflow7.mjs 5401 m7p --engine E; node m7/adds7.mjs 5401 m7p --engine E; node m7/ink7.mjs 5401 m7p --engine E --base ../logs/m7-ink-base1102.E.json; node crop.mjs 5401 ../crops-m7p --engine E'
if want build; then
  step "build"; (cd "$W" && { git rev-parse HEAD; git status --short src; } > "$L/m7p-build.sha"; VITE_DOCK_HOLD=1 $G --timeout 20 -- "$H/m7/build7.sh" . dist-wi8 > "$L/m7p-build.log" 2>&1; echo "rc=$?" >> "$L/m7p-build.log")
fi
if want cprobe; then
  step "chromium probes"; (cd "$H" && $G --timeout 80 -- ./session2.sh m6/run7.sh chromium ../lists/m6.txt m7p > "$L/m7p-chromium.log" 2>&1; echo "rc=$?" >> "$L/m7p-chromium.log")
fi
if want cside; then
  step "chromium side a"; (cd "$H" && $G --timeout 60 -- ./session2.sh sh -c "${SIDEA//E/chromium}" > "$L/m7p-side-chromium.log" 2>&1; echo "rc=$?" >> "$L/m7p-side-chromium.log")
  step "chromium side b"; (cd "$H" && $G --timeout 80 -- ./session2.sh sh -c "${SIDEB//E/chromium}" >> "$L/m7p-side-chromium.log" 2>&1; echo "rc=$?" >> "$L/m7p-side-chromium.log")
  step "chromium cost (GPU lane)"; (cd "$H" && $G --timeout 40 --cpu-cores 0 -- ./session2.sh node m7/cost7.mjs 5401 m7p >> "$L/m7p-side-chromium.log" 2>&1; echo "rc=$?" >> "$L/m7p-side-chromium.log")
fi
if want wprobe; then
  step "webkit probes"; (cd "$H" && $G --exclusive webkit --timeout 90 -- ./session2.sh m6/run7.sh webkit ../lists/m6.txt m7p > "$L/m7p-webkit.log" 2>&1; echo "rc=$?" >> "$L/m7p-webkit.log")
fi
if want wside; then
  step "webkit side a"; (cd "$H" && $G --exclusive webkit --timeout 60 -- ./session2.sh sh -c "${SIDEA//E/webkit}" > "$L/m7p-side-webkit.log" 2>&1; echo "rc=$?" >> "$L/m7p-side-webkit.log")
  step "webkit side b"; (cd "$H" && $G --exclusive webkit --timeout 80 -- ./session2.sh sh -c "${SIDEB//E/webkit}" >> "$L/m7p-side-webkit.log" 2>&1; echo "rc=$?" >> "$L/m7p-side-webkit.log")
fi
if want r30; then
  step "return-30 x20"
  for E in chromium webkit; do
    X=""; [ $E = webkit ] && X="--exclusive webkit"
    (cd "$H" && $G $X --timeout 30 -- ./session2.sh sh -c "for i in \$(seq 1 20); do echo '== run' \$i \$(sysctl -n vm.loadavg); node probe.mjs $W dock-wi8 scenarios-m3/p3-swap-return-30.json --port 5401 --engine $E --out ../rows/m7p-r30/\$i --no-strip | cut -c1-200; done" > "$L/m7p-r30-run-$E.log" 2>&1)
  done
fi
if want lib; then
  step "library build"; (cd "$W" && $G --timeout 20 -- node node_modules/vite/bin/vite.js build --outDir dist-lib-m7 --emptyOutDir > "$L/m7p-build-lib.log" 2>&1; echo "rc=$?" >> "$L/m7p-build-lib.log"; node "$H/g12.mjs" dist-lib-m7 > "$L/m7p-g12.txt" 2>&1; { echo "__dockHold/__dockPose in the built library:"; grep -rl "__dockHold\|__dockPose" dist-lib-m7 2>/dev/null || echo none; } >> "$L/m7p-g12.txt"; rm -rf dist-lib-m7)
fi
if want units; then
  step "units"; (cd "$W" && $G --timeout 30 -- node_modules/.bin/vitest run tests/components/custom/dock tests/components/popover.contract.test.ts tests/components/select.contract.test.ts tests/components/menu tests/components/sheet tests/components/dialog tests/components/custom/scroll-progress-rim/ScrollProgressRim.test.ts tests/components/dock/collapsed-rim-fills-pill.test.ts --maxWorkers=2 > "$L/m7p-units.log" 2>&1; echo "rc=$?" >> "$L/m7p-units.log")
fi
if want analyse; then
  step "analyse"; for E in chromium webkit; do "$H/m7/analyse8.sh" $E m7p m7p >> "$L/m7p-pass.log" 2>&1; done
  node "$H/m6/r30.mjs" "$R/m7p-r30" > "$L/m7p-r30.txt" 2>&1
fi
step "done $only"
