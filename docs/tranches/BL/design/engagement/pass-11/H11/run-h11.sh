#!/bin/zsh
# H11 (D5 pass 11): one stage per call, `run-h11.sh <stage> <engine> [args]`; each log opens and closes with the 1/5/15-minute load.
# Builds (builds.sh): head, cand10, zoomcure, loudcure. Logs logs/<stage>-<engine>[-<args hash>].log; JSON json/<stage>/.
# Each stage runs inside one guarded call (chain.sh); the WebKit stages inside the one `guarded --exclusive webkit` acquisition (wk-queue.sh).
G=/Users/mkbabb/Programming/glass-ui
H=$G/docs/tranches/BL/design/engagement/harness
R=$G/docs/tranches/BL/design/engagement/pass-11/H11
WT=$G/.claude/worktrees/bl/D5/p11/H11/wt
B=$WT/.h11out/builds
stage=$1; e=$2; shift 2
log=$R/logs/$stage-$e.log
[[ $# -gt 0 ]] && log=$R/logs/$stage-$e-$(echo "$*" | shasum | cut -c1-6).log
hdr() { echo "# H11 $stage $e · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(cd $H && find . -type f -not -path './logs/*' -not -name .DS_Store | LC_ALL=C sort | xargs shasum | shasum | cut -c1-12) · $*"; }
w() { node $H/$1 --engine $e --out $R/json/$stage "${@:2}"; echo "# exit $? · $(date '+%T') · load $(sysctl -n vm.loadavg)"; }
{
hdr "$@"
case $stage in
  st-*)   W=${stage#st-}; node $H/selftest.mjs --engines $e --only $W --out $R/json/selftest "$@"; echo "# selftest exit $? · $(date '+%T') · load $(sysctl -n vm.loadavg)" ;;
  # every witness H11 did not change, on the clean fixture (fixtures.mjs's lens and travel changed under them); CAP included
  clean)  for W in E-1 E-2 E-3 E-4 E-5 E-6 E-7 E-8 E-9 E-12; do f=$(node -e "import('$H/run.mjs').then(m=>console.log(m.WITNESSES.find(x=>x[0]==='$W')[1]))"); echo "## $W clean"; w $f --fixture; done
          echo "## CAP clean"; w capture.mjs --fixture ;;
  zf)     node $R/zoomfacts.mjs --fixture --engine $e; echo "# exit $? · $(date '+%T') · load $(sysctl -n vm.loadavg)" ;;
  fx10)   w e10-continuity.mjs --fixture "$@" ;;
  fx11)   w e11-fail-loud.mjs --fixture "$@" ;;
  fx13)   w e13-loupe.mjs --fixture "$@" ;;
  # the builds on the new and changed cells: E-10's lens parts, E-11's travel, E-13's clock cells
  e10-*)  L=${stage#e10-}; w e10-continuity.mjs --build $B/$L "$@" ;;
  e11-*)  L=${stage#e11-}; w e11-fail-loud.mjs --build $B/$L "$@" ;;
  e13-*)  L=${stage#e13-}; w e13-loupe.mjs --build $B/$L --frames $R/frames/$L "$@" ;;
  glance-*) L=${stage#glance-}; node $R/glance-zoom.mjs --build $B/$L --engine $e --label $L --frames $G/docs/tranches/BL/design/engagement/pass-11/H11/glance "$@"; echo "# exit $? · $(date '+%T') · load $(sysctl -n vm.loadavg)" ;;
  *) echo "unknown stage $stage"; exit 2 ;;
esac
} > $log 2>&1
tail -2 $log
