#!/bin/zsh
# P-E12 (D5 pass 12): one stage per call, `run-e12.sh <stage> <engine> [args]`; a caller wraps it in guarded (Chromium: one guarded
# call per stage, chain.sh; WebKit: inside the one `guarded --exclusive webkit` acquisition, wk-queue.sh). Each log opens and closes
# with the 1/5/15-minute load and the harness hash; every cell line carries its own load. Logs logs/<stage>-<engine>[-<args hash>].log
# (DEV=1: logs/dev/), JSON json/<stage>-<engine>/. Stages: <build>-E-<n> (a witness on a build; E-2 with --commit-arms i,ii, E-7 with
# --wt), cand12-prmplant, cand12-cap, cand12-tip, cand12-idle (C-A6's idle), <build>-loop (e9 loop), cost-bar (C-E11's cost cell on
# cand8 / cand11 / cand12, twice, Chromium only), glance-<build> (H12's glide stills).
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-12/E12
WT=$G/.claude/worktrees/bl/D5/p12/E12/wt; B=$WT/.e12out/builds
stage=$1; e=$2; shift 2
D=$R/logs; [[ -n "$DEV" ]] && D=$R/logs/dev; mkdir -p $D $R/json
log=$D/$stage-$e.log
[[ $# -gt 0 ]] && log=$D/$stage-$e-$(echo "$*" | shasum | cut -c1-6).log
[[ -e $log ]] && log=${log%.log}-$(date +%H%M%S).log
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor E-13 e13-loupe)
hh() { (cd $H && find . -type f -not -path './logs/*' -not -name .DS_Store | LC_ALL=C sort | xargs shasum | shasum | cut -c1-12); }
w() { node "$@" --engine $e; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
{
echo "# P-E12 $stage $e · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(hh) · $*"
case $stage in
  cand12-prmplant) w $H/e9-prm.mjs --build $B/cand12 --wt $WT --out $R/json/$stage-$e --prm-plant ;;
  cand12-cap)  w $H/capture.mjs --build $B/cand12 --label cand12 --frames $R/glance/cand12/frames --sheets $R/glance/cand12; cp $R/glance/cand12/cand12-index.json $R/glance/cand12/cand12-index-$e.json 2>/dev/null ;;
  cand12-tip)  w $P/pass-8/E8/probe/e8-probe.mjs --build $B/cand12 --out $R/json/tip-$e --frames $R/glance/loupe/cand12 ;;
  cand12-idle) w $P/pass-6/C-A6/probe/ca6-probe.mjs --build $B/cand12 --out $R/json/idle-$e --only idle ;;
  cost-bar)    for L in cand8 cand11 cand12 cand8 cand11 cand12; do w $P/pass-11/C-E11/scripts/ce11-probe.mjs --build $B/$L --label $L --out $R/json/cost-$L --only cost; done ;;
  *-loop)      L=${stage%-loop}; w $P/pass-9/E9/probe/e9-probe.mjs --build $B/$L --out $R/json/$stage-$e ;;
  glance-*)    L=${stage#glance-}; w $P/pass-12/H12/glance-glide.mjs --build $B/$L --label $L --frames $R/glance "$@" ;;
  build-*)     zsh $R/build-one.sh ${stage#build-} ;;
  origin-*)    L=${stage#origin-}; w $R/origin-cells.mjs --build $B/$L "$@" ;;
  *-E-*)       L=${stage%-E-*}; W=E-${stage##*-E-}; x=(); [[ $W == E-7 ]] && x=(--wt $WT); [[ $W == E-2 ]] && x=(--commit-arms i,ii); [[ $W == E-13 ]] && x=(--frames $R/glance/loupe/$L)
               w $H/${F[$W]}.mjs --build $B/$L --out $R/json/$stage-$e $x "$@" ;;
  *) echo "unknown stage $stage"; exit 2 ;;
esac
echo "# end · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(hh)"
} > $log 2>&1
echo "$stage $e · $(grep -E '(PASS|FAIL|UNMEASURED|REPORT).*[0-9]+ pass' $log | tail -1 | cut -c1-160) · $(grep '# exit' $log | tail -1) · ${log:t}"
