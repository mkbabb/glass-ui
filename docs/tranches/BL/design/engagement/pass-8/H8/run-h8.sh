#!/bin/zsh
# H8 (D5 pass 8): one stage per call, `run-h8.sh <stage> <engine> [args]`; each log opens and closes with the 1/5/15-min load.
# Builds (builds.sh): head, cand7 (the pass-7 candidate, P-E7.patch a6c82db1), plant-clipOnly, plant-chipfaint, plant-loupe6.
# Logs: logs/<stage>-<engine>.log; JSON json/<stage>/. Launched by chain-*.sh, each stage inside one guarded call.
G=/Users/mkbabb/Programming/glass-ui
H=$G/docs/tranches/BL/design/engagement/harness
R=$G/docs/tranches/BL/design/engagement/pass-8/H8
O=$G/.claude/worktrees/bl/D5/p8/H8/wt/.h8out
B=$O/builds; TR=$O/trees
stage=$1; e=$2; shift 2
log=$R/logs/$stage-$e.log
# a stage run again with other arguments keeps its earlier log: the arguments' hash names the later one
[[ $# -gt 0 ]] && log=$R/logs/$stage-$e-$(echo "$*" | shasum | cut -c1-6).log
hdr() { echo "# H8 $stage $e · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · $*"; }
w() { node $H/$1 --engine $e --out $R/json/$stage "${@:2}"; echo "# exit $? · $(date '+%T') · load $(sysctl -n vm.loadavg)"; }
NEW10=(--scenes clipstale --part vanish,feather,radius,place,film)
{
hdr "$@"
case $stage in
  st-*)      W=${stage#st-}; node $H/selftest.mjs --engines $e --only $W --out $R/json/selftest "$@"; echo "# selftest exit $? · $(date '+%T') · load $(sysctl -n vm.loadavg)" ;;
  # every witness H8 did not change, on the clean fixture (fixtures.mjs and the slider changed under them); CAP included
  clean)     for W in E-1 E-2 E-3 E-5 E-6 E-7 E-8 E-9; do f=$(node -e "import('$H/run.mjs').then(m=>console.log(m.WITNESSES.find(x=>x[0]==='$W')[1]))"); echo "## $W clean"; w $f --fixture; done
             echo "## CAP clean"; w capture.mjs --fixture ;;
  fx-*)      W=${stage#fx-}; f=$(node -e "import('$H/run.mjs').then(m=>console.log(m.WITNESSES.find(x=>x[0]==='$W')[1]))"); w $f --fixture "$@" ;;
  # the base: HEAD re-read on the changed witnesses (E-4 every scene: the fling rule changed for all; E-10 the new cells)
  head-e4)   w e4-momentum.mjs --build $B/head ;;
  head-e10)  w e10-continuity.mjs --build $B/head $NEW10 ;;
  head-e11)  w e11-fail-loud.mjs --build $B/head --scenes switch,checkbox,chip,button,slider ;;
  head-e12)  w e12-floor.mjs --build $B/head --wt $TR/head --scenes capsule ;;
  head-e13)  w e13-loupe.mjs --build $B/head --frames $R/frames ;;
  # the pass-7 candidate (a6c82db1) on every new cell: the plant P-E8 builds against
  cand-e4)   w e4-momentum.mjs --build $B/cand7 --scenes slider,sortable ;;
  # with args (`--part film`): those clip cells alone
  cand-e10)  if (( $# )); then w e10-continuity.mjs --build $B/cand7 --scenes clipstale "$@"; else w e10-continuity.mjs --build $B/cand7 $NEW10; fi ;;
  cand-e11)  w e11-fail-loud.mjs --build $B/cand7 --scenes switch,checkbox,chip,button,slider ;;
  cand-e12)  w e12-floor.mjs --build $B/cand7 --wt $TR/cand7 --scenes capsule ;;
  cand-e13)  w e13-loupe.mjs --build $B/cand7 --frames $R/frames ;;
  # library plants on cand7
  plant-clipOnly-e10)  w e10-continuity.mjs --build $B/plant-clipOnly --scenes clipstale --part vanish ;;
  plant-chipfaint-e12) w e12-floor.mjs --build $B/plant-chipfaint --wt $TR/cand7 --scenes capsule ;;
  plant-loupe6-e13)    w e13-loupe.mjs --build $B/plant-loupe6 --scenes slider ;;
  *) echo "unknown stage $stage"; exit 2 ;;
esac
} > $log 2>&1
tail -3 $log
