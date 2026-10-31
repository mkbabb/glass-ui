#!/bin/zsh
# P-E10 (D5 pass 10): one stage per call, `run-e10.sh <stage> <engine> [args]`; each log opens and closes with the 1/5/15-minute load.
# Stages: cand10-E-<n> (the whole witness), <build>-e10 / <build>-e13 (a witness on a build, with args), <build>-loop, cand10-idle, cand10-tip, cand10-prmplant, cand10-cap.
# Logs logs/<stage>-<engine>[-<args hash>].log; JSON json/<stage>/. Each stage runs in one guarded call (chain.sh), the WebKit stages in the one acquisition (wk-queue.sh).
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-10/E10
WT=$G/.claude/worktrees/bl/D5/p10/E10/wt; B=$WT/.e10out/builds
stage=$1; e=$2; shift 2
log=$R/logs/$stage-$e.log
[[ $# -gt 0 ]] && log=$R/logs/$stage-$e-$(echo "$*" | shasum | cut -c1-6).log
[[ -e $log ]] && log=${log%.log}-$(date +%H%M%S).log
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor E-13 e13-loupe)
w() { node "$@" --engine $e; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
{
echo "# P-E10 $stage $e · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · $*"
case $stage in
  cand10-E-*) W=${stage#cand10-}; x=(); [[ $W == E-2 ]] && x=(--commit-arms i,ii); [[ $W == E-13 ]] && x=(--frames $R/glance/loupe/cand10)
              w $H/${F[$W]}.mjs --build $B/cand10 --wt $WT --out $R/json/cand10 $x "$@" ;;
  cand10-prmplant) w $H/e9-prm.mjs --build $B/cand10 --wt $WT --out $R/json/cand10-prmplant --prm-plant ;;
  cand10-cap)  w $H/capture.mjs --build $B/cand10 --label cand10 --frames $R/glance/cand10/frames --sheets $R/glance/cand10; cp $R/glance/cand10/cand10-index.json $R/glance/cand10/cand10-index-$e.json 2>/dev/null ;;
  cand10-tip)  w $P/pass-8/E8/probe/e8-probe.mjs --build $B/cand10 --out $R/json/tip --frames $R/glance/loupe/cand10 ;;
  cand10-idle) w $P/pass-6/C-A6/probe/ca6-probe.mjs --build $B/cand10 --out $R/json/idle --only idle ;;
  *-glance)    L=${stage%-glance}; w $R/glance-side.mjs --build $B/$L --out $R/json/$stage --frames $R/glance/side --label $L ;;
  *-loop)      L=${stage%-loop}; w $P/pass-9/E9/probe/e9-probe.mjs --build $B/$L --out $R/json/$stage ;;
  *-e10)       L=${stage%-e10}; w $H/e10-continuity.mjs --build $B/$L --out $R/json/$stage "$@" ;;
  *-e13)       L=${stage%-e13}; w $H/e13-loupe.mjs --build $B/$L --out $R/json/$stage --frames $R/glance/loupe/$L "$@" ;;
  *) echo "unknown stage $stage"; exit 2 ;;
esac
} > $log 2>&1
echo "$stage $e · $(grep -E '(PASS|FAIL|UNMEASURED) · [0-9]+ pass' $log | tail -1 | cut -c1-160) · $(tail -1 $log)"
