#!/bin/zsh
# C-E13-complete (D5 pass 13, wave c3): one stage per call, `run.sh <stage> <engine> [args]`. The caller wraps it: Chromium inside a named
# guarded batch (c-queue.sh), WebKit inside the named `guarded --exclusive webkit` acquisitions (wk-queue.sh). Each log opens and closes
# with the 1/5/15-minute load and the harness hash; every cell line carries its own load. Logs logs/<stage>-<engine>[-<args hash>].log.
# Stage forms are C-E12's and C-A12's (pass-12/*/scripts/run.sh), on this seat's builds:
#   <build>-E-<n>   a harness witness whole (E-2 with --commit-arms i,ii, O-103d (1); E-7 with --wt; E-13 with --frames)
#   <build>-e10|e11|e13   a harness witness with args;  <build>-prmplant  E-9 with H7's PRM plant
#   <build>-ce13c   this seat's probe (ce13c-probe.mjs: held-battery.txt §3)
#   <build>-ce12|vals|stills   C-E12's probe, its value family (ce12-e11.mjs), its Dialog/rotate stills
#   <build>-ca12|e11v          C-A12's probe and value family (e11v.mjs, e11v-values.sh)
#   <build>-origin             P-E12's origin cells;  <build>-glance  H12's glide stills;  <build>-zglance  H11's zoom stills
#   <build>-ce11|ca11          the pass-11 critics' probes, unchanged;  rr-<build>-ce11|ca11  the same, exit-side, after a load gate < 8
#   <build>-ce9|ce9c|ca9|crest|tip   older critics' instruments, unchanged
#   <build>-ca9idle|ca6idle    the idle bar cells (O-103f (1): cand8 beside cand13 in the same run);  <build>-loop  e9-probe
#   <build>-cap     capture.mjs (CK-25's frames);  paint  E13c's paint13.mjs, cand12 then cand13;  h13still-<build>  E-10 hg13still
#   cost-bar        C-E11's cost cell, cand8 / cand11 / cand12 / cand13 twice (Chromium CDP);  rec  E13c's rec13.mjs, the same order
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-13/C-E13c
WT=$G/.claude/worktrees/bl/D5/p13c/C-E13c/wt; B=$WT/.ce13out/builds
S12=$P/pass-12/C-E12/scripts; A12=$P/pass-12/C-A12/scripts
stage=$1; e=$2; shift 2
D=$R/logs; mkdir -p $D $R/json
log=$D/$stage-$e.log
[[ $# -gt 0 ]] && log=$D/$stage-$e-$(echo "$*" | shasum | cut -c1-6).log
[[ -e $log ]] && log=${log%.log}-$(date +%H%M%S).log
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor E-13 e13-loupe)
hh() { (cd $H && find . -type f -not -path './logs/*' -not -name .DS_Store | LC_ALL=C sort | xargs shasum | shasum | cut -c1-12); }
w() { node "$@" --engine $e --deadline 5400; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
gate8() { n=0; while (( $(sysctl -n vm.loadavg | awk '{print int($2)}') >= 8 && n < 180 )); do sleep 5; n=$((n+1)); done; echo "# load gate: waited $((n*5)) s for a 1-minute load below 8; now $(sysctl -n vm.loadavg)"; }
export CE12_EASINGS='["steps(0)","cubic-bezier(1.5, 0, 0, 1)","EASE-IN","linear(0, 0.4 30%, 1)","steps(2, jump-none)","steps(1, jump-none)","ease linear","var(--spring-panel)","ease, var(--undefined)"]'
export CE12_SETTLES='["calc(0.1s + 110ms)","210MS","2.1e2ms","min(210ms, 1s)","0.21","210ms, 300ms","-0.21s","0s","calc(210ms * var(--motion-tempo, 1))"]'
{
echo "# C-E13c $stage $e · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(hh) · $*"
case $stage in
  rr-*)        gate8; L=${stage#rr-}; L1=${L%-c*}; K=${L##*-}; if [[ $K == ca11 ]]; then w $P/pass-11/C-A11/r2/scripts/ca11-probe.mjs --build $B/$L1 --label $L1 --out $R/json/$stage-$e "$@"; else w $P/pass-11/C-E11/scripts/ce11-probe.mjs --build $B/$L1 --label $L1 --out $R/json/$stage-$e "$@"; fi ;;
  cost-bar)    for L in cand8 cand11 cand12 cand13 cand8 cand11 cand12 cand13; do w $P/pass-11/C-E11/scripts/ce11-probe.mjs --build $B/$L --label $L --out $R/json/cost-$L --only cost; done ;;
  rec)         for L in cand8 cand12 cand13 cand8 cand12 cand13; do w $P/pass-13/E13c/rec13.mjs --build $B/$L --label $L --out $R/json/rec-$L-$e; done ;;
  paint)       for L in cand12 cand13; do w $P/pass-13/E13c/paint13.mjs --build $B/$L --label $L --out $R/json/paint-$L-$e --frames $R/frames/paint; done ;;
  h13still-*)  L=${stage#h13still-}; w $H/e10-continuity.mjs --build $B/$L --out $R/json/$stage-$e --part hg13still --frames $R/frames/h13still --label $L "$@" ;;
  *-ce13c)     L=${stage%-ce13c}; w $R/ce13c-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e --frames $R/frames/ce13c "$@" ;;
  *-prmplant)  L=${stage%-prmplant}; w $H/e9-prm.mjs --build $B/$L --wt $WT --out $R/json/$stage-$e --prm-plant ;;
  *-cap)       L=${stage%-cap}; w $H/capture.mjs --build $B/$L --label $L --frames $R/frames/cap/$L/frames-$e --sheets $R/frames/cap/$L ;;
  *-tip)       L=${stage%-tip}; w $P/pass-8/E8/probe/e8-probe.mjs --build $B/$L --out $R/json/tip-$L-$e --frames $R/frames/loupe/$L ;;
  *-ca6idle)   L=${stage%-ca6idle}; w $P/pass-6/C-A6/probe/ca6-probe.mjs --build $B/$L --out $R/json/ca6idle-$L-$e --only idle "$@" ;;
  *-ca9idle)   L=${stage%-ca9idle}; w $P/pass-9/C-A9/scripts/ca9-probe.mjs --build $B/$L --label $L --out $R/json/ca9idle-$L-$e --only idle "$@" ;;
  *-loop)      L=${stage%-loop}; w $P/pass-9/E9/probe/e9-probe.mjs --build $B/$L --out $R/json/$stage-$e ;;
  *-ce11)      L=${stage%-ce11}; w $P/pass-11/C-E11/scripts/ce11-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e --frames $R/frames/ce11 "$@" ;;
  *-ca11)      L=${stage%-ca11}; w $P/pass-11/C-A11/r2/scripts/ca11-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e --frames $R/frames/ca11 "$@" ;;
  *-ce10)      L=${stage%-ce10}; w $P/pass-10/C-E10/probe/ce10-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e "$@" ;;
  *-ce9c)      L=${stage%-ce9c}; w $P/pass-9/C-E9/c/probe/ce9c-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e "$@" ;;
  *-ce9)       L=${stage%-ce9}; w $P/pass-9/C-E9/probe/ce9-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e --frames $R/frames/ce9 "$@" ;;
  *-ca9)       L=${stage%-ca9}; w $P/pass-9/C-A9/scripts/ca9-probe.mjs --build $B/$L --label $L --out $R/json/ca9-$L-$e --frames $R/frames/ca9 "$@" ;;
  *-crest)     L=${stage%-crest}; w $P/pass-8/C-A8/probe/ca8-probe.mjs --build $B/$L --label $L --out $R/json/crest-$L-$e --only crest ;;
  *-origin)    L=${stage%-origin}; w $P/pass-12/E12/origin-cells.mjs --build $B/$L --out $R/json/$stage-$e "$@" ;;
  *-glance)    L=${stage%-glance}; w $P/pass-12/H12/glance-glide.mjs --build $B/$L --label $L --frames $R/frames/glance "$@" ;;
  *-zglance)   L=${stage%-zglance}; w $P/pass-11/H11/glance-zoom.mjs --build $B/$L --label $L --frames $R/frames/glance "$@" ;;
  *-stills)    L=${stage%-stills}; w $S12/ce12-stills.mjs --build $B/$L --label $L --frames $R/frames/glance ;;
  *-ce12)      L=${stage%-ce12}; w $S12/ce12-probe.mjs --build $B/$L --out $R/json/$stage-$e "$@" ;;
  *-vals)      L=${stage%-vals}; echo "# easings $CE12_EASINGS · settles $CE12_SETTLES"; w $S12/ce12-e11.mjs --build $B/$L --out $R/json/$stage-$e --part travel "$@" ;;
  *-ca12)      L=${stage%-ca12}; w $A12/ca12-probe.mjs --build $B/$L --label $L --frames $R/frames/ca12 "$@" ;;
  *-e11v)      L=${stage%-e11v}; source $A12/e11v-values.sh; w $A12/e11v.mjs --build $B/$L --out $R/json/$stage-$e --part travel "$@" ;;
  *-e10)       L=${stage%-e10}; w $H/e10-continuity.mjs --build $B/$L --out $R/json/$stage-$e "$@" ;;
  *-e11)       L=${stage%-e11}; w $H/e11-fail-loud.mjs --build $B/$L --out $R/json/$stage-$e "$@" ;;
  *-e13)       L=${stage%-e13}; w $H/e13-loupe.mjs --build $B/$L --out $R/json/$stage-$e --frames $R/frames/loupe/$L "$@" ;;
  *-E-*)       L=${stage%-E-*}; W=E-${stage##*-E-}; x=(); [[ $W == E-7 ]] && x=(--wt $WT); [[ $W == E-2 ]] && x=(--commit-arms i,ii); [[ $W == E-13 ]] && x=(--frames $R/frames/loupe/$L)
               w $H/${F[$W]}.mjs --build $B/$L --out $R/json/$stage-$e $x "$@" ;;
  *) echo "unknown stage $stage"; exit 2 ;;
esac
echo "# end · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(hh)"
} > $log 2>&1
echo "$stage $e · $(grep -E '(PASS|FAIL|UNMEASURED|REPORT).*[0-9]+ pass|HARNESS ERROR' $log | tail -1 | cut -c1-170) · $(grep '# exit' $log | tail -1) · ${log:t}"
