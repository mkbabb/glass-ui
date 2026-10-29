#!/bin/zsh
# P-E8 (D5 pass 8): one witness stage per call, inside the caller's guarded call:
#   run.sh <stage-name> <engine> <build-label> <witness.mjs> [witness args]
# Builds (builds.sh) live in the seat's worktree: cand8 (P-E8.patch), probe (+ P-E8-inplace-loupe.patch),
# plant-cand7 (the pass-7 construction, P-E7.patch), and the named plants. Every log opens and closes with the load.
G=/Users/mkbabb/Programming/glass-ui
H=$G/docs/tranches/BL/design/engagement/harness
R=$G/docs/tranches/BL/design/engagement/pass-8/E8
O=$G/.claude/worktrees/bl/D5/p8/E8/wt/.e8out
stage=$1; e=$2; b=$3; wit=$4; shift 4
log=$R/logs/$stage-$e.log
[[ -e $log ]] && log=$R/logs/$stage-$e-$(date +%H%M%S).log
{
echo "# P-E8 $stage $e · build $b · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · $wit $*"
case $wit in
  /*) node $wit --engine $e --build $O/builds/$b --out $R/json/$stage "$@" ;;
  *)  node $H/$wit --engine $e --build $O/builds/$b --out $R/json/$stage "$@" ;;
esac
echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"
} > $log 2>&1
grep -cE " PASS " $log | sed 's/^/PASS lines: /'; grep -E " FAIL | UNMEASURED " $log | head -40; tail -1 $log
