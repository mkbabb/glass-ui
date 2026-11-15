#!/usr/bin/env bash
# pass.sh: MEASURE-3, the whole gate set on ONE build, one guarded run at a time. The build's
# source hash is logs/m3-build.sha (the worktree HEAD; the page built with VITE_DOCK_HOLD=1, the
# library built without it). Rows to rows/m3/, logs to logs/m3-*.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; G=~/.claude/guard/guarded
step() { echo "== $(date '+%H:%M:%S') $1 (load $(sysctl -n vm.loadavg))" >> "$L/m3-pass.log"; }
only="${1:-all}"
want() { [ "$only" = all ] || [[ ",$only," == *",$1,"* ]]; }
if want build; then
  step "build"; (cd "$W" && git rev-parse HEAD > "$L/m3-build.sha" && git status --short src >> "$L/m3-build.sha"; VITE_DOCK_HOLD=1 $G --timeout 20 -- "$H/build.sh" . dist-wi8 > "$L/m3-build.log" 2>&1; echo "rc=$?" >> "$L/m3-build.log")
fi
if want cprobe; then
  step "chromium probes"; (cd "$H" && $G --timeout 60 -- ./session2.sh m3/run5.sh chromium ../lists/m3.txt m3 > "$L/m3-chromium.log" 2>&1; echo "rc=$?" >> "$L/m3-chromium.log")
fi
if want cside; then
  step "chromium side"; (cd "$H" && $G --timeout 60 --cpu-cores 0 -- ./session2.sh sh -c 'export LOG_TAG=m3; node clock2.mjs 5401 m3 --engine chromium; node g13.mjs 5401 --engine chromium; node g7.mjs 5401 --engine chromium; node g8.mjs 5401 --engine chromium; node c2.mjs 5401 m3 --engine chromium; node crop.mjs 5401 ../crops-m3 --engine chromium; node cost2.mjs 5401 m3' > "$L/m3-side-chromium.log" 2>&1; echo "rc=$?" >> "$L/m3-side-chromium.log")
fi
if want wprobe; then
  step "webkit probes"; (cd "$H" && $G --exclusive webkit --timeout 90 -- ./session2.sh m3/run5.sh webkit ../lists/m3.txt m3 > "$L/m3-webkit.log" 2>&1; echo "rc=$?" >> "$L/m3-webkit.log")
fi
if want wside; then
  step "webkit side"; (cd "$H" && $G --exclusive webkit --timeout 60 -- ./session2.sh sh -c 'export LOG_TAG=m3; node clock2.mjs 5401 m3 --engine webkit; node g13.mjs 5401 --engine webkit; node g7.mjs 5401 --engine webkit; node g8.mjs 5401 --engine webkit; node c2.mjs 5401 m3 --engine webkit; node crop.mjs 5401 ../crops-m3 --engine webkit' > "$L/m3-side-webkit.log" 2>&1; echo "rc=$?" >> "$L/m3-side-webkit.log")
fi
if want lib; then
  step "library build"; (cd "$W" && $G --timeout 20 -- node node_modules/vite/bin/vite.js build --outDir dist-lib-m3 --emptyOutDir > "$L/m3-build-lib.log" 2>&1; echo "rc=$?" >> "$L/m3-build-lib.log"; node "$H/g12.mjs" dist-lib-m3 > "$L/m3-g12.txt" 2>&1; { echo "__dockHold/__dockPose in the built library:"; grep -rl "__dockHold\|__dockPose" dist-lib-m3 || echo none; } >> "$L/m3-g12.txt")
fi
if want units; then
  step "units"; (cd "$W" && $G --timeout 30 -- node_modules/.bin/vitest run tests/components/custom/dock tests/components/popover.contract.test.ts tests/components/select.contract.test.ts tests/components/menu tests/components/custom/scroll-progress-rim/ScrollProgressRim.test.ts tests/components/dock/collapsed-rim-fills-pill.test.ts --maxWorkers=2 > "$L/m3-units.log" 2>&1; echo "rc=$?" >> "$L/m3-units.log")
fi
step "done $only"
