#!/bin/bash
# chain.sh (D2 pass 12, BUILDER of D2-B′, REGISTRY §P11-7.3 item 6; after the pass-11 critic's chain.sh): one heavy run at a time
# (this chain holds the seat lock for its whole run); every run guarded, browser runs never --light, Playwright WebKit under
# --exclusive webkit (queued, never cancelled). Harness H8 as landed (9d12810b…), unchanged; its list hash is printed at the start.
#   (bat and fmlow run as the first sub-steps of each engine and theme's `att` slot, battery.sh with NOGUARD=1 inside that slot,
#   so each theme's battery stays one slot (H6-10) and the WebKit lock is queued once per slot, not once per stage; the
#   top-level `bat` / `fmlow` steps below are the same runs in slots of their own)
#   bat    the H8 battery on bp12: one `theme` slot per engine and theme (H6-10), each started at 1-min load <= 20; the slot's
#          admission load is its first witness log's uptime (WebKit: when the lock admits it), also in battery/slots.log
#   fmlow  H8-2 per WebKit theme (admission read inside the slot, bound 15)
#   att    per engine and theme, ONE guarded slot (sub-steps bat, fmlow (WebKit), cr, si, frz, ab, fmab (WebKit), r2 (WebKit), heir (light)) (started at load <= 20; WebKit one --exclusive webkit slot) running the A/Bs and
#          readings as sub-steps; before each sub-step the slot checks its elapsed time plus the sub-step's estimate against 80 min
#          and, when it would not fit, writes the rest to a remain file and ends; the rest queues as the next slot. Every A/B read
#          is bp12 and bp10 alternating and starts at load <= 11 after a wait of at most 180 s (Chromium) / 60 s (WebKit):
#     ab     W3 retarget·40/80/120 (+ controls), 8 rounds (rules (a), (b))
#     cr     W3 content-remove (+ control), 8 rounds, witness JSON kept (rule (c))
#     fmab   (WebKit) FM film·warm-expand and film·first-expand, 8 rounds, strips kept
#     si     the display-frame probe (pass-8 critic's slotink-crit.mjs), 3 rounds
#     frz    vmorph collapse frozen at the leaving pair's frame (pass-11 critic's frz.mjs), bp12, T 42-62 by 4, 1 run
#     heir   (light only) the heir probe on bp12i (pass-10 builder's heirprobe.mjs)
#     r2     (WebKit) W3 whole, 2 rounds: R2's WebKit margin per column, with the seat
#     chk    the window cure's model read: lanes2.mjs on bp12c and bp10c alternating, morph, 4 rounds
#     fmt    (WebKit) the B2 cure: fmtrace.mjs on bp12u and bp10u alternating, warm-expand and first-expand, 8 rounds
#   cost   Chromium, bp12 → bp10 → fv5, 3 rounds, traced (pass-2 D2-Bp-probes.mjs pcost,plead), --cpu-cores 0, each at load <= 15
# STEPS=<list> runs a subset; ENGS / THEMES narrow bat and att; SUB=<list> narrows att's sub-steps.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p12/Bp-build; OUT=$B/out; WT=$B/wt
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
REC=$D/pass-12/D2-Bp-build-records; BAT=$REC/battery; S=$REC/scripts; GD=$HOME/.claude/guard/guarded
BS=$D/pass-10/D2-Bp-proto-records/scripts; CS=$D/pass-11/D2-Bp-crit-records/scripts
SI=$D/pass-8/D2-Bp-crit-records/scripts/slotink-crit.mjs
mkdir -p $BAT $REC/ab $REC/cr $REC/fmab $REC/frz $REC/si $REC/heir $REC/r2 $REC/cost $REC/filmstrips
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
waitload() { local t0=$(date +%s); while [ "$(echo "$(load1) > $1" | bc)" = 1 ]; do sleep 30; done; L "start-gate $2 at load $(load1) (bound $1, waited $(( $(date +%s) - t0 )) s)"; }
softload() { local t0=$SECONDS; while [ "$(echo "$(load1) > $1" | bc)" = 1 ] && [ $((SECONDS - t0)) -lt ${2:-180} ]; do sleep 10; done; }
has() { case " ${STEPS:-att cost} " in *" $1 "*) return 0;; esac; return 1; }
LK=$B/seat.lock; until mkdir $LK 2>/dev/null; do sleep 5; done; trap 'rmdir $LK 2>/dev/null' EXIT
export G B OUT WT D H AD REC BAT S SI BS CS GD
export -f load1 softload
L "CHAIN start (steps: ${STEPS:-all}); harness $(cd $D && find harness -type f | sort | xargs shasum -a 256 | shasum -a 256 | cut -c1-16)"

sub_ab() { SOFT=180; [ $E = webkit ] && SOFT=60
  for k in 1 2 3 4 5 6 7 8; do for b in bp12 bp10; do softload 11 $SOFT
    (uptime; $TE node $H/w3-morph.mjs --build $OUT/builds/$b --adapter $AD --engine $E --cells '^retarget·(40|80|120)(·control)?$' --out $OUT/rt/$E-$t-$b-r$k; echo "exit $?"; uptime) > $REC/ab/w3rt-$E-$t-$b-r$k.log 2>&1
  done; done; }
sub_cr() { SOFT=180; [ $E = webkit ] && SOFT=60
  for k in 1 2 3 4 5 6 7 8; do for b in bp12 bp10; do softload 11 $SOFT
    (uptime; $TE node $H/w3-morph.mjs --build $OUT/builds/$b --adapter $AD --engine $E --cells '^content-remove(·control)?$' --out $OUT/cr/$E-$t-$b-r$k; echo "exit $?"; uptime) > $REC/cr/w3cr-$E-$t-$b-r$k.log 2>&1
    j=$(find $OUT/cr/$E-$t-$b-r$k -name W3.json | head -1); [ -n "$j" ] && cp $j $REC/cr/w3cr-$E-$t-$b-r$k.json
  done; done; }
sub_fmab() { SOFT=60
  for k in 1 2 3 4 5 6 7 8; do for b in bp12 bp10; do softload 11 $SOFT; o=$OUT/fmab/$E-$t-$b-r$k
    (uptime; $TE node $H/film.mjs --build $OUT/builds/$b --adapter $AD --engine $E --cells '^film·(warm-expand|first-expand)$' --out $o; echo "exit $?"; uptime) > $REC/fmab/fm-$E-$t-$b-r$k.log 2>&1
    (cd $o 2>/dev/null && find . -name 'strip-*.png' | while read -r f; do cp "$f" "$REC/fmab/$E-$t-$b-r${k}_$(basename $f)"; done)
    j=$(find $o -name FM.json | head -1); [ -n "$j" ] && cp $j $REC/fmab/fm-$E-$t-$b-r$k.json
  done; done; }
sub_si() { SOFT=180; [ $E = webkit ] && SOFT=60
  for k in 1 2 3; do for b in bp12 bp10; do softload 11 $SOFT; node $SI --build $OUT/builds/$b --adapter $AD --engine $E --runs 1 $TH --json $REC/si/$b-$E-$t-r$k.json >> $REC/si/si-$E-$t.log 2>&1; done; done; }
sub_frz() { $TE node $CS/frz.mjs --build $OUT/builds/bp12 --adapter $AD --engine $E --at 42,46,50,54,58,62 --runs 1 --out $REC/frz/png --tag bp12-$E-$t --json $REC/frz/bp12-$E-$t.json > $REC/frz/frz-$E-$t.log 2>&1; }
sub_heir() { node $BS/heirprobe.mjs --build $OUT/builds/bp12i --adapter $AD --engine $E --json $REC/heir/bp12i-$E.json > $REC/heir/bp12i-$E.log 2>&1; }
sub_r2() { SOFT=60
  for k in 1 2; do for b in bp12 bp10; do softload 11 $SOFT
    (uptime; $TE node $H/w3-morph.mjs --build $OUT/builds/$b --adapter $AD --engine webkit --out $OUT/r2/$t-$b-r$k; echo "exit $?"; uptime) > $REC/r2/w3-webkit-$t-$b-r$k.log 2>&1
  done; done; }
sub_bat() { BUILD=bp12 ENG=$E REC=$BAT THEME=$t TMIN=90 WT=$WT NOGUARD=1 bash $H/battery.sh $OUT theme >> $BAT/chain-bp12-$E.log 2>&1
  (cd $OUT/$E/bp12 && find . -name 'strip-*.png' -not -path './fmlow-*' | while read -r f; do n=$(echo "$f" | sed 's#^\./##; s#/runs/FM-[^/]*/#_#; s#/#_#g'); mkdir -p $REC/filmstrips/$E-$t; cp "$f" "$REC/filmstrips/$E-$t/$n"; done); }
sub_fmlow() { BUILD=bp12 ENG=webkit REC=$BAT THEME=$t TMIN=40 NOGUARD=1 FMLOW_QUEUE_MIN=10 bash $H/battery.sh $OUT fmlow >> $BAT/chain-bp12-webkit.log 2>&1
  (cd $OUT/webkit/bp12 && find fmlow-$t -name 'strip-*.png' | while read -r f; do n=$(echo "$f" | sed 's#/runs/FM-[^/]*/#_#; s#/#_#g'); mkdir -p $REC/filmstrips/webkit-$t; cp "$f" "$REC/filmstrips/webkit-$t/$n"; done); }
sub_fmt() { SOFT=60; mkdir -p $REC/fmt12
  for k in 1 2 3 4 5 6 7 8; do for b in bp12u bp10u; do softload 11 $SOFT
    node $S/fmtrace.mjs --build $OUT/builds/$b --adapter $AD --engine $E $TH --cells warm-expand,first-expand --out $OUT/fmt12/$E-$t-$b-r$k --json $REC/fmt12/$E-$t-$b-r$k.json >> $REC/fmt12/fmt-$E-$t.log 2>&1
    for f in $OUT/fmt12/$E-$t-$b-r$k/strip-*.png; do [ -f "$f" ] && cp "$f" "$REC/fmt12/$E-$t-$b-r${k}_$(basename $f)"; done
  done; done; }
sub_chk() { SOFT=180; [ $E = webkit ] && SOFT=60; mkdir -p $REC/chk12
  for k in 1 2 3 4; do for b in bp12c bp10c; do softload 11 $SOFT
    node $S/lanes2.mjs --build $OUT/builds/$b --adapter $AD --engine $E $TH --runs 1 --scene morph --json $REC/chk12/morph-$E-$t-$b-r$k.json >> $REC/chk12/chk-$E-$t.log 2>&1
  done; done; }
est() { case $1 in fmt) echo 10;; chk) echo 6;; bat) echo 25;; ab) echo 30;; r2) echo 22;; fmlow) echo 15;; cr) echo 14;; fmab) echo 12;; *) echo 5;; esac; }
attslot() {
  local t0=$SECONDS left=() stop= x
  echo "admitted att $E $t $(date '+%F %T') · $(uptime)"
  for x in $SUBS; do
    if [ -n "$stop" ]; then left+=("$x"); continue; fi
    if [ $(( (SECONDS - t0) / 60 + $(est $x) )) -gt 80 ]; then stop=1; left+=("$x"); continue; fi
    echo "sub $x start $(date '+%F %T') · $(uptime)"; sub_$x; echo "sub $x end $(date '+%F %T') · $(uptime)"
  done
  if [ ${#left[@]} -gt 0 ]; then echo "${left[*]}" > "$REM"; echo "budget stop; remain: ${left[*]}"; exit 75; fi
  echo "att end $(date '+%F %T') · $(uptime)"; }
export -f sub_fmt sub_chk sub_bat sub_fmlow sub_ab sub_cr sub_fmab sub_si sub_frz sub_heir sub_r2 est attslot

if has bat; then
  for e in ${ENGS:-chromium webkit}; do for t in ${THEMES:-light dark}; do
    waitload 20 "bp12 $e $t"
    L "start bp12 $e $t"
    BUILD=bp12 ENG=$e REC=$BAT THEME=$t TMIN=90 WT=$WT bash $H/battery.sh $OUT theme >> $BAT/chain-bp12-$e.log 2>&1
    L "end bp12 $e $t exit $?"
    (cd $OUT/$e/bp12 && find . -name 'strip-*.png' -not -path './fmlow-*' | while read -r f; do n=$(echo "$f" | sed 's#^\./##; s#/runs/FM-[^/]*/#_#; s#/#_#g'); mkdir -p $REC/filmstrips/$e-$t; cp "$f" "$REC/filmstrips/$e-$t/$n"; done)
  done; done
fi
if has fmlow; then
  for t in light dark; do
    L "start fmlow webkit $t"
    BUILD=bp12 ENG=webkit REC=$BAT THEME=$t TMIN=40 bash $H/battery.sh $OUT fmlow >> $BAT/chain-bp12-webkit.log 2>&1
    L "end fmlow webkit $t exit $?"
    (cd $OUT/webkit/bp12 && find fmlow-$t -name 'strip-*.png' | while read -r f; do n=$(echo "$f" | sed 's#/runs/FM-[^/]*/#_#; s#/#_#g'); mkdir -p $REC/filmstrips/webkit-$t; cp "$f" "$REC/filmstrips/webkit-$t/$n"; done)
  done
fi
if has att; then
  for e in ${ENGS:-chromium webkit}; do for t in ${THEMES:-light dark}; do
    SUBS=${SUB:-"bat cr chk si frz ab"}; [ $e = webkit ] && [ -z "${SUB:-}" ] && SUBS="bat fmlow cr chk fmt si frz ab fmab r2"; [ $t = light ] && [ -z "${SUB:-}" ] && SUBS="$SUBS heir"
    REM=$REC/remain-att-$e-$t.txt; k=0
    while :; do
      k=$((k + 1)); rm -f $REM
      waitload 20 "att $e $t slot $k"; X=""; [ $e = webkit ] && X="--exclusive webkit"
      L "queue att $e $t slot $k [$SUBS]"
      TH=""; TE=""; [ $t = dark ] && { TH="--theme dark"; TE="env DOCK_HARNESS_THEME=dark"; }
      E=$e t=$t TH="$TH" TE="$TE" SUBS="$SUBS" REM=$REM $GD $X --timeout 88 -- bash -c attslot >> $REC/slot-att-$e-$t.log 2>&1
      L "end att $e $t slot $k exit $?"
      [ -s $REM ] || break
      SUBS=$(cat $REM)
    done
  done; done
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
