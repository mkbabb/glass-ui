#!/bin/sh
# Serial Apple driver: one headless browser at a time, guard-contained. The WebKit run takes the
# machine-wide WebKit slot (--exclusive webkit) and never screenshots.
cd "$(dirname "$0")" || exit 1
G="$HOME/.claude/guard/guarded --light --rss-gb 4 --timeout 5 --"
run() { echo "== $*"; $G "$@" 2>&1 | tail -1; }
run node aprobe.mjs visibility r1
run node aprobe.mjs sticky r1
run node aprobe.mjs keyboard r1
run node aprobe.mjs press-cancel r1
run node aprobe.mjs pause-resume r1
run node aprobe.mjs contrast r1
run node aprobe.mjs intro r1
run env RAF=60 node aprobe.mjs intro r1
run env RAF=stall node aprobe.mjs intro r1
echo "== webkit intro"
$HOME/.claude/guard/guarded --light --exclusive webkit --rss-gb 4 --timeout 5 -- env ENG=webkit node aprobe.mjs intro r1 2>&1 | tail -2
echo DONE
