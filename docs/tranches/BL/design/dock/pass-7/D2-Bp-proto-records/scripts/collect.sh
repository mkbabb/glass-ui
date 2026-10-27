#!/bin/bash
# collect.sh (D2 pass 7, B′ prototype): copy the seat's records into docs/…/dock/pass-7/D2-Bp-proto-records/ (durable).
set -u
B=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p7/Bp-proto; O=$B/out
P=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/pass-7; R=$P/D2-Bp-proto-records; mkdir -p $R
rsync -a $O/rec/ $R/ ; rsync -a $O/digest $R/ ; rsync -a $O/scripts $R/ ; mkdir -p $R/iter-attempt1; rsync -a $O/iter/ $R/iter-attempt1/
for e in chromium webkit; do for s in main dark; do t=light; [ $s = dark ] && t=dark
  F=$O/$e/bp/$s; mkdir -p $R/filmstrips/$e-$t $R/facility/$e-$t
  cp $F/runs/FM-bp/strip-*.png $F/runs/FM-bp/FM.json $R/filmstrips/$e-$t/ 2>/dev/null
  for k in 1 2; do [ -d $F/rerun$k/runs/FM-bp ] && for f in $F/rerun$k/runs/FM-bp/strip-*.png; do cp $f $R/filmstrips/$e-$t/rerun$k-$(basename $f); done; done
  rsync -a $F/runs/CF-bp/frames $R/facility/$e-$t/ 2>/dev/null
  [ -d $F/runs/L1-bp ] && { mkdir -p $R/l1/$e; cp $F/runs/L1-bp/*.png $R/l1/$e/; }
done; done
for d in $O/fmlow-*; do [ -d $d ] || continue; n=$(basename $d); mkdir -p $R/fmlow/$n; find $d -name 'strip-*.png' -o -name FM.json | while read f; do cp $f $R/fmlow/$n/; done; done
cp $O/D2-Bp-proto.patch $P/D2-Bp-proto.patch; shasum -a 256 $P/D2-Bp-proto.patch
du -sh $R
