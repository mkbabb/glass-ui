#!/bin/zsh
# C-A10 (D5 pass 10): one stage per call, `run-ca10.sh <stage> <engine> [args]`; each log opens and closes with the 1/5/15-minute load.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-10/C-A10; S=$R/scripts
WT=$G/.claude/worktrees/bl/D5/p10/C-A10/wt; B=$WT/.ca10out/builds
stage=$1; e=$2; shift 2
log=$R/logs/$stage-$e.log
[[ $# -gt 0 ]] && log=$R/logs/$stage-$e-$(echo "$*" | shasum | cut -c1-6).log
[[ -e $log ]] && log=${log%.log}-$(date +%H%M%S).log
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor E-13 e13-loupe)
w() { node "$@" --engine $e; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
{
echo "# C-A10 $stage $e · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · $*"
case $stage in
  cand10-E-*) W=${stage#cand10-}; x=(); [[ $W == E-2 ]] && x=(--commit-arms i,ii); [[ $W == E-13 ]] && x=(--frames $R/frames/loupe/cand10)
              w $H/${F[$W]}.mjs --build $B/cand10 --wt $WT --out $R/json/cand10 $x "$@" ;;
  cand10-prmplant) w $H/e9-prm.mjs --build $B/cand10 --wt $WT --out $R/json/cand10-prmplant --prm-plant ;;
  cand10-cap)  w $H/capture.mjs --build $B/cand10 --label cand10 --frames $R/frames/cap/cand10/frames --sheets $R/frames/cap/cand10 ;;
  cand10-tip)  w $P/pass-8/E8/probe/e8-probe.mjs --build $B/cand10 --out $R/json/tip --frames $R/frames/loupe/cand10 ;;
  *-ca6idle)   L=${stage%-ca6idle}; w $P/pass-6/C-A6/probe/ca6-probe.mjs --build $B/$L --out $R/json/idle-$L --only idle ;;
  *-ca9idle)   L=${stage%-ca9idle}; w $P/pass-9/C-A9/scripts/ca9-probe.mjs --build $B/$L --label $L --out $R/json/ca9idle-$L --only idle ;;
  cand10-ca9)  w $P/pass-9/C-A9/scripts/ca9-probe.mjs --build $B/cand10 --label cand10 --out $R/json/ca9-cand10 --frames $R/frames/ca9 --only stack,loop,flip,flipstill,zoom ;;
  cand10-ce9)  w $P/pass-9/C-E9/probe/ce9-probe.mjs --build $B/cand10 --label cand10 --out $R/json/ce9-cand10 --frames $R/frames/ce9 ;;
  cand10-ce9c) w $P/pass-9/C-E9/c/probe/ce9c-probe.mjs --build $B/cand10 --label cand10 --out $R/json/ce9c-cand10 ;;
  *-crest)     L=${stage%-crest}; w $P/pass-8/C-A8/probe/ca8-probe.mjs --build $B/$L --label $L --out $R/json/crest-$L --only crest ;;
  *-loop)      L=${stage%-loop}; w $P/pass-9/E9/probe/e9-probe.mjs --build $B/$L --out $R/json/$stage ;;
  *-ca10)      L=${stage%-ca10}; w $S/ca10-probe.mjs --build $B/$L --label $L --out $R/json/$stage --frames $R/frames/ca10 "$@" ;;
  *-e10)       L=${stage%-e10}; w $H/e10-continuity.mjs --build $B/$L --out $R/json/$stage "$@" ;;
  *-e13)       L=${stage%-e13}; w $H/e13-loupe.mjs --build $B/$L --out $R/json/$stage --frames $R/frames/loupe/$L "$@" ;;
  *-e9)        L=${stage%-e9}; w $H/e9-prm.mjs --build $B/$L --wt $WT --out $R/json/$stage "$@" ;;
  *) echo "unknown stage $stage"; exit 2 ;;
esac
} > $log 2>&1
echo "$stage $e · $(grep -E '(PASS|FAIL|UNMEASURED) · [0-9]+ pass' $log | tail -1 | cut -c1-160) · $(tail -1 $log)"
