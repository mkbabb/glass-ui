#!/bin/sh
# AMEND-3 serial Apple driver: one headless Chromium at a time, guard-contained; no screenshots.
cd "$(dirname "$0")" || exit 1
G="$HOME/.claude/guard/guarded --light --rss-gb 4 --timeout 5 --"
run() { echo "== $*"; $G "$@" 2>&1 | tail -1; }
run node a3probe.mjs hidden r1
run node a3probe.mjs hidden r2
run node a3probe.mjs sticky-smooth r1
run node a3probe.mjs sticky-smooth r2
echo DONE
