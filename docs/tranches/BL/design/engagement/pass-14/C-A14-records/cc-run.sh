#!/bin/zsh
# C-A14 (D5 pass 14, wave 4 critic): one stage per call, `run.sh <stage> <engine> [args]`, on this seat's builds. The caller wraps it:
# Chromium inside a named `guarded --timeout 90` batch (batch.sh), WebKit inside named `guarded --exclusive webkit --timeout 90` acquisitions.
# Stage forms are PE14-records/run14.sh's and pass-13/C-A13c + C-E13c's run.sh, unchanged in what they run; plus <build>-ca14 (this seat's
# attack probe, ca14-probe.mjs). Each log opens and closes with the 1/5/15-minute load and the harness hash; every cell line carries its own
# load. A log that exists is never overwritten.
# cc-run.sh (C-A14-complete, 2026-11-08): run.sh with WT moved to this completion seat's worktree (p15/CA14c) and two stage forms
# added for §P14-8.0's adds: <build>-atk2 and <build>-atk run C-E14's ce14-attack2.mjs / ce14-attack.mjs unchanged on this seat's builds.
# 2026-11-09 00:4x: <build>-ce11 and <build>-ca11 added in C-E14 run.sh's form (the parent's run.sh had none: C-4's five such stages
# printed "unknown stage" and measured nothing; they re-run whole as CX-1, CX.q).
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-14/C-A14-records
WT=$G/.claude/worktrees/bl/D5/p15/CA14c/wt; B=$WT/.ca14out/builds
S12=$P/pass-12/C-E12/scripts; A12=$P/pass-12/C-A12/scripts
GATE_S=${GATE_S:-300}
stage=$1; e=$2; shift 2
D=$R/logs; mkdir -p $D $R/json $R/frames
log=$D/$stage-$e.log
[[ $# -gt 0 ]] && log=$D/$stage-$e-$(echo "$*" | shasum | cut -c1-6).log
[[ -e $log ]] && log=${log%.log}-$(date +%H%M%S).log
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor E-13 e13-loupe E-14 e14-s14)
hh() { (cd $H && find . -type f -not -path './logs/*' -not -name .DS_Store | LC_ALL=C sort | xargs shasum | shasum | cut -c1-12); }
w() { node "$@" --engine $e --deadline 5400; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
gate8() { local n=0; while (( $(sysctl -n vm.loadavg | awk '{print ($2 >= 8)}') && n * 5 < GATE_S )); do sleep 5; n=$((n+1)); done
  local L=$(sysctl -n vm.loadavg); echo "# load gate: waited $((n*5)) s (bound $GATE_S s) for a 1-minute load below 8; now $L"
  (( $(echo "$L" | awk '{print ($2 < 8)}') )); }
{
echo "# C-A14 $stage $e · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(hh) · $*"
case $stage in
  rr-*)        L=${stage#rr-}; L1=${L%-c*}; K=${L##*-}
               if ! gate8; then echo "  UNMEASURED $stage · the load gate was not met in $GATE_S s: the exit-side cell is not graded above a 1-minute load of 8 (S14 M17's range); nothing ran · load $(sysctl -n vm.loadavg)"
               elif [[ $K == ca11 ]]; then w $P/pass-11/C-A11/r2/scripts/ca11-probe.mjs --build $B/$L1 --label $L1 --out $R/json/$stage-$e "$@"
               else w $P/pass-11/C-E11/scripts/ce11-probe.mjs --build $B/$L1 --label $L1 --out $R/json/$stage-$e "$@"; fi ;;
  paint)       for L in cand12 cand13 cand14; do w $P/pass-13/E13c/paint13.mjs --build $B/$L --label $L --out $R/json/paint-$L-$e --frames $R/frames/paint; done ;;
  cost-bar)    for L in cand8 cand11 cand12 cand13 cand14 cand8 cand11 cand12 cand13 cand14; do w $P/pass-11/C-E11/scripts/ce11-probe.mjs --build $B/$L --label $L --out $R/json/cost-$L --only cost; done ;;
  drag)        for L in cand12 cand13 cand14 cand12 cand13 cand14; do w $P/pass-13/C-E13c/ce13c-probe.mjs --build $B/$L --label $L --out $R/json/drag-$L-$e --only d10; done ;;
  glance-*)    L=${stage#glance-}; w $H/e10-continuity.mjs --build $B/$L --out $R/json/$stage-$e --part hg13still --frames $R/frames/glance --label $L "$@" ;;
  *-atk2)      L=${stage%-atk2}; w $P/pass-14/C-E14-records/ce14-attack2.mjs --build $B/$L --label $L --out $R/json/$stage-$e "$@" ;;
  *-atk)       L=${stage%-atk}; w $P/pass-14/C-E14-records/ce14-attack.mjs --build $B/$L --label $L --out $R/json/$stage-$e "$@" ;;
  *-ce11)      L=${stage%-ce11}; w $P/pass-11/C-E11/scripts/ce11-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e --frames $R/frames/ce11 "$@" ;;
  *-ca11)      L=${stage%-ca11}; w $P/pass-11/C-A11/r2/scripts/ca11-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e --frames $R/frames/ca11 "$@" ;;
  *-ca14)      L=${stage%-ca14}; w $R/ca14-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e "$@" ;;
  *-e14)       L=${stage%-e14}; w $H/e14-s14.mjs --build $B/$L --out $R/json/$stage-$e "$@" ;;
  *-hg13)      L=${stage%-hg13}; w $H/e10-continuity.mjs --build $B/$L --out $R/json/$stage-$e --part hg13 "$@" ;;
  *-ca13c)     L=${stage%-ca13c}; w $P/pass-13/C-A13c/ca13c-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e --frames $R/frames/ca13c "$@" ;;
  *-ce13c)     L=${stage%-ce13c}; w $P/pass-13/C-E13c/ce13c-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e --frames $R/frames/ce13c "$@" ;;
  *-origin)    L=${stage%-origin}; w $P/pass-12/E12/origin-cells.mjs --build $B/$L --out $R/json/$stage-$e "$@" ;;
  *-ca12)      L=${stage%-ca12}; w $A12/ca12-probe.mjs --build $B/$L --label $L --frames $R/frames/ca12 "$@" ;;
  *-ce12)      L=${stage%-ce12}; w $S12/ce12-probe.mjs --build $B/$L --out $R/json/$stage-$e "$@" ;;
  *-vals)      L=${stage%-vals}; export CE12_EASINGS='["steps(0)","cubic-bezier(1.5, 0, 0, 1)","EASE-IN","linear(0, 0.4 30%, 1)","steps(2, jump-none)","steps(1, jump-none)","ease linear","var(--spring-panel)","ease, var(--undefined)"]'
               export CE12_SETTLES='["calc(0.1s + 110ms)","210MS","2.1e2ms","min(210ms, 1s)","0.21","210ms, 300ms","-0.21s","0s","calc(210ms * var(--motion-tempo, 1))"]'
               echo "# easings $CE12_EASINGS · settles $CE12_SETTLES"; w $S12/ce12-e11.mjs --build $B/$L --out $R/json/$stage-$e --part travel "$@" ;;
  *-e11v)      L=${stage%-e11v}; source $A12/e11v-values.sh; w $A12/e11v.mjs --build $B/$L --out $R/json/$stage-$e --part travel "$@" ;;
  *-ca9idle)   L=${stage%-ca9idle}; w $P/pass-9/C-A9/scripts/ca9-probe.mjs --build $B/$L --label $L --out $R/json/ca9idle-$L-$e --only idle "$@" ;;
  *-loop)      L=${stage%-loop}; w $P/pass-9/E9/probe/e9-probe.mjs --build $B/$L --out $R/json/$stage-$e ;;
  *-prmplant)  L=${stage%-prmplant}; w $H/e9-prm.mjs --build $B/$L --wt $WT --out $R/json/$stage-$e --prm-plant ;;
  *-cap)       L=${stage%-cap}; w $H/capture.mjs --build $B/$L --label $L --frames $R/frames/cap/$L/frames-$e --sheets $R/frames/cap/$L ;;
  *-E-*)       L=${stage%-E-*}; W=E-${stage##*-E-}; x=(); [[ $W == E-7 || $W == E-12 ]] && x=(--wt $WT); [[ $W == E-2 ]] && x=(--commit-arms i,ii); [[ $W == E-13 ]] && x=(--frames $R/frames/loupe/$L)
               w $H/${F[$W]}.mjs --build $B/$L --out $R/json/$stage-$e $x "$@" ;;
  *) echo "unknown stage $stage"; exit 2 ;;
esac
echo "# end · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(hh)"
} > $log 2>&1
echo "$stage $e · $(grep -E '^[A-Za-z0-9 -]+ (chromium|webkit) (PASS|FAIL|UNMEASURED|HARNESS|REPORT)|UNMEASURED rr-' $log | tail -1 | cut -c1-170) · $(grep '# exit' $log | tail -1) · ${log:t}"
