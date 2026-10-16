#!/bin/sh
# AMEND-3 serial glass-ui driver: one headless Chromium at a time, guard-contained (light mode, RSS cap, short
# timeout), over the demo built in this seat's own worktree (GAP_DIST or the g3probe default).
cd "$(dirname "$0")" || exit 1
G="$HOME/.claude/guard/guarded --light --rss-gb 4 --timeout 4 --"
run() { echo "== $*"; $G "$@" 2>&1 | tail -1; }
run node g3probe.mjs cr09 r1   # run first, on its own, before this driver existed (load in its file's meta)
run node g3probe.mjs cr09 r2
run node g3probe.mjs jump-noecho r1
run node g3probe.mjs jump-noecho r2
run node g3probe.mjs flight r1
run node g3probe.mjs flight r2
run node g3probe.mjs flight-lib r1
run node g3probe.mjs flight-lib r2
run node g3probe.mjs hidden r1
run node g3probe.mjs cr09 r3   # run after the first pass, once the IntersectionObserver log was added to the init script
echo DONE
