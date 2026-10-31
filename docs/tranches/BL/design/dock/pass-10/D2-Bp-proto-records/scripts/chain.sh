#!/bin/bash
# chain.sh (D2 pass 10, builder of D2-B′): one heavy run at a time; every run guarded, browser runs never --light, Playwright WebKit under
# --exclusive webkit (queued, never cancelled). Harness H8 as landed (9d12810b…), unchanged. After the pass-9 critic's chain.sh and extras3.sh.
#   pr f7     PR and F7 on the bp10 tree
#   rd        the readings of §P9-7.3 item 7, one slot per engine: the retarget A/B (bp10, bp8 alternating, 8 rounds, both themes, the critic's
#             W3 cell form), the phase sweep on bp10, the display-frame probe (slotink-crit, bp10, bp8, 3 runs), vmorph lead-remove (slotink-axis, 3 runs)
#   heir      the heir probe on the instrumented bp10
#   cost      bp10 → bp8 → fv5 alternating, 3 rounds, Chromium traced, each started at load <= 15
#   bat fmlow the H8 battery: theme slots per engine and theme, each started at load <= 20; fmlow per WebKit theme
# STEPS=<list> runs a subset.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p10/Bp-build; OUT=$B/out; WT=$B/wt
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
REC=$D/pass-10/D2-Bp-proto-records; BAT=${BATDIR:-$REC/battery}; S=$REC/scripts; GD=$HOME/.claude/guard/guarded
SI=$D/pass-8/D2-Bp-crit-records/scripts/slotink-crit.mjs; AX=$D/pass-9/D2-Bp-crit-records/seat-2/scripts/slotink-axis.mjs
NEW=${NEW:-bp10}
mkdir -p $BAT $REC/si $REC/vl $REC/ab $REC/cost $REC/PR-bp10 $REC/F7-bp10 $REC/sweep-bp10 $REC/heir
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
waitload() { local t0=$(date +%s); while [ "$(echo "$(load1) > $1" | bc)" = 1 ]; do sleep 30; done; L "admit $2 at load $(load1) (bound $1, waited $(( $(date +%s) - t0 )) s)"; }
softload() { local t0=$SECONDS; while [ "$(echo "$(load1) > $1" | bc)" = 1 ] && [ $((SECONDS - t0)) -lt ${2:-180} ]; do sleep 10; done; }
has() { case " ${STEPS:-pr f7 rd heir cost bat fmlow} " in *" $1 "*) return 0;; esac; return 1; }
export G B OUT WT D H AD REC S SI AX NEW
export -f load1 softload
L "CHAIN start (steps: ${STEPS:-all}); harness $(cd $D && find harness -type f | sort | xargs shasum -a 256 | shasum -a 256 | cut -c1-16)"
body() { # engine
  E=$1; echo "admitted $(date) $(uptime)"
  for t in light dark; do TH=""; TE=""; [ $t = dark ] && { TH="--theme dark"; TE="env DOCK_HARNESS_THEME=dark"; }
    for k in 1 2 3 4 5 6 7 8; do for b in $NEW bp8; do
      softload 11 ${SOFT:-180}
      (uptime; $TE node $H/w3-morph.mjs --build $OUT/builds/$b --adapter $AD --engine $E --cells '^retarget·(40|80|120)(·control)?$' --out $OUT/rt/$E-$t-$b-r$k; echo "exit $?"; uptime) > $REC/ab/w3rt-$E-$t-$b-r$k.log 2>&1
    done; done
    node $S/sweep.mjs --build $OUT/builds/$NEW --adapter $AD --engine $E $TH --from 40 --to 200 --step 4 --runs 4 --json $REC/sweep-bp10/$NEW-$E-$t.json > $REC/sweep-bp10/$NEW-$E-$t.log 2>&1
    for k in 1 2 3; do for b in $NEW bp8; do
      node $SI --build $OUT/builds/$b --adapter $AD --engine $E --runs 1 $TH --json $REC/si/$b-$E-$t-r$k.json >> $REC/si/si-$E-$t.log 2>&1
      node $AX --build $OUT/builds/$b --adapter $AD --engine $E --seqs vlead-remove,lead-remove --runs 1 $TH --rows --json $REC/vl/$b-$E-$t-r$k.json >> $REC/vl/vl-$E-$t.log 2>&1
    done; done
  done
  echo "body end $(date) $(uptime)"
}
export -f body
if has pr; then
  L "start PR"
  (uptime; $GD --light --timeout 10 -- node $H/prose.mjs $WT --out $OUT/pr; echo "exit $?"; uptime) > $REC/PR.log 2>&1
  find $OUT/pr -name PR.json -exec cp {} $REC/PR-bp10/PR.json \;
  L "end PR"
fi
if has f7; then
  waitload 20 "F7"
  (uptime; $GD --timeout 60 -- node $H/f7.mjs $WT --out $OUT/f7; echo "exit $?"; uptime) > $REC/F7-bp10/F7.log 2>&1
  F=$(find $OUT/f7 -name F7.json | head -1); cp $F $REC/F7-bp10/F7.json; cp $(dirname $F)/steps.json $REC/F7-bp10/ 2>/dev/null
  for s in lib demo typecheck units; do tail -40 $(dirname $F)/$s.log > $REC/F7-bp10/$s.tail.log 2>/dev/null; done
  python3 -I $S/bootsize.py $WT > $REC/F7-bp10/boot-graph.txt
  L "end F7"
fi
if has rd; then
  L "start chromium readings"; $GD --timeout 85 -- bash -c 'body chromium' > $REC/slot-rd-chromium.log 2>&1; L "end chromium readings exit $?"
  L "queue webkit readings"; SOFT=60 $GD --exclusive webkit --timeout 85 -- bash -c 'body webkit' > $REC/slot-rd-webkit.log 2>&1; L "end webkit readings exit $?"
fi
if has heir; then
  $GD --timeout 15 -- node $S/heirprobe.mjs --build $OUT/builds/${NEW}i --adapter $AD --engine chromium --json $REC/heir/$NEW-chromium.json > $REC/heir/$NEW-chromium.log 2>&1
  $GD --exclusive webkit --timeout 15 -- node $S/heirprobe.mjs --build $OUT/builds/${NEW}i --adapter $AD --engine webkit --json $REC/heir/$NEW-webkit.json > $REC/heir/$NEW-webkit.log 2>&1
  L "end heir"
fi
if has cost; then
  L "start cost"; C=$REC/cost
  for k in 1 2 3; do for b in $NEW bp8 fv5; do
    waitload 15 "cost $b r$k"
    (uptime; $GD --cpu-cores 0 --timeout 30 -- node $D/pass-2/D2-Bp-probes.mjs --build $OUT/builds/$b --adapter $AD --arm pcost,plead --engine chromium --out $C/cost-$b-chromium-r$k.json; echo "exit $?"; uptime) > $C/cost-$b-chromium-r$k.log 2>&1
  done; done
  L "end cost"
fi
if has bat; then
  for e in ${ENGS:-chromium webkit}; do for t in ${THEMES:-light dark}; do
    waitload 20 "$NEW $e $t"
    L "start $NEW $e $t"
    BUILD=$NEW ENG=$e REC=$BAT THEME=$t TMIN=90 WT=$WT bash $H/battery.sh $OUT theme >> $BAT/chain-$NEW-$e.log 2>&1
    L "end $NEW $e $t exit $?"
    # strips kept per reading (§P9-8): the slot's PNGs, by stage and run
    (cd $OUT/$e/$NEW && find . -name 'strip-*.png' | while read -r f; do n=$(echo "$f" | sed 's#^\./##; s#/runs/FM-[^/]*/#_#; s#/#_#g'); mkdir -p $REC/filmstrips/$e-$t; cp "$f" "$REC/filmstrips/$e-$t/$n"; done)
  done; done
fi
if has fmlow; then
  for t in light dark; do
    L "start fmlow webkit $t"
    BUILD=$NEW ENG=webkit REC=$BAT THEME=$t TMIN=40 bash $H/battery.sh $OUT fmlow >> $BAT/chain-$NEW-webkit.log 2>&1
    L "end fmlow webkit $t exit $?"
    (cd $OUT/webkit/$NEW && find fmlow-$t -name 'strip-*.png' | while read -r f; do n=$(echo "$f" | sed 's#/runs/FM-[^/]*/#_#; s#/#_#g'); mkdir -p $REC/filmstrips/webkit-$t; cp "$f" "$REC/filmstrips/webkit-$t/$n"; done)
  done
fi
L "CHAIN-DONE"
