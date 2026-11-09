#!/bin/bash
# chain.sh (D2 pass 13, BUILDER of D2-B′, REGISTRY §P12c-7.3 item 5; after the pass-12 completion critic's chain.sh). One heavy
# run at a time: the chain holds the seat lock for its whole run. Every run guarded; browser runs never --light; Playwright
# WebKit under --exclusive webkit, queued, never cancelled. No admitted slot is ended by stopping its parent: a slot ends only
# by finishing its queue or by its own budget/gate exit (75). Harness H8 as landed (9d12810b…), checked at the start and end.
#   pr f7   PR (--light, no browser) and F7 on the bp13 tree; the boot graph (pass-10 bootsize.py)
#   bat     the H8 battery on bp13, one `theme` slot per engine and theme (H6-10), each started at load <= 20; a column whose
#           cells ran above 31 is re-read into battery-reread/ and both readings are kept
#   fmlow   H8-2 per WebKit theme (admission read inside the slot, bound 15)
#   digest  cells.mjs, default and --ruled (no browser)
#   q       the A/Bs and holds as per-column READ QUEUES (mkq.sh), each line with its load gate (<= 11 for every A/B read: the
#           slot waits, never a timeout into a higher start; a gate unmet 30 min (QHOLD_S; 10 min for the Chromium queues of 2026-11-05, before guard admission waits
#           of about 70 min made the shorter hold the costlier) ends the slot with exit 75, releasing the lock,
#           and the chain waits outside the lock and re-queues the rest). Done lines go to q/<col>.done; no read runs twice
#   cost    Chromium, bp13 → bp12 → fv5, 3 rounds (pass-2 D2-Bp-probes.mjs pcost,plead), --cpu-cores 0, each started at <= 15
#   hend    the harness check at the end
# Records of the final bp13 go under D2-Bp-build-records/v2/ (OUT=out2): the first bp13 (v1, the touch snap) was superseded
# after its C·l battery; its records stay at the top level of D2-Bp-build-records/ (battery/, F7/, PR/, filmstrips/).
# STEPS=<list> runs a subset; COLS=<list> narrows bat/q (chromium-light chromium-dark webkit-light webkit-dark).
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p13/Bp-build; OUT=$B/out2; WT=$B/wt
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
REC=$D/pass-13/D2-Bp-build-records/v2; BAT=$REC/battery; S=$D/pass-13/D2-Bp-build-records/scripts; GD=$HOME/.claude/guard/guarded
BS=$D/pass-10/D2-Bp-proto-records/scripts
mkdir -p $BAT $REC/PR $REC/F7 $REC/q $REC/filmstrips $REC/cost $REC/digest
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
waitload() { local t0=$(date +%s); while [ "$(echo "$(load1) > $1" | bc)" = 1 ]; do sleep 30; done; L "start-gate $2 at load $(load1) (bound $1, waited $(( $(date +%s) - t0 )) s)"; }
has() { case " ${STEPS:-pr f7 bat fmlow digest q cost hend} " in *" $1 "*) return 0;; esac; return 1; }
LK=$B/seat.lock; until mkdir $LK 2>/dev/null; do sleep 5; done; trap 'rmdir $LK 2>/dev/null' EXIT
export G B OUT WT D H AD REC BAT S GD BS
export -f load1
L "CHAIN start (steps: ${STEPS:-all}); harness list $(cd $D && shasum -a 256 -c pass-8/H8-records/harness.sha256 2>&1 | grep -c ': OK$') OK"
gateok() { local l; l=$(load1); case $1 in -) return 0;; *-*) [ "$(echo "$l >= ${1%-*} && $l <= ${1#*-}" | bc)" = 1 ];; *) [ "$(echo "$l <= $1" | bc)" = 1 ];; esac; }
qslot() {
  local t0=$(( SECONDS - ( ${SLOT_T0:+$(date +%s) - $SLOT_T0} + 0 ) )) id gate est cmd g0
  echo "admitted $COL $(date '+%F %T') · $(uptime)"
  while IFS='|' read -r id gate est cmd; do
    [ -z "$id" ] && continue
    grep -qx "$id" "$DONE" 2>/dev/null && continue
    if [ $(( (SECONDS - t0) / 60 + est )) -gt 80 ]; then echo "budget stop before $id $(date '+%T')"; exit 75; fi
    g0=$SECONDS
    until gateok "$gate"; do
      case $gate in *-*) [ $((SECONDS - g0)) -gt 600 ] && { echo "gate $gate soft: waited 10 min, runs at load $(load1)"; break; };; esac
      if [ $((SECONDS - g0)) -gt ${QHOLD_S:-1800} ] || [ $(( (SECONDS - t0) / 60 + est )) -gt 80 ]; then echo "gate $gate unmet $(( ${QHOLD_S:-1800} / 60 )) min before $id at load $(load1) $(date '+%T'); releasing"; exit 75; fi
      sleep 10
    done
    echo "$(date '+%T') start $id gate $gate load $(load1)"
    bash -c "$cmd" < /dev/null
    echo "$id" >> "$DONE"
    echo "$(date '+%T') end $id load $(load1)"
  done < "$Q"
  echo "queue end $COL $(date '+%F %T') · $(uptime)"
}
export -f gateok qslot
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
  L "end F7: $(head -1 $REC/F7/boot-graph.txt)"
fi
colmax() { local e=$1 t=$2 st; [ $t = dark ] && st="dark darkrest" || st="main rest"
  for s in $st; do cat $3/bp13-$s-*-$e*.log 2>/dev/null; done | grep -o 'load averages: [0-9.]*' | awk '{print $3}' | sort -n | tail -1; }
strips() { (cd $OUT/$1/bp13 && find . -name 'strip-*.png' -not -path './fmlow-*' | while read -r f; do n=$(echo "$f" | sed 's#^\./##; s#/runs/FM-[^/]*/#_#; s#/#_#g'); mkdir -p $REC/filmstrips/$1-$2; cp "$f" "$REC/filmstrips/$1-$2/$n"; done); }
if has bat; then
  for c in ${COLS:-chromium-light chromium-dark webkit-light webkit-dark}; do e=${c%-*}; t=${c#*-}
    waitload 20 "bp13 $e $t"
    L "start bp13 $e $t"
    BUILD=bp13 ENG=$e REC=$BAT THEME=$t TMIN=90 WT=$WT bash $H/battery.sh $OUT theme >> $BAT/chain-bp13-$e.log 2>&1
    L "end bp13 $e $t exit $?; cells max load $(colmax $e $t $BAT)"
    strips $e $t
    m=$(colmax $e $t $BAT)
    if [ -n "$m" ] && [ "$(echo "$m > 31" | bc)" = 1 ]; then
      mkdir -p $REC/battery-reread; mv $OUT/$e/bp13 $OUT/$e/bp13-first-$t
      waitload 20 "bp13 $e $t re-read"; L "start bp13 $e $t RE-READ (first read's cells to $m)"
      BUILD=bp13 ENG=$e REC=$REC/battery-reread THEME=$t TMIN=90 WT=$WT bash $H/battery.sh $OUT theme >> $REC/battery-reread/chain-bp13-$e.log 2>&1
      L "end bp13 $e $t RE-READ exit $?; cells max load $(colmax $e $t $REC/battery-reread)"
    fi
  done
fi
if has fmlow; then
  for t in light dark; do
    L "start fmlow webkit $t"
    BUILD=bp13 ENG=webkit REC=$BAT THEME=$t TMIN=40 bash $H/battery.sh $OUT fmlow >> $BAT/chain-bp13-webkit.log 2>&1
    L "end fmlow webkit $t exit $?"
    (cd $OUT/webkit/bp13 && find fmlow-$t -name 'strip-*.png' | while read -r f; do n=$(echo "$f" | sed 's#/runs/FM-[^/]*/#_#; s#/#_#g'); mkdir -p $REC/filmstrips/webkit-$t; cp "$f" "$REC/filmstrips/webkit-$t/$n"; done)
  done
fi
if has digest; then
  L "start digest"
  for r in "" "--ruled"; do tg=p13bu${r:+-ruled}
    (uptime; $GD --light --timeout 10 -- node $H/cells.mjs --build bp13=$REC --f7 bp13=$REC/F7/F7.json --pr bp13=$REC/PR/PR.json --out $REC/digest --tag $tg $r; echo "exit $?") > $REC/digest/cells-$tg.log 2>&1
  done
  L "end digest"
fi
if has q; then
  for c in ${COLS:-chromium-light chromium-dark webkit-light webkit-dark}; do e=${c%-*}
    Q=$REC/q/$c.q; DONE=$REC/q/$c.done; touch $DONE; k=0
    while :; do
      left=$(grep -cvxFf $DONE <(cut -d'|' -f1 $Q))
      [ "$left" = 0 ] && break
      k=$((k + 1)); nid=$(cut -d'|' -f1 $Q | grep -vxFf $DONE | head -1); ng=$(grep "^$nid|" $Q | cut -d'|' -f2)
      t0=$(date +%s); case $ng in *-*) ng=15;; esac; until gateok "$ng"; do sleep 30; done
      L "start-gate q $c slot $k at load $(load1) (next $nid gate $ng, waited $(( $(date +%s) - t0 )) s, $left lines left)"
      X=""; [ $e = webkit ] && X="--exclusive webkit"
      COL=$c Q=$Q DONE=$DONE $GD $X --timeout 88 -- bash -c qslot >> $REC/q/slot-$c.log 2>&1
      L "end q $c slot $k exit $?"
    done
  done
fi
# wk: per WebKit theme, ONE --exclusive webkit slot runs the battery's theme stage, its fmlow stage (admission read inside, bound
# 15, deferred when above) and then that column's read queue until the slot's 80-min budget; the rest of the queue re-queues as
# q slots (above). The battery theme stage inside the slot is not split (BUDGET_MIN 400; its witnesses ran 11 min per theme at
# the pass-12 critic). A column whose cells ran above 31 is re-read in its own slot.
wkbody() {
  echo "admitted wk $COL $(date '+%F %T') · $(uptime)"; export SLOT_T0=$(date +%s)
  BUILD=bp13 ENG=webkit REC=$BAT THEME=$T TMIN=90 WT=$WT NOGUARD=1 BUDGET_MIN=400 bash $H/battery.sh $OUT theme >> $BAT/chain-bp13-webkit.log 2>&1
  echo "battery end $(date '+%T') exit $?"
  BUILD=bp13 ENG=webkit REC=$BAT THEME=$T NOGUARD=1 FMLOW_QUEUE_MIN=10 FMLOW_TRIES=1 bash $H/battery.sh $OUT fmlow >> $BAT/chain-bp13-webkit.log 2>&1
  echo "fmlow end $(date '+%T') exit $?"
  qslot
}
export -f wkbody
if has wk; then
  for T in ${WKT:-light dark}; do c=webkit-$T; Q=$REC/q/$c.q; DONE=$REC/q/$c.done; touch $DONE
    waitload 20 "wk $c"; L "queue wk $c"
    T=$T COL=$c Q=$Q DONE=$DONE $GD --exclusive webkit --timeout 88 -- bash -c wkbody >> $REC/q/slot-$c.log 2>&1
    L "end wk $c exit $?; cells max load $(colmax webkit $T $BAT)"
    strips webkit $T
    (cd $OUT/webkit/bp13 && find fmlow-$T -name 'strip-*.png' 2>/dev/null | while read -r f; do n=$(echo "$f" | sed 's#/runs/FM-[^/]*/#_#; s#/#_#g'); mkdir -p $REC/filmstrips/webkit-$T; cp "$f" "$REC/filmstrips/webkit-$T/$n"; done)
  done
fi
if has cost; then
  L "start cost"
  for k in 1 2 3; do for b in bp13 bp12 fv5; do
    waitload 15 "cost $b r$k"
    (uptime; $GD --cpu-cores 0 --timeout 30 -- node $D/pass-2/D2-Bp-probes.mjs --build $OUT/builds/$b --adapter $AD --arm pcost,plead --engine chromium --out $REC/cost/cost-$b-chromium-r$k.json; echo "exit $?"; uptime) > $REC/cost/cost-$b-chromium-r$k.log 2>&1
  done; done
  L "end cost"
fi
if has hend; then
  (cd $D && shasum -a 256 -c pass-8/H8-records/harness.sha256; date) > $REC/harness-check-end.txt 2>&1
  L "harness end: $(grep -c ': OK$' $REC/harness-check-end.txt) OK"
fi
L "CHAIN-DONE"
