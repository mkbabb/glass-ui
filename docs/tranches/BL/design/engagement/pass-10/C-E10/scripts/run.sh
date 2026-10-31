#!/bin/zsh
# C-E10: one stage per call, `run.sh <stage> <engine> [args]`; each log opens and closes with the 1/5/15-minute load.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-10/C-E10; E10=$P/pass-10/E10
WT=$G/.claude/worktrees/bl/D5/p10/C-E10/wt; B=$WT/.ce10out/builds; PR=$R/probe/ce10-probe.mjs
stage=$1; e=$2; shift 2
log=$R/logs/$stage-$e.log
[[ $# -gt 0 ]] && log=$R/logs/$stage-$e-$(echo "$*" | shasum | cut -c1-6).log
[[ -e $log ]] && log=${log%.log}-$(date +%H%M%S).log
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor E-13 e13-loupe)
w() { node "$@" --engine $e; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
{
echo "# C-E10 $stage $e · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · $*"
case $stage in
  cand10-E-*) W=${stage#cand10-}; x=(); [[ $W == E-2 ]] && x=(--commit-arms i,ii); [[ $W == E-13 ]] && x=(--frames $R/frames/loupe/cand10)
              w $H/${F[$W]}.mjs --build $B/cand10 --wt $WT --out $R/json/cand10 $x "$@" ;;
  cand10-prmplant) w $H/e9-prm.mjs --build $B/cand10 --wt $WT --out $R/json/cand10-prmplant --prm-plant ;;
  cand10-cap)  w $H/capture.mjs --build $B/cand10 --label cand10 --frames $R/frames/cap/frames --sheets $R/frames/cap ;;
  cand10-tip)  w $P/pass-8/E8/probe/e8-probe.mjs --build $B/cand10 --out $R/json/tip --frames $R/frames/loupe/cand10 ;;
  idle-bar)    w $P/pass-6/C-A6/probe/ca6-probe.mjs --build $B/cand10 --out $R/json/idle-cand10 --only idle; w $P/pass-6/C-A6/probe/ca6-probe.mjs --build $B/cand8 --out $R/json/idle-cand8 --only idle; w $P/pass-6/C-A6/probe/ca6-probe.mjs --build $B/cand10 --out $R/json/idle-cand10b --only idle ;;
  *-glance)    L=${stage%-glance}; w $E10/glance-side.mjs --build $B/$L --out $R/json/$stage --frames $R/frames/side --label $L ;;
  *-loop)      L=${stage%-loop}; w $P/pass-9/E9/probe/e9-probe.mjs --build $B/$L --out $R/json/$stage ;;
  *-e10)       L=${stage%-e10}; w $H/e10-continuity.mjs --build $B/$L --out $R/json/$stage "$@" ;;
  *-e13)       L=${stage%-e13}; w $H/e13-loupe.mjs --build $B/$L --out $R/json/$stage "$@" ;;
  *-ce10)      L=${stage%-ce10}; w $PR --build $B/$L --label $L --out $R/json/$stage "$@" ;;
  *-ce9c)      L=${stage%-ce9c}; w $P/pass-9/C-E9/c/probe/ce9c-probe.mjs --build $B/$L --label $L --out $R/json/$stage "$@" ;;
  *-ce9)       L=${stage%-ce9}; w $P/pass-9/C-E9/probe/ce9-probe.mjs --build $B/$L --label $L --out $R/json/$stage --frames $R/frames/ce9 "$@" ;;
  *-ca9)       L=${stage%-ca9}; w $P/pass-9/C-A9/scripts/ca9-probe.mjs --build $B/$L --label $L --out $R/json/$stage --frames $R/frames/ca9 "$@" ;;
  *-crest)     L=${stage%-crest}; w $P/pass-8/C-A8/probe/ca8-probe.mjs --build $B/$L --label $L --out $R/json/$stage --only crest ;;
  build-*)     p=${stage#build-}; cd $WT; ST=src/composables/motion/engage/stage.ts; cp $ST .ce10out/stage.keep.ts; python3 $R/scripts/plants.py $WT $p && node $H/build.mjs $WT --label plant-$p --out $WT/.ce10out | tail -1 | cut -c1-120; echo "# build exit $?"; cp .ce10out/stage.keep.ts $ST; { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12 ;;
  *) echo "unknown stage $stage"; exit 2 ;;
esac
} > $log 2>&1
echo "$stage $e · $(grep -E '(PASS|FAIL|UNMEASURED|REPORT|HARNESS ERROR) · [0-9]+ ' $log | tail -1 | cut -c1-170) · $(tail -1 $log)"
