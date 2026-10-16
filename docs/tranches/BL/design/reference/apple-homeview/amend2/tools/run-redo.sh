#!/bin/sh
# Second pass: the sticky legs from below the fold (Apple at 900, glass-ui at 1440x500 so the hero's bottom
# starts below the fold), the entrance plants armed on demand, and the WebKit cell with its full stderr.
cd "$(dirname "$0")" || exit 1
while pgrep -f run-tail.sh >/dev/null || pgrep -f run-apple.sh >/dev/null; do perl -e 'select(undef,undef,undef,3)'; done
G="$HOME/.claude/guard/guarded --light --rss-gb 4 --timeout 5 --"
run() { echo "== $*"; $G "$@" 2>&1 | tail -1; }
run node aprobe.mjs sticky r2
run node gprobe.mjs sticky r2 1440 500
run env PLANT=fixed node gprobe.mjs sticky r2 1440 500
run env PLANT=sticky node gprobe.mjs sticky r2 1440 500
for r in r2 jump2; do
  run node gprobe.mjs enter2 $r
  run env PLANT=fade node gprobe.mjs enter2 $r
  run env PLANT=scale node gprobe.mjs enter2 $r
done
echo "== webkit wk-cells (full log)"
$HOME/.claude/guard/guarded --light --exclusive webkit --rss-gb 4 --timeout 4 -- env ENG=webkit node gprobe.mjs wk-cells r1 > ../data/wk-cells-webkit.log 2>&1; echo "rc=$?"
tail -5 ../data/wk-cells-webkit.log
echo REDO-DONE
