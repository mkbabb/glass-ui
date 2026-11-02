#!/bin/zsh
# C-E12 (D5 pass 12 critic): one stage per call, `run.sh <stage> <engine> [args]`; a caller wraps it in guarded (Chromium: one guarded
# call per stage, chain.sh; WebKit: inside the one `guarded --exclusive webkit` acquisition, wk-queue.sh). Each log opens and closes with
# the 1/5/15-minute load and the harness hash; every cell line carries its own load. Logs logs/<stage>-<engine>[-<args hash>].log (DEV=1:
# logs/dev/), JSON json/<stage>-<engine>/.
# Stages:  <build>-E-<n>       a harness witness whole on a build (E-2 with --commit-arms i,ii; E-7 with --wt; E-13 with --frames)
#          <build>-e10|e11|e13 a harness witness with args (--part, --scenes)
#          <build>-prmplant    E-9 with H7's PRM plant;  cand12-cap, cand12-tip
#          <build>-ca6idle     C-A6's idle cell;  <build>-ca9idle  C-A9's idle cell (O-103f (1): cand8 beside cand12, same run)
#          <build>-loop        e9-probe (the loop stops at release)
#          <build>-ce11|ca11   the pass-11 critics' probes, unchanged, on a build (every path either found)
#          <build>-ce9|ce9c|ca9|ce10|crest   older critics' instruments, unchanged
#          <build>-ce12        this seat's probe (scripts/ce12-probe.mjs)
#          <build>-vals        the harness's own E-11 travel cells on the value family past H12 (scripts/ce12-e11.mjs; env below)
#          cost-bar            C-E11's cost cell, cand8 / cand11 / cand12 twice (Chromium CDP)
#          <build>-glance      H12's glide stills;  <build>-zglance  H11's zoom stills
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-12/C-E12; S=$R/scripts
WT=$G/.claude/worktrees/bl/D5/p12/C-E12/wt; B=$WT/.ce12out/builds
stage=$1; e=$2; shift 2
D=$R/logs; [[ -n "$DEV" ]] && D=$R/logs/dev; mkdir -p $D $R/json
log=$D/$stage-$e.log
[[ $# -gt 0 ]] && log=$D/$stage-$e-$(echo "$*" | shasum | cut -c1-6).log
[[ -e $log ]] && log=${log%.log}-$(date +%H%M%S).log
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor E-13 e13-loupe)
hh() { (cd $H && find . -type f -not -path './logs/*' -not -name .DS_Store | LC_ALL=C sort | xargs shasum | shasum | cut -c1-12); }
w() { node "$@" --engine $e; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
export CE12_EASINGS='["steps(0)","cubic-bezier(1.5, 0, 0, 1)","EASE-IN","linear(0, 0.4 30%, 1)","steps(2, jump-none)","steps(1, jump-none)","ease linear","var(--spring-panel)","ease, var(--undefined)"]'
export CE12_SETTLES='["calc(0.1s + 110ms)","210MS","2.1e2ms","min(210ms, 1s)","0.21","210ms, 300ms","-0.21s","0s","calc(210ms * var(--motion-tempo, 1))"]'
{
echo "# C-E12 $stage $e · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(hh) · $*"
case $stage in
  batch*)      # several stages inside this ONE guarded call (one heavy run; fewer admission waits under load): the list scripts/<name>.txt,
               # its done file logs/<name>.done; no stage starts after 65 min, so the chain's 75-min timeout never cuts one; stages left stay
               # in the list for the next batch line
               nm=${stage%-ca11}; nm=${nm#batch-}; df=$R/logs/$nm.done; touch $df; T0=$(date +%s)
               while true; do ln=$(grep -v '^#' $S/$nm.txt | grep -v '^\s*$' | grep -vxF -f $df | head -1); [[ -z $ln ]] && break
                 (( ($(date +%s) - T0) / 60 >= 65 )) && { echo "# batch $nm stop at 65 min"; break; }
                 echo "# $(date '+%T') batch start: $ln · load $(sysctl -n vm.loadavg)"; zsh $S/run.sh ${=ln}; echo "$ln" >> $df; done ;;
  *-prmplant)  L=${stage%-prmplant}; w $H/e9-prm.mjs --build $B/$L --wt $WT --out $R/json/$stage-$e --prm-plant ;;
  cand12-cap)  w $H/capture.mjs --build $B/cand12 --label cand12 --frames $R/frames/cap/frames --sheets $R/frames/cap; cp $R/frames/cap/cand12-index.json $R/frames/cap/cand12-index-$e.json 2>/dev/null ;;
  cand12-tip)  w $P/pass-8/E8/probe/e8-probe.mjs --build $B/cand12 --out $R/json/tip-$e --frames $R/frames/loupe/cand12 ;;
  *-ca6idle)   L=${stage%-ca6idle}; w $P/pass-6/C-A6/probe/ca6-probe.mjs --build $B/$L --out $R/json/$stage-$e --only idle ;;
  *-ca9idle)   L=${stage%-ca9idle}; w $P/pass-9/C-A9/scripts/ca9-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e --only idle ;;
  cost-bar)    for L in cand8 cand11 cand12 cand8 cand11 cand12; do w $P/pass-11/C-E11/scripts/ce11-probe.mjs --build $B/$L --label $L --out $R/json/cost-$L --only cost; done ;;
  *-loop)      L=${stage%-loop}; w $P/pass-9/E9/probe/e9-probe.mjs --build $B/$L --out $R/json/$stage-$e ;;
  *-glance)    L=${stage%-glance}; w $P/pass-12/H12/glance-glide.mjs --build $B/$L --label $L --frames $R/frames/glance "$@" ;;
  *-zglance)   L=${stage%-zglance}; w $P/pass-11/H11/glance-zoom.mjs --build $B/$L --label $L --frames $R/frames/glance "$@" ;;
  *-ce11)      L=${stage%-ce11}; w $P/pass-11/C-E11/scripts/ce11-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e --frames $R/frames/ce11 "$@" ;;
  *-ca11)      L=${stage%-ca11}; w $P/pass-11/C-A11/r2/scripts/ca11-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e --frames $R/frames/ca11 "$@" ;;
  *-ce10)      L=${stage%-ce10}; w $P/pass-10/C-E10/probe/ce10-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e "$@" ;;
  *-ce9c)      L=${stage%-ce9c}; w $P/pass-9/C-E9/c/probe/ce9c-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e "$@" ;;
  *-ce9)       L=${stage%-ce9}; w $P/pass-9/C-E9/probe/ce9-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e --frames $R/frames/ce9 "$@" ;;
  *-ca9)       L=${stage%-ca9}; w $P/pass-9/C-A9/scripts/ca9-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e --frames $R/frames/ca9 "$@" ;;
  *-crest)     L=${stage%-crest}; w $P/pass-8/C-A8/probe/ca8-probe.mjs --build $B/$L --label $L --out $R/json/$stage-$e --only crest ;;
  *-origin)    L=${stage%-origin}; w $P/pass-12/E12/origin-cells.mjs --build $B/$L --out $R/json/$stage-$e "$@" ;;
  *-stills)    L=${stage%-stills}; w $S/ce12-stills.mjs --build $B/$L --label $L --frames $R/frames/glance ;;
  *-ce12)      L=${stage%-ce12}; w $S/ce12-probe.mjs --build $B/$L --out $R/json/$stage-$e "$@" ;;
  *-vals)      L=${stage%-vals}; echo "# easings $CE12_EASINGS · settles $CE12_SETTLES"; w $S/ce12-e11.mjs --build $B/$L --out $R/json/$stage-$e --part travel "$@" ;;
  *-e10)       L=${stage%-e10}; w $H/e10-continuity.mjs --build $B/$L --out $R/json/$stage-$e "$@" ;;
  *-e11)       L=${stage%-e11}; w $H/e11-fail-loud.mjs --build $B/$L --out $R/json/$stage-$e "$@" ;;
  *-e13)       L=${stage%-e13}; w $H/e13-loupe.mjs --build $B/$L --out $R/json/$stage-$e --frames $R/frames/loupe/$L "$@" ;;
  *-e9)        L=${stage%-e9}; w $H/e9-prm.mjs --build $B/$L --wt $WT --out $R/json/$stage-$e "$@" ;;
  *-E-*)       L=${stage%-E-*}; W=E-${stage##*-E-}; x=(); [[ $W == E-7 ]] && x=(--wt $WT); [[ $W == E-2 ]] && x=(--commit-arms i,ii); [[ $W == E-13 ]] && x=(--frames $R/frames/loupe/$L)
               w $H/${F[$W]}.mjs --build $B/$L --out $R/json/$stage-$e $x "$@" ;;
  *) echo "unknown stage $stage"; exit 2 ;;
esac
echo "# end · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(hh)"
} > $log 2>&1
echo "$stage $e · $(grep -E '(PASS|FAIL|UNMEASURED|REPORT).*[0-9]+ pass' $log | tail -1 | cut -c1-160) · $(grep '# exit' $log | tail -1) · ${log:t}"
