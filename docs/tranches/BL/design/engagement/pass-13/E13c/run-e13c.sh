#!/bin/zsh
# P-E13-complete (D5 pass 13, wave c2): one stage per call, `run-e13c.sh <stage> <engine> [args]` (H13c/run-h13c.sh's form with this seat's
# paths). The caller wraps it: Chromium inside a named guarded batch (c-queue.sh), WebKit inside the one `guarded --exclusive webkit`
# acquisition (wk-queue.sh). Each log opens and closes with the 1/5/15-minute load and the harness hash; every cell line carries its own load.
# Stages: <build>-E-<n> (a witness on .e13out/builds/<build>), rr-<build>-ce11|ca11 (the exit-side re-read, load gate < 8 as H13c),
# cost (C-E11's cost cell, cand8 / cand11 / cand12 / cand13 twice), rec (rec13.mjs, the same order), paint (paint13.mjs, cand12 then cand13),
# glance-<build> (E-10 --part hg13still into E13c/glance).
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-13/E13c
WT=$G/.claude/worktrees/bl/D5/p13c/E13c/wt; B=$WT/.e13out/builds
stage=$1; e=$2; shift 2
D=$R/logs; mkdir -p $D $R/json
log=$D/$stage-$e.log
[[ $# -gt 0 ]] && log=$D/$stage-$e-$(echo "$*" | shasum | cut -c1-6).log
[[ -e $log ]] && log=${log%.log}-$(date +%H%M%S).log
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor E-13 e13-loupe)
hh() { (cd $H && find . -type f -not -path './logs/*' -not -name .DS_Store | LC_ALL=C sort | xargs shasum | shasum | cut -c1-12); }
w() { node "$@"; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
{
echo "# E13c $stage $e · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(hh) · $*"
case $stage in
  rr-*)     n=0; while (( $(sysctl -n vm.loadavg | awk '{print int($2)}') >= 8 && n < 180 )); do sleep 5; n=$((n+1)); done; echo "# load gate: waited $((n*5)) s for a 1-minute load below 8; now $(sysctl -n vm.loadavg)"
            L=${stage#rr-}; L1=${L%-c*}; K=${L##*-}; S=$P/pass-11/C-E11/scripts/ce11-probe.mjs; [[ $K == ca11 ]] && S=$P/pass-11/C-A11/r2/scripts/ca11-probe.mjs; w $S --build $B/$L1 --label $L1 --engine $e --out $R/json/$stage-$e --frames $R/glance/rr "$@" ;;
  cost)     for L in cand8 cand11 cand12 cand13 cand8 cand11 cand12 cand13; do w $P/pass-11/C-E11/scripts/ce11-probe.mjs --build $B/$L --label $L --engine $e --out $R/json/cost-$L-$e --only cost; done ;;
  rec)      for L in cand8 cand11 cand12 cand13 cand8 cand11 cand12 cand13; do w $R/rec13.mjs --build $B/$L --label $L --engine $e --out $R/json/rec-$L-$e; done ;;
  paint)    for L in cand12 cand13; do w $R/paint13.mjs --build $B/$L --label $L --engine $e --out $R/json/paint-$L-$e --frames $R/glance; done ;;
  glance-*) L=${stage#glance-}; w $H/e10-continuity.mjs --build $B/$L --engine $e --out $R/json/$stage-$e --part hg13still --frames $R/glance --label $L "$@" ;;
  *-E-*)    L=${stage%-E-*}; W=E-${stage##*-E-}; x=(); [[ $W == E-7 ]] && x=(--wt $WT); w $H/${F[$W]}.mjs --build $B/$L --engine $e --out $R/json/$stage-$e $x "$@" ;;
  *) echo "unknown stage $stage"; exit 2 ;;
esac
echo "# end · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(hh)"
} > $log 2>&1
echo "$stage $e · $(grep -E 'pass,|# exit' $log | tail -2 | tr '\n' ' ' | cut -c1-220) · $log"
