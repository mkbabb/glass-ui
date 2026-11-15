#!/usr/bin/env bash
# followup.sh: every reading after the probe passes, one guarded run at a time.
set -u
H="$(cd "$(dirname "$0")" && pwd)"; L="$H/../logs"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8
G=~/.claude/guard/guarded
step() { echo "== $(date '+%H:%M:%S') $1 (load $(sysctl -n vm.loadavg))" >> "$L/followup.log"; }
step "units"; (cd "$W" && $G --timeout 30 -- node_modules/.bin/vitest run tests/components/custom/dock --maxWorkers=2 > "$L/units.log" 2>&1; echo "rc=$?" >> "$L/units.log")
step "clock chromium"; (cd "$H" && $G --timeout 30 -- ./session.sh sh -c 'node clock.mjs 5401 proto --engine chromium; node clock.mjs 5402 red --engine chromium --only c,d,i' > "$L/clock-chromium.log" 2>&1)
step "clock webkit"; (cd "$H" && $G --exclusive webkit --timeout 30 -- ./session.sh sh -c 'node clock.mjs 5401 proto --engine webkit; node clock.mjs 5402 red --engine webkit' > "$L/clock-webkit.log" 2>&1)
step "red webkit probes"; (cd "$H" && $G --exclusive webkit --timeout 60 -- ./session.sh ./run.sh webkit ../lists/red-wk.txt > "$L/webkit-red.log" 2>&1)
step "neck"; (cd "$H" && $G --timeout 30 -- ./session.sh node neck.mjs 5401 proto --engine chromium --designs b,svg > "$L/neck-chromium.log" 2>&1)
step "neck webkit"; (cd "$H" && $G --exclusive webkit --timeout 30 -- ./session.sh node neck.mjs 5401 proto --engine webkit --designs b,svg > "$L/neck-webkit.log" 2>&1)
step "label"; (cd "$H" && $G --timeout 30 -- ./session.sh node label.mjs 5401 proto --engine chromium > "$L/label-chromium.log" 2>&1)
step "label webkit"; (cd "$H" && $G --exclusive webkit --timeout 30 -- ./session.sh node label.mjs 5401 proto --engine webkit > "$L/label-webkit.log" 2>&1)
step "cost"; (cd "$H" && $G --timeout 30 --cpu-cores 0 -- ./session.sh node cost.mjs 5401 proto > "$L/cost-chromium.log" 2>&1)
step "release chromium"; (cd "$W" && GLASS_UI_DEMO_PORT=5403 PI_REPORT="$L/release-chromium.json" $G --timeout 60 -- npx playwright test -c tests-visual/playwright.config.ts release-10-1-1.spec.ts release-10-1-2.spec.ts release-10-1-3.spec.ts release-10-1-4.spec.ts release-10-1-5.spec.ts release-11-0-1.spec.ts --project=chromium-headless-new --project=coarse-touch --workers=1 > "$L/release-chromium.log" 2>&1; echo "rc=$?" >> "$L/release-chromium.log")
step "release webkit a"; (cd "$W" && GLASS_UI_DEMO_PORT=5403 PI_REPORT="$L/release-webkit-a.json" $G --exclusive webkit --timeout 60 -- npx playwright test -c tests-visual/webkit-2287.config.ts release-10-1-1.spec.ts release-10-1-2.spec.ts --project=webkit --workers=1 > "$L/release-webkit-a.log" 2>&1; echo "rc=$?" >> "$L/release-webkit-a.log")
step "release webkit b"; (cd "$W" && GLASS_UI_DEMO_PORT=5403 PI_REPORT="$L/release-webkit-b.json" $G --exclusive webkit --timeout 60 -- npx playwright test -c tests-visual/release-11-0-1.config.ts release-10-1-3.spec.ts release-10-1-4.spec.ts release-10-1-5.spec.ts release-11-0-1.spec.ts --project=webkit --workers=1 > "$L/release-webkit-b.log" 2>&1; echo "rc=$?" >> "$L/release-webkit-b.log")
step "done"
