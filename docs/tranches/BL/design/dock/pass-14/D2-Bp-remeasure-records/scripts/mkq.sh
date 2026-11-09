#!/bin/bash
# mkq.sh (D2 pass 14, RE-MEASURE seat of D2-B′, REGISTRY §P13-7.3 item 3; after the pass-13 critic's mkq.sh): writes the four read
# queues chain.sh runs (q/<engine>-<theme>.q), one line per read: id|gate|est-min|command. Written once, before any read.
# bp13 and bp12 alternate, bp13 first in each round. Gate 11: each read starts at load <= 11; the slot waits, never a timeout
# into a higher start. Gate 10-15: R2's band (soft after 10 min, as the pass-13 critic's).
#   rev    W3 reversal (+ control), 16 rounds per Chromium theme, 8 per WebKit theme        rule (d): every stub read
#   ab     W3 retarget·40/80/120 (+ controls), 8 rounds                                     rules (a), (b)
#   cr     W3 content-remove (+ control), 8 rounds                                          rule (c): every gap
#   fmab   (WebKit) FM film·warm-expand / film·first-expand, 8 rounds, strips kept
#   si     the display-frame probe (pass-8 critic's slotink-crit.mjs), 3 rounds
#   nb     the base's near-bound classes at A/B rate, 8 rounds per theme: Chromium W3 lead-add / lead-remove [terminal] and
#          swap-long [faces]; Playwright WebKit W3 swap-long [leaving] (its fade span) and swap-short [blank]
#   swp    (WebKit) `swrev` in paint: swpaint.mjs, F2's arguments (--at 40 --then 0,16,32,64 --runs 2), 8 rounds
#   r2     W3 whole, 2 rounds, gate 10-15: R2 per column with the seat
#   r2y    (WebKit) W3 swap-long and retarget·80 (+ controls), 4 rounds, gate 10-15: R2 W·l / W·d seats 1 and 2
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p14/Bp-remeasure; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs; R=$D/pass-14/D2-Bp-remeasure-records
SI=$D/pass-8/D2-Bp-crit-records/scripts/slotink-crit.mjs; SW=$R/scripts/swpaint.mjs
mkdir -p $R/q $R/ab $R/cr $R/rev $R/fmab $R/si $R/r2 $R/nb $R/swp $R/r2y
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
  NB='^(lead-add|lead-remove|swap-long)(·control)?$'; [ $e = webkit ] && NB='^(swap-long|swap-short)(·control)?$'
  for k in 1 2 3 4 5 6 7 8; do for b in bp13 bp12; do
    w3 nb-$b-r$k 11 2 $b "$NB" $OUT/nb/$c-$b-r$k $R/nb/w3nb-$c-$b-r$k.log $R/nb/w3nb-$c-$b-r$k.json; done; done
  if [ $e = webkit ]; then for k in 1 2 3 4 5 6 7 8; do for b in bp13 bp12; do o=$OUT/fmab/$c-$b-r$k
    echo "fmab-$b-r$k|11|1|(uptime; $TE node $H/film.mjs --build $OUT/builds/$b --adapter $AD --engine $e --cells '^film·(warm-expand|first-expand)\$' --out $o; echo \"exit \$?\"; uptime) > $R/fmab/fm-$c-$b-r$k.log 2>&1; (cd $o 2>/dev/null && find . -name 'strip-*.png' | while read -r f; do cp \"\$f\" \"$R/fmab/$c-$b-r${k}_\$(basename \$f)\"; done); j=\$(find $o -name FM.json | head -1); [ -n \"\$j\" ] && cp \$j $R/fmab/fm-$c-$b-r$k.json" >> $Q
  done; done
  for k in 1 2 3 4 5 6 7 8; do for b in bp13 bp12; do
    echo "swp-$b-r$k|11|4|(uptime; node $SW --build $OUT/builds/$b --adapter $AD --engine $e $TH --at 40 --then 0,16,32,64 --runs 2 --json $R/swp/$b-$c-r$k.json; echo \"exit \$?\"; uptime) > $R/swp/$b-$c-r$k.log 2>&1" >> $Q; done; done
  fi
  for k in 1 2 3; do for b in bp13 bp12; do
    echo "si-$b-r$k|11|1|(uptime; $TE node $SI --build $OUT/builds/$b --adapter $AD --engine $e --runs 1 $TH --json $R/si/$b-$c-r$k.json; echo \"exit \$?\"; uptime) >> $R/si/si-$c.log 2>&1" >> $Q; done; done
  for k in 1 2; do for b in bp13 bp12; do
    w3 r2-$b-r$k 10-15 4 $b '' $OUT/r2/$c-$b-r$k $R/r2/w3-$c-$b-r$k.log $R/r2/w3-$c-$b-r$k.json; done; done
  if [ $e = webkit ]; then for k in 1 2 3 4; do for b in bp13 bp12; do
    w3 r2y-$b-r$k 10-15 1 $b '^(swap-long|retarget·80)(·control)?$' $OUT/r2y/$c-$b-r$k $R/r2y/w3-$c-$b-r$k.log $R/r2y/w3-$c-$b-r$k.json; done; done; fi
  echo "$c: $(wc -l < $Q) lines"
done
# ADDED 2026-11-09 03:50, after the W·d battery's main read of W3 first-expand read [lanes] (NR on its re-runs): `fe`, W3
# first-expand (+ control) on bp13 and bp12 alternating, 8 rounds per WebKit theme, gate 11, appended to q/webkit-{light,dark}.q
# by hand in the same line form (a reading of that red class's rate, beside the rows).
