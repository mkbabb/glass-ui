#!/bin/bash
# mkq.sh (D2 pass 12, COMPLETION CRITIC): writes the four read queues chain.sh's `q` step runs (q/<engine>-<theme>.q), one line per
# read: id|gate|est-min|command. Written once, before any read; a queue is never edited while its column runs.
#   A/Bs (§7.2 step 5; §P11-7.3 item 6), bp12 and bp10 alternating, gate 11 (no timeout into a higher start):
#     ab    W3 retarget·40/80/120 (+ controls), 8 rounds                         rules (a), (b)
#     cr    W3 content-remove (+ control), 8 rounds, witness JSON kept            rule (c), every gap
#     fmab  (WebKit) FM film·warm-expand / film·first-expand, 8 rounds, strips kept   the B2 hole
#     si    the display-frame probe (pass-8 critic's slotink-crit.mjs), 3 rounds (the builder's and pass 11's count)
#     r2    W3 whole, 2 rounds: R2 per column with the seat
#   attacks (§7.2 step 6):
#     lanes (WebKit) the window on content-add, lead-*, swap-*, warm-*, content-remove: the builder's lanes.mjs on bp12t / bp10t
#           alternating, morph and swap scenes, 4 rounds, gate 11; late (close − land) and early (a lane painting after close)
#     r2x   (WebKit) W3 whole, bp12 / bp10 alternating, 3 rounds, started at load 10-15 (at most a 10-min wait, then runs at the
#           load it finds, recorded): above all W·l seat 8 warm-expand
#     revst the reversal (pass-10 critic's phase2.mjs rev-c at 0.2/0.25/0.3/0.8/0.85/0.9), bp12 / bp10 alternating, 2 rounds
#     swrev the swap reversed + retargeted (pass-11 critic's swrev.mjs), bp12 2 runs; bp10 control D 16/32, 1 run
#     rtrev a retarget during the morph reversal (pass-11 critic's phase3.mjs), bp12, 2 runs
#     edge  retarget·N at N 0-40 by 4 and 200-320 by 10 (pass-10 builder's sweep.mjs), bp12, 2 runs
#     fs    the constructed far side in paint (pass-9 critic's slotink-axis.mjs fs-to-three, fs-to-one), bp12fs / bp10fs, 3 rounds
#     heir  (light) heirprobe.mjs on bp12i, fsheir.mjs on bp12fsi
#     frz   vmorph collapse frozen at the leaving pair's frame (pass-11 critic's frz.mjs), bp12, T 42-62 by 4, 2 runs
#     cases (light) CASES case·rotated / ·control, bp12 / bp10 alternating, 3 rounds: for the record, outside the 38
#   attacks other than lanes and r2x take gate 15.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p12c/Bp-crit; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs; R=$D/pass-12/D2-Bp-critc-records
BS=$D/pass-10/D2-Bp-proto-records/scripts; C10=$D/pass-10/D2-Bp-crit-records/scripts; C11=$D/pass-11/D2-Bp-crit-records/scripts
BU=$D/pass-12/D2-Bp-build-records/scripts; SI=$D/pass-8/D2-Bp-crit-records/scripts/slotink-crit.mjs
AX=$D/pass-9/D2-Bp-crit-records/seat-2/scripts/slotink-axis.mjs; CA=$D/pass-4/D2-Bp-proto-records/probes/cases.mjs
mkdir -p $R/q $R/ab $R/cr $R/fmab $R/si $R/r2 $R/lanes $R/r2x $R/revst $R/swrev $R/rtrev $R/edge $R/fs $R/heir $R/frz $R/cases
for c in chromium-light chromium-dark webkit-light webkit-dark; do e=${c%-*}; t=${c#*-}
  TE=""; TH=""; [ $t = dark ] && { TE="env DOCK_HARNESS_THEME=dark"; TH="--theme dark"; }
  Q=$R/q/$c.q; : > $Q
  w3() { # id gate est build cells(regex or '') outdir log json-dest
    local cl=""; [ -n "$5" ] && cl="--cells '$5'"
    echo "$1|$2|$3|(uptime; $TE node $H/w3-morph.mjs --build $OUT/builds/$4 --adapter $AD --engine $e $cl --out $6; echo \"exit \$?\"; uptime) > $7 2>&1; j=\$(find $6 -name W3.json | head -1); [ -n \"\$j\" ] && cp \$j $8" >> $Q; }
  for k in 1 2 3 4 5 6 7 8; do for b in bp12 bp10; do
    w3 ab-$b-r$k 11 1 $b '^retarget·(40|80|120)(·control)?$' $OUT/rt/$c-$b-r$k $R/ab/w3rt-$c-$b-r$k.log $R/ab/w3rt-$c-$b-r$k.json; done; done
  for k in 1 2 3 4 5 6 7 8; do for b in bp12 bp10; do
    w3 cr-$b-r$k 11 1 $b '^content-remove(·control)?$' $OUT/cr/$c-$b-r$k $R/cr/w3cr-$c-$b-r$k.log $R/cr/w3cr-$c-$b-r$k.json; done; done
  if [ $e = webkit ]; then for k in 1 2 3 4 5 6 7 8; do for b in bp12 bp10; do o=$OUT/fmab/$c-$b-r$k
    echo "fmab-$b-r$k|11|1|(uptime; $TE node $H/film.mjs --build $OUT/builds/$b --adapter $AD --engine $e --cells '^film·(warm-expand|first-expand)\$' --out $o; echo \"exit \$?\"; uptime) > $R/fmab/fm-$c-$b-r$k.log 2>&1; (cd $o 2>/dev/null && find . -name 'strip-*.png' | while read -r f; do cp \"\$f\" \"$R/fmab/$c-$b-r${k}_\$(basename \$f)\"; done); j=\$(find $o -name FM.json | head -1); [ -n \"\$j\" ] && cp \$j $R/fmab/fm-$c-$b-r$k.json" >> $Q
  done; done; fi
  for k in 1 2 3; do for b in bp12 bp10; do
    echo "si-$b-r$k|11|1|(uptime; $TE node $SI --build $OUT/builds/$b --adapter $AD --engine $e --runs 1 $TH --json $R/si/$b-$c-r$k.json; echo \"exit \$?\"; uptime) >> $R/si/si-$c.log 2>&1" >> $Q; done; done
  for k in 1 2; do for b in bp12 bp10; do
    w3 r2-$b-r$k 11 4 $b '' $OUT/r2/$c-$b-r$k $R/r2/w3-$c-$b-r$k.log $R/r2/w3-$c-$b-r$k.json; done; done
  if [ $e = webkit ]; then
    for k in 1 2 3 4; do for sc in morph swap; do for b in bp12t bp10t; do
      echo "lanes-$sc-$b-r$k|11|1|(uptime; node $BU/lanes.mjs --build $OUT/builds/$b --adapter $AD --engine $e $TH --runs 1 --scene $sc --json $R/lanes/$sc-$c-$b-r$k.json; echo \"exit \$?\"; uptime) >> $R/lanes/lanes-$c.log 2>&1" >> $Q; done; done; done
    for k in 1 2 3; do for b in bp12 bp10; do
      w3 r2x-$b-r$k 10-15 4 $b '' $OUT/r2x/$c-$b-r$k $R/r2x/w3-$c-$b-r$k.log $R/r2x/w3-$c-$b-r$k.json; done; done
  fi
  for k in 1 2; do for b in bp12 bp10; do
    echo "revst-$b-k$k|15|2|(uptime; node $C10/phase2.mjs --build $OUT/builds/$b --adapter $AD --engine $e $TH --scene morph --mode rev-c --points 0.2,0.25,0.3,0.8,0.85,0.9 --runs 2 --json $R/revst/$b-$c-k$k.json; echo \"exit \$?\"; uptime) > $R/revst/$b-$c-k$k.log 2>&1" >> $Q; done; done
  echo "swrev-bp12|15|6|(uptime; node $C11/swrev.mjs --build $OUT/builds/bp12 --adapter $AD --engine $e $TH --at 40,60,80,100,120 --then 0,16,32,64 --runs 2 --json $R/swrev/bp12-$c.json; echo \"exit \$?\"; uptime) > $R/swrev/bp12-$c.log 2>&1" >> $Q
  echo "swrev-bp10|15|3|(uptime; node $C11/swrev.mjs --build $OUT/builds/bp10 --adapter $AD --engine $e $TH --at 40,60,80,100,120 --then 16,32 --runs 1 --json $R/swrev/bp10-$c.json; echo \"exit \$?\"; uptime) > $R/swrev/bp10-$c.log 2>&1" >> $Q
  for m in rev-c-rt rev-e-rt; do for d in 16 32 64; do
    echo "rtrev-$m-$d|15|2|(uptime; node $C11/phase3.mjs --build $OUT/builds/bp12 --adapter $AD --engine $e $TH --scene morph --mode $m --then $d --points 0.2,0.35,0.5,0.8 --runs 2 --json $R/rtrev/bp12-$c-$m-$d.json; echo \"exit \$?\"; uptime) > $R/rtrev/bp12-$c-$m-$d.log 2>&1" >> $Q; done; done
  echo "edge-early|15|3|(uptime; node $BS/sweep.mjs --build $OUT/builds/bp12 --adapter $AD --engine $e $TH --from 0 --to 40 --step 4 --runs 2 --json $R/edge/bp12-$c-early.json; echo \"exit \$?\"; uptime) > $R/edge/bp12-$c-early.log 2>&1" >> $Q
  echo "edge-late|15|3|(uptime; node $BS/sweep.mjs --build $OUT/builds/bp12 --adapter $AD --engine $e $TH --from 200 --to 320 --step 10 --runs 2 --json $R/edge/bp12-$c-late.json; echo \"exit \$?\"; uptime) > $R/edge/bp12-$c-late.log 2>&1" >> $Q
  for k in 1 2 3; do for b in bp12 bp10; do
    echo "fs-$b-r$k|15|1|(uptime; node $AX --build $OUT/builds/${b}fs --adapter $AD --engine $e --query fs=1 --seqs fs-to-three,fs-to-one --runs 1 $TH --rows --json $R/fs/$b-$c-r$k.json; echo \"exit \$?\"; uptime) >> $R/fs/fs-$c.log 2>&1" >> $Q; done; done
  if [ $t = light ]; then
    echo "heir-bp12i|15|1|(uptime; node $BS/heirprobe.mjs --build $OUT/builds/bp12i --adapter $AD --engine $e --json $R/heir/bp12i-$e.json; echo \"exit \$?\"; uptime) > $R/heir/bp12i-$e.log 2>&1" >> $Q
    echo "heir-bp12fsi|15|1|(uptime; node $C10/fsheir.mjs --fs 1 --build $OUT/builds/bp12fsi --adapter $AD --engine $e --json $R/heir/bp12fsi-$e.json; echo \"exit \$?\"; uptime) > $R/heir/bp12fsi-$e.log 2>&1" >> $Q
  fi
  echo "frz-bp12|15|3|(uptime; $TE node $C11/frz.mjs --build $OUT/builds/bp12 --adapter $AD --engine $e --at 42,46,50,54,58,62 --runs 2 --out $R/frz/png --tag bp12-$c --json $R/frz/bp12-$c.json; echo \"exit \$?\"; uptime) > $R/frz/frz-$c.log 2>&1" >> $Q
  if [ $t = light ]; then for k in 1 2 3; do for b in bp12 bp10; do o=$OUT/cases/$c-$b-r$k
    echo "cases-$b-r$k|15|2|(uptime; node $CA --build $OUT/builds/$b --adapter $AD --engine $e --out $o --cells '^case·rotated(·control)?\$'; echo \"exit \$?\"; uptime) > $R/cases/cases-$c-$b-r$k.log 2>&1; j=\$(find $o -name CASES.json | head -1); [ -n \"\$j\" ] && cp \$j $R/cases/cases-$c-$b-r$k.json" >> $Q
  done; done; fi
  echo "$c: $(wc -l < $Q) lines"
done
