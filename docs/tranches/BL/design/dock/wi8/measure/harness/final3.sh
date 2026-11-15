#!/usr/bin/env bash
# final3.sh: the PROTOTYPE-3 readings after the Chromium probe pass, on the same build
# (dist-wi8 at ../logs/build-p3.sha), one guarded run at a time.
set -u
H="$(cd "$(dirname "$0")" && pwd)"; L="$H/../logs"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; G=~/.claude/guard/guarded
step() { echo "== $(date '+%H:%M:%S') $1 (load $(sysctl -n vm.loadavg))" >> "$L/p3-pass.log"; }
step "chromium side"; (cd "$H" && $G --timeout 30 --cpu-cores 0 -- ./session2.sh sh -c 'node clock2.mjs 5401 p3 --engine chromium; node g13.mjs 5401 --engine chromium; node g7.mjs 5401 --engine chromium; node g8.mjs 5401 --engine chromium; node cost2.mjs 5401 p3' > "$L/side-p3-chromium.log" 2>&1; echo "rc=$?" >> "$L/side-p3-chromium.log")
step "webkit probes"; (cd "$H" && $G --exclusive webkit --timeout 90 -- ./session2.sh ./run3.sh webkit ../lists/p3.txt > "$L/p3-webkit.log" 2>&1; echo "rc=$?" >> "$L/p3-webkit.log")
step "webkit side"; (cd "$H" && $G --exclusive webkit --timeout 40 -- ./session2.sh sh -c 'node clock2.mjs 5401 p3 --engine webkit; node g13.mjs 5401 --engine webkit; node g7.mjs 5401 --engine webkit; node g8.mjs 5401 --engine webkit' > "$L/side-p3-webkit.log" 2>&1; echo "rc=$?" >> "$L/side-p3-webkit.log")
step "library build"; (cd "$W" && $G --timeout 20 -- node node_modules/vite/bin/vite.js build --outDir dist-lib-p3 --emptyOutDir > "$L/build-lib-p3.log" 2>&1; echo "rc=$?" >> "$L/build-lib-p3.log")
step "done"
