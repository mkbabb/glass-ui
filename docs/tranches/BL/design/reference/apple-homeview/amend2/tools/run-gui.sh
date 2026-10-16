#!/bin/sh
# Serial glass-ui driver: one headless browser at a time, each run contained by the guard
# (light mode, RSS cap, short timeout; the heavy queue is held by other seats' long runs).
cd "$(dirname "$0")" || exit 1
G="$HOME/.claude/guard/guarded --light --rss-gb 4 --timeout 4 --"
run() { echo "== $*"; $G "$@" 2>&1 | tail -1; }
for r in r1 r2; do
  run node gprobe.mjs reduced-pager $r
  run node gprobe.mjs interrupt $r
  run node gprobe.mjs interrupt-lib $r
  run node gprobe.mjs keyboard $r
  run node gprobe.mjs press-cancel $r
done
run node gprobe.mjs press-cancel-touch r1
run node gprobe.mjs fps r1
run env RAF=60 node gprobe.mjs fps r1
run env RAF=stall node gprobe.mjs fps r1
run node gprobe.mjs visibility r1
run node gprobe.mjs sticky r1
run env PLANT=fixed node gprobe.mjs sticky r1
run env PLANT=sticky node gprobe.mjs sticky r1
run node gprobe.mjs enter2 r1
run node gprobe.mjs enter2 jump1
run env PLANT=fade node gprobe.mjs enter2 r1
run env PLANT=fade node gprobe.mjs enter2 jump1
run env PLANT=scale node gprobe.mjs enter2 r1
run node gprobe.mjs contrast r1
echo DONE
