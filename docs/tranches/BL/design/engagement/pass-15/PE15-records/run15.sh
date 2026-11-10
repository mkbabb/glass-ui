#!/bin/zsh
# P-E15 part B (D5 pass 15, wave 3): one stage per call, `run15.sh <stage> <engine> [args]`; P-E14's run14.sh and H15's run.sh on this
# seat's builds. The caller wraps it: Chromium inside a named guarded acquisition (batch15.sh), WebKit inside a named `guarded --exclusive
# webkit` acquisition. Each log opens and closes with the 1/5/15-minute load and the harness hash; every cell line carries its own load.
# A log that exists is never overwritten. Stage forms (every one resolves here; dry-run with DRY=1):
#   <build>-e15 [args]   E-15 on a build (--only M28,… for a plant's cells)    <build>-e14 [args]  E-14 on a build
#   <build>-E-<n> [args] a witness (E-2 --commit-arms i,ii; E-7, E-12 --wt)    <build>-hg13        E-10 --part hg13 (M19)
#   paint                paint13.mjs on cand13 cand14 cand15 (M4, M5 in paint) cost-bar  C-E11's CPU-per-frame cell, cand8/12/13/14/15 twice (CDP)
#   cost14               P-E14's carrier-loop and step-frame cells, cand12/13/14/15 twice
#   rec                  rec13.mjs, cand8/12/13/14/15 twice (WebKit's cost)    drag      CE13c D10, cand12/14/15 twice (Chromium CDP)
#   <build>-ca9idle      the idle bar (O-103f (1)), beside cand8 in the list    <build>-loop  e9-probe (CK-16: the loop after release)
#   glance-<build>       E-10 --part hg13still with frames (the glance)        <build>-cap   capture.mjs (CK-25's frames)
#   rr-<build>-ce11|ca11 M17's exit side behind THE LOAD GATE, graded on the load DURING the stage (class 9, H15's rule)
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-15/PE15-records
WT=$G/.claude/worktrees/bl/D5/p15/PE15/wt; B=$WT/.pe15out/builds
GATE_S=${GATE_S:-300}
stage=$1; e=$2; shift 2
D=$R/logs; mkdir -p $D $R/json $R/frames
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor E-13 e13-loupe E-14 e14-s14 E-15 e15-s15)
case $stage in rr-*-ce11|rr-*-ca11|paint|cost-bar|cost14|rec|drag|glance-*|*-e15|*-e14|*-hg13|*-ca9idle|*-loop|*-cap) ;; *-E-*) [[ -n ${F[E-${stage##*-E-}]} ]] || { echo "unknown stage $stage"; exit 2; } ;; *) echo "unknown stage $stage"; exit 2 ;; esac
if [[ -n $DRY ]]; then echo "resolves $stage $e $*"; exit 0; fi
log=$D/$stage-$e.log
[[ $# -gt 0 ]] && log=$D/$stage-$e-$(echo "$*" | shasum | cut -c1-6).log
[[ -e $log ]] && log=${log%.log}-$(date +%H%M%S).log
hh() { (cd $H && find . -type f -not -path './logs/*' -not -name .DS_Store | LC_ALL=C sort | xargs shasum | shasum | cut -c1-12); }
w() { node "$@" --engine $e --deadline 5400; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
gate8() { local n=0; while (( $(sysctl -n vm.loadavg | awk '{print ($2 >= 8)}') && n * 5 < GATE_S )); do sleep 5; n=$((n+1)); done
  local L=$(sysctl -n vm.loadavg); echo "# load gate: waited $((n*5)) s (bound $GATE_S s) for a 1-minute load below 8; now $L"
  (( $(echo "$L" | awk '{print ($2 < 8)}') )); }
{
echo "# PE15 $stage $e · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(hh) · $*"
case $stage in
  rr-*)        L=${stage#rr-}; L1=${L%-c*}; K=${L##*-}
               if ! gate8; then echo "  UNMEASURED $stage · the load gate was not met in $GATE_S s: nothing ran · load $(sysctl -n vm.loadavg)"
               else S=$D/.$stage-$e-$$.load; ( while true; do echo "$(date +%T) $(sysctl -n vm.loadavg | awk '{print $2}')" >> $S; sleep 2; done ) & SP=$!
                 if [[ $K == ca11 ]]; then w $P/pass-11/C-A11/r2/scripts/ca11-probe.mjs --build $B/$L1 --label $L1 --out $R/json/$stage-$e "$@"
                 else w $P/pass-11/C-E11/scripts/ce11-probe.mjs --build $B/$L1 --label $L1 --out $R/json/$stage-$e "$@"; fi
                 kill $SP 2>/dev/null; wait $SP 2>/dev/null; MX=$(awk 'BEGIN{m=0}{if($2>m)m=$2}END{print m}' $S); NS=$(wc -l < $S | tr -d ' ')
                 echo "# class 9: the 1-minute load during the stage, sampled every 2 s: max $MX over $NS samples"
                 if (( $(echo "$MX" | awk '{print ($1 >= 8)}') )); then echo "  UNMEASURED $stage · the load reached $MX during the stage (bound < 8 during every cell): no cell above is graded; re-queued"
                 else echo "  GRADED $stage · the load stayed below 8 during the stage (max $MX): the cells above are graded"; fi; rm -f $S; fi ;;
  paint)       for L in cand13 cand14 cand15; do w $P/pass-13/E13c/paint13.mjs --build $B/$L --label $L --out $R/json/paint-$L-$e --frames $R/frames/paint; done ;;
  cost-bar)    for L in cand8 cand12 cand13 cand14 cand15 cand8 cand12 cand13 cand14 cand15; do w $P/pass-11/C-E11/scripts/ce11-probe.mjs --build $B/$L --label $L --out $R/json/cost-$L --only cost; done ;;
  rec)         for L in cand8 cand12 cand13 cand14 cand15 cand8 cand12 cand13 cand14 cand15; do w $P/pass-13/E13c/rec13.mjs --build $B/$L --label $L --out $R/json/rec-$L-$e; done ;;
  cost14)      for L in cand12 cand13 cand14 cand15 cand12 cand13 cand14 cand15; do w $P/pass-14/PE14-records/cost14.mjs --build $B/$L --label $L --out $R/json/cost14-$L-$e; done ;;
  drag)        for L in cand12 cand14 cand15 cand12 cand14 cand15; do w $P/pass-13/C-E13c/ce13c-probe.mjs --build $B/$L --label $L --out $R/json/drag-$L-$e --only d10; done ;;
  glance-*)    L=${stage#glance-}; w $H/e10-continuity.mjs --build $B/$L --out $R/json/$stage-$e --part hg13still --frames $R/frames/glance --label $L "$@" ;;
  *-e15)       L=${stage%-e15}; w $H/e15-s15.mjs --build $B/$L --out $R/json/$stage-$e "$@" ;;
  *-e14)       L=${stage%-e14}; w $H/e14-s14.mjs --build $B/$L --out $R/json/$stage-$e "$@" ;;
  *-hg13)      L=${stage%-hg13}; w $H/e10-continuity.mjs --build $B/$L --out $R/json/$stage-$e --part hg13 "$@" ;;
  *-ca9idle)   L=${stage%-ca9idle}; w $P/pass-9/C-A9/scripts/ca9-probe.mjs --build $B/$L --label $L --out $R/json/ca9idle-$L-$e --only idle "$@" ;;
  *-loop)      L=${stage%-loop}; w $P/pass-9/E9/probe/e9-probe.mjs --build $B/$L --out $R/json/$stage-$e ;;
  *-cap)       L=${stage%-cap}; w $H/capture.mjs --build $B/$L --label $L --frames $R/frames/cap/$L/frames-$e --sheets $R/frames/cap/$L ;;
  *-E-*)       L=${stage%-E-*}; W=E-${stage##*-E-}; x=(); [[ $W == E-7 || $W == E-12 ]] && x=(--wt $WT); [[ $W == E-2 ]] && x=(--commit-arms i,ii)
               w $H/${F[$W]}.mjs --build $B/$L --out $R/json/$stage-$e $x "$@" ;;
esac
echo "# end · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(hh)"
} > $log 2>&1
echo "$stage $e · $(grep -E '^E-[0-9]+ (chromium|webkit) |^[A-Za-z0-9 -]+ (chromium|webkit) (PASS|FAIL|UNMEASURED|HARNESS|REPORT)|UNMEASURED rr-|GRADED rr-|OK |BROKEN' $log | tail -1 | cut -c1-170) · $(grep '# exit' $log | tail -1) · ${log:t}"
