#!/bin/bash
# r2sum.sh <battery dir> [build]: R2's worst one-frame leaving drop beyond the closing edge (bound 0.5) per column, over
# every W3 cell of the main/dark stage and its re-runs; prints the worst read, its cell, seat, offset and load, and the margin.
cd "$1" || exit 1; b=${2:-bp8}
for e in chromium webkit; do for s in main dark; do
  t=light; [ $s = dark ] && t=dark
  for f in $b-$s-W3-$e.log $b-$s-W3-$e-rerun1.log $b-$s-W3-$e-rerun2.log; do
    [ -f $f ] || continue
    grep -h "^\(PASS\|FAIL\|OWNER-BLOCKED\|NOT-REPRODUCED\)  W3  \(Chromium\|Playwright WebKit\)  " $f | grep "vanish worst" | sed -E "s/^[A-Z-]+  W3  (Chromium|Playwright WebKit)  ([^ ]+) .*vanish worst one-frame drop beyond the closing edge ([0-9.]+) \(([^)]*)\).*\[load ([0-9.]+)\].*/\3 \2 (\4) load \5/" | sed "s#^#$e $t $f #"
  done
done; done | sort -k1,2 -k4,4nr | awk '{k=$1" "$2; if(!(k in seen)){seen[k]=1; printf "%s %s worst %s margin %.3f · %s\n",$1,$2,$4,0.5-$4,$0}}'
