#!/bin/bash
# loads.sh <battery dir> [build]: per slot (engine × theme; light = main + rest, dark = dark + darkrest) the cells' 1-minute
# load (every "[load N]" in the witness logs, re-runs included): min, max, and the count of cells above 31 (§P8-7.3 step 2).
cd "$1" || exit 1; b=${2:-bp8}
for e in chromium webkit; do for t in light dark; do
  s1=main; s2=rest; [ $t = dark ] && { s1=dark; s2=darkrest; }
  ls $b-$s1-*-$e*.log $b-$s2-*-$e*.log >/dev/null 2>&1 || continue
  cat $b-$s1-*-$e*.log $b-$s2-*-$e*.log 2>/dev/null | grep -o "\[load [0-9.]*\]" | tr -d '[]' | awk -v k="$e $t" '{v=$2; n++; if(n==1||v<mn)mn=v; if(v>mx)mx=v; if(v>31)o++} END{printf "%s: %d cells, load %.2f-%.2f, above 31: %d\n",k,n,mn,mx,o+0}'
done; done
