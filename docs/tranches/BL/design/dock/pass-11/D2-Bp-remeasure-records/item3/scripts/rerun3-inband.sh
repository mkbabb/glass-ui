#!/bin/bash
# rerun3-inband.sh (made from rerun3.sh; the in-band A/B's reds, ab-inband/summary.txt; records in ab-rerun-inband/): every red A/B read re-run twice, the same w3-morph form on the same
# build, cell and theme, one guarded slot per engine and theme (WebKit under --exclusive webkit), each read at load <= 11 after
# a wait of at most 180 s Chromium / 60 s WebKit (chain3.sh's rule). Reds (ab/summary.txt, ab/stub-summary.txt):
#   C·l bp8 retarget·40 [splice] r8 · W·l bp8 retarget·80 [splice] r3 · W·d bp8 retarget·80 [splice] r1 (no bp10 red)
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p11/Bp-remeasure-c; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
R=$D/pass-11/D2-Bp-remeasure-records/item3; GD=$HOME/.claude/guard/guarded
mkdir -p $R/ab-rerun-inband
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $R/chain.log; }
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
softload() { local t0=$SECONDS; while [ "$(echo "$(load1) > $1" | bc)" = 1 ] && [ $((SECONDS - t0)) -lt ${2:-180} ]; do sleep 10; done; }
export G B OUT D H AD R; export -f load1 softload
rr() { E=$1; t=$2; b=$3; c=$4; TE=""; [ $t = dark ] && TE="env DOCK_HARNESS_THEME=dark"; SOFT=180; [ $E = webkit ] && SOFT=60
  echo "admitted rr $E $t $b $c $(date '+%F %T') · $(uptime)"
  for k in 1 2; do softload 11 $SOFT
    (uptime; $TE node $H/w3-morph.mjs --build $OUT/builds/$b --adapter $AD --engine $E --cells "^$c(·control)?\$" --out $OUT/rr-inband/$E-$t-$b-$c-k$k; echo "exit $?"; uptime) > $R/ab-rerun-inband/w3rr-$E-$t-$b-$c-k$k.log 2>&1
  done; echo "rr end $(date '+%F %T') · $(uptime)"; }
export -f rr
L "RERUN3-INBAND start"
run() { X=""; [ $1 = webkit ] && X="--exclusive webkit"; L "queue rr $*"; $GD $X --timeout 60 -- bash -c "rr $*" > $R/slot-rr-inband-$1-$2-$3-$4.log 2>&1; L "end rr $* exit $?"; }
run chromium light bp8 'retarget·40'
run webkit light bp8 'retarget·80'
run webkit dark bp8 'retarget·80'
L "RERUN3-INBAND-DONE"
