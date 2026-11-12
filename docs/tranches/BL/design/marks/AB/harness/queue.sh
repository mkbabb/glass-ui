#!/usr/bin/env bash
# The AB queue: each run its own guarded call, one at a time.   queue.sh <out> <phase: chromium|webkit>
set -u
OUT=$1; PH=$2; H=$(cd "$(dirname "$0")" && pwd); G=~/.claude/guard/guarded
if [ "$PH" = chromium ]; then
  ONLY_STILL=1 $G --timeout 30 -- "$H/run.sh" probe.mjs chromium "$OUT" > "$OUT/log-still-chromium.txt" 2>&1; echo "still chromium rc=$?" >> "$OUT/log-queue.txt"
  $G --cpu-cores 0 --timeout 40 -- "$H/run.sh" stall.mjs chromium "$OUT" > "$OUT/log-stall-chromium.txt" 2>&1; echo "stall chromium rc=$?" >> "$OUT/log-queue.txt"
  $G --timeout 20 -- "$H/run.sh" scroll.mjs chromium "$OUT" > "$OUT/log-scroll-chromium.txt" 2>&1; echo "scroll chromium rc=$?" >> "$OUT/log-queue.txt"
else
  $G --exclusive webkit --timeout 75 -- "$H/run.sh" probe.mjs webkit "$OUT" > "$OUT/log-probe-webkit.txt" 2>&1; echo "probe webkit rc=$?" >> "$OUT/log-queue.txt"
  $G --exclusive webkit --timeout 40 -- "$H/run.sh" stall.mjs webkit "$OUT" > "$OUT/log-stall-webkit.txt" 2>&1; echo "stall webkit rc=$?" >> "$OUT/log-queue.txt"
  $G --exclusive webkit --timeout 20 -- "$H/run.sh" scroll.mjs webkit "$OUT" > "$OUT/log-scroll-webkit.txt" 2>&1; echo "scroll webkit rc=$?" >> "$OUT/log-queue.txt"
fi
echo "$PH done" >> "$OUT/log-queue.txt"
