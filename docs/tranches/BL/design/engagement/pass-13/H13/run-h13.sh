#!/bin/zsh
# H13 (D5 pass 13): one stage per call, `run-h13.sh <stage> <engine> [args]`; a caller wraps it in guarded (Chromium: one guarded call per
# stage; WebKit: inside the one `guarded --exclusive webkit` acquisition, wk-queue.sh). Each log opens and closes with the 1/5/15-minute
# load and the harness hash; every cell line carries its own load. Logs logs/<stage>-<engine>[-<args hash>].log (DEV=1: logs/dev/),
# JSON json/<stage>-<engine>/.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-13/H13
WT=$G/.claude/worktrees/bl/D5/p13/H13/wt; B=$WT/.h13out/builds
stage=$1; e=$2; shift 2
D=$R/logs; [[ -n "$DEV" ]] && D=$R/logs/dev; mkdir -p $D $R/json
log=$D/$stage-$e.log
[[ $# -gt 0 ]] && log=$D/$stage-$e-$(echo "$*" | shasum | cut -c1-6).log
[[ -e $log ]] && log=${log%.log}-$(date +%H%M%S).log
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor E-13 e13-loupe)
hh() { (cd $H && find . -type f -not -path './logs/*' -not -name .DS_Store | LC_ALL=C sort | xargs shasum | shasum | cut -c1-12); }
w() { node "$@"; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
{
echo "# H13 $stage $e · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(hh) · $*"
case $stage in
  facts)    w $R/facts13.mjs $e ;;
  rr-*)     n=0; while (( $(sysctl -n vm.loadavg | awk '{print int($2)}') >= 8 && n < 180 )); do sleep 5; n=$((n+1)); done; echo "# load gate: waited $((n*5)) s for a 1-minute load below 8; now $(sysctl -n vm.loadavg)"
            L=${stage#rr-}; L1=${L%-c*}; K=${L##*-}; S=$P/pass-11/C-E11/scripts/ce11-probe.mjs; [[ $K == ca11 ]] && S=$P/pass-11/C-A11/r2/scripts/ca11-probe.mjs; w $S --build $B/$L1 --label $L1 --engine $e --out $R/json/$stage-$e --frames $R/glance/rr "$@" ;;
  fxglance) w $H/e10-continuity.mjs --fixture --engine $e --out $R/json/fxglance-$e --part hg13still --frames $R/glance --label fixture "$@" ;;
  fx-E-*)   W=${stage#fx-}; w $H/${F[$W]}.mjs --fixture --engine $e --out $R/json/$stage-$e "$@" ;;
  st-E-*)   W=${stage#st-}; w $H/selftest.mjs --engines $e --only $W --out $R/json/st-$W-$e "$@" ;;
  cap)      w $H/capture.mjs --fixture --engine $e --out $R/json/cap-$e "$@" ;;
  clean)    w $H/run.mjs --fixture --engines $e --out $R/json/clean-$e "$@" ;;
  glance-*) L=${stage#glance-}; w $H/e10-continuity.mjs --build $B/$L --engine $e --out $R/json/$stage-$e --part hg13still --frames $R/glance --label $L "$@" ;;
  *-E-*)    L=${stage%-E-*}; W=E-${stage##*-E-}; x=(); [[ $W == E-7 ]] && x=(--wt $WT); w $H/${F[$W]}.mjs --build $B/$L --engine $e --out $R/json/$stage-$e $x "$@" ;;
  *) echo "unknown stage $stage"; exit 2 ;;
esac
echo "# end · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(hh)"
} > $log 2>&1
echo "$stage $e · $(grep -E '(PASS|FAIL|UNMEASURED|selftest:|exit)' $log | grep -E 'pass,|selftest:|# exit' | tail -2 | tr '\n' ' ' | cut -c1-220) · $log"
