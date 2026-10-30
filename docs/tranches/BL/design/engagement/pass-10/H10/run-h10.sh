#!/bin/zsh
# H10 (D5 pass 10): one stage per call, `run-h10.sh <stage> <engine> [args]`; each log opens and closes with the 1/5/15-minute load.
# Builds (builds.sh): head, cand9, plant-cause, plant-noread. Logs logs/<stage>-<engine>[-<args hash>].log; JSON json/<stage>/.
# Each stage runs inside one guarded call (chain.sh); the WebKit stages inside the one `guarded --exclusive webkit` acquisition (wk-queue.sh).
G=/Users/mkbabb/Programming/glass-ui
H=$G/docs/tranches/BL/design/engagement/harness
R=$G/docs/tranches/BL/design/engagement/pass-10/H10
WT=$G/.claude/worktrees/bl/D5/p10/H10/wt
B=$WT/.h10out/builds
stage=$1; e=$2; shift 2
log=$R/logs/$stage-$e.log
[[ $# -gt 0 ]] && log=$R/logs/$stage-$e-$(echo "$*" | shasum | cut -c1-6).log
hdr() { echo "# H10 $stage $e · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · $*"; }
w() { node $H/$1 --engine $e --out $R/json/$stage "${@:2}"; echo "# exit $? · $(date '+%T') · load $(sysctl -n vm.loadavg)"; }
{
hdr "$@"
case $stage in
  st-*)   W=${stage#st-}; node $H/selftest.mjs --engines $e --only $W --out $R/json/selftest "$@"; echo "# selftest exit $? · $(date '+%T') · load $(sysctl -n vm.loadavg)" ;;
  # every witness H10 did not change, on the clean fixture (fixtures.mjs's lens changed under them); CAP included
  clean)  for W in E-1 E-2 E-3 E-4 E-5 E-6 E-8 E-9 E-11 E-12; do f=$(node -e "import('$H/run.mjs').then(m=>console.log(m.WITNESSES.find(x=>x[0]==='$W')[1]))"); echo "## $W clean"; w $f --fixture; done
          echo "## CAP clean"; w capture.mjs --fixture ;;
  fx10)   w e10-continuity.mjs --fixture "$@" ;;
  fx13)   w e13-loupe.mjs --fixture "$@" ;;
  # the builds on the new cells: E-10's lens parts, E-13's clock cells or whole
  e10-*)  L=${stage#e10-}; w e10-continuity.mjs --build $B/$L "$@" ;;
  e13-*)  L=${stage#e13-}; w e13-loupe.mjs --build $B/$L --frames $R/frames/$L "$@" ;;
  e7-*)   L=${stage#e7-}; w e7-one-writer.mjs --build $B/$L --wt $WT "$@" ;;
  *) echo "unknown stage $stage"; exit 2 ;;
esac
} > $log 2>&1
tail -2 $log
