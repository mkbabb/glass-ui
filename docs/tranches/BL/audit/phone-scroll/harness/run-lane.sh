#!/usr/bin/env bash
# run-lane.sh <lane> [out-dir]: the probe on the plain tree (5361) then the cured tree
# (5362), into <out-dir> (default data/r2, the second round; round 1's files are data/*.json).
# Under the guard: guarded [--exclusive webkit] --timeout 40 -- ./run-lane.sh <lane>
set -euo pipefail
cd "$(dirname "$0")"
OUT="${2:-data/r2}"
node probe.mjs "$1" 5361 "$OUT/plain-$1.json"
node probe.mjs "$1" 5362 "$OUT/cure-$1.json"
