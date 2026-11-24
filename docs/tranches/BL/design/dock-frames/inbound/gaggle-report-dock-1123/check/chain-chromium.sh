#!/bin/bash
set -u
P=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock-frames/inbound/gaggle-report-dock-1123/probe
export PW_MODULE=/Users/mkbabb/Programming/gaggle-site/.worktrees/dockfilm/dashboard/node_modules/playwright/index.mjs
OUT=/Users/mkbabb/Programming/gaggle-site/.worktrees/dockfilm/check
cd "$P"
echo "== film $(date +%T) load $(sysctl -n vm.loadavg)"
node film.mjs --engine chromium --base http://127.0.0.1:5437 --out "$OUT" --cells '^(team-1440-light|team-390-light-rm)$' --film 0
echo "== run7 chromium 390 $(date +%T)"
node diag/run7.mjs chromium 390
echo "== flip chromium light $(date +%T)"
node diag/flip.mjs chromium light
echo "== done $(date +%T)"
