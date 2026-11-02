#!/bin/bash
# chain.sh (D2 pass 11, fresh CRITIC of D2-B′, REGISTRY §P10-7.4; after the pass-10 critic's chain.sh and the pass-11 re-measure's
# chain.sh / chain3.sh): one heavy run at a time; every run guarded, browser runs never --light, Playwright WebKit under
# --exclusive webkit (queued, never cancelled). Harness H8 as landed (9d12810b…), unchanged; its list hash is printed at the start.
#   pr f7    PR (--light, no browser) and F7 on the bp10 tree; boot graph (pass-10 bootsize.py)
#   bat      the H8 battery on bp10: one `theme` slot per engine and theme (H6-10), each started at 1-min load <= 20; the slot's
#            admission load is its first witness log's uptime (WebKit: when the lock admits it), also in battery/slots.log
#   fmlow    H8-2 per WebKit theme (admission read inside the slot, bound 15)
#   att      per engine and theme, ONE guarded slot (started at load <= 20; WebKit one --exclusive webkit slot) running this
#            seat's readings as sub-steps in order; before each sub-step the slot checks its elapsed time plus the sub-step's
#            estimate against 80 min and, when it would not fit, writes the rest to a remain file and ends; the rest queues as
#            the next slot (battery.sh's H6-10 rule):
#     ab     the retarget A/B: bp10 and bp8 alternating, 8 rounds, w3-morph cells retarget·40/80/120 (+ controls), each read
#            started at load <= 11 after a wait of at most 180 s Chromium / 60 s WebKit (passes 9-11)
#     frz    vmorph collapse frozen at the leaving pair's frame (frz.mjs), bp10, T 42-62 ms by 4, 2 runs
#     revst  the reversal stub, bp10 and bp8 alternating: phase2.mjs morph rev-c at 0.2/0.25/0.3/0.8/0.85/0.9, 2 runs, 2 rounds
#     swrev  the swap reversed at N (setFace short) and retargeted D ms later (setFace mid), bp10: N 40-120 by 20, D 0/16/32/64,
#            2 runs; bp8 control D 16/32, 1 run
#     rtrev  a retarget during the morph reversal (phase3.mjs rev-c-rt, rev-e-rt), bp10: frac 0.2/0.35/0.5/0.8, D 16/32/64, 2 runs
#     edge   retarget·N at the offsets no seat swept (sweep.mjs): N 0-40 by 4 and 200-320 by 10, bp10, 2 runs
#     si     the display-frame probe (pass-8 critic's slotink-crit.mjs), bp10 and bp8 alternating, 3 runs
#     fs     the constructed far side in paint (pass-9 critic's slotink-axis.mjs, fs-to-three, fs-to-one), bp10fs and bp8fs
#            alternating, 3 runs
#     heir   (light only) the heir probes on bp10i (pass-10 builder's heirprobe.mjs) and bp10fsi (pass-10 critic's fsheir.mjs)
#     r2     (WebKit only) W3 whole on bp10, 2 runs, each started once the 1-min load is 10-15 (waits at most 10 min, then runs
#            and records the load): R2's WebKit margin at load 10-15
# STEPS=<list> runs a subset; ENGS / THEMES narrow bat and att; SUB=<list> narrows att's sub-steps.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p11/Bp-crit; OUT=$B/out; WT=$B/wt
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
REC=$D/pass-11/D2-Bp-crit-records; BAT=$REC/battery; S=$REC/scripts; GD=$HOME/.claude/guard/guarded
BS=$D/pass-10/D2-Bp-proto-records/scripts; CS=$D/pass-10/D2-Bp-crit-records/scripts
SW=$BS/sweep.mjs; SI=$D/pass-8/D2-Bp-crit-records/scripts/slotink-crit.mjs; AX=$D/pass-9/D2-Bp-crit-records/seat-2/scripts/slotink-axis.mjs
mkdir -p $BAT $REC/ab $REC/frz $REC/revst $REC/swrev $REC/rtrev $REC/edge $REC/si $REC/fs $REC/heir $REC/r2 $REC/PR $REC/F7 $REC/filmstrips
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
waitload() { local t0=$(date +%s); while [ "$(echo "$(load1) > $1" | bc)" = 1 ]; do sleep 30; done; L "start-gate $2 at load $(load1) (bound $1, waited $(( $(date +%s) - t0 )) s)"; }
softload() { local t0=$SECONDS; while [ "$(echo "$(load1) > $1" | bc)" = 1 ] && [ $((SECONDS - t0)) -lt ${2:-180} ]; do sleep 10; done; }
has() { case " ${STEPS:-pr f7 bat fmlow att} " in *" $1 "*) return 0;; esac; return 1; }
export G B OUT WT D H AD REC S SW SI AX BS CS
export -f load1 softload
L "CHAIN start (steps: ${STEPS:-all}); harness $(cd $D && find harness -type f | sort | xargs shasum -a 256 | shasum -a 256 | cut -c1-16)"

sub_ab() { SOFT=180; [ $E = webkit ] && SOFT=60
  for k in 1 2 3 4 5 6 7 8; do for b in bp10 bp8; do
    softload 11 $SOFT
    (uptime; $TE node $H/w3-morph.mjs --build $OUT/builds/$b --adapter $AD --engine $E --cells '^retarget·(40|80|120)(·control)?$' --out $OUT/rt/$E-$t-$b-r$k; echo "exit $?"; uptime) > $REC/ab/w3rt-$E-$t-$b-r$k.log 2>&1
  done; done; }
sub_frz() { $TE node $S/frz.mjs --build $OUT/builds/bp10 --adapter $AD --engine $E --at 42,46,50,54,58,62 --runs 2 --out $REC/frz/png --tag bp10-$E-$t --json $REC/frz/bp10-$E-$t.json > $REC/frz/frz-$E-$t.log 2>&1; }
sub_revst() { for k in 1 2; do for b in bp10 bp8; do node $CS/phase2.mjs --build $OUT/builds/$b --adapter $AD --engine $E $TH --scene morph --mode rev-c --points 0.2,0.25,0.3,0.8,0.85,0.9 --runs 2 --json $REC/revst/$b-$E-$t-k$k.json > $REC/revst/$b-$E-$t-k$k.log 2>&1; done; done; }
sub_swrev() { node $S/swrev.mjs --build $OUT/builds/bp10 --adapter $AD --engine $E $TH --at 40,60,80,100,120 --then 0,16,32,64 --runs 2 --json $REC/swrev/bp10-$E-$t.json > $REC/swrev/bp10-$E-$t.log 2>&1
  node $S/swrev.mjs --build $OUT/builds/bp8 --adapter $AD --engine $E $TH --at 40,60,80,100,120 --then 16,32 --runs 1 --json $REC/swrev/bp8-$E-$t.json > $REC/swrev/bp8-$E-$t.log 2>&1; }
sub_rtrev() { for m in rev-c-rt rev-e-rt; do for d in 16 32 64; do node $S/phase3.mjs --build $OUT/builds/bp10 --adapter $AD --engine $E $TH --scene morph --mode $m --then $d --points 0.2,0.35,0.5,0.8 --runs 2 --json $REC/rtrev/bp10-$E-$t-$m-$d.json > $REC/rtrev/bp10-$E-$t-$m-$d.log 2>&1; done; done; }
sub_edge() { node $SW --build $OUT/builds/bp10 --adapter $AD --engine $E $TH --from 0 --to 40 --step 4 --runs 2 --json $REC/edge/bp10-$E-$t-early.json > $REC/edge/bp10-$E-$t-early.log 2>&1
  node $SW --build $OUT/builds/bp10 --adapter $AD --engine $E $TH --from 200 --to 320 --step 10 --runs 2 --json $REC/edge/bp10-$E-$t-late.json > $REC/edge/bp10-$E-$t-late.log 2>&1; }
sub_si() { for k in 1 2 3; do for b in bp10 bp8; do node $SI --build $OUT/builds/$b --adapter $AD --engine $E --runs 1 $TH --json $REC/si/$b-$E-$t-r$k.json >> $REC/si/si-$E-$t.log 2>&1; done; done; }
sub_fs() { for k in 1 2 3; do for b in bp10 bp8; do node $AX --build $OUT/builds/${b}fs --adapter $AD --engine $E --query fs=1 --seqs fs-to-three,fs-to-one --runs 1 $TH --rows --json $REC/fs/$b-$E-$t-r$k.json >> $REC/fs/fs-$E-$t.log 2>&1; done; done; }
sub_heir() { node $BS/heirprobe.mjs --build $OUT/builds/bp10i --adapter $AD --engine $E --json $REC/heir/bp10i-$E.json > $REC/heir/bp10i-$E.log 2>&1
  node $CS/fsheir.mjs --fs 1 --build $OUT/builds/bp10fsi --adapter $AD --engine $E --json $REC/heir/bp10fsi-$E.json > $REC/heir/bp10fsi-$E.log 2>&1; }
sub_r2() { for k in 1 2; do q0=$SECONDS; while :; do l=$(load1); if [ "$(echo "$l >= 10 && $l <= 15" | bc)" = 1 ] || [ $((SECONDS - q0)) -gt 600 ]; then break; fi; sleep 15; done
    echo "r2 $t r$k start at load $l (waited $((SECONDS - q0)) s)"
    (uptime; $TE node $H/w3-morph.mjs --build $OUT/builds/bp10 --adapter $AD --engine webkit --out $OUT/r2/$t-r$k; echo "exit $?"; uptime) > $REC/r2/w3-webkit-$t-r$k.log 2>&1; done; }
est() { case $1 in ab) echo 30;; r2) echo 22;; rtrev|revst|swrev) echo 10;; edge) echo 8;; *) echo 5;; esac; }
attslot() { # runs $SUBS in order inside one slot; on a budget stop writes the rest to $REM and exits 75
  local t0=$SECONDS left=() stop= x
  echo "admitted att $E $t $(date '+%F %T') · $(uptime)"
  for x in $SUBS; do
    if [ -n "$stop" ]; then left+=("$x"); continue; fi
    if [ $(( (SECONDS - t0) / 60 + $(est $x) )) -gt 80 ]; then stop=1; left+=("$x"); continue; fi
    echo "sub $x start $(date '+%F %T') · $(uptime)"; sub_$x; echo "sub $x end $(date '+%F %T') · $(uptime)"
  done
  if [ ${#left[@]} -gt 0 ]; then echo "${left[*]}" > "$REM"; echo "budget stop; remain: ${left[*]}"; exit 75; fi
  echo "att end $(date '+%F %T') · $(uptime)"; }
export -f sub_ab sub_frz sub_revst sub_swrev sub_rtrev sub_edge sub_si sub_fs sub_heir sub_r2 est attslot

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
if has att; then
  # cr (added at 06:30, after the battery's W·d W3 read `content-remove` FAIL [window] (Q-4 (c): the flag closed 44 ms after
  # landing) at 11.35 and again in re-run 2 at 8.51): W3 `content-remove` alone, bp10 and bp8 alternating, 8 rounds, each read
  # started at load <= 11 after a wait of at most 180 s Chromium / 60 s WebKit; the witness JSON kept per read. A reading of the
  # class's rate and whether the base carries it; it turns no row (the digest's cell stands as read).
  sub_cr() { SOFT=180; [ $E = webkit ] && SOFT=60; mkdir -p $REC/cr
    for k in 1 2 3 4 5 6 7 8; do for b in bp10 bp8; do
      softload 11 $SOFT
      (uptime; $TE node $H/w3-morph.mjs --build $OUT/builds/$b --adapter $AD --engine $E --cells '^content-remove(·control)?$' --out $OUT/cr/$E-$t-$b-r$k; echo "exit $?"; uptime) > $REC/cr/w3cr-$E-$t-$b-r$k.log 2>&1
      j=$(find $OUT/cr/$E-$t-$b-r$k -name W3.json | head -1); [ -n "$j" ] && cp $j $REC/cr/w3cr-$E-$t-$b-r$k.json
    done; done; }
  est() { case $1 in ab) echo 30;; r2) echo 22;; cr) echo 14;; rtrev|revst|swrev) echo 10;; edge) echo 8;; *) echo 5;; esac; }
  export -f sub_cr est
  for e in ${ENGS:-chromium webkit}; do for t in ${THEMES:-light dark}; do
    SUBS=${SUB:-"ab cr frz revst swrev rtrev edge si fs"}; [ $t = light ] && [ -z "${SUB:-}" ] && SUBS="$SUBS heir"; [ $e = webkit ] && [ -z "${SUB:-}" ] && SUBS="$SUBS r2"
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
L "CHAIN-DONE"
