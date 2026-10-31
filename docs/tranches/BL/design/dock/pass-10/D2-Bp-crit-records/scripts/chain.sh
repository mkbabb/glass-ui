#!/bin/bash
# chain.sh (D2 pass 10, fresh critic of D2-B′, REGISTRY §P9-7.4): one heavy run at a time; every run guarded, browser runs never
# --light, Playwright WebKit under --exclusive webkit (queued, never cancelled). Harness H8 as landed (9d12810b…), unchanged.
# After the pass-10 builder's chain.sh and the pass-9 critic's chain.sh / extras3.sh.
#   pr f7    PR and F7 on the bp10 tree; boot graph
#   bat      the H8 battery on bp10: one theme slot per engine and theme (H6-10), started at 1-min load <= 20; the load at
#            admission is the first witness log's uptime (WebKit: when the lock admits it)
#   fmlow    H8-2 per WebKit theme
#   rd       per engine and theme, one slot: the retarget A/B (bp10, bp8 alternating, 8 rounds, the critic's W3 cell form, each read
#            started at load <= 11 after a wait of at most 180 s), the phase sweep on bp10 at the offsets the builder did not read
#            (42-198 / 4 ms, 4 runs), the display-frame probe (slotink-crit, 3 runs), vmorph/morph lead-remove and the constructed
#            far side (slotink-axis, 3 runs)
#   ph       per engine and theme, one slot: the fine window on bp10 (44-100 / 1 ms, 2 runs) and bp8 (44-92 / 4 ms, 2 runs, the
#            instrument's control), a retarget of a retarget (sweep.mjs --twice), the reversal and lead phases (phase2.mjs)
#   heir     the heir probes on bp10i (builder's heirprobe) and bp10fsi (fsheir: far side both ways, vmorph lead-remove)
#   r2       W3 whole on bp10, Playwright WebKit, 2 runs per theme, each queued once the 1-min load is 10-15 (R2 at load 10-15)
# STEPS=<list> runs a subset; ENGS / THEMES narrow bat and rd/ph.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p10/Bp-crit; OUT=$B/out; WT=$B/wt
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
REC=$D/pass-10/D2-Bp-crit-records; BAT=$REC/battery; S=$REC/scripts; GD=$HOME/.claude/guard/guarded
BS=$D/pass-10/D2-Bp-proto-records/scripts
SW=$BS/sweep.mjs; SI=$D/pass-8/D2-Bp-crit-records/scripts/slotink-crit.mjs; AX=$D/pass-9/D2-Bp-crit-records/seat-2/scripts/slotink-axis.mjs
mkdir -p $BAT $REC/si $REC/vl $REC/fs $REC/ab $REC/sweep $REC/ph $REC/PR $REC/F7 $REC/heir $REC/r2 $REC/filmstrips
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
waitload() { local t0=$(date +%s); while [ "$(echo "$(load1) > $1" | bc)" = 1 ]; do sleep 30; done; L "admit $2 at load $(load1) (bound $1, waited $(( $(date +%s) - t0 )) s)"; }
softload() { local t0=$SECONDS; while [ "$(echo "$(load1) > $1" | bc)" = 1 ] && [ $((SECONDS - t0)) -lt ${2:-180} ]; do sleep 10; done; }
has() { case " ${STEPS:-pr f7 bat fmlow rd ph heir r2} " in *" $1 "*) return 0;; esac; return 1; }
export G B OUT WT D H AD REC S SW SI AX
export -f load1 softload
L "CHAIN start (steps: ${STEPS:-all}); harness $(cd $D && find harness -type f | sort | xargs shasum -a 256 | shasum -a 256 | cut -c1-16)"
rd() { # engine theme
  E=$1; t=$2; TH=""; TE=""; [ $t = dark ] && { TH="--theme dark"; TE="env DOCK_HARNESS_THEME=dark"; }
  echo "admitted rd $E $t $(date) $(uptime)"
  for k in 1 2 3 4 5 6 7 8; do for b in bp10 bp8; do
    softload 11 180
    (uptime; $TE node $H/w3-morph.mjs --build $OUT/builds/$b --adapter $AD --engine $E --cells '^retarget·(40|80|120)(·control)?$' --out $OUT/rt/$E-$t-$b-r$k; echo "exit $?"; uptime) > $REC/ab/w3rt-$E-$t-$b-r$k.log 2>&1
  done; done
  echo "ab end $(date) $(uptime)"
  node $SW --build $OUT/builds/bp10 --adapter $AD --engine $E $TH --from 42 --to 198 --step 4 --runs 4 --json $REC/sweep/bp10-$E-$t-off2.json > $REC/sweep/bp10-$E-$t-off2.log 2>&1
  echo "sweep end $(date) $(uptime)"
  for k in 1 2 3; do for b in bp10 bp8; do
    node $SI --build $OUT/builds/$b --adapter $AD --engine $E --runs 1 $TH --json $REC/si/$b-$E-$t-r$k.json >> $REC/si/si-$E-$t.log 2>&1
    node $AX --build $OUT/builds/$b --adapter $AD --engine $E --seqs vlead-remove,lead-remove --runs 1 $TH --rows --json $REC/vl/$b-$E-$t-r$k.json >> $REC/vl/vl-$E-$t.log 2>&1
    node $AX --build $OUT/builds/${b}fs --adapter $AD --engine $E --query fs=1 --seqs fs-to-three,fs-to-one --runs 1 $TH --rows --json $REC/fs/$b-$E-$t-r$k.json >> $REC/fs/fs-$E-$t.log 2>&1
  done; done
  echo "rd end $(date) $(uptime)"
}
ph() { # engine theme
  E=$1; t=$2; TH=""; [ $t = dark ] && TH="--theme dark"
  echo "admitted ph $E $t $(date) $(uptime)"
  node $SW --build $OUT/builds/bp10 --adapter $AD --engine $E $TH --from 44 --to 100 --step 1 --runs 2 --json $REC/sweep/bp10-$E-$t-fine.json > $REC/sweep/bp10-$E-$t-fine.log 2>&1
  node $SW --build $OUT/builds/bp8 --adapter $AD --engine $E $TH --from 44 --to 92 --step 4 --runs 2 --json $REC/sweep/bp8-$E-$t-ctl.json > $REC/sweep/bp8-$E-$t-ctl.log 2>&1
  echo "fine end $(date) $(uptime)"
  for tw in 8 16 32 48 64; do
    node $SW --build $OUT/builds/bp10 --adapter $AD --engine $E $TH --from 40 --to 120 --step 8 --runs 2 --twice $tw --json $REC/sweep/bp10-$E-$t-twice$tw.json > $REC/sweep/bp10-$E-$t-twice$tw.log 2>&1
  done
  node $SW --build $OUT/builds/bp8 --adapter $AD --engine $E $TH --from 40 --to 120 --step 8 --runs 1 --twice 32 --json $REC/sweep/bp8-$E-$t-twice32.json > $REC/sweep/bp8-$E-$t-twice32.log 2>&1
  echo "twice end $(date) $(uptime)"
  for sc in morph vmorph; do
    for m in rev-c rev-e; do node $S/phase2.mjs --build $OUT/builds/bp10 --adapter $AD --engine $E $TH --scene $sc --mode $m --points 0.05,0.1,0.15,0.2,0.25,0.3,0.35,0.4,0.45,0.5,0.55,0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95,9 --runs 2 --json $REC/ph/bp10-$E-$t-$sc-$m.json > $REC/ph/bp10-$E-$t-$sc-$m.log 2>&1; done
    for m in lead-rm lead-ad; do node $S/phase2.mjs --build $OUT/builds/bp10 --adapter $AD --engine $E $TH --scene $sc --mode $m --points 0,10,20,30,40,50,60,70,80,90,100,110,120,140,160,180,200 --runs 2 --json $REC/ph/bp10-$E-$t-$sc-$m.json > $REC/ph/bp10-$E-$t-$sc-$m.log 2>&1; done
  done
  for b in bp10 bp8; do node $S/phase2.mjs --build $OUT/builds/$b --adapter $AD --engine $E $TH --scene vmorph --mode rev-c --points 9 --runs 6 --json $REC/ph/$b-$E-$t-vmorph-collapse.json > $REC/ph/$b-$E-$t-vmorph-collapse.log 2>&1; done
  echo "ph end $(date) $(uptime)"
}
export -f rd ph
if has pr; then
  L "start PR"
  (uptime; $GD --light --timeout 10 -- node $H/prose.mjs $WT --out $OUT/pr; echo "exit $?"; uptime) > $REC/PR/PR.log 2>&1
  find $OUT/pr -name PR.json -exec cp {} $REC/PR/PR.json \;
  L "end PR"
fi
if has f7; then
  waitload 20 "F7"
  (uptime; $GD --timeout 60 -- node $H/f7.mjs $WT --out $OUT/f7; echo "exit $?"; uptime) > $REC/F7/F7.log 2>&1
  F=$(find $OUT/f7 -name F7.json | head -1); cp $F $REC/F7/F7.json; cp $(dirname $F)/steps.json $REC/F7/ 2>/dev/null
  for s in lib demo typecheck units; do tail -40 $(dirname $F)/$s.log > $REC/F7/$s.tail.log 2>/dev/null; done
  python3 -I $BS/bootsize.py $WT > $REC/F7/boot-graph.txt
  L "end F7"
fi
if has bat; then
  for e in ${ENGS:-chromium webkit}; do for t in ${THEMES:-light dark}; do
    waitload 20 "bp10 $e $t"
    L "start bp10 $e $t"
    BUILD=bp10 ENG=$e REC=$BAT THEME=$t TMIN=90 WT=$WT bash $H/battery.sh $OUT theme >> $BAT/chain-bp10-$e.log 2>&1
    L "end bp10 $e $t exit $?"
    (cd $OUT/$e/bp10 && find . -name 'strip-*.png' | while read -r f; do n=$(echo "$f" | sed 's#^\./##; s#/runs/FM-[^/]*/#_#; s#/#_#g'); mkdir -p $REC/filmstrips/$e-$t; cp "$f" "$REC/filmstrips/$e-$t/$n"; done)
  done; done
fi
if has fmlow; then
  for t in light dark; do
    L "start fmlow webkit $t"
    BUILD=bp10 ENG=webkit REC=$BAT THEME=$t TMIN=40 bash $H/battery.sh $OUT fmlow >> $BAT/chain-bp10-webkit.log 2>&1
    L "end fmlow webkit $t exit $?"
    (cd $OUT/webkit/bp10 && find fmlow-$t -name 'strip-*.png' | while read -r f; do n=$(echo "$f" | sed 's#/runs/FM-[^/]*/#_#; s#/#_#g'); mkdir -p $REC/filmstrips/webkit-$t; cp "$f" "$REC/filmstrips/webkit-$t/$n"; done)
  done
fi
for step in rd ph; do if has $step; then
  for e in ${ENGS:-chromium webkit}; do for t in ${THEMES:-light dark}; do
    waitload 20 "$step $e $t"; X=""; [ $e = webkit ] && X="--exclusive webkit"
    L "queue $step $e $t"
    $GD $X --timeout 88 -- bash -c "$step $e $t" > $REC/slot-$step-$e-$t.log 2>&1
    L "end $step $e $t exit $?"
  done; done
fi; done
if has heir; then
  $GD --timeout 15 -- node $BS/heirprobe.mjs --build $OUT/builds/bp10i --adapter $AD --engine chromium --json $REC/heir/bp10i-chromium.json > $REC/heir/bp10i-chromium.log 2>&1
  $GD --timeout 15 -- node $S/fsheir.mjs --fs 1 --build $OUT/builds/bp10fsi --adapter $AD --engine chromium --json $REC/heir/bp10fsi-chromium.json > $REC/heir/bp10fsi-chromium.log 2>&1
  $GD --exclusive webkit --timeout 20 -- bash -c "node $BS/heirprobe.mjs --build $OUT/builds/bp10i --adapter $AD --engine webkit --json $REC/heir/bp10i-webkit.json > $REC/heir/bp10i-webkit.log 2>&1; node $S/fsheir.mjs --fs 1 --build $OUT/builds/bp10fsi --adapter $AD --engine webkit --json $REC/heir/bp10fsi-webkit.json > $REC/heir/bp10fsi-webkit.log 2>&1"
  L "end heir"
fi
if has r2; then
  for t in light dark; do for k in 1 2; do
    TE=""; [ $t = dark ] && TE="env DOCK_HARNESS_THEME=dark"
    q0=$SECONDS; while :; do l=$(load1); if [ "$(echo "$l >= 10 && $l <= 15" | bc)" = 1 ] || [ $((SECONDS - q0)) -gt 1200 ]; then break; fi; sleep 20; done
    L "queue r2 $t r$k at load $l"
    $GD --exclusive webkit --timeout 30 -- bash -c "uptime; $TE node $H/w3-morph.mjs --build $OUT/builds/bp10 --adapter $AD --engine webkit --out $OUT/r2/$t-r$k; echo exit \$?; uptime" > $REC/r2/w3-webkit-$t-r$k.log 2>&1
    L "end r2 $t r$k"
  done; done
fi
L "CHAIN-DONE"
