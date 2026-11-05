#!/bin/zsh
# C-A13-complete (D5 pass 13, wave c3): one stage per call, `run.sh <stage> <engine> [args]`. The caller wraps it: Chromium inside a named
# guarded batch (c-batch.sh), WebKit inside the one `guarded --exclusive webkit` acquisition (wk-run.sh). Each log opens and closes with
# the 1/5/15-minute load and the harness hash; every cell line carries its own load. Logs logs/<stage>-<engine>[-<args hash>].log.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-13/C-A13c2
WT=$G/.claude/worktrees/bl/D5/p14/C-A13c2/wt; B=$WT/.ca13out/builds
stage=$1; e=$2; shift 2
D=$R/logs; mkdir -p $D $R/json $R/frames
log=$D/$stage-$e.log
[[ $# -gt 0 ]] && log=$D/$stage-$e-$(echo "$*" | shasum | cut -c1-6).log
[[ -e $log ]] && log=${log%.log}-$(date +%H%M%S).log
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor E-13 e13-loupe)
hh() { (cd $H && find . -type f -not -path './logs/*' -not -name .DS_Store | LC_ALL=C sort | xargs shasum | shasum | cut -c1-12); }
w() { node "$@" --engine $e; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
export C12_EASINGS='["EASE-IN-OUT","linear(0, 0.4 30%, 1)","steps(2, jump-none)","step-end","cubic-bezier(1.5, 0, 0, 1)","steps(0)","ease /* c */","var(--u, ease-out)","inherit","linear"]'
export C12_SETTLES='["210MS","2.1e2ms","+0.21s","calc(0.1s + 110ms)","calc(105ms * 2)","max(210ms, 0.1s)","clamp(100ms, 210ms, 1s)","calc(infinity * 1s)","/* c */ 210ms","0.21s 0.1s","-0s","1e-3s","210"]'
export CE12_EASINGS='["steps(0)","cubic-bezier(1.5, 0, 0, 1)","EASE-IN","linear(0, 0.4 30%, 1)","steps(2, jump-none)","steps(1, jump-none)","ease linear","var(--spring-panel)","ease, var(--undefined)"]'
export CE12_SETTLES='["calc(0.1s + 110ms)","210MS","2.1e2ms","min(210ms, 1s)","0.21","210ms, 300ms","-0.21s","0s","calc(210ms * var(--motion-tempo, 1))"]'
{
echo "# C-A13c $stage $e · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(hh) · $*"
case $stage in
  rr-*)        n=0; while (( $(sysctl -n vm.loadavg | awk '{print int($2)}') >= 8 && n < 180 )); do sleep 5; n=$((n+1)); done; echo "# load gate: waited $((n*5)) s for a 1-minute load below 8; now $(sysctl -n vm.loadavg)"
               L=${stage#rr-}; L1=${L%-c*}; K=${L##*-}; S=$P/pass-11/C-E11/scripts/ce11-probe.mjs; [[ $K == ca11 ]] && S=$P/pass-11/C-A11/r2/scripts/ca11-probe.mjs; w $S --build $B/$L1 --label $L1 --out $R/json/$stage-$e --frames $R/frames/rr "$@" ;;
  cost)        for L in cand8 cand11 cand12 cand13 cand8 cand11 cand12 cand13; do w $P/pass-11/C-E11/scripts/ce11-probe.mjs --build $B/$L --label $L --out $R/json/cost-$L-$e --only cost; done ;;
  *-ca13c)     L=${stage%-ca13c}; w $R/ca13c-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e --frames $R/frames/ca13c "$@" ;;
  *-origin)    L=${stage%-origin}; w $P/pass-12/E12/origin-cells.mjs --build $B/$L "$@" ;;
  *-ca12)      L=${stage%-ca12}; w $P/pass-12/C-A12/scripts/ca12-probe.mjs --build $B/$L --label $L --frames $R/frames/ca12 "$@" ;;
  *-ce12)      L=${stage%-ce12}; w $P/pass-12/C-E12/scripts/ce12-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e "$@" ;;
  *-e11v)      L=${stage%-e11v}; w $P/pass-12/C-A12/scripts/e11v.mjs --build $B/$L --out $R/json/$stage-$e --part travel "$@" ;;
  *-vals)      L=${stage%-vals}; w $P/pass-12/C-E12/scripts/ce12-e11.mjs --build $B/$L --out $R/json/$stage-$e --part travel "$@" ;;
  *-ca11)      L=${stage%-ca11}; w $P/pass-11/C-A11/r2/scripts/ca11-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e --frames $R/frames/ca11 "$@" ;;
  *-ce11)      L=${stage%-ce11}; w $P/pass-11/C-E11/scripts/ce11-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e --frames $R/frames/ce11 "$@" ;;
  *-ce9c)      L=${stage%-ce9c}; w $P/pass-9/C-E9/c/probe/ce9c-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e "$@" ;;
  *-ce9)       L=${stage%-ce9}; w $P/pass-9/C-E9/probe/ce9-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e --frames $R/frames/ce9 "$@" ;;
  *-ca9idle)   L=${stage%-ca9idle}; w $P/pass-9/C-A9/scripts/ca9-probe.mjs --build $B/$L --label $L --out $R/json/ca9idle-$L-$e --only idle ;;
  *-ca9)       L=${stage%-ca9}; w $P/pass-9/C-A9/scripts/ca9-probe.mjs --build $B/$L --label $L --out $R/json/ca9-$L-$e --frames $R/frames/ca9 "$@" ;;
  *-loop)      L=${stage%-loop}; w $P/pass-9/E9/probe/e9-probe.mjs --build $B/$L --out $R/json/$stage-$e ;;
  *-prmplant)  L=${stage%-prmplant}; w $H/e9-prm.mjs --build $B/$L --wt $WT --out $R/json/$stage-$e --prm-plant ;;
  *-cap)       L=${stage%-cap}; w $H/capture.mjs --build $B/$L --label $L --frames $R/frames/cap/$L/frames-$e --sheets $R/frames/cap/$L ;;
  *-tip)       L=${stage%-tip}; w $P/pass-8/E8/probe/e8-probe.mjs --build $B/$L --out $R/json/tip-$L-$e --frames $R/frames/loupe/$L ;;
  glance-*)    L=${stage#glance-}; w $H/e10-continuity.mjs --build $B/$L --out $R/json/$stage-$e --part hg13still --frames $R/frames/glance --label $L "$@" ;;
  *-E-*)       L=${stage%-E-*}; W=E-${stage##*-E-}; x=(); [[ $W == E-7 ]] && x=(--wt $WT); [[ $W == E-2 ]] && x=(--commit-arms i,ii); [[ $W == E-13 ]] && x=(--frames $R/frames/loupe/$L)
               w $H/${F[$W]}.mjs --build $B/$L --out $R/json/$stage-$e $x "$@" ;;
  *) echo "unknown stage $stage"; exit 2 ;;
esac
echo "# end · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(hh)"
} > $log 2>&1
echo "$stage $e · $(grep -E 'pass,|# exit' $log | tail -2 | tr '\n' ' ' | cut -c1-200) · ${log:t}"
