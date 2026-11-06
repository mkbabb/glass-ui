#!/bin/zsh
# H14 (D5 pass 14, wave 2): one stage per call, `run.sh <stage> <engine> [args]`. The caller wraps it: Chromium stages inside a named guarded
# batch (batch.sh), WebKit stages inside the named `guarded --exclusive webkit` acquisitions (batch.sh with a WebKit list). Each log opens and
# closes with the 1/5/15-minute load and the harness hash; every cell line carries its own load. Logs logs/<stage>-<engine>[-<args hash>].log;
# a log that exists is never overwritten (the time is appended), and the witnesses do the same with their JSON (lib.mjs, class 6 (d)).
# Stage forms:
#   fx-E-<n> [args]        a witness on the clean fixture          st-E-<n> [args]   selftest.mjs --only E-<n> (the clean page and its plants)
#   fx-e14 [args]          E-14 on the clean fixture               fxp-<fault> [args] E-14 on one fixture plant (--fault <fault>)
#   <build>-e14 [args]     E-14 on a build                         <build>-E-<n> [args] a witness on a build (E-2 --commit-arms i,ii; E-7 --wt)
#   <build>-hg13           E-10 --part hg13 on a build (M19)       paint             E13c's paint13.mjs, cand12 then cand13 (M4, M5 in paint)
#   rr-<build>-ce11|ca11   the pass-11 critics' exit-side probes (M17) behind THE LOAD GATE (class 6 (h), completion 2 §P13c2-5 item 1): the
#                          stage waits up to GATE_S for a 1-minute load below 8; if the load never gets there it prints UNMEASURED and runs
#                          nothing (it never proceeds to a grade above its bound). The gate's wait and the load at the start are printed.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-14/H14-records
WT=$G/.claude/worktrees/bl/D5/p14/H14/wt; B=$WT/.h14out/builds
GATE_S=${GATE_S:-300}
stage=$1; e=$2; shift 2
D=$R/logs; mkdir -p $D $R/json
log=$D/$stage-$e.log
[[ $# -gt 0 ]] && log=$D/$stage-$e-$(echo "$*" | shasum | cut -c1-6).log
[[ -e $log ]] && log=${log%.log}-$(date +%H%M%S).log
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor E-13 e13-loupe E-14 e14-s14)
hh() { (cd $H && find . -type f -not -path './logs/*' -not -name .DS_Store | LC_ALL=C sort | xargs shasum | shasum | cut -c1-12); }
w() { node "$@" --engine $e --deadline 5400; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
# THE LOAD GATE (class 6 (h)): 0 when the 1-minute load is below 8 within GATE_S, else 1 (the caller then runs nothing)
gate8() { local n=0; while (( $(sysctl -n vm.loadavg | awk '{print ($2 >= 8)}') && n * 5 < GATE_S )); do sleep 5; n=$((n+1)); done
  local L=$(sysctl -n vm.loadavg); echo "# load gate: waited $((n*5)) s (bound $GATE_S s) for a 1-minute load below 8; now $L"
  (( $(echo "$L" | awk '{print ($2 < 8)}') )); }
{
echo "# H14 $stage $e · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(hh) · $*"
case $stage in
  rr-*)        L=${stage#rr-}; L1=${L%-c*}; K=${L##*-}
               if ! gate8; then echo "  UNMEASURED $stage · the load gate was not met in $GATE_S s: the exit-side cell is not graded above a 1-minute load of 8 (S14 M17's range); nothing ran · load $(sysctl -n vm.loadavg)"
               elif [[ $K == ca11 ]]; then w $P/pass-11/C-A11/r2/scripts/ca11-probe.mjs --build $B/$L1 --label $L1 --out $R/json/$stage-$e "$@"
               else w $P/pass-11/C-E11/scripts/ce11-probe.mjs --build $B/$L1 --label $L1 --out $R/json/$stage-$e "$@"; fi ;;
  paint)       for L in cand12 cand13; do w $P/pass-13/E13c/paint13.mjs --build $B/$L --label $L --out $R/json/paint-$L-$e --frames $R/frames/paint; done ;;
  fx-e14)      w $H/e14-s14.mjs --fixture --out $R/json/fx-e14-$e "$@" ;;
  dbg-e14)     E14_DEBUG=1 w $H/e14-s14.mjs --fixture --out $R/json/dbg-e14-$e "$@" ;;
  fxp-*)       Fl=${stage#fxp-}; w $H/e14-s14.mjs --fixture --fault $Fl --out $R/json/fxp-$e "$@" ;;
  fx-E-*)      W=E-${stage#fx-E-}; w $H/${F[$W]}.mjs --fixture --out $R/json/fx-$e "$@" ;;
  st-E-*)      W=E-${stage#st-E-}; node $H/selftest.mjs --only $W --engines $e --out $R/json/st-$W-$e "$@"; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" ;;
  st-cap)      node $H/selftest.mjs --only CAP --engines $e --out $R/json/st-cap-$e "$@"; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" ;;
  *-e14)       L=${stage%-e14}; w $H/e14-s14.mjs --build $B/$L --out $R/json/$stage-$e "$@" ;;
  *-hg13)      L=${stage%-hg13}; w $H/e10-continuity.mjs --build $B/$L --out $R/json/$stage-$e --part hg13 "$@" ;;
  *-E-*)       L=${stage%-E-*}; W=E-${stage##*-E-}; x=(); [[ $W == E-7 ]] && x=(--wt $WT); [[ $W == E-2 ]] && x=(--commit-arms i,ii)
               w $H/${F[$W]}.mjs --build $B/$L --out $R/json/$stage-$e $x "$@" ;;
  probe-*)     node $R/probes/${stage#probe-}.mjs $e "$@"; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" ;;
  *) echo "unknown stage $stage"; exit 2 ;;
esac
echo "# end · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(hh)"
} > $log 2>&1
echo "$stage $e · $(grep -E '^E-[0-9]+ (chromium|webkit) |^[A-Za-z0-9-]+ (chromium|webkit) (PASS|FAIL|UNMEASURED|HARNESS)|UNMEASURED rr-|selftest|OK|BROKEN' $log | tail -1 | cut -c1-170) · $(grep '# exit' $log | tail -1) · ${log:t}"
