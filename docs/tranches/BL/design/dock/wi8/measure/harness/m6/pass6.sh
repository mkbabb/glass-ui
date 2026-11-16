#!/usr/bin/env bash
# pass6.sh [steps]: MEASURE-6's whole pass on ONE build (m5/pass5.sh with RULINGS-5's instruments): the page built
# once with VITE_DOCK_HOLD=1 (build6.sh: dock-wi8 and the ten compositions), every probe cell in Chromium and
# WebKit 2287 (run7.sh, lists/m6.txt), the side cells (clock2, cells6 with RU-43's railp and trig, g13, g7, g8, c2,
# RU-39's sweep, G-15's ink, and in Chromium cost5 on the GPU lane), return-30 twenty times per engine, the library
# build and G-12, the dock units, and the judges (judge7, read6, gates4, seat4, g9b, read2, g6b, words). Each probe
# records the 1-minute load over its cell (meta.load). Logs logs/m6-*; rows rows/m6/, rows/m6-r30/.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"; R="$H/../rows"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; G=~/.claude/guard/guarded
step() { echo "== $(date '+%H:%M:%S') $1 (load $(sysctl -n vm.loadavg))" >> "$L/m6-pass.log"; }
only="${1:-all}"
want() { [ "$only" = all ] || [[ ",$only," == *",$1,"* ]]; }
SIDE='export LOG_TAG=m6; node clock2.mjs 5401 m6 --engine E; node m6/cells6.mjs 5401 m6 --engine E; node g13.mjs 5401 --engine E; node g7.mjs 5401 --engine E; node g8.mjs 5401 --engine E; node c2.mjs 5401 m6 --engine E; node m6/sweep.mjs 5401 m6 --engine E --host 127.0.0.1; node m6/ink.mjs 5401 m6 --engine E; node crop.mjs 5401 ../crops-m6 --engine E'
if want build; then
  step "build"; (cd "$W" && { git rev-parse HEAD; git status --short src; } > "$L/m6-build.sha"; VITE_DOCK_HOLD=1 $G --timeout 20 -- "$H/m6/build6.sh" . dist-wi8 > "$L/m6-build.log" 2>&1; echo "rc=$?" >> "$L/m6-build.log")
fi
if want cprobe; then
  step "chromium probes"; (cd "$H" && $G --timeout 80 -- ./session2.sh m6/run7.sh chromium ../lists/m6.txt m6 > "$L/m6-chromium.log" 2>&1; echo "rc=$?" >> "$L/m6-chromium.log")
fi
if want cside; then
  step "chromium side"; (cd "$H" && $G --timeout 60 --cpu-cores 0 -- ./session2.sh sh -c "${SIDE//E/chromium}; node m6/cost5.mjs 5401 m6 chromium" > "$L/m6-side-chromium.log" 2>&1; echo "rc=$?" >> "$L/m6-side-chromium.log")
fi
if want wprobe; then
  step "webkit probes"; (cd "$H" && $G --exclusive webkit --timeout 90 -- ./session2.sh m6/run7.sh webkit ../lists/m6.txt m6 > "$L/m6-webkit.log" 2>&1; echo "rc=$?" >> "$L/m6-webkit.log")
fi
if want wside; then
  step "webkit side"; (cd "$H" && $G --exclusive webkit --timeout 60 -- ./session2.sh sh -c "${SIDE//E/webkit}" > "$L/m6-side-webkit.log" 2>&1; echo "rc=$?" >> "$L/m6-side-webkit.log")
fi
if want r30; then
  step "return-30 x20"; : > "$H/../lists/m6-r30.txt"; for i in $(seq 1 20); do echo "proto p3-swap-return-30" >> "$H/../lists/m6-r30.txt"; done
  for E in chromium webkit; do
    X=""; [ $E = webkit ] && X="--exclusive webkit"
    (cd "$H" && $G $X --timeout 30 -- ./session2.sh sh -c "for i in \$(seq 1 20); do echo '== run' \$i \$(sysctl -n vm.loadavg); node probe.mjs $W dock-wi8 scenarios-m3/p3-swap-return-30.json --port 5401 --engine $E --out ../rows/m6-r30/\$i --no-strip | cut -c1-200; done" > "$L/m6-r30-run-$E.log" 2>&1)
  done
fi
if want lib; then
  step "library build"; (cd "$W" && $G --timeout 20 -- node node_modules/vite/bin/vite.js build --outDir dist-lib-m6 --emptyOutDir > "$L/m6-build-lib.log" 2>&1; echo "rc=$?" >> "$L/m6-build-lib.log"; node "$H/g12.mjs" dist-lib-m6 > "$L/m6-g12.txt" 2>&1; { echo "__dockHold/__dockPose in the built library:"; grep -rl "__dockHold\|__dockPose" dist-lib-m6 dist 2>/dev/null || echo none; } >> "$L/m6-g12.txt"; rm -rf dist-lib-m6)
fi
if want units; then
  step "units"; (cd "$W" && $G --timeout 30 -- node_modules/.bin/vitest run tests/components/custom/dock tests/components/popover.contract.test.ts tests/components/select.contract.test.ts tests/components/menu tests/components/custom/scroll-progress-rim/ScrollProgressRim.test.ts tests/components/dock/collapsed-rim-fills-pill.test.ts --maxWorkers=2 > "$L/m6-units.log" 2>&1; echo "rc=$?" >> "$L/m6-units.log")
fi
if want analyse; then
  step "analyse"; for E in chromium webkit; do "$H/m6/analyse7.sh" $E m6 m6 >> "$L/m6-pass.log" 2>&1; done
  node "$H/m6/r30.mjs" "$R/m6-r30" > "$L/m6-r30.txt" 2>&1
fi
step "done $only"
