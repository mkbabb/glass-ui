#!/bin/zsh
# H15 (D5 pass 15, wave 2): one stage per call, `run.sh <stage> <engine> [args]`; H14-records/run.sh's form. The caller wraps it: Chromium
# stages inside a named guarded acquisition (qrun.sh), WebKit stages inside the one `guarded --exclusive webkit` acquisition. Each log opens
# and closes with the 1/5/15-minute load and the harness hash; every cell line carries its own load. A log that exists is never overwritten.
# Stage forms:
#   <build>-e15 [args]    E-15 on a build          <build>-e14 [args]   E-14 on a build          fx-e14 [args]   E-14 on the clean fixture
#   st-E-<n> [args]       selftest.mjs --only E-<n> (the clean fixture and its plants)           fx-E-<n> [args] a witness on the clean fixture
#   rr-<build>-ce11|ca11  the pass-11 critics' exit-side probes (M17) behind the load gate, graded on the load DURING the stage (class 9):
#                         the stage waits up to GATE_S for a 1-minute load below 8; a sampler reads the load every 2 s while the probe runs;
#                         if any sample reaches 8 the stage prints UNMEASURED for every cell it read (they are not graded) and it is re-queued
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-15/H15-records
WT=$G/.claude/worktrees/bl/D5/p15/H15/wt; B=$WT/.h15out/builds
GATE_S=${GATE_S:-300}
stage=$1; e=$2; shift 2
D=$R/logs; mkdir -p $D $R/json
log=$D/$stage-$e.log
[[ $# -gt 0 ]] && log=$D/$stage-$e-$(echo "$*" | shasum | cut -c1-6).log
[[ -e $log ]] && log=${log%.log}-$(date +%H%M%S).log
typeset -A F; F=(E-1 e1-census E-2 e2-commit E-3 e3-slider E-4 e4-momentum E-5 e5-touch E-6 e6-idle E-7 e7-one-writer E-8 e8-clock E-9 e9-prm E-10 e10-continuity E-11 e11-fail-loud E-12 e12-floor E-13 e13-loupe E-14 e14-s14 E-15 e15-s15)
hh() { (cd $H && find . -type f -not -path './logs/*' -not -name .DS_Store | LC_ALL=C sort | xargs shasum | shasum | cut -c1-12); }
w() { node "$@" --engine $e --deadline 5400; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
gate8() { local n=0; while (( $(sysctl -n vm.loadavg | awk '{print ($2 >= 8)}') && n * 5 < GATE_S )); do sleep 5; n=$((n+1)); done
  local L=$(sysctl -n vm.loadavg); echo "# load gate: waited $((n*5)) s (bound $GATE_S s) for a 1-minute load below 8; now $L"
  (( $(echo "$L" | awk '{print ($2 < 8)}') )); }
{
echo "# H15 $stage $e · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(hh) · $*"
case $stage in
  rr-*)        L=${stage#rr-}; L1=${L%-c*}; K=${L##*-}
               if ! gate8; then echo "  UNMEASURED $stage · the load gate was not met in $GATE_S s: nothing ran · load $(sysctl -n vm.loadavg)"
               else S=$D/.$stage-$e-$$.load; ( while true; do echo "$(date +%T) $(sysctl -n vm.loadavg | awk '{print $2}')" >> $S; sleep 2; done ) & SP=$!
                 if [[ $K == ca11 ]]; then w $P/pass-11/C-A11/r2/scripts/ca11-probe.mjs --build $B/$L1 --label $L1 --out $R/json/$stage-$e "$@"
                 else w $P/pass-11/C-E11/scripts/ce11-probe.mjs --build $B/$L1 --label $L1 --out $R/json/$stage-$e "$@"; fi
                 kill $SP 2>/dev/null; wait $SP 2>/dev/null; MX=$(awk 'BEGIN{m=0}{if($2>m)m=$2}END{print m}' $S); NS=$(wc -l < $S | tr -d ' ')
                 echo "# class 9: the 1-minute load during the stage, sampled every 2 s: max $MX over $NS samples ($(head -1 $S | cut -d' ' -f1)-$(tail -1 $S | cut -d' ' -f1))"
                 if (( $(echo "$MX" | awk '{print ($1 >= 8)}') )); then echo "  UNMEASURED $stage · the load reached $MX during the stage (bound < 8 during every cell): no cell above is graded; re-queued"
                 else echo "  GRADED $stage · the load stayed below 8 during the stage (max $MX): the cells above are graded"; fi; rm -f $S; fi ;;
  fx-e14)      w $H/e14-s14.mjs --fixture --out $R/json/fx-e14-$e "$@" ;;
  fx-E-*)      W=E-${stage#fx-E-}; w $H/${F[$W]}.mjs --fixture --out $R/json/fx-$e "$@" ;;
  st-E-*)      W=E-${stage#st-E-}; node $H/selftest.mjs --only $W --engines $e --out $R/json/st-$W-$e "$@"; echo "# exit $? · $(date '+%F %T') · load $(sysctl -n vm.loadavg)" ;;
  *-e15)       L=${stage%-e15}; w $H/e15-s15.mjs --build $B/$L --out $R/json/$stage-$e "$@" ;;
  *-e14)       L=${stage%-e14}; w $H/e14-s14.mjs --build $B/$L --out $R/json/$stage-$e "$@" ;;
  *) echo "unknown stage $stage"; exit 2 ;;
esac
echo "# end · $(date '+%F %T') · load $(sysctl -n vm.loadavg) · harness $(hh)"
} > $log 2>&1
echo "$stage $e · $(grep -E '^E-[0-9]+ (chromium|webkit) |^[A-Za-z0-9-]+ (chromium|webkit) (PASS|FAIL|UNMEASURED|HARNESS)|UNMEASURED rr-|GRADED rr-|OK |BROKEN' $log | tail -1 | cut -c1-170) · $(grep '# exit' $log | tail -1) · ${log:t}"
