#!/bin/bash
# readout.sh <battery dir> <engine>: B2 hole per FM cell (main, re-run 1, re-run 2) with load; W3 worst vanish, narrowest ramp; CF C8/C9.
B=$1; E=$2
for st in main dark; do for r in "" -rerun1 -rerun2; do f=$B/bp-$st-FM-$E$r.log; [ -f $f ] || continue
  echo "== $st FM$r"; grep -E "^(PASS|FAIL)  FM  [A-Za-z ]+  film·" $f | sed -E 's/^(PASS|FAIL)  FM  [A-Za-z ]+  (film·[a-z-]+) .*hole ([0-9]+) slot.*scale ([0-9.]+), video lag (-?[0-9]+) ms.*; ([0-9]+) frame\(s\) with a hole([^[]*)\[load ([0-9.]+)\].*/\1 \2 holes=\6 \7 scale=\4 lag=\5 load=\8/'
done; done
for st in main dark; do f=$B/bp-$st-W3-$E.log; [ -f $f ] || continue; echo "== $st W3 vanish"
  grep -E "^[A-Z-]+  W3  [A-Za-z ]+  [a-z·0-9-]+ " $f | grep -oE "^[A-Z-]+  W3  [A-Za-z ]+  [^ ]+|vanish worst one-frame drop beyond the closing edge [0-9.]+ \([^)]*\)|narrowest ramp across a glyph [0-9.]+|\[load [0-9.]+\]" | paste -sd' ' | sed 's/\(PASS\|FAIL\|OWNER-BLOCKED\)  W3/\n&/g' | grep vanish | sort -t' ' -k1,1 
done
