#!/usr/bin/env bash
# pass5.sh: MEASURE-5 (pass4.sh with the m5 list, run6, cost4 and analyse6). pass4.sh: MEASURE-4, the whole gate set on ONE build, one guarded run at a time. The build's
# source hash is logs/m5-build.sha (the worktree HEAD, src clean). Rows to rows/m4/, logs to
# logs/m5-*. As m3/pass.sh, with the m4 list (the MEASURE-3 cells plus the right-to-left page and
# G-6 at 390 and by keyboard), m4/cells.mjs (the cells MEASURE-3 did not run) and m4/cost3.mjs
# (G-11 under --use-angle=metal --enable-gpu --ignore-gpu-blocklist, the renderer read).
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; G=~/.claude/guard/guarded
step() { echo "== $(date '+%H:%M:%S') $1 (load $(sysctl -n vm.loadavg))" >> "$L/m5-pass.log"; }
only="${1:-all}"
want() { [ "$only" = all ] || [[ ",$only," == *",$1,"* ]]; }
SIDE='export LOG_TAG=m5; node clock2.mjs 5401 m5 --engine E; node m4/cells.mjs 5401 m5 --engine E; node g13.mjs 5401 --engine E; node g7.mjs 5401 --engine E; node g8.mjs 5401 --engine E; node c2.mjs 5401 m5 --engine E; node crop.mjs 5401 ../crops-m5 --engine E'
if want build; then
  step "build"; (cd "$W" && { git rev-parse HEAD; git status --short src; } > "$L/m5-build.sha"; VITE_DOCK_HOLD=1 $G --timeout 20 -- "$H/build.sh" . dist-wi8 > "$L/m5-build.log" 2>&1; echo "rc=$?" >> "$L/m5-build.log")
fi
if want cprobe; then
  step "chromium probes"; (cd "$H" && $G --timeout 70 -- ./session2.sh m5/run6.sh chromium ../lists/m5.txt m5 > "$L/m5-chromium.log" 2>&1; echo "rc=$?" >> "$L/m5-chromium.log")
fi
if want cside; then
  step "chromium side"; (cd "$H" && $G --timeout 60 --cpu-cores 0 -- ./session2.sh sh -c "${SIDE//E/chromium}; node m5/cost4.mjs 5401 m5" > "$L/m5-side-chromium.log" 2>&1; echo "rc=$?" >> "$L/m5-side-chromium.log")
fi
if want wprobe; then
  step "webkit probes"; (cd "$H" && $G --exclusive webkit --timeout 90 -- ./session2.sh m5/run6.sh webkit ../lists/m5.txt m5 > "$L/m5-webkit.log" 2>&1; echo "rc=$?" >> "$L/m5-webkit.log")
fi
if want wside; then
  step "webkit side"; (cd "$H" && $G --exclusive webkit --timeout 60 -- ./session2.sh sh -c "${SIDE//E/webkit}" > "$L/m5-side-webkit.log" 2>&1; echo "rc=$?" >> "$L/m5-side-webkit.log")
fi
if want lib; then
  step "library build"; (cd "$W" && $G --timeout 20 -- node node_modules/vite/bin/vite.js build --outDir dist-lib-m5 --emptyOutDir > "$L/m5-build-lib.log" 2>&1; echo "rc=$?" >> "$L/m5-build-lib.log"; node "$H/g12.mjs" dist-lib-m5 > "$L/m5-g12.txt" 2>&1; { echo "__dockHold/__dockPose in the built library (dist/):"; grep -rl "__dockHold\|__dockPose" dist-lib-m5 || echo none; } >> "$L/m5-g12.txt"; rm -rf dist-lib-m5)
fi
if want units; then
  step "units"; (cd "$W" && $G --timeout 30 -- node_modules/.bin/vitest run tests/components/custom/dock tests/components/popover.contract.test.ts tests/components/select.contract.test.ts tests/components/menu tests/components/custom/scroll-progress-rim/ScrollProgressRim.test.ts tests/components/dock/collapsed-rim-fills-pill.test.ts --maxWorkers=2 > "$L/m5-units.log" 2>&1; echo "rc=$?" >> "$L/m5-units.log")
fi
if want analyse; then
  step "analyse"; for E in chromium webkit; do "$H/m5/analyse6.sh" $E m5 m5 >> "$L/m5-pass.log" 2>&1; done
fi
step "done $only"
