#!/bin/bash
# chain.sh (D2 pass 12, COMPLETION CRITIC of D2-B′, REGISTRY §P12-7.2 steps 3-6; after the pass-11 critic's chain.sh / chain-x.sh
# and the pass-12 builder's chain.sh). One heavy run at a time (this chain holds the seat lock for its whole run; one chain runs).
# Every run guarded; browser runs never --light; Playwright WebKit under --exclusive webkit, queued, never cancelled. No admitted
# slot is ended by stopping its parent (§P12-7.3): a slot ends only by finishing its queue or by its own budget/gate exit (75).
# Harness H8 as landed (9d12810b…), unchanged; its list hash is printed at the start.
#   pr f7   PR (--light, no browser) and F7 on the bp12 tree; the boot graph (pass-10 bootsize.py)
#   rerun   (§7.2 step 3) the builder's owed re-runs: bp12 Playwright WebKit light, W3 `retarget·40`, `retarget·120`,
#           `content-remove` (+ controls), two re-runs (rerun.sh's command), each read started at load <= 11
#   bat     (§7.2 step 4) the H8 battery on bp12, one `theme` slot per engine and theme (H6-10), each started at load <= 20;
#           admission load = the first witness log's uptime. A column whose cells ran above 31 is re-read into battery-reread/
#   fmlow   H8-2 per WebKit theme (admission read inside the slot, bound 15)
#   q       (§7.2 steps 5-6) the A/Bs and the attacks, as per-column READ QUEUES (mkq.sh): one line per read, each with its
#           load gate. A slot runs its queue's lines in order; before each it checks its elapsed time plus the line's estimate
#           against 80 min, and waits for the gate (<= 11 for every A/B read: no timeout into a higher start). A gate unmet for
#           10 min ends the slot (exit 75), releasing the lock; the chain waits for the gate OUTSIDE the lock and re-queues the
#           rest. Done lines are recorded in q/<col>.done, so no read runs twice.
#   cost    Chromium, bp12 → bp10 → fv5, 3 rounds (pass-2 D2-Bp-probes.mjs pcost,plead), --cpu-cores 0, each started at <= 15
# STEPS=<list> runs a subset; COLS=<list> narrows bat/q (chromium-light chromium-dark webkit-light webkit-dark).
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p12c/Bp-crit; OUT=$B/out; WT=$B/wt
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
REC=$D/pass-12/D2-Bp-critc-records; BAT=$REC/battery; S=$REC/scripts; GD=$HOME/.claude/guard/guarded
BS=$D/pass-10/D2-Bp-proto-records/scripts
mkdir -p $BAT $REC/PR $REC/F7 $REC/rerun $REC/q $REC/filmstrips $REC/cost
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
waitload() { local t0=$(date +%s); while [ "$(echo "$(load1) > $1" | bc)" = 1 ]; do sleep 30; done; L "start-gate $2 at load $(load1) (bound $1, waited $(( $(date +%s) - t0 )) s)"; }
has() { case " ${STEPS:-pr f7 rerun bat fmlow q cost} " in *" $1 "*) return 0;; esac; return 1; }
LK=$B/seat.lock; until mkdir $LK 2>/dev/null; do sleep 5; done; trap 'rmdir $LK 2>/dev/null' EXIT
export G B OUT WT D H AD REC BAT S GD BS
export -f load1
L "CHAIN start (steps: ${STEPS:-all}); harness $(cd $D && find harness -type f | sort | xargs shasum -a 256 | shasum -a 256 | cut -c1-16)"

# gate check: "11" = load <= 11; "10-15" = 10 <= load <= 15; "-" = none
gateok() { local l; l=$(load1); case $1 in -) return 0;; *-*) [ "$(echo "$l >= ${1%-*} && $l <= ${1#*-}" | bc)" = 1 ];; *) [ "$(echo "$l <= $1" | bc)" = 1 ];; esac; }
# the slot body: run the queue's not-done lines in order (format: id|gate|est|command)
qslot() {
  local t0=$SECONDS id gate est cmd g0
  echo "admitted $COL $(date '+%F %T') · $(uptime)"
  while IFS='|' read -r id gate est cmd; do
    [ -z "$id" ] && continue
    grep -qx "$id" "$DONE" 2>/dev/null && continue
    if [ $(( (SECONDS - t0) / 60 + est )) -gt 80 ]; then echo "budget stop before $id $(date '+%T')"; exit 75; fi
    g0=$SECONDS
    until gateok "$gate"; do
      case $gate in *-*) [ $((SECONDS - g0)) -gt 600 ] && { echo "gate $gate soft: waited 10 min, runs at load $(load1)"; break; };; esac
      if [ $((SECONDS - g0)) -gt 600 ] || [ $(( (SECONDS - t0) / 60 + est )) -gt 80 ]; then echo "gate $gate unmet 10 min before $id at load $(load1) $(date '+%T'); releasing"; exit 75; fi
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
if has rerun; then
  # rerun.sh's command (pass-12 builder), this seat's build; the gate waits for <= 11 with no timeout
  rr() { for k in 1 2; do
      until gateok 11; do sleep 10; done
      (uptime; node $H/w3-morph.mjs --build $OUT/builds/bp12 --adapter $AD --engine webkit --cells '^(retarget·(40|120)|content-remove)(·control)?$' --out $OUT/rerun/webkit-light-bp12-r$k; echo "exit $?"; uptime) > $REC/rerun/w3-webkit-light-bp12-rerun$k.log 2>&1
      j=$(find $OUT/rerun/webkit-light-bp12-r$k -name W3.json | head -1); [ -n "$j" ] && cp $j $REC/rerun/w3-webkit-light-bp12-rerun$k.json
    done; }
  export -f rr
  waitload 11 "rerun"; L "queue rerun webkit light"
  $GD --exclusive webkit --timeout 60 -- bash -c 'echo "admitted rerun $(date "+%F %T") · $(uptime)"; rr; echo "rerun end $(date "+%F %T") · $(uptime)"' > $REC/rerun/slot.log 2>&1
  L "end rerun exit $?"
fi
colmax() { # the highest 1-min load in a column's battery logs
  local e=$1 t=$2 st; [ $t = dark ] && st="dark darkrest" || st="main rest"
  for s in $st; do cat $3/bp12-$s-*-$e*.log 2>/dev/null; done | grep -o 'load averages: [0-9.]*' | awk '{print $3}' | sort -n | tail -1; }
strips() { (cd $OUT/$1/bp12 && find . -name 'strip-*.png' -not -path './fmlow-*' | while read -r f; do n=$(echo "$f" | sed 's#^\./##; s#/runs/FM-[^/]*/#_#; s#/#_#g'); mkdir -p $REC/filmstrips/$1-$2; cp "$f" "$REC/filmstrips/$1-$2/$n"; done); }
if has bat; then
  for c in ${COLS:-chromium-light chromium-dark webkit-light webkit-dark}; do e=${c%-*}; t=${c#*-}
    waitload 20 "bp12 $e $t"
    L "start bp12 $e $t"
    BUILD=bp12 ENG=$e REC=$BAT THEME=$t TMIN=90 WT=$WT bash $H/battery.sh $OUT theme >> $BAT/chain-bp12-$e.log 2>&1
    L "end bp12 $e $t exit $?; cells max load $(colmax $e $t $BAT)"
    strips $e $t
    m=$(colmax $e $t $BAT)
    if [ -n "$m" ] && [ "$(echo "$m > 31" | bc)" = 1 ]; then
      mkdir -p $REC/battery-reread; mv $OUT/$e/bp12 $OUT/$e/bp12-first-$t
      waitload 20 "bp12 $e $t re-read"; L "start bp12 $e $t RE-READ (first read's cells to $m)"
      BUILD=bp12 ENG=$e REC=$REC/battery-reread THEME=$t TMIN=90 WT=$WT bash $H/battery.sh $OUT theme >> $REC/battery-reread/chain-bp12-$e.log 2>&1
      L "end bp12 $e $t RE-READ exit $?; cells max load $(colmax $e $t $REC/battery-reread)"
    fi
  done
fi
if has fmlow; then
  for t in light dark; do
    L "start fmlow webkit $t"
    BUILD=bp12 ENG=webkit REC=$BAT THEME=$t TMIN=40 bash $H/battery.sh $OUT fmlow >> $BAT/chain-bp12-webkit.log 2>&1
    L "end fmlow webkit $t exit $?"
    (cd $OUT/webkit/bp12 && find fmlow-$t -name 'strip-*.png' | while read -r f; do n=$(echo "$f" | sed 's#/runs/FM-[^/]*/#_#; s#/#_#g'); mkdir -p $REC/filmstrips/webkit-$t; cp "$f" "$REC/filmstrips/webkit-$t/$n"; done)
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
  for k in 1 2 3; do for b in bp12 bp10 fv5; do
    waitload 15 "cost $b r$k"
    (uptime; $GD --cpu-cores 0 --timeout 30 -- node $D/pass-2/D2-Bp-probes.mjs --build $OUT/builds/$b --adapter $AD --arm pcost,plead --engine chromium --out $REC/cost/cost-$b-chromium-r$k.json; echo "exit $?"; uptime) > $REC/cost/cost-$b-chromium-r$k.log 2>&1
  done; done
  L "end cost"
fi
L "CHAIN-DONE"
