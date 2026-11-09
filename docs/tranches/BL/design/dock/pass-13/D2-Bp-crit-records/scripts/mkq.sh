#!/bin/bash
# mkq.sh (D2 pass 13, FRESH CRITIC of D2-B′, REGISTRY §P12c-7.4; after the builder's and the pass-12 completion critic's mkq.sh):
# writes the four read queues chain.sh runs (q/<engine>-<theme>.q), one line per read: id|gate|est-min|command. Written once,
# before any read. bp13 and bp12 alternate, bp13 first in each round.
#   A/Bs of §P12c-7.3 item 5, gate 11 (each read started at load <= 11; the slot waits, never a timeout into a higher start):
#     ab     W3 retarget·40/80/120 (+ controls), 8 rounds                                      rules (a), (b)
#     cr     W3 content-remove (+ control), 8 rounds                                           rule (c), every gap
#     rev    W3 reversal (+ control), 16 rounds per Chromium theme, 8 per WebKit theme          rule (d), every stub read
#     swrev  pass-11 critic's swrev.mjs with F2's arguments (--at 40 --then 0,16,32,64 --runs 2), 4 rounds, ALL four columns
#     fmab   (WebKit) FM film·warm-expand / film·first-expand, 8 rounds, strips kept
#     si     the display-frame probe (pass-8 critic's slotink-crit.mjs), 3 rounds
#     r2     W3 whole, 2 rounds: R2 per column with the seat
#   attacks of §P12c-7.4:
#     pe     W3 every cell where a plate edge meets a glyph and the window cells: swap-long, swap-short, lead-add, lead-remove,
#            content-add, warm-collapse, warm-expand (+ controls), 4 rounds, gate 11 (Chromium at <= 11 and Playwright WebKit)
#     revst  the reversal sweep (pass-10 critic's phase2.mjs rev-c at 0.2-0.9), 2 rounds, gate 11
#     rtrev  a retarget during the morph reversal (pass-11 critic's phase3.mjs), D 16/32/64, bp13 and bp12, 2 runs, gate 11
#     lanes  (WebKit) the window late and early: lanes.mjs on bp13t / bp12t, morph and swap scenes, 4 rounds, gate 11
#     r2y    (WebKit) W3 swap-long and retarget·80 (+ controls), 6 rounds, gate 10-15: R2 seats 1 and 2
#     r2x    (WebKit) W3 whole, 3 rounds, gate 10-15
#     fs     the constructed far side (slotink-axis.mjs fs-to-three, fs-to-one), bp13fs / bp12fs, 3 rounds, gate 15
#     heir   (light) heirprobe.mjs on bp13i, fsheir.mjs on bp13fsi, gate 15
#     frz    vmorph collapse frozen (pass-11 critic's frz.mjs), bp13 and bp12, T 42-62 by 4, 2 runs, gate 15
#     edge   retarget·N at N 0-40 by 4 and 200-320 by 10 (pass-10 builder's sweep.mjs), bp13, 2 runs, gate 15
#     cases  (light) CASES case·rotated / ·control, bp13 / bp12, 3 rounds, gate 15: for the record, outside the 38
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p13/Bp-crit; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs; R=$D/pass-13/D2-Bp-crit-records
BS=$D/pass-10/D2-Bp-proto-records/scripts; C10=$D/pass-10/D2-Bp-crit-records/scripts; C11=$D/pass-11/D2-Bp-crit-records/scripts
BU=$D/pass-12/D2-Bp-build-records/scripts; SI=$D/pass-8/D2-Bp-crit-records/scripts/slotink-crit.mjs
AX=$D/pass-9/D2-Bp-crit-records/seat-2/scripts/slotink-axis.mjs; CA=$D/pass-4/D2-Bp-proto-records/probes/cases.mjs
mkdir -p $R/q $R/ab $R/cr $R/rev $R/swrev $R/fmab $R/si $R/r2 $R/pe $R/revst $R/rtrev $R/lanes $R/r2y $R/r2x $R/fs $R/heir $R/frz $R/edge $R/cases
for c in chromium-light chromium-dark webkit-light webkit-dark; do e=${c%-*}; t=${c#*-}
  TE=""; TH=""; [ $t = dark ] && { TE="env DOCK_HARNESS_THEME=dark"; TH="--theme dark"; }
  Q=$R/q/$c.q; : > $Q
  w3() { # id gate est build cells(regex or '') outdir log json-dest
    local cl=""; [ -n "$5" ] && cl="--cells '$5'"
    echo "$1|$2|$3|(uptime; $TE node $H/w3-morph.mjs --build $OUT/builds/$4 --adapter $AD --engine $e $cl --out $6; echo \"exit \$?\"; uptime) > $7 2>&1; j=\$(find $6 -name W3.json | head -1); [ -n \"\$j\" ] && cp \$j $8" >> $Q; }
  NR=8; [ $e = chromium ] && NR=16
  for k in $(seq 1 $NR); do for b in bp13 bp12; do
    w3 rev-$b-r$k 11 1 $b '^reversal(·control)?$' $OUT/rev/$c-$b-r$k $R/rev/w3rev-$c-$b-r$k.log $R/rev/w3rev-$c-$b-r$k.json; done; done
  for k in 1 2 3 4 5 6 7 8; do for b in bp13 bp12; do
    w3 ab-$b-r$k 11 1 $b '^retarget·(40|80|120)(·control)?$' $OUT/rt/$c-$b-r$k $R/ab/w3rt-$c-$b-r$k.log $R/ab/w3rt-$c-$b-r$k.json; done; done
  for k in 1 2 3 4 5 6 7 8; do for b in bp13 bp12; do
    w3 cr-$b-r$k 11 1 $b '^content-remove(·control)?$' $OUT/cr/$c-$b-r$k $R/cr/w3cr-$c-$b-r$k.log $R/cr/w3cr-$c-$b-r$k.json; done; done
  for k in 1 2 3 4; do for b in bp13 bp12; do
    echo "swrev-$b-r$k|11|3|(uptime; node $C11/swrev.mjs --build $OUT/builds/$b --adapter $AD --engine $e $TH --at 40 --then 0,16,32,64 --runs 2 --json $R/swrev/$b-$c-r$k.json; echo \"exit \$?\"; uptime) > $R/swrev/$b-$c-r$k.log 2>&1" >> $Q; done; done
  if [ $e = webkit ]; then for k in 1 2 3 4 5 6 7 8; do for b in bp13 bp12; do o=$OUT/fmab/$c-$b-r$k
    echo "fmab-$b-r$k|11|1|(uptime; $TE node $H/film.mjs --build $OUT/builds/$b --adapter $AD --engine $e --cells '^film·(warm-expand|first-expand)\$' --out $o; echo \"exit \$?\"; uptime) > $R/fmab/fm-$c-$b-r$k.log 2>&1; (cd $o 2>/dev/null && find . -name 'strip-*.png' | while read -r f; do cp \"\$f\" \"$R/fmab/$c-$b-r${k}_\$(basename \$f)\"; done); j=\$(find $o -name FM.json | head -1); [ -n \"\$j\" ] && cp \$j $R/fmab/fm-$c-$b-r$k.json" >> $Q
  done; done; fi
  for k in 1 2 3; do for b in bp13 bp12; do
    echo "si-$b-r$k|11|1|(uptime; $TE node $SI --build $OUT/builds/$b --adapter $AD --engine $e --runs 1 $TH --json $R/si/$b-$c-r$k.json; echo \"exit \$?\"; uptime) >> $R/si/si-$c.log 2>&1" >> $Q; done; done
  for k in 1 2; do for b in bp13 bp12; do
    w3 r2-$b-r$k 11 4 $b '' $OUT/r2/$c-$b-r$k $R/r2/w3-$c-$b-r$k.log $R/r2/w3-$c-$b-r$k.json; done; done
  for k in 1 2 3 4; do for b in bp13 bp12; do
    w3 pe-$b-r$k 11 2 $b '^(swap-long|swap-short|lead-add|lead-remove|content-add|warm-collapse|warm-expand)(·control)?$' $OUT/pe/$c-$b-r$k $R/pe/w3pe-$c-$b-r$k.log $R/pe/w3pe-$c-$b-r$k.json; done; done
  for k in 1 2; do for b in bp13 bp12; do
    echo "revst-$b-k$k|11|2|(uptime; node $C10/phase2.mjs --build $OUT/builds/$b --adapter $AD --engine $e $TH --scene morph --mode rev-c --points 0.2,0.25,0.3,0.8,0.85,0.9 --runs 2 --json $R/revst/$b-$c-k$k.json; echo \"exit \$?\"; uptime) > $R/revst/$b-$c-k$k.log 2>&1" >> $Q; done; done
  for m in rev-c-rt rev-e-rt; do for d in 16 32 64; do for b in bp13 bp12; do
    echo "rtrev-$b-$m-$d|11|2|(uptime; node $C11/phase3.mjs --build $OUT/builds/$b --adapter $AD --engine $e $TH --scene morph --mode $m --then $d --points 0.2,0.35,0.5,0.8 --runs 2 --json $R/rtrev/$b-$c-$m-$d.json; echo \"exit \$?\"; uptime) > $R/rtrev/$b-$c-$m-$d.log 2>&1" >> $Q; done; done; done
  if [ $e = webkit ]; then
    for k in 1 2 3 4; do for sc in morph swap; do for b in bp13t bp12t; do
      echo "lanes-$sc-$b-r$k|11|1|(uptime; node $BU/lanes.mjs --build $OUT/builds/$b --adapter $AD --engine $e $TH --runs 1 --scene $sc --json $R/lanes/$sc-$c-$b-r$k.json; echo \"exit \$?\"; uptime) >> $R/lanes/lanes-$c.log 2>&1" >> $Q; done; done; done
    for k in 1 2 3 4 5 6; do for b in bp13 bp12; do
      w3 r2y-$b-r$k 10-15 1 $b '^(swap-long|retarget·80)(·control)?$' $OUT/r2y/$c-$b-r$k $R/r2y/w3-$c-$b-r$k.log $R/r2y/w3-$c-$b-r$k.json; done; done
    for k in 1 2 3; do for b in bp13 bp12; do
      w3 r2x-$b-r$k 10-15 4 $b '' $OUT/r2x/$c-$b-r$k $R/r2x/w3-$c-$b-r$k.log $R/r2x/w3-$c-$b-r$k.json; done; done
  fi
  for k in 1 2 3; do for b in bp13 bp12; do
    echo "fs-$b-r$k|15|1|(uptime; node $AX --build $OUT/builds/${b}fs --adapter $AD --engine $e --query fs=1 --seqs fs-to-three,fs-to-one --runs 1 $TH --rows --json $R/fs/$b-$c-r$k.json; echo \"exit \$?\"; uptime) >> $R/fs/fs-$c.log 2>&1" >> $Q; done; done
  if [ $t = light ]; then
    echo "heir-bp13i|15|1|(uptime; node $BS/heirprobe.mjs --build $OUT/builds/bp13i --adapter $AD --engine $e --json $R/heir/bp13i-$e.json; echo \"exit \$?\"; uptime) > $R/heir/bp13i-$e.log 2>&1" >> $Q
    echo "heir-bp13fsi|15|1|(uptime; node $C10/fsheir.mjs --fs 1 --build $OUT/builds/bp13fsi --adapter $AD --engine $e --json $R/heir/bp13fsi-$e.json; echo \"exit \$?\"; uptime) > $R/heir/bp13fsi-$e.log 2>&1" >> $Q
  fi
  for b in bp13 bp12; do
    echo "frz-$b|15|3|(uptime; $TE node $C11/frz.mjs --build $OUT/builds/$b --adapter $AD --engine $e --at 42,46,50,54,58,62 --runs 2 --out $R/frz/png --tag $b-$c --json $R/frz/$b-$c.json; echo \"exit \$?\"; uptime) > $R/frz/frz-$c-$b.log 2>&1" >> $Q; done
  echo "edge-early|15|3|(uptime; node $BS/sweep.mjs --build $OUT/builds/bp13 --adapter $AD --engine $e $TH --from 0 --to 40 --step 4 --runs 2 --json $R/edge/bp13-$c-early.json; echo \"exit \$?\"; uptime) > $R/edge/bp13-$c-early.log 2>&1" >> $Q
  echo "edge-late|15|3|(uptime; node $BS/sweep.mjs --build $OUT/builds/bp13 --adapter $AD --engine $e $TH --from 200 --to 320 --step 10 --runs 2 --json $R/edge/bp13-$c-late.json; echo \"exit \$?\"; uptime) > $R/edge/bp13-$c-late.log 2>&1" >> $Q
  if [ $t = light ]; then for k in 1 2 3; do for b in bp13 bp12; do o=$OUT/cases/$c-$b-r$k
    echo "cases-$b-r$k|15|2|(uptime; node $CA --build $OUT/builds/$b --adapter $AD --engine $e --out $o --cells '^case·rotated(·control)?\$'; echo \"exit \$?\"; uptime) > $R/cases/cases-$c-$b-r$k.log 2>&1; j=\$(find $o -name CASES.json | head -1); [ -n \"\$j\" ] && cp \$j $R/cases/cases-$c-$b-r$k.json" >> $Q
  done; done; fi
  echo "$c: $(wc -l < $Q) lines"
done
