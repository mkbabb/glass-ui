#!/usr/bin/env bash
# The reruns: WebKit's lost cells in small runs (a fresh browser each), then Chromium's still cells
# with the no-script witness out of flow. Each its own guarded call, one at a time.   queue2.sh <out>
set -u
OUT=$1; H=$(cd "$(dirname "$0")" && pwd); G=~/.claude/guard/guarded
while ! grep -q "webkit done" "$OUT/log-queue.txt" 2>/dev/null; do sleep 30; done
w() { $G --exclusive webkit --timeout 40 -- "$H/run.sh" probe.mjs webkit "$OUT" > "$OUT/log-rerun-webkit-$1.txt" 2>&1; echo "rerun webkit $1 rc=$?" >> "$OUT/log-queue.txt"; }
ONLY_CELLS=1440:c w cells-1440-c
ONLY_STILL=1 STILL_CANDS=ctl,a w still-ctl-a
ONLY_STILL=1 STILL_CANDS=b,c DO_INVIEW=1 w still-b-c
ONLY_STILL=1 $G --timeout 30 -- "$H/run.sh" probe.mjs chromium "$OUT" > "$OUT/log-still-chromium-2.txt" 2>&1; echo "still chromium (2) rc=$?" >> "$OUT/log-queue.txt"
echo "queue2 done" >> "$OUT/log-queue.txt"
