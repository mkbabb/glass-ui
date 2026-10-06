#!/bin/bash
# H3-baseline.sh: the pass-3 baseline (D2 pass 3, H3). Every witness under H3 on the four builds
# H3-build.sh made, one build at a time (harness runs are serialized: one browser-owning run at a
# time on this machine), each with the adapter its pass-2 seat used:
#   head  → harness/adapter-head.mjs (shimmed Playwright WebKit pass, then unshimmed)
#   floor → pass-2/adapter-floor.mjs · bp → pass-2/adapter-floor.mjs (B′ kept the floor's DOM
#   contract, D2-Bp-proto.md header) · g → pass-2/adapter-G.mjs. These three have no WebKit shim,
#   so every Playwright WebKit cell on them is unshimmed by construction.
# Light theme (no scheme forced); W7 runs its own light/dark matrix.
#   bash H3-baseline.sh <out>      (<out>/builds/<label> from H3-build.sh)
# Logs: pass-3/H3-records/run-<label>.log; the per-cell digest: H3-cells.mjs.
set -u
OUT=$1
D=$(cd "$(dirname "$0")/.." && pwd)            # docs/tranches/BL/design/dock
H=$D/harness; P2=$D/pass-2; REC=$D/pass-3/H3-records
mkdir -p "$REC"
r() { (uptime; node "$H/run.mjs" --build "$OUT/builds/$1" --adapter "$2" --out "$OUT" --safari; echo "run exit $?"; uptime) > "$REC/run-$1.log" 2>&1; }
r head  "$H/adapter-head.mjs"
r floor "$P2/adapter-floor.mjs"
r bp    "$P2/adapter-floor.mjs"
r g     "$P2/adapter-G.mjs"
echo BASELINE-DONE >> "$REC/run-g.log"
