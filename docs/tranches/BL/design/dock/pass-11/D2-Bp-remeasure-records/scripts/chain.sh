#!/bin/bash
# chain.sh (D2 pass 11, B′ re-measure, REGISTRY §P10-7.3 items 2-3; after the pass-10 builder's and critic's chain.sh and the
# pass-9 re-measure's): one heavy run at a time; every run guarded, browser runs never --light, Playwright WebKit under
# --exclusive webkit (queued, never cancelled). Harness H8 as landed (9d12810b…), unchanged; its hash is printed at the start.
#   bat      the H8 battery on bp10: one `theme` slot per engine and theme (H6-10), each started at 1-min load <= 20; the slot's
#            admission load is its first witness log's uptime (WebKit: when the lock admits it), also in battery/slots.log
#   fmlow    H8-2 per WebKit theme (admission read inside the slot, bound 15)
#   rd       per engine and theme, one slot (started at load <= 20; the admission read is the slot log's first line):
#            the retarget A/B (bp10, bp8 alternating, 8 rounds, the W3 cell form of passes 9-10, each read started at load <= 11
#            after a wait of at most 180 s Chromium / 60 s WebKit), the display-frame probe (the pass-8 critic's slotink-crit,
#            bp10 and bp8 alternating, 3 runs), and vmorph collapse in paint (vmstrip.mjs, bp10, 3 runs)
#   cost     bp10 → bp8 → fv5 alternating, 3 rounds, Chromium traced (pass-2 D2-Bp-probes.mjs pcost,plead), --cpu-cores 0,
#            each started at load <= 15
# STEPS=<list> runs a subset; ENGS / THEMES narrow bat and rd; BATDIR / BOUT redirect a re-read's records and outputs.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p11/Bp-remeasure; OUT=${BOUT:-$B/out}; WT=$B/wt
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
REC=$D/pass-11/D2-Bp-remeasure-records; BAT=${BATDIR:-$REC/battery}; S=$REC/scripts; GD=$HOME/.claude/guard/guarded
SI=$D/pass-8/D2-Bp-crit-records/scripts/slotink-crit.mjs
mkdir -p $BAT $REC/si $REC/ab $REC/vm $REC/cost $REC/filmstrips
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
waitload() { local t0=$(date +%s); while [ "$(echo "$(load1) > $1" | bc)" = 1 ]; do sleep 30; done; L "start-gate $2 at load $(load1) (bound $1, waited $(( $(date +%s) - t0 )) s)"; }
softload() { local t0=$SECONDS; while [ "$(echo "$(load1) > $1" | bc)" = 1 ] && [ $((SECONDS - t0)) -lt ${2:-180} ]; do sleep 10; done; }
has() { case " ${STEPS:-bat fmlow rd cost} " in *" $1 "*) return 0;; esac; return 1; }
export G B OUT WT D H AD REC S SI
export -f load1 softload
L "CHAIN start (steps: ${STEPS:-all}); harness $(cd $D && find harness -type f | sort | xargs shasum -a 256 | shasum -a 256 | cut -c1-16)"
rd() { # engine theme
  E=$1; t=$2; TH=""; TE=""; [ $t = dark ] && { TH="--theme dark"; TE="env DOCK_HARNESS_THEME=dark"; }
  SOFT=180; [ $E = webkit ] && SOFT=60
  echo "admitted rd $E $t $(date '+%F %T') · $(uptime)"
  for k in 1 2 3 4 5 6 7 8; do for b in bp10 bp8; do
    softload 11 $SOFT
    (uptime; $TE node $H/w3-morph.mjs --build $OUT/builds/$b --adapter $AD --engine $E --cells '^retarget·(40|80|120)(·control)?$' --out $OUT/rt/$E-$t-$b-r$k; echo "exit $?"; uptime) > $REC/ab/w3rt-$E-$t-$b-r$k.log 2>&1
  done; done
  echo "ab end $(date '+%F %T') · $(uptime)"
  for k in 1 2 3; do for b in bp10 bp8; do
    node $SI --build $OUT/builds/$b --adapter $AD --engine $E --runs 1 $TH --json $REC/si/$b-$E-$t-r$k.json >> $REC/si/si-$E-$t.log 2>&1
  done; done
  echo "si end $(date '+%F %T') · $(uptime)"
  mkdir -p $OUT/vm/$E-$t
  $TE node $S/vmstrip.mjs --build $OUT/builds/bp10 --adapter $AD --engine $E --runs 3 --out $OUT/vm/$E-$t --tag bp10-$E-$t --json $REC/vm/bp10-$E-$t.json > $REC/vm/vm-$E-$t.log 2>&1
  cp $OUT/vm/$E-$t/*.png $REC/vm/ 2>/dev/null
  echo "rd end $(date '+%F %T') · $(uptime)"
}
export -f rd
if has bat; then
  for e in ${ENGS:-chromium webkit}; do for t in ${THEMES:-light dark}; do
    waitload 20 "bp10 $e $t"
    L "start bp10 $e $t"
    BUILD=bp10 ENG=$e REC=$BAT THEME=$t TMIN=90 WT=$WT bash $H/battery.sh $OUT theme >> $BAT/chain-bp10-$e.log 2>&1
    L "end bp10 $e $t exit $?"
    (cd $OUT/$e/bp10 && find . -name 'strip-*.png' -not -path './fmlow-*' | while read -r f; do n=$(echo "$f" | sed 's#^\./##; s#/runs/FM-[^/]*/#_#; s#/#_#g'); mkdir -p $REC/filmstrips/$e-$t; cp "$f" "$REC/filmstrips/$e-$t/$n"; done)
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
if has rd; then
  for e in ${ENGS:-chromium webkit}; do for t in ${THEMES:-light dark}; do
    waitload 20 "rd $e $t"; X=""; [ $e = webkit ] && X="--exclusive webkit"
    L "queue rd $e $t"
    $GD $X --timeout 88 -- bash -c "rd $e $t" > $REC/slot-rd-$e-$t.log 2>&1
    L "end rd $e $t exit $?"
  done; done
fi
if has cost; then
  L "start cost"; C=$REC/cost
  for k in 1 2 3; do for b in bp10 bp8 fv5; do
    waitload 15 "cost $b r$k"
    (uptime; $GD --cpu-cores 0 --timeout 30 -- node $D/pass-2/D2-Bp-probes.mjs --build $OUT/builds/$b --adapter $AD --arm pcost,plead --engine chromium --out $C/cost-$b-chromium-r$k.json; echo "exit $?"; uptime) > $C/cost-$b-chromium-r$k.log 2>&1
  done; done
  L "end cost"
fi
L "CHAIN-DONE"
