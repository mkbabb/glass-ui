#!/bin/bash
# chain3-inband.sh: chain3.sh's `ab` stage again, made by sed from chain3.sh, for the columns whose first A/B ran above the
# §P10-7.3 band (load about 6-11): each slot starts only at 1-min load <= 11 (not 20); records in ab-inband/. Both readings kept.

# chain3.sh (D2 pass 11, B′ re-measure COMPLETION seat, REGISTRY §P10-7.3 item 3; the stages of the first seat's chain.sh `rd`
# and `cost`, unchanged in form, split so each guarded slot holds one reading): one heavy run at a time; every run guarded,
# browser runs never --light, Playwright WebKit under --exclusive webkit (queued, never cancelled). Harness H8 (9d12810b…).
#   ab    per engine and theme: the retarget A/B, bp10 and bp8 alternating, 8 rounds, w3-morph cells retarget·40/80/120 (+ their
#         controls); each read starts at load <= 11 after a wait of at most 180 s Chromium / 60 s WebKit (first seat's rule)
#   si    per engine and theme: the display-frame probe (pass-8 critic's slotink-crit.mjs), bp10 and bp8 alternating, 3 runs
#   vm    per engine and theme: vmorph collapse in paint (first seat's vmstrip.mjs), bp10, 3 runs, strips kept
#   cost  bp10 → bp8 → fv5 alternating, 3 rounds, Chromium traced (pass-2 D2-Bp-probes.mjs pcost,plead), --cpu-cores 0, each at load <= 15
# STEPS / ENGS / THEMES narrow it.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p11/Bp-remeasure-c; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
R=$D/pass-11/D2-Bp-remeasure-records/item3; S1=$D/pass-11/D2-Bp-remeasure-records/scripts; GD=$HOME/.claude/guard/guarded
SI=$D/pass-8/D2-Bp-crit-records/scripts/slotink-crit.mjs
mkdir -p $R/ab-inband
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $R/chain.log; }
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
waitload() { local t0=$(date +%s); while [ "$(echo "$(load1) > $1" | bc)" = 1 ]; do sleep 30; done; L "start-gate $2 at load $(load1) (bound $1, waited $(( $(date +%s) - t0 )) s)"; }
softload() { local t0=$SECONDS; while [ "$(echo "$(load1) > $1" | bc)" = 1 ] && [ $((SECONDS - t0)) -lt ${2:-180} ]; do sleep 10; done; }
has() { case " ${STEPS:-ab si vm cost} " in *" $1 "*) return 0;; esac; return 1; }
export G B OUT D H AD R S1 SI
export -f load1 softload
L "CHAIN3-INBAND start (steps: ${STEPS:-all}); harness $(cd $D && find harness -type f | sort | xargs shasum -a 256 | shasum -a 256 | cut -c1-16)"
ab() { E=$1; t=$2; TE=""; [ $t = dark ] && TE="env DOCK_HARNESS_THEME=dark"; SOFT=180; [ $E = webkit ] && SOFT=60
  echo "admitted ab $E $t $(date '+%F %T') · $(uptime)"
  for k in 1 2 3 4 5 6 7 8; do for b in bp10 bp8; do
    softload 11 $SOFT
    (uptime; $TE node $H/w3-morph.mjs --build $OUT/builds/$b --adapter $AD --engine $E --cells '^retarget·(40|80|120)(·control)?$' --out $OUT/rt-inband/$E-$t-$b-r$k; echo "exit $?"; uptime) > $R/ab-inband/w3rt-$E-$t-$b-r$k.log 2>&1
  done; done
  echo "ab end $(date '+%F %T') · $(uptime)"; }
si() { E=$1; t=$2; TH=""; [ $t = dark ] && TH="--theme dark"
  echo "admitted si $E $t $(date '+%F %T') · $(uptime)"
  for k in 1 2 3; do for b in bp10 bp8; do
    node $SI --build $OUT/builds/$b --adapter $AD --engine $E --runs 1 $TH --json $R/si/$b-$E-$t-r$k.json >> $R/si/si-$E-$t.log 2>&1
  done; done
  echo "si end $(date '+%F %T') · $(uptime)"; }
vm() { E=$1; t=$2; TE=""; [ $t = dark ] && TE="env DOCK_HARNESS_THEME=dark"
  echo "admitted vm $E $t $(date '+%F %T') · $(uptime)"
  mkdir -p $OUT/vm/$E-$t
  $TE node $S1/vmstrip.mjs --build $OUT/builds/bp10 --adapter $AD --engine $E --runs 3 --out $OUT/vm/$E-$t --tag bp10-$E-$t --json $R/vm/bp10-$E-$t.json > $R/vm/vm-$E-$t.log 2>&1
  cp $OUT/vm/$E-$t/*.png $R/vm/ 2>/dev/null
  echo "vm end $(date '+%F %T') · $(uptime)"; }
export -f ab si vm
for st in ab si vm; do has $st || continue
  for e in ${ENGS:-chromium webkit}; do for t in ${THEMES:-light dark}; do
    waitload 11 "$st $e $t"; X=""; [ $e = webkit ] && X="--exclusive webkit"
    L "queue $st $e $t"
    $GD $X --timeout 88 -- bash -c "$st $e $t" > $R/slot-inband-$st-$e-$t.log 2>&1
    L "end $st $e $t exit $?"
  done; done
done
if has cost; then
  L "start cost"; C=$R/cost
  for k in 1 2 3; do for b in bp10 bp8 fv5; do
    waitload 15 "cost $b r$k"
    (uptime; $GD --cpu-cores 0 --timeout 30 -- node $D/pass-2/D2-Bp-probes.mjs --build $OUT/builds/$b --adapter $AD --arm pcost,plead --engine chromium --out $C/cost-$b-chromium-r$k.json; echo "exit $?"; uptime) > $C/cost-$b-chromium-r$k.log 2>&1
  done; done
  L "end cost"
fi
L "CHAIN3-INBAND-DONE"
