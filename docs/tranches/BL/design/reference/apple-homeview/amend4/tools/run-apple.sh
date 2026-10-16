#!/bin/sh
# AMEND-4 serial Apple driver: one headless Chromium at a time, guard-contained (light, RSS cap, short timeout).
cd "$(dirname "$0")" || exit 1
G="$HOME/.claude/guard/guarded --light --rss-gb 4 --timeout 4 --"
run() { echo "== $*"; $G "$@" 2>&1 | tail -1; }
run node a4probe.mjs intro-jump r1   # run first, on its own
run node a4probe.mjs intro-wheel r1
run node a4probe.mjs intro-outback r1
run node a4probe.mjs intro-jump r2
run node a4probe.mjs intro-wheel r2
echo DONE
