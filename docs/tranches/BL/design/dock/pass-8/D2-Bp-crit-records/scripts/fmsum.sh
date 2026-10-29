#!/bin/bash
# fmsum.sh <battery dir>: every FM read of the six B2 cells, per log: verdict, cell, hole frames, stub frames, load.
cd "$1" || exit 1
for f in $(ls *-FM-*.log | sort); do
  grep -h "film·" "$f" | sed -E 's/^(PASS|FAIL|NOT-REPRODUCED)  FM  (Chromium|Playwright WebKit)  (film·[a-z-]+) .*stub ([0-9]+) stub frame.* ([0-9]+) frame\(s\) with a hole([^(]*).*\[load ([0-9.]+)\].*/\1 \3 hole=\5\6 stub=\4 load=\7/' | grep "^PASS\|^FAIL\|^NOT" | sed "s#^#$f #"
done
