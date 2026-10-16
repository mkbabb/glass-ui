#!/bin/sh
cd "$(dirname "$0")" || exit 1
while pgrep -f run-redo.sh >/dev/null; do perl -e 'select(undef,undef,undef,3)'; done
G="$HOME/.claude/guard/guarded --light --rss-gb 4 --timeout 5 --"
run() { echo "== $*"; $G "$@" 2>&1 | tail -1; }
run node gprobe.mjs contrast r1
run node aprobe.mjs contrast-stuck r1
echo REDO2-DONE
