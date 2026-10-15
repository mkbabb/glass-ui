#!/bin/sh
# Runs the census then the film scenarios as ONE guarded heavy run (Chromium only).
# usage: sh tools/run.sh [scenarios]   (from docs/tranches/BL/design/reference/apple-homeview)
# Raw screencast JPEGs go to $FRAMES_RAW (scratch); tools/frames.py crops the cited ones into frames/.
set -e
D=$(cd "$(dirname "$0")/.." && pwd)
FR=${FRAMES_RAW:-$D/.frames-raw}
uptime
[ "${SKIP_CENSUS:-0}" = 1 ] || node "$D/tools/census.mjs" "$D/samples"
node "$D/tools/film.mjs" "$D/samples" "$FR" "${1:-all}"
uptime
