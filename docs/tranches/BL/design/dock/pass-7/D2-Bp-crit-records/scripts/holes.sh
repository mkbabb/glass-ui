#!/bin/bash
# holes.sh <battery dir> <engine>: H7-1 hole frames per FM B2 cell, main / re-run 1 / re-run 2, with longest run, seat and load.
B=$1; E=$2
for st in main dark; do for r in "" -rerun1 -rerun2; do f=$B/bp-$st-FM-$E$r.log; [ -f $f ] || continue
  echo "== $st FM${r:-main}"
  grep -E "^(PASS|FAIL)  FM  [A-Za-z ]+  film·" $f | sed -E 's/^(PASS|FAIL)  FM  [A-Za-z ]+  (film·[a-z-]+) .*motion to frame [0-9]+ \(([0-9]+) ms\).*; ([0-9]+) frame\(s\) with a hole(, longest [0-9]+ consecutive frame\(s\)(: seat [0-9]+ at ink [0-9.]+ at \+[0-9]+ ms)?)?.*\[load ([0-9.]+)\].*/\1 \2 motion=\3ms holes=\4\5 load=\7/'
done; done
