#!/bin/bash
# mkq.sh (D2 pass 13, BUILDER of D2-B′, REGISTRY §P12c-7.3 item 5; after the pass-12 completion critic's mkq.sh): writes the four
# read queues chain.sh's `q` step runs (q/<engine>-<theme>.q), one line per read: id|gate|est-min|command. Written once, before
# any read; a queue is never edited while its column runs. bp13 and bp12 alternate, bp13 first in each round.
#   A/Bs, gate 11 (each read started at load <= 11; the slot waits, never a timeout into a higher start):
#     ab     W3 retarget·40/80/120 (+ controls), 8 rounds                                  rules (a), (b)
#     cr     W3 content-remove (+ control), 8 rounds, witness JSON kept                    rule (c), every gap
#     rev    W3 reversal (+ control), 16 rounds per Chromium theme, 8 per WebKit theme      rule (d), every stub read
#     swrev  (WebKit) pass-11 critic's swrev.mjs --at 40 --then 0,16,32,64, 8 rounds         beside the rows
#     fmab   (WebKit) FM film·warm-expand / film·first-expand, 8 rounds, strips kept         the gift frame
#     si     the display-frame probe (pass-8 critic's slotink-crit.mjs), 3 rounds
#     r2     W3 whole, 2 rounds: R2 per column with the seat
#   R2 against bp12 at load 10-15 (§7.3 item 3): r2x (WebKit) W3 whole, 3 rounds, gate 10-15 (a 10-min wait, then it runs at the
#     load it finds, recorded)
#   holds, gate 15: heir (light; pass-10 builder's heirprobe.mjs on bp13i), frz (pass-11 critic's frz.mjs, T 42-62 by 4, 2 runs)
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p13/Bp-build; OUT=$B/out2
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs; R=$D/pass-13/D2-Bp-build-records/v2
BS=$D/pass-10/D2-Bp-proto-records/scripts; C11=$D/pass-11/D2-Bp-crit-records/scripts; SI=$D/pass-8/D2-Bp-crit-records/scripts/slotink-crit.mjs
mkdir -p $R/q $R/ab $R/cr $R/rev $R/swrev $R/fmab $R/si $R/r2 $R/r2x $R/heir $R/frz
for c in chromium-light chromium-dark webkit-light webkit-dark; do e=${c%-*}; t=${c#*-}
  TE=""; TH=""; [ $t = dark ] && { TE="env DOCK_HARNESS_THEME=dark"; TH="--theme dark"; }
  Q=$R/q/$c.q; : > $Q
  w3() { # id gate est build cells(regex or '') outdir log json-dest
    local cl=""; [ -n "$5" ] && cl="--cells '$5'"
    echo "$1|$2|$3|(uptime; $TE node $H/w3-morph.mjs --build $OUT/builds/$4 --adapter $AD --engine $e $cl --out $6; echo \"exit \$?\"; uptime) > $7 2>&1; j=\$(find $6 -name W3.json | head -1); [ -n \"\$j\" ] && cp \$j $8" >> $Q; }
  for k in 1 2 3 4 5 6 7 8; do for b in bp13 bp12; do
    w3 ab-$b-r$k 11 1 $b '^retarget·(40|80|120)(·control)?$' $OUT/rt/$c-$b-r$k $R/ab/w3rt-$c-$b-r$k.log $R/ab/w3rt-$c-$b-r$k.json; done; done
  for k in 1 2 3 4 5 6 7 8; do for b in bp13 bp12; do
    w3 cr-$b-r$k 11 1 $b '^content-remove(·control)?$' $OUT/cr/$c-$b-r$k $R/cr/w3cr-$c-$b-r$k.log $R/cr/w3cr-$c-$b-r$k.json; done; done
  NR=8; [ $e = chromium ] && NR=16
  for k in $(seq 1 $NR); do for b in bp13 bp12; do
    w3 rev-$b-r$k 11 1 $b '^reversal(·control)?$' $OUT/rev/$c-$b-r$k $R/rev/w3rev-$c-$b-r$k.log $R/rev/w3rev-$c-$b-r$k.json; done; done
  if [ $e = webkit ]; then
    for k in 1 2 3 4 5 6 7 8; do for b in bp13 bp12; do
      echo "swrev-$b-r$k|11|2|(uptime; node $C11/swrev.mjs --build $OUT/builds/$b --adapter $AD --engine $e $TH --at 40 --then 0,16,32,64 --runs 1 --json $R/swrev/$b-$c-r$k.json; echo \"exit \$?\"; uptime) > $R/swrev/$b-$c-r$k.log 2>&1" >> $Q; done; done
    for k in 1 2 3 4 5 6 7 8; do for b in bp13 bp12; do o=$OUT/fmab/$c-$b-r$k
      echo "fmab-$b-r$k|11|1|(uptime; $TE node $H/film.mjs --build $OUT/builds/$b --adapter $AD --engine $e --cells '^film·(warm-expand|first-expand)\$' --out $o; echo \"exit \$?\"; uptime) > $R/fmab/fm-$c-$b-r$k.log 2>&1; (cd $o 2>/dev/null && find . -name 'strip-*.png' | while read -r f; do cp \"\$f\" \"$R/fmab/$c-$b-r${k}_\$(basename \$f)\"; done); j=\$(find $o -name FM.json | head -1); [ -n \"\$j\" ] && cp \$j $R/fmab/fm-$c-$b-r$k.json" >> $Q
    done; done
  fi
  for k in 1 2 3; do for b in bp13 bp12; do
    echo "si-$b-r$k|11|1|(uptime; $TE node $SI --build $OUT/builds/$b --adapter $AD --engine $e --runs 1 $TH --json $R/si/$b-$c-r$k.json; echo \"exit \$?\"; uptime) >> $R/si/si-$c.log 2>&1" >> $Q; done; done
  for k in 1 2; do for b in bp13 bp12; do
    w3 r2-$b-r$k 11 4 $b '' $OUT/r2/$c-$b-r$k $R/r2/w3-$c-$b-r$k.log $R/r2/w3-$c-$b-r$k.json; done; done
  if [ $e = webkit ]; then for k in 1 2 3; do for b in bp13 bp12; do
    w3 r2x-$b-r$k 10-15 4 $b '' $OUT/r2x/$c-$b-r$k $R/r2x/w3-$c-$b-r$k.log $R/r2x/w3-$c-$b-r$k.json; done; done; fi
  [ $t = light ] && echo "heir-bp13i|15|1|(uptime; node $BS/heirprobe.mjs --build $OUT/builds/bp13i --adapter $AD --engine $e --json $R/heir/bp13i-$e.json; echo \"exit \$?\"; uptime) > $R/heir/bp13i-$e.log 2>&1" >> $Q
  echo "frz-bp13|15|3|(uptime; $TE node $C11/frz.mjs --build $OUT/builds/bp13 --adapter $AD --engine $e --at 42,46,50,54,58,62 --runs 2 --out $R/frz/png --tag bp13-$c --json $R/frz/bp13-$c.json; echo \"exit \$?\"; uptime) > $R/frz/frz-$c.log 2>&1" >> $Q
  echo "$c: $(wc -l < $Q) lines"
done
