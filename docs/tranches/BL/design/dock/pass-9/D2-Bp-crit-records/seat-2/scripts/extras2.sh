#!/bin/bash
# extras2.sh (D2 pass 9, fresh critic of B′): attack readings, none a row. Run after chain.sh's CHAIN-DONE (one heavy run at a
# time for this seat). Every run guarded; browser runs never --light; Playwright WebKit under --exclusive webkit, queued, never cancelled.
#   vl   slotink-axis on vmorph lead-remove (the harness scene the far-side instrument found GATED, heir = the hidden collapsed
#        unit) and morph lead-remove, bp8/bp7 alternating, 3 runs, both engines and themes
#   fs   the constructed true far-side (scratch harness copy, swap?fs=1: a 128 px tab centred on the middle of three icons): build
#        bp8fs and bp7fs, instrument confirms GATED, slotink-axis both directions, 3 runs, both engines, light and dark
#   rt   W3 retarget·40/80/120 alone, bp8/bp7 alternating, 8 rounds, both themes, each engine
#   w3   W3 whole, Playwright WebKit, twice per theme, no load gate (R2's WebKit margin at the machine's load)
#   ab   film·content-add alone, bp8/bp7 alternating, 5 rounds, light and dark, both engines
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p9/Bp-crit; OUT=$B/out; WT=$B/wt
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
REC=$D/pass-9/D2-Bp-crit-records/seat-2; S=$REC/scripts; GD=$HOME/.claude/guard/guarded; X=$REC/extras
mkdir -p $X/vl $X/fs $X/ab $X/w3 $X/rt
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
has() { case " ${STEPS:-rt vl fs w3 ab} " in *" $1 "*) return 0;; esac; return 1; }
PROBE=$S/slotink-axis.mjs
L "EXTRAS start (steps: ${STEPS:-all})"
slot() { # engine body
  local e=$1; shift
  if [ $e = webkit ]; then $GD --exclusive webkit --timeout 60 -- bash -c "$*"; else $GD --timeout 60 -- bash -c "$*"; fi
}
if has vl; then
  for e in chromium webkit; do for t in light dark; do
    TH=""; [ $t = dark ] && TH="--theme dark"
    L "queue vl $e $t"
    slot $e "echo admitted \$(date) \$(uptime); for k in 1 2 3; do for b in bp8 bp7; do node $PROBE --build $OUT/builds/\$b --adapter $AD --engine $e --seqs vlead-remove,lead-remove --runs 1 $TH --rows --json $X/vl/\$b-$e-$t-r\$k.json; done; done" > $X/vl/vl-$e-$t.log 2>&1
    L "end vl $e $t"
  done; done
fi
if has fs; then
  P9=$D/pass-9/D2-Bp-p9.patch; BP7=$D/pass-7/D2-Bp-proto.patch; F=$WT/src/components/dock/composables/useDockScene.ts
  HF=$B/hfs; python3 -I $S/fs-scene.py $H $HF
  (uptime; cp $F $B/hold.ts; patch -s $F < $S/bp8i-instrument.diff; $GD --timeout 20 -- node $HF/build.mjs $WT --out $OUT --label bp8fsi; echo "exit $?"; cp $B/hold.ts $F
   $GD --timeout 20 -- node $HF/build.mjs $WT --out $OUT --label bp8fs; echo "exit $?"
   (cd $WT && git apply -R $P9 && git apply $BP7) && $GD --timeout 20 -- node $HF/build.mjs $WT --out $OUT --label bp7fs; echo "exit $?"
   (cd $WT && git apply -R $BP7 && git apply $P9); echo "restored: $(cmp $F $B/hold.ts && echo equal)"; uptime) > $X/fs/build.log 2>&1
  L "fs built"
  for e in chromium webkit; do for t in light dark; do
    TH=""; [ $t = dark ] && TH="--theme dark"
    L "queue fs $e $t"
    slot $e "echo admitted \$(date) \$(uptime); for k in 1 2 3; do for b in bp8fs bp7fs; do node $PROBE --build $OUT/builds/\$b --adapter $AD --engine $e --query fs=1 --seqs fs-to-three,fs-to-one --runs 1 $TH --rows --json $X/fs/\$b-$e-$t-r\$k.json; done; done" > $X/fs/fs-$e-$t.log 2>&1
    L "end fs $e $t"
  done; done
fi
# rt: W3 retarget·40/80/120 alone, bp8/bp7/fv5 alternating, 8 rounds, both themes, each engine: is the [splice] reproduced at this load, and is it the patch's?
RT='echo admitted $(date) $(uptime); for t in light dark; do for k in 1 2 3 4 5 6 7 8; do for b in bp8 bp7; do
      if [ $t = dark ]; then TH="env DOCK_HARNESS_THEME=dark"; else TH=""; fi
      (uptime; $TH node '$H'/w3-morph.mjs --build '$OUT'/builds/$b --adapter '$AD' --engine $E --cells "^retarget·(40|80|120)(·control)?$" --out '$OUT'/rt/$E-$t-$b-r$k; echo "exit $?"; uptime) > '$X'/rt/w3rt-$E-$t-$b-r$k.log 2>&1
    done; done; done'
if has rt; then
  L "start retarget A/B chromium"; $GD --timeout 60 -- env E=chromium bash -c "$RT" > $X/rt/slot-chromium.log 2>&1; L "end rt chromium"
  L "queue retarget A/B webkit"; $GD --exclusive webkit --timeout 60 -- env E=webkit bash -c "$RT" > $X/rt/slot-webkit.log 2>&1; L "end rt webkit"
fi
if has w3; then
  L "queue W3 webkit x2 per theme"
  $GD --exclusive webkit --timeout 60 -- bash -c "echo admitted \$(date) \$(uptime);
    for t in light dark; do for k in 1 2; do
      if [ \$t = dark ]; then TH='env DOCK_HARNESS_THEME=dark'; else TH=''; fi
      (uptime; \$TH node $H/w3-morph.mjs --build $OUT/builds/bp8 --adapter $AD --engine webkit --out $OUT/w3x/\$t-r\$k; echo \"exit \$?\"; uptime) > $X/w3/w3-webkit-\$t-r\$k.log 2>&1
    done; done" > $X/w3/slot-webkit.log 2>&1
  L "end W3 webkit"
fi
AB='echo admitted $(date) $(uptime); for t in light dark; do for k in 1 2 3 4 5; do for b in bp8 bp7; do
      if [ $t = dark ]; then TH="env DOCK_HARNESS_THEME=dark"; else TH=""; fi
      (uptime; $TH node '$H'/film.mjs --build '$OUT'/builds/$b --adapter '$AD' --engine $E --cells "^film·content-add$" --out '$OUT'/ab/$E-$t-$b-r$k; echo "exit $?"; uptime) > '$X'/ab/fm-$E-$t-$b-r$k.log 2>&1
    done; done; done'
if has ab; then
  L "start content-add A/B chromium"; $GD --timeout 60 -- env E=chromium bash -c "$AB" > $X/ab/slot-chromium.log 2>&1; L "end ab chromium"
  L "queue content-add A/B webkit"; $GD --exclusive webkit --timeout 60 -- env E=webkit bash -c "$AB" > $X/ab/slot-webkit.log 2>&1; L "end ab webkit"
fi
L "EXTRAS-DONE"
