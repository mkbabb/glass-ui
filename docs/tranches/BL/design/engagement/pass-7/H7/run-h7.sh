#!/bin/zsh
# H7 (D5 pass 7): one stage per call. `run-h7.sh <stage> <engine>`; each log opens and closes with the 1/5/15-min load.
# Builds (build-h7.sh): head, f5ppp (F5‴), cand6 (the pass-6 candidate). Logs: logs/<stage>-<engine>.log; JSON json/.
G=/Users/mkbabb/Programming/glass-ui
H=$G/docs/tranches/BL/design/engagement/harness
R=$G/docs/tranches/BL/design/engagement/pass-7/H7
B=$G/.claude/worktrees/bl/D5/p7/H7/wt/out/builds
TR=$G/.claude/worktrees/bl/D5/p7/H7/wt/out/trees
stage=$1; e=$2; shift 2
log=$R/logs/$stage-$e.log
hdr() { echo "# H7 $stage $e · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · $*"; }
w() { node $H/$1 --engine $e --out $R/json/$stage "${@:2}"; echo "# exit $? · $(date '+%T') · load $(sysctl -n vm.loadavg)"; }
{
hdr "$@"
case $stage in
  st-*)      W=${stage#st-}; node $H/selftest.mjs --engines $e --only $W --out $R/json/selftest; echo "# selftest exit $? · $(date '+%T') · load $(sysctl -n vm.loadavg)" ;;
  clean)     for W in E-1 E-2 E-3 E-6 E-7 E-8 E-11; do f=$(node -e "import('$H/run.mjs').then(m=>console.log(m.WITNESSES.find(x=>x[0]==='$W')[1]))"); echo "## $W clean"; w $f --fixture; done
             ;;
  # HEAD re-reads, narrowed to the scenes whose cells changed
  head-e4)   w e4-momentum.mjs --build $B/head --scenes tabsdrag,sheet,sortable,carousel ;;
  head-e5)   w e5-touch.mjs --build $B/head ;;
  head-e9)   w e9-prm.mjs --build $B/head ;;
  head-e10)  w e10-continuity.mjs --build $B/head --scenes slider,slider2,clipstale,switch,checkbox,chip,accordion ;;
  head-e12)  w e12-floor.mjs --build $B/head --wt $TR/head --scenes capsule ;;
  # the pass-6 candidate (8f952538): the current construction as CK-20's plant, the arm-ii faces for the PRM plant
  cand-e9|cand-e9b)   w e9-prm.mjs --build $B/cand6 ;;
  cand-e9p)  w e9-prm.mjs --build $B/cand6 --prm-plant ;;
  cand-e10)  w e10-continuity.mjs --build $B/cand6 --scenes slider,slider2,clipstale,switch,checkbox,chip,accordion ;;
  cand-e12)  w e12-floor.mjs --build $B/cand6 --wt $TR/cand6 --scenes capsule ;;
  # F5‴: the Sheet's repeat landing with the velocity cell (§P6-8.2)
  f5-sheet*) w e4-momentum.mjs --build $B/f5ppp --scenes sheet --repeat ${1:-10} ;;
  *) echo "unknown stage $stage"; exit 2 ;;
esac
} > $log 2>&1
tail -2 $log
