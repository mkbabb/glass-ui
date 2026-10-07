#!/bin/bash
# H3-rerun.sh: the re-runs the pass-3 baseline and self-test owe (D2 pass 3, H3; H3.md §2.3, §3.0).
# Serialized, one witness process at a time, each logged to H3-records/rerun-<name>.log with the
# load before and after.
#   bash H3-rerun.sh <out>
#  1  self-test, H3-7 revised (the overlap check): the fixture's neighbour cells, and the nbjump and
#     nboverlap plants (selftest.mjs EXPECT rows), both engines
#  2  the self-test rows that read BAD in selftest-full.log: W1 fixture `card·*` (Playwright WebKit),
#     W3 `overhang` warm-expand, twice each (a failure seen only under load is NOT-REPRODUCED)
#  3  W3 `^neighbour` on the four builds (the overlap check landed after their baseline W3)
#  4  the baseline blocks the watchdog killed: W3 and FM on HEAD (+shim)
#  5  ST on the four builds again (its UNMEASURED cells, and the second reading of every timing cell)
set -u
OUT=$1
D=$(cd "$(dirname "$0")/.." && pwd); H=$D/harness; P2=$D/pass-2; REC=$D/pass-3/H3-records
export DOCK_HARNESS_BLOCK_TIMEOUT_MS=${DOCK_HARNESS_BLOCK_TIMEOUT_MS:-480000}
PROC_S=${PROC_S:-3600}
adapter() { case $1 in head) echo "$H/adapter-head.mjs";; g) echo "$P2/adapter-G.mjs";; *) echo "$P2/adapter-floor.mjs";; esac; }
run() { # name, then the node argv
  local log="$REC/rerun-$1.log"; shift
  uptime > "$log"
  node "$@" >> "$log" 2>&1 &
  local pid=$! t0=$SECONDS
  while kill -0 $pid 2>/dev/null && [ $((SECONDS - t0)) -lt $PROC_S ]; do sleep 5; done
  if kill -0 $pid 2>/dev/null; then kill -9 $pid; pkill -9 -P $pid; echo "WATCHDOG: killed after ${PROC_S}s" >> "$log"; fi
  wait $pid 2>/dev/null; (echo "exit $?"; uptime) >> "$log"
}
ST_OUT=$OUT/rerun
if [ "${2:-}" != "--w3b" ]; then
# 1
run st-nb-pass $H/w3-morph.mjs --fixture pass --engine chromium,webkit --out $ST_OUT --no-faces --cells '^neighbour'
run st-nb-plants $H/selftest.mjs --only W3 --engine all --out $ST_OUT --faults nbjump,nboverlap
# 2
for k in 1 2; do
  run st-w1-card-$k $H/w1-corner.mjs --fixture pass --engine webkit --out $ST_OUT/w1card$k --cells '^card'
  run st-w3-overhang-$k $H/selftest.mjs --only W3 --engine all --out $ST_OUT/overhang$k --faults overhang
done
# 3
for b in floor bp g head; do run nb-$b $H/w3-morph.mjs --build $OUT/builds/$b --adapter "$(adapter $b)" --engine chromium,webkit --out $OUT/nb --no-faces --cells '^neighbour'; done
# 4
run W3-head $H/w3-morph.mjs --build $OUT/builds/head --adapter "$(adapter head)" --engine chromium,webkit --out $OUT --no-faces
run FM-head $H/film.mjs --build $OUT/builds/head --adapter "$(adapter head)" --engine chromium,webkit --out $OUT
# 5
for b in floor bp g head; do run ST2-$b $H/stall.mjs --build $OUT/builds/$b --adapter "$(adapter $b)" --engine chromium,webkit --out $OUT/st2; done
echo RERUN-DONE > "$REC/rerun-done.txt"
fi
# 6  (appended after the first five ran) W3 a second time on all four builds at the lower load the
#    machine reached after the baseline (the first W3 readings ran at load 115-590): every W3 timing
#    cell then has two readings, and a verdict that differs between them is NOT-REPRODUCED
if [ "${2:-}" = "--w3b" ]; then
  for b in floor bp g head; do run W3b-$b $H/w3-morph.mjs --build $OUT/builds/$b --adapter "$(adapter $b)" --engine chromium,webkit --out $OUT/w3b --no-faces; done
  echo W3B-DONE > "$REC/rerun-w3b-done.txt"
fi
# 7  (appended after step 6) the film tool's revised marker (the viewport corner, H3.md §2 H3-8), its
#    self-test and the four builds again; a third ST reading (the cells whose first two readings
#    differ); the `snap` plant twice (BAD once at load 144 in selftest-final-W3-ST-FM.log); W1 `card·*`
#    on floor+G (UNMEASURED in Chromium in the baseline)
if [ "${2:-}" = "--step7" ]; then
  run st-fm $H/selftest.mjs --only FM --engine all --out $ST_OUT/fm
  for b in head floor bp g; do run FM2-$b $H/film.mjs --build $OUT/builds/$b --adapter "$(adapter $b)" --engine chromium,webkit --out $OUT/fm2; done
  for b in head floor bp g; do run ST3-$b $H/stall.mjs --build $OUT/builds/$b --adapter "$(adapter $b)" --engine chromium,webkit --out $OUT/st3; done
  for k in 1 2; do run st-snap-$k $H/selftest.mjs --only W3 --engine all --out $ST_OUT/snap$k --faults snap; done
  run W1card-g $H/w1-corner.mjs --build $OUT/builds/g --adapter "$(adapter g)" --engine chromium,webkit --out $OUT/w1g --cells '^card'
  echo STEP7-DONE > "$REC/rerun-step7-done.txt"
fi
