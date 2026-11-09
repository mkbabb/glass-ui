#!/bin/bash
# chain.sh (D2 pass 13, FRESH CRITIC of D2-B′, REGISTRY §P12c-7.4; after the pass-13 builder's and the pass-12 completion
# critic's chain.sh). One heavy run at a time: the chain holds the seat lock for its whole run. Every run guarded; browser runs
# never --light; Playwright WebKit under --exclusive webkit, queued, never cancelled. No admitted slot is ended by stopping its
# parent: a slot ends only by finishing its queue or by its own budget/gate exit (75). Harness H8 (9d12810b…) checked at start/end.
# Order (§P12c-7.4): the owed re-runs, then one battery of all four columns, then the A/Bs and attacks.
#   pr f7   PR (--light, no browser) and F7 on the bp13 tree; the boot graph (pass-10 bootsize.py)
#   batc    the H8 battery on bp13, Chromium light then dark, one `theme` slot each, each started at load <= 20
#   wk      per WebKit theme ONE --exclusive webkit slot: (light only) the owed re-runs (q/rerun.q), the battery theme stage,
#           fmlow (admission read inside, bound 15; if deferred, the `fmlow` step re-reads it in its own slot); dark also runs
#           its read queue after the battery until the slot's 80-min budget
#   fmlow   H8-2 per WebKit theme for any theme whose in-slot attempt was deferred
#   q       the A/Bs and attacks as per-column READ QUEUES (mkq.sh), each line with its gate (<= 11 for A/Bs: the slot waits;
#           a gate unmet 30 min ends the slot with exit 75 and the chain waits outside the lock and re-queues the rest)
#   cost    Chromium, bp13 → bp12 → fv5, 3 rounds (pass-2 D2-Bp-probes.mjs pcost,plead), --cpu-cores 0, each started at <= 15
#   digest  cells.mjs default and --ruled (no browser)       hend  the harness check at the end
# A column whose battery cells ran above 31 is re-read and both readings kept. STEPS=<list>, COLS=<list> narrow a run.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p13/Bp-crit; OUT=$B/out; WT=$B/wt
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
REC=$D/pass-13/D2-Bp-crit-records; BAT=$REC/battery; S=$REC/scripts; GD=$HOME/.claude/guard/guarded
BS=$D/pass-10/D2-Bp-proto-records/scripts
mkdir -p $BAT $REC/PR $REC/F7 $REC/q $REC/filmstrips $REC/cost $REC/digest $REC/rerun
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
waitload() { local t0=$(date +%s); while [ "$(echo "$(load1) > $1" | bc)" = 1 ]; do sleep 30; done; L "start-gate $2 at load $(load1) (bound $1, waited $(( $(date +%s) - t0 )) s)"; }
has() { case " ${STEPS:-pr f7 batc wk fmlow q cost digest hend} " in *" $1 "*) return 0;; esac; return 1; }
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
      if [ $((SECONDS - g0)) -gt ${QHOLD_S:-1800} ] || [ $(( (SECONDS - t0) / 60 + est )) -gt 80 ]; then echo "gate $gate unmet before $id at load $(load1) $(date '+%T'); releasing"; exit 75; fi
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
colmax() { local e=$1 t=$2 st; [ $t = dark ] && st="dark darkrest" || st="main rest"
  for s in $st; do cat $3/bp13-$s-*-$e*.log 2>/dev/null; done | grep -o 'load averages: [0-9.]*' | awk '{print $3}' | sort -n | tail -1; }
strips() { (cd $OUT/$1/bp13 && find . -name 'strip-*.png' -not -path './fmlow-*' -not -path './*-first-*' | while read -r f; do n=$(echo "$f" | sed 's#^\./##; s#/runs/FM-[^/]*/#_#; s#/#_#g'); mkdir -p $REC/filmstrips/$1-$2; cp "$f" "$REC/filmstrips/$1-$2/$n"; done); }
fmstrips() { (cd $OUT/webkit/bp13 && find fmlow-$1 -name 'strip-*.png' 2>/dev/null | while read -r f; do n=$(echo "$f" | sed 's#/runs/FM-[^/]*/#_#; s#/#_#g'); mkdir -p $REC/filmstrips/webkit-$1; cp "$f" "$REC/filmstrips/webkit-$1/$n"; done); }
reread() { # engine theme
  local e=$1 t=$2 m X=""; m=$(colmax $e $t $BAT)
  if [ -n "$m" ] && [ "$(echo "$m > 31" | bc)" = 1 ]; then
    mkdir -p $REC/battery-reread; mv $OUT/$e/bp13 $OUT/$e/bp13-first-$t
    waitload 20 "bp13 $e $t re-read"; L "start bp13 $e $t RE-READ (first read's cells to $m)"
    BUILD=bp13 ENG=$e REC=$REC/battery-reread THEME=$t TMIN=90 WT=$WT bash $H/battery.sh $OUT theme >> $REC/battery-reread/chain-bp13-$e.log 2>&1
    L "end bp13 $e $t RE-READ exit $?; cells max load $(colmax $e $t $REC/battery-reread)"
  fi; }
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
if has batc; then
  for t in ${CT:-light dark}; do
    waitload 20 "bp13 chromium $t"; L "start bp13 chromium $t"
    BUILD=bp13 ENG=chromium REC=$BAT THEME=$t TMIN=90 WT=$WT bash $H/battery.sh $OUT theme >> $BAT/chain-bp13-chromium.log 2>&1
    L "end bp13 chromium $t exit $?; cells max load $(colmax chromium $t $BAT)"
    strips chromium $t; reread chromium $t
  done
fi
wkbody() {
  echo "admitted wk $COL $(date '+%F %T') · $(uptime)"; export SLOT_T0=$(date +%s)
  if [ "$T" = light ]; then Q=$REC/q/rerun.q DONE=$REC/q/rerun.done COL=rerun qslot; echo "rerun end $(date '+%T') exit $?"; export SLOT_T0=$(date +%s); fi
  BUILD=bp13 ENG=webkit REC=$BAT THEME=$T TMIN=90 WT=$WT NOGUARD=1 BUDGET_MIN=400 bash $H/battery.sh $OUT theme >> $BAT/chain-bp13-webkit.log 2>&1
  echo "battery end $(date '+%T') exit $?"
  BUILD=bp13 ENG=webkit REC=$BAT THEME=$T NOGUARD=1 FMLOW_QUEUE_MIN=10 FMLOW_TRIES=1 bash $H/battery.sh $OUT fmlow >> $BAT/chain-bp13-webkit.log 2>&1
  echo "fmlow end $(date '+%T') exit $?"
  [ "$T" = dark ] && qslot
  echo "wk end $(date '+%T')"
}
export -f wkbody
if has wk; then
  touch $REC/q/rerun.done
  for T in ${WKT:-light dark}; do c=webkit-$T; Q=$REC/q/$c.q; DONE=$REC/q/$c.done; touch $DONE
    waitload 20 "wk $c"; L "queue wk $c"
    T=$T COL=$c Q=$Q DONE=$DONE $GD --exclusive webkit --timeout 88 -- bash -c wkbody >> $REC/q/slot-$c.log 2>&1
    L "end wk $c exit $?; cells max load $(colmax webkit $T $BAT)"
    strips webkit $T; fmstrips $T; reread webkit $T
  done
fi
if has fmlow; then
  for t in light dark; do
    a=$BAT/json/bp13-webkit/fmlow-$t/admit.json
    if [ -f $a ] && grep -q '"deferred":false' $a; then continue; fi
    L "start fmlow webkit $t (in-slot attempt deferred or absent)"
    BUILD=bp13 ENG=webkit REC=$BAT THEME=$t TMIN=40 bash $H/battery.sh $OUT fmlow >> $BAT/chain-bp13-webkit.log 2>&1
    L "end fmlow webkit $t exit $?"; fmstrips $t
  done
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
if has cost; then
  L "start cost"
  for k in 1 2 3; do for b in bp13 bp12 fv5; do
    waitload 15 "cost $b r$k"
    (uptime; $GD --cpu-cores 0 --timeout 30 -- node $D/pass-2/D2-Bp-probes.mjs --build $OUT/builds/$b --adapter $AD --arm pcost,plead --engine chromium --out $REC/cost/cost-$b-chromium-r$k.json; echo "exit $?"; uptime) > $REC/cost/cost-$b-chromium-r$k.log 2>&1
  done; done
  L "end cost"
fi
if has digest; then
  L "start digest"
  for r in "" "--ruled"; do tg=p13crit${r:+-ruled}
    (uptime; $GD --light --timeout 10 -- node $H/cells.mjs --build bp13=$REC --f7 bp13=$REC/F7/F7.json --pr bp13=$REC/PR/PR.json --out $REC/digest --tag $tg $r; echo "exit $?") > $REC/digest/cells-$tg.log 2>&1
  done
  L "end digest"
fi
if has hend; then
  (cd $D && shasum -a 256 -c pass-8/H8-records/harness.sha256; date; uptime) > $REC/harness-check-end.txt 2>&1
  L "harness end: $(grep -c ': OK$' $REC/harness-check-end.txt) OK"
fi
L "CHAIN-DONE"
