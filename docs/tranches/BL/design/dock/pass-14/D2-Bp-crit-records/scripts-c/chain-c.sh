#!/bin/bash
# chain-c.sh (D2 pass 14, the COMPLETION critic of D2-B′, REGISTRY §P14-7.2; after CK's chain.sh, whose qslot and gate logic
# it keeps). Records under pass-14/D2-Bp-crit-records/c/ (RC); the A/B and attack reads land where CK's queue lines write
# them (R/rev, R/ab, …, empty before this seat). One heavy run at a time (seat.lock). Every run guarded; browser runs never
# --light; Playwright WebKit under --exclusive webkit, queued, never cancelled. No admitted slot is ended by stopping its
# parent. GATES ARE READ INSIDE THE ADMITTED SLOT (§P14-7.2 items 4-5): a slot whose gate stays unmet releases (exit 75) and
# re-queues. DISK read before every build, battery and queue slot (under 15 GB: exit 3). A REFUSED line stops the chain (5).
#   pr f7   PR (--light, no browser), F7, the boot graph (bootsize.py on F7's dist-demo), same.py
#   rrwd    the owed W·d re-runs (c/q/rerun-webkit-dark.q), one --exclusive webkit slot, gate 11 per line
#   bat     the H8 battery, one column per slot (COLS_BAT, default cl cd wl wd), in-slot gate BATG (11) before it starts,
#           WebKit `fmlow` (H8-2, bound 15) in the same slot; each column's records in c/bat-<col>-<k>/battery (no sibling
#           overwrite: the out tree is moved aside after each column). Cells above 31: re-read, at most 2 re-reads
#   q       the A/Bs and attacks: c/q/<col>.q (CK's lines; gates 15 tightened to 11; the 10-15 band's soft start held <= 15)
#   cost    Chromium bp13 → bp12 → fv5, 3 rounds, --cpu-cores 0, in-slot gate 11
#   digest  cells.mjs on the assembled four-column reading of record (c/digest-src), default and --ruled
#   hend    harness and patch hashes at the end
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p14/Bp-crit; OUT=$B/out; WT=$B/wt
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
R=$D/pass-14/D2-Bp-crit-records; RC=$R/c; S=$R/scripts; SC=$R/scripts-c; GD=$HOME/.claude/guard/guarded
BS=$D/pass-10/D2-Bp-proto-records/scripts
mkdir -p $RC/PR $RC/F7 $RC/q $RC/filmstrips $RC/cost $RC/digest
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $RC/chain.log; }
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
diskok() { local a; a=$(df -g /System/Volumes/Data | tail -1 | awk '{print $4}'); L "disk free ${a} GB before $1"; if [ "$a" -lt 15 ]; then L "DISK-STOP: ${a} GB free < 15 before $1"; exit 3; fi; }
refchk() { if grep -q '^\[guarded\] REFUSED' "$1" 2>/dev/null; then L "GUARD-REFUSED in $(basename $1): $(grep -m1 '^\[guarded\] REFUSED' $1 | cut -c1-200)"; exit 5; fi; }
waitload() { local t0=$(date +%s); while [ "$(echo "$(load1) > $1" | bc)" = 1 ]; do sleep 20; done; L "outside gate $2 at load $(load1) (bound $1, waited $(( $(date +%s) - t0 )) s)"; }
has() { case " ${STEPS:-pr f7 rrwd bat q cost digest hend} " in *" $1 "*) return 0;; esac; return 1; }
LK=$B/seat.lock; until mkdir $LK 2>/dev/null; do sleep 5; done; trap 'rmdir $LK 2>/dev/null' EXIT
export G B OUT WT D H AD R RC S SC GD BS
export -f load1
L "CHAIN start pid $$ pgid $(ps -o pgid= $$ | tr -d ' ') (steps: ${STEPS:-all}); harness list $(cd $D && shasum -a 256 -c pass-8/H8-records/harness.sha256 2>&1 | grep -c ': OK$') OK"
gateok() { local l; l=$(load1); case $1 in -) return 0;; *-*) [ "$(echo "$l >= ${1%-*} && $l <= ${1#*-}" | bc)" = 1 ];; *) [ "$(echo "$l <= $1" | bc)" = 1 ];; esac; }
qslot() {
  local t0=$SECONDS id gate est cmd g0
  echo "admitted $COL $(date '+%F %T') · $(uptime)"
  while IFS='|' read -r id gate est cmd; do
    [ -z "$id" ] && continue
    grep -qx "$id" "$DONE" 2>/dev/null && continue
    if [ $(( (SECONDS - t0) / 60 + est )) -gt 80 ]; then echo "budget stop before $id $(date '+%T')"; exit 75; fi
    g0=$SECONDS
    until gateok "$gate"; do
      # the 10-15 band: after 10 min below it the read starts, but never above its top (CK's soft rule ran at any load)
      case $gate in *-*) [ $((SECONDS - g0)) -gt 600 ] && gateok "${gate#*-}" && { echo "gate $gate soft: waited 10 min, runs at load $(load1)"; break; };; esac
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
runq() { # col queue-file done-file engine: slots until the queue is done
  local c=$1 Q=$2 DONE=$3 e=$4 k=0 left nid ng X t0
  touch $DONE
  while :; do
    left=$(grep -cvxFf $DONE <(cut -d'|' -f1 $Q)); [ "$left" = 0 ] && break
    diskok "q $c"; k=$((k + 1))
    nid=$(cut -d'|' -f1 $Q | grep -vxFf $DONE | head -1); ng=$(grep "^$nid|" $Q | head -1 | cut -d'|' -f2)
    t0=$(date +%s); case $ng in *-*) ng=${ng#*-};; esac; until gateok "$ng"; do sleep 20; done
    L "outside gate q $c slot $k at load $(load1) (next $nid gate $ng, waited $(( $(date +%s) - t0 )) s, $left lines left)"
    X=""; [ $e = webkit ] && X="--exclusive webkit"
    COL=$c Q=$Q DONE=$DONE $GD $X --timeout 88 -- bash -c qslot >> $RC/q/slot-$c.log 2>&1
    L "end q $c slot $k exit $?"; refchk $RC/q/slot-$c.log
  done; }
if has pr; then
  L "start PR"
  (uptime; $GD --light --timeout 10 -- node $H/prose.mjs $WT --out $OUT/pr; echo "exit $?"; uptime) > $RC/PR/PR.log 2>&1
  refchk $RC/PR/PR.log
  find $OUT/pr -name PR.json -exec cp {} $RC/PR/PR.json \;
  L "end PR"
fi
if has f7; then
  diskok F7; waitload 20 "F7"
  (uptime; $GD --timeout 60 -- node $H/f7.mjs $WT --out $OUT/f7; echo "exit $?"; uptime) > $RC/F7/F7.log 2>&1
  refchk $RC/F7/F7.log
  F=$(find $OUT/f7 -name F7.json | head -1); cp $F $RC/F7/F7.json; cp $(dirname $F)/steps.json $RC/F7/ 2>/dev/null
  for s in lib demo typecheck units; do tail -40 $(dirname $F)/$s.log > $RC/F7/$s.tail.log 2>/dev/null; done
  python3 -I $BS/bootsize.py $WT > $RC/F7/boot-graph.txt
  L "end F7: $(head -1 $RC/F7/boot-graph.txt)"
  python3 -I $SC/same.py $RC > $RC/same.txt 2>&1; L "same build: $(tail -1 $RC/same.txt)"
  grep -q '^SAME$' $RC/same.txt || { L "STOP: the build differs from pass 13's"; exit 4; }
fi
if has rrwd; then
  c=rerun-webkit-dark; diskok "rrwd"
  runq $c $RC/q/$c.q $RC/q/$c.done webkit
  L "end rrwd"
fi
batbody() {
  local t0=$SECONDS
  echo "admitted bat $COL $(date '+%F %T') · $(uptime)"
  while [ "$(echo "$(load1) > $BATG" | bc)" = 1 ]; do sleep 15; [ $((SECONDS - t0)) -gt 1200 ] && { echo "in-slot gate $BATG unmet 20 min at $(load1) $(date '+%T'); releasing"; exit 75; }; done
  echo "in-slot start load $(load1) $(date '+%F %T') (waited $((SECONDS - t0)) s)"
  BUILD=bp13 ENG=$E REC=$BR THEME=$T WT=$WT NOGUARD=1 BUDGET_MIN=400 bash $H/battery.sh $OUT theme >> $BR/chain-bp13-$E.log 2>&1; local bx=$?
  echo "battery end $(date '+%T') exit $bx load $(load1)"
  if [ $E = webkit ]; then
    BUILD=bp13 ENG=webkit REC=$BR THEME=$T NOGUARD=1 FMLOW_QUEUE_MIN=15 FMLOW_TRIES=1 bash $H/battery.sh $OUT fmlow >> $BR/chain-bp13-$E.log 2>&1; bx=$?
    echo "fmlow end $(date '+%T') exit $bx load $(load1)"
  fi
}
export -f batbody
batcol() { # col: one reading of one column, k = its index
  local col=$1 E T k=$2 BR X x m a
  case $col in cl) E=chromium T=light;; cd) E=chromium T=dark;; wl) E=webkit T=light;; wd) E=webkit T=dark;; esac
  BR=$RC/bat-$col-$k/battery; mkdir -p $BR
  [ -d $OUT/$E/bp13 ] && mv $OUT/$E/bp13 $OUT/$E/bp13-stale-$(date +%s)
  X=""; [ $E = webkit ] && X="--exclusive webkit"
  while :; do
    diskok "battery $col r$k"; waitload ${BATG:-11} "battery $col r$k"; L "queue battery $col r$k"
    COL=$col E=$E T=$T BR=$BR BATG=${BATG:-11} $GD $X --timeout 88 -- bash -c batbody >> $RC/slot-bat-$col-$k.log 2>&1; x=$?
    L "end battery slot $col r$k exit $x"; refchk $RC/slot-bat-$col-$k.log
    grep -q '^battery end' $RC/slot-bat-$col-$k.log && break
    [ $x = 75 ] || { L "battery slot $col r$k exit $x without a battery end; stop"; exit 6; }
  done
  if [ $E = webkit ]; then a=$BR/json/bp13-webkit/fmlow-$T/admit.json
    if ! grep -q '"deferred":false' $a 2>/dev/null; then
      L "fmlow $col r$k deferred in-slot; its own slot (H8-2, bound 15)"
      BUILD=bp13 ENG=webkit REC=$BR THEME=$T TMIN=40 bash $H/battery.sh $OUT fmlow >> $BR/chain-bp13-$E.log 2>&1
      L "end fmlow $col r$k exit $?: $(cat $a 2>/dev/null | cut -c1-160)"; refchk $BR/chain-bp13-$E.log
    fi
  fi
  m=$(python3 -I $SC/colmax.py $BR); L "battery $col r$k done; cells max load $m"
  (cd $OUT/$E/bp13 && find . -name 'strip-*.png' | while read -r f; do n=$(echo "$f" | sed 's#^\./##; s#/runs/FM-[^/]*/#_#; s#/#_#g'); mkdir -p $RC/filmstrips/$col-$k; cp "$f" "$RC/filmstrips/$col-$k/$n"; done)
  mv $OUT/$E/bp13 $OUT/$E/bp13-$col-$k
  echo "$m" > $RC/bat-$col-$k/maxload.txt
}
if has bat; then
  for col in ${COLS_BAT:-cl cd wl wd}; do
    for k in 1 2 3; do
      batcol $col $k; m=$(cat $RC/bat-$col-$k/maxload.txt)
      if [ -n "$m" ] && [ "$(echo "$m <= 31" | bc)" = 1 ]; then L "battery $col: reading r$k of record (cells to $m)"; echo $k > $RC/bat-$col.ofrecord; break; fi
      L "battery $col r$k cells to $m > 31: re-read"
    done
    [ -f $RC/bat-$col.ofrecord ] || L "battery $col: NO reading <= 31 after 3 readings"
  done
fi
if has q; then
  for c in ${COLS:-chromium-light chromium-dark webkit-light webkit-dark}; do runq $c $RC/q/$c.q $RC/q/$c.done ${c%-*}; done
fi
if has fu; then
  for c in ${FUCOLS:-}; do [ -s $RC/q/fu-$c.q ] && runq fu-$c $RC/q/fu-$c.q $RC/q/fu-$c.done ${c%-*}; done
fi
costone() { # inside the admitted slot: the gate read there
  local t0=$(date +%s); while [ "$(echo "$(load1) > 11" | bc)" = 1 ]; do sleep 20; [ $(( $(date +%s) - t0 )) -gt 1500 ] && { echo "in-slot gate unmet 25 min at $(load1)"; exit 75; }; done
  echo "in-slot start load $(load1) $(date '+%T') (waited $(( $(date +%s) - t0 )) s)"
  node $D/pass-2/D2-Bp-probes.mjs --build $OUT/builds/$CB --adapter $AD --arm pcost,plead --engine chromium --out $CJ
}
export -f costone
if has cost; then
  L "start cost"
  for k in 1 2 3; do for b in bp13 bp12 fv5; do
    f=$RC/cost/cost-$b-chromium-r$k
    while :; do
      waitload 11 "cost $b r$k"
      (uptime; CB=$b CJ=$f.json $GD --cpu-cores 0 --timeout 30 -- bash -c costone; echo "exit $?"; uptime) > $f.log 2>&1
      refchk $f.log; grep -q '^exit 75' $f.log || break; L "cost $b r$k released (gate unmet in slot); again"
    done
  done; done
  L "end cost"
fi
if has digest; then
  L "start digest"; DS=$RC/digest-src/battery/json; rm -rf $RC/digest-src; mkdir -p $DS/bp13-chromium $DS/bp13-webkit
  for col in cl cd wl wd; do k=$(cat $RC/bat-$col.ofrecord 2>/dev/null) || { L "digest: column $col has no reading of record"; continue; }
    case $col in cl) e=chromium st="main rest";; cd) e=chromium st="dark darkrest";; wl) e=webkit st="main rest fmlow-light";; wd) e=webkit st="dark darkrest fmlow-dark";; esac
    for s in $st; do [ -d $RC/bat-$col-$k/battery/json/bp13-$e/$s ] && cp -R $RC/bat-$col-$k/battery/json/bp13-$e/$s $DS/bp13-$e/; done
    echo "$col bat-$col-$k" >> $RC/digest-src/OF-RECORD.txt
  done
  for r in "" "--ruled"; do tg=p14c${r:+-ruled}
    (uptime; $GD --light --timeout 10 -- node $H/cells.mjs --build bp13=$RC/digest-src --f7 bp13=$RC/F7/F7.json --pr bp13=$RC/PR/PR.json --out $RC/digest --tag $tg $r; echo "exit $?") > $RC/digest/cells-$tg.log 2>&1
  done
  L "end digest"
fi
if has hend; then
  (cd $D && shasum -a 256 -c pass-8/H8-records/harness.sha256; shasum -a 256 pass-8/H8-records/harness.sha256 pass-13/D2-Bp-p13.patch pass-12/D2-Bp-p12.patch pass-6/floor-v5.patch pass-4/floor-v3.patch; date; uptime) > $RC/harness-check-end.txt 2>&1
  L "harness end: $(grep -c ': OK$' $RC/harness-check-end.txt) OK"
fi
L "CHAIN-DONE (steps: ${STEPS:-all})"
