#!/bin/zsh
# H12 (D5 pass 12): one stage per call, `run-h12.sh <stage> <engine> [args]`; a caller wraps it in guarded (Chromium: one guarded call per
# stage; WebKit: inside the one `guarded --exclusive webkit` acquisition, wk-queue.sh). Each log opens and closes with the 1/5/15-minute
# load and the harness hash; every cell line carries its own load. Logs logs/<stage>-<engine>[-<args hash>].log (DEV=1: logs/dev/),
# JSON json/<stage>-<engine>/.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-12/H12
WT=$G/.claude/worktrees/bl/D5/p12/H12/wt; B=$WT/.h12out/builds
stage=$1; e=$2; shift 2
D=$R/logs; [[ -n "$DEV" ]] && D=$R/logs/dev; mkdir -p $D $R/json
log=$D/$stage-$e.log
[[ $# -gt 0 ]] && log=$D/$stage-$e-$(echo "$*" | shasum | cut -c1-6).log
[[ -e $log ]] && log=${log%.log}-$(date +%H%M%S).log
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor E-13 e13-loupe)
hh() { (cd $H && find . -type f -not -path './logs/*' -not -name .DS_Store | LC_ALL=C sort | xargs shasum | shasum | cut -c1-12); }
w() { node "$@"; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
{
echo "# H12 $stage $e · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(hh) · $*"
case $stage in
  facts)    w $R/framefacts.mjs $e ;;
  fx-E-*)   W=${stage#fx-}; w $H/${F[$W]}.mjs --fixture --engine $e --out $R/json/$stage-$e "$@" ;;
  st-E-*)   W=${stage#st-}; w $H/selftest.mjs --engines $e --only $W --out $R/json/st-$W-$e "$@" ;;
  rf-*)     L=${stage#rf-}; w $R/reach-facts.mjs --build $B/$L --engine $e "$@" ;;
  cap)      w $H/capture.mjs --fixture --engine $e --out $R/json/cap-$e "$@" ;;
  clean)    w $H/run.mjs --fixture --engines $e --out $R/json/clean-$e "$@" ;;
  glance-*) L=${stage#glance-}; w $R/glance-glide.mjs --build $B/$L --engine $e --label $L --frames $R/glance "$@" ;;
  *-E-*)    L=${stage%-E-*}; W=E-${stage##*-E-}; x=(); [[ $W == E-7 ]] && x=(--wt $WT); w $H/${F[$W]}.mjs --build $B/$L --engine $e --out $R/json/$stage-$e $x "$@" ;;
  *) echo "unknown stage $stage"; exit 2 ;;
esac
echo "# end · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(hh)"
} > $log 2>&1
echo "$stage $e · $(grep -E '(PASS|FAIL|UNMEASURED|selftest:|exit)' $log | grep -E 'pass,|selftest:|# exit' | tail -2 | tr '\n' ' ' | cut -c1-220) · $log"
