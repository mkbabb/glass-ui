#!/bin/bash
# Fix seat 6: while a probe runs, sample every Playwright WebKit process once a second
# under ms-playwright (pid, parent, CPU %, elapsed time, the process path), stamped with the clock, into <out>.
#   sample.sh <out> <pid to outlive>
out=$1; watch=$2
while kill -0 "$watch" 2>/dev/null; do
  t=$(python3 -c 'import time; print(f"{time.time():.1f}")')
  ps -axo pid=,ppid=,pcpu=,etime=,comm= | grep -E "ms-playwright" | grep -v grep | while read -r l; do echo "$t $l"; done >> "$out"
  sleep 1
done
