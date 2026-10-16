#!/bin/sh
# Waits for run-gui.sh to finish, then the glass-ui tail (material r2, the engine cells) and the Apple set.
cd "$(dirname "$0")" || exit 1
while pgrep -f run-gui.sh >/dev/null; do perl -e 'select(undef,undef,undef,3)'; done
G="$HOME/.claude/guard/guarded --light --rss-gb 4 --timeout 4 --"
run() { echo "== $*"; $G "$@" 2>&1 | tail -1; }
run node gprobe.mjs material r2
run node gprobe.mjs wk-cells r1
echo "== webkit wk-cells"
$HOME/.claude/guard/guarded --light --exclusive webkit --rss-gb 4 --timeout 4 -- env ENG=webkit node gprobe.mjs wk-cells r1 2>&1 | tail -2
echo GUI-TAIL-DONE
sh run-apple.sh
