#!/bin/bash
# extras3.sh (D2 pass 9, fresh critic of B′): the attack readings, none a row, replacing extras2.sh's per-step WebKit queue (seven
# lock queues at about an hour each) with ONE --exclusive webkit slot. extras2.sh was stopped in its first Chromium step, before
# any WebKit queue. Every run guarded; never --light; WebKit queued, never cancelled.
#   vl  slotink-axis on vmorph lead-remove (the scene the far-side instrument read GATED) and morph lead-remove, bp8/bp7, 3 runs
#   fs  the constructed true far-side (scratch harness copy, swap?fs=1), bp8fs/bp7fs, both directions, 3 runs; plus the instrument
#   rt  W3 retarget·40/80/120 alone, bp8/bp7 alternating, 8 rounds, per theme
#   w3  W3 whole twice per theme, Playwright WebKit, no load gate (R2's margin)
#   ab  film·content-add alone, bp8/bp7, 5 rounds per theme
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p9/Bp-crit; OUT=$B/out; WT=$B/wt
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
REC=$D/pass-9/D2-Bp-crit-records/seat-2; S=$REC/scripts; GD=$HOME/.claude/guard/guarded; X=$REC/extras; PROBE=$S/slotink-axis.mjs
mkdir -p $X/vl $X/fs $X/ab $X/w3 $X/rt
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
export G B OUT WT D H AD REC S X PROBE
body() { # engine: every probe of this seat for that engine, one at a time
  E=$1; echo "admitted $(date) $(uptime)"
  for t in light dark; do TH=""; TE=""; [ $t = dark ] && { TH="--theme dark"; TE="env DOCK_HARNESS_THEME=dark"; }
    for k in 1 2 3; do for b in bp8 bp7; do
      node $PROBE --build $OUT/builds/$b --adapter $AD --engine $E --seqs vlead-remove,lead-remove --runs 1 $TH --rows --json $X/vl/$b-$E-$t-r$k.json >> $X/vl/vl-$E-$t.log 2>&1
      node $PROBE --build $OUT/builds/${b}fs --adapter $AD --engine $E --query fs=1 --seqs fs-to-three,fs-to-one --runs 1 $TH --rows --json $X/fs/$b-$E-$t-r$k.json >> $X/fs/fs-$E-$t.log 2>&1
    done; done
    for k in 1 2 3 4 5 6 7 8; do for b in bp8 bp7; do
      (uptime; $TE node $H/w3-morph.mjs --build $OUT/builds/$b --adapter $AD --engine $E --cells '^retarget·(40|80|120)(·control)?$' --out $OUT/rt/$E-$t-$b-r$k; echo "exit $?"; uptime) > $X/rt/w3rt-$E-$t-$b-r$k.log 2>&1
    done; done
    if [ $E = webkit ]; then for k in 1 2; do
      (uptime; $TE node $H/w3-morph.mjs --build $OUT/builds/bp8 --adapter $AD --engine webkit --out $OUT/w3x/$t-r$k; echo "exit $?"; uptime) > $X/w3/w3-webkit-$t-r$k.log 2>&1
    done; fi
    for k in 1 2 3 4 5; do for b in bp8 bp7; do
      (uptime; $TE node $H/film.mjs --build $OUT/builds/$b --adapter $AD --engine $E --cells '^film·content-add$' --out $OUT/ab/$E-$t-$b-r$k; echo "exit $?"; uptime) > $X/ab/fm-$E-$t-$b-r$k.log 2>&1
    done; done
  done
  echo "body end $(date) $(uptime)"
}
export -f body
L "EXTRAS3 start"
if [ ! -d $OUT/builds/bp8fs ]; then
  P9=$D/pass-9/D2-Bp-p9.patch; BP7=$D/pass-7/D2-Bp-proto.patch; F=$WT/src/components/dock/composables/useDockScene.ts; HF=$B/hfs
  python3 -I $S/fs-scene.py $H $HF
  (uptime; cp $F $B/hold.ts; patch -s $F < $S/bp8i-instrument.diff; $GD --timeout 20 -- node $HF/build.mjs $WT --out $OUT --label bp8fsi; echo "exit $?"; cp $B/hold.ts $F
   $GD --timeout 20 -- node $HF/build.mjs $WT --out $OUT --label bp8fs; echo "exit $?"
   (cd $WT && git apply -R $P9 && git apply $BP7) && $GD --timeout 20 -- node $HF/build.mjs $WT --out $OUT --label bp7fs; echo "exit $?"
   (cd $WT && git apply -R $BP7 && git apply $P9); echo "restored: $(cmp $F $B/hold.ts && echo equal)"; uptime) > $X/fs/build.log 2>&1
  L "fs built"
fi
L "start chromium extras"
$GD --timeout 85 -- bash -c 'body chromium' > $X/slot-chromium.log 2>&1; L "end chromium extras exit $?"
L "queue webkit extras"
$GD --exclusive webkit --timeout 85 -- bash -c 'body webkit' > $X/slot-webkit.log 2>&1; L "end webkit extras exit $?"
L "EXTRAS-DONE"
