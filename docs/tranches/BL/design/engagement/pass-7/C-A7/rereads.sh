#!/bin/zsh
# C-A7b re-reads of load-only E-4 fails (the "re-run twice" law): `ENGINE=… [INSIDE=1] rereads.sh <scene>:<n> ...`
# runs E-4 narrowed to <scene>, n times, each its own log (guarded per run unless INSIDE=1, i.e. inside the WebKit acquisition)
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-7/C-A7
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p7/C-A7b/wt
B=$WT/.c7out/builds/c7; E=${ENGINE:-chromium}
for spec in ${@}; do sc=${spec%%:*}; n=${spec##*:}
  for k in $(seq 1 $n); do
    L=$C/logs/reread-$E-$sc-$k.log; cmd=(node $H/e4-momentum.mjs --build $B --wt $WT --engine $E --out $C/json/c7-reread-$sc-$k --scenes $sc)
    if [[ -n $INSIDE ]]; then
      { echo "# $(date '+%F %T') start · load $(sysctl -n vm.loadavg)"; echo "# cmd: $cmd"; } > $L; $cmd >> $L 2>&1; rc=$?
      echo "# $(date '+%F %T') end · exit $rc · load $(sysctl -n vm.loadavg)" >> $L
    else $C/run.sh reread-$E-$sc-$k --timeout 30 -- $cmd; rc=$?; fi
    echo "$(date '+%T') reread-$E-$sc-$k exit $rc · $(grep -v '^#' $L | tail -1 | cut -c1-200)"
  done
done
