#!/usr/bin/env bash
# run-lane.sh <lane>: the probe on the plain tree (5361) then the cured tree (5362).
# Under the guard: guarded [--exclusive webkit] --timeout 40 -- ./run-lane.sh <lane>
set -euo pipefail
cd "$(dirname "$0")"
node probe.mjs "$1" 5361 "data/plain-$1.json"
node probe.mjs "$1" 5362 "data/cure-$1.json"
