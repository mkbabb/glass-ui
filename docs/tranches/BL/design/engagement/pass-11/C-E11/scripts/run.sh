#!/bin/zsh
# C-E11 (D5 pass 11): one stage per call, `run.sh <stage> <engine> [args]`; each log opens and closes with the 1/5/15-minute load and the harness hash.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-11/C-E11; S=$R/scripts
WT=$G/.claude/worktrees/bl/D5/p11/C-E11/wt; B=$WT/.ce11out/builds
stage=$1; e=$2; shift 2
log=$R/logs/$stage-$e.log
[[ $# -gt 0 ]] && log=$R/logs/$stage-$e-$(echo "$*" | shasum | cut -c1-6).log
[[ -e $log ]] && log=${log%.log}-$(date +%H%M%S).log
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor E-13 e13-loupe)
hh() { (cd $H && find . -type f -not -path './logs/*' -not -name .DS_Store | LC_ALL=C sort | xargs shasum | shasum | cut -c1-12); }
w() { node "$@" --engine $e; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
{
echo "# C-E11 $stage $e · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(hh) · $*"
case $stage in
  cand11-E-*) W=${stage#cand11-}; x=(); [[ $W == E-2 ]] && x=(--commit-arms i,ii); [[ $W == E-13 ]] && x=(--frames $R/frames/loupe/cand11)
              w $H/${F[$W]}.mjs --build $B/cand11 --wt $WT --out $R/json/cand11 $x "$@" ;;
  cand11-prmplant) w $H/e9-prm.mjs --build $B/cand11 --wt $WT --out $R/json/cand11-prmplant --prm-plant ;;
  cand11-cap)  w $H/capture.mjs --build $B/cand11 --label cand11 --frames $R/frames/cap/frames --sheets $R/frames/cap ;;
  cand11-tip)  w $P/pass-8/E8/probe/e8-probe.mjs --build $B/cand11 --out $R/json/tip --frames $R/frames/loupe/cand11 ;;
  idle-bar)    for L in cand8 cand11 cand8 cand11; do w $P/pass-9/C-A9/scripts/ca9-probe.mjs --build $B/$L --label $L --out $R/json/ca9idle-$L --only idle; done
               for L in cand11 cand8; do w $P/pass-6/C-A6/probe/ca6-probe.mjs --build $B/$L --out $R/json/idle-$L --only idle; done ;;
  cost-bar)    for L in cand8 cand10 cand11 cand8 cand10 cand11; do w $S/ce11-probe.mjs --build $B/$L --label $L --out $R/json/cost-$L --only cost; done ;;
  *-glance)    L=${stage%-glance}; node $P/pass-11/H11/glance-zoom.mjs --build $B/$L --engine $e --label $L --frames $R/frames/glance; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" ;;
  *-ce11)      L=${stage%-ce11}; w $S/ce11-probe.mjs --build $B/$L --label $L --out $R/json/$stage --frames $R/frames/ce11 "$@" ;;
  *-ce10)      L=${stage%-ce10}; w $P/pass-10/C-E10/probe/ce10-probe.mjs --build $B/$L --label $L --out $R/json/$stage "$@" ;;
  *-ce9c)      L=${stage%-ce9c}; w $P/pass-9/C-E9/c/probe/ce9c-probe.mjs --build $B/$L --label $L --out $R/json/$stage "$@" ;;
  *-ce9)       L=${stage%-ce9}; w $P/pass-9/C-E9/probe/ce9-probe.mjs --build $B/$L --label $L --out $R/json/$stage --frames $R/frames/ce9 "$@" ;;
  *-ca9)       L=${stage%-ca9}; w $P/pass-9/C-A9/scripts/ca9-probe.mjs --build $B/$L --label $L --out $R/json/$stage --frames $R/frames/ca9 "$@" ;;
  *-crest)     L=${stage%-crest}; w $P/pass-8/C-A8/probe/ca8-probe.mjs --build $B/$L --label $L --out $R/json/$stage --only crest ;;
  *-loop)      L=${stage%-loop}; w $P/pass-9/E9/probe/e9-probe.mjs --build $B/$L --out $R/json/$stage ;;
  *-e10)       L=${stage%-e10}; w $H/e10-continuity.mjs --build $B/$L --out $R/json/$stage "$@" ;;
  *-e11)       L=${stage%-e11}; w $H/e11-fail-loud.mjs --build $B/$L --out $R/json/$stage "$@" ;;
  *-e13)       L=${stage%-e13}; w $H/e13-loupe.mjs --build $B/$L --out $R/json/$stage --frames $R/frames/loupe/$L "$@" ;;
  *-e9)        L=${stage%-e9}; w $H/e9-prm.mjs --build $B/$L --wt $WT --out $R/json/$stage "$@" ;;
  *) echo "unknown stage $stage"; exit 2 ;;
esac
echo "# end · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(hh)"
} > $log 2>&1
echo "$stage $e · $(grep -E '(PASS|FAIL|UNMEASURED|REPORT) · [0-9]+ ' $log | tail -1 | cut -c1-170) · $(tail -2 $log | head -1)"
