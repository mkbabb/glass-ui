#!/bin/zsh
# H9 (D5 pass 9): one stage per call, `run-h9.sh <stage> <engine> [args]`; each log opens and closes with the 1/5/15-minute
# load. Builds (builds.sh): head, cand8 (P-E8 5dc4d930), probe (+ inplace-loupe fdccd7f4), probeloop (+ loop variant
# a6060049). Logs logs/<stage>-<engine>[-<args hash>].log; JSON json/<stage>/. Each stage runs inside one guarded call
# (chain.sh); the WebKit stages inside the one `guarded --exclusive webkit` acquisition (wk-queue.sh).
G=/Users/mkbabb/Programming/glass-ui
H=$G/docs/tranches/BL/design/engagement/harness
R=$G/docs/tranches/BL/design/engagement/pass-9/H9
B=$G/.claude/worktrees/bl/D5/p9/H9/wt/.h9out/builds
stage=$1; e=$2; shift 2
log=$R/logs/$stage-$e.log
[[ $# -gt 0 ]] && log=$R/logs/$stage-$e-$(echo "$*" | shasum | cut -c1-6).log
hdr() { echo "# H9 $stage $e · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · $*"; }
w() { node $H/$1 --engine $e --out $R/json/$stage "${@:2}"; echo "# exit $? · $(date '+%T') · load $(sysctl -n vm.loadavg)"; }
# H9's new E-10 cells: the clip row (anc, trail, glide, the two-sided feather) and the presented Dialog (dlg)
NEW10=(--scenes clipstale,presented --part anc,dlg,trail,glide,feather)
{
hdr "$@"
case $stage in
  st-*)      W=${stage#st-}; node $H/selftest.mjs --engines $e --only $W --out $R/json/selftest "$@"; echo "# selftest exit $? · $(date '+%T') · load $(sysctl -n vm.loadavg)" ;;
  # every witness H9 did not change, on the clean fixture (fixtures.mjs changed under them: the presented plate's
  # `&slider=1`, the clip row's glide, the loupe); CAP included
  clean)     for W in E-1 E-2 E-3 E-4 E-5 E-6 E-7 E-8 E-9 E-11 E-12; do f=$(node -e "import('$H/run.mjs').then(m=>console.log(m.WITNESSES.find(x=>x[0]==='$W')[1]))"); echo "## $W clean"; w $f --fixture; done
             echo "## CAP clean"; w capture.mjs --fixture ;;
  fx-*)      W=${stage#fx-}; f=$(node -e "import('$H/run.mjs').then(m=>console.log(m.WITNESSES.find(x=>x[0]==='$W')[1]))"); w $f --fixture "$@" ;;
  # the four builds on H9's changed witnesses: E-10 the new cells, E-13 whole (frames kept)
  e10-*)     L=${stage#e10-}; if (( $# )); then w e10-continuity.mjs --build $B/$L "$@"; else w e10-continuity.mjs --build $B/$L $NEW10; fi ;;
  e13-*)     L=${stage#e13-}; w e13-loupe.mjs --build $B/$L --frames $R/frames/$L "$@" ;;
  xanc-*)    L=${stage#xanc-}; if [[ $L == fixture ]]; then node $R/explore-anc.mjs --fixture --engine $e "$@"; else node $R/explore-anc.mjs --build $B/$L --engine $e "$@"; fi; echo "# exit $? · $(date '+%T') · load $(sysctl -n vm.loadavg)" ;;
  *) echo "unknown stage $stage"; exit 2 ;;
esac
} > $log 2>&1
tail -2 $log
