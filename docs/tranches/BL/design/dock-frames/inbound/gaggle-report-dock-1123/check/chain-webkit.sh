#!/bin/bash
set -u
P=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock-frames/inbound/gaggle-report-dock-1123/probe
export PW_MODULE=/Users/mkbabb/Programming/gaggle-site/.worktrees/dockfilm/dashboard/node_modules/playwright/index.mjs
OUT=/Users/mkbabb/Programming/gaggle-site/.worktrees/dockfilm/check
cd "$P"
echo "== film $(date +%T) load $(sysctl -n vm.loadavg)"
node film.mjs --engine webkit --base http://127.0.0.1:5437 --out "$OUT" --cells '^(team-390-dark|team-768-light)$' --film 0
echo "== run7 webkit 390 $(date +%T)"
node diag/run7.mjs webkit 390
echo "== done $(date +%T)"
