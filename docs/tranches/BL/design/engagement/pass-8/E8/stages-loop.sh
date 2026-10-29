#!/bin/zsh
# P-E8 · the probe's loop variant (a record, not a deliverable): P-E8-inplace-loupe.patch + E8/probe-loop-variant.patch
# (the per-frame rest-box read kept, nothing else). Build label `probe-loop` (built 10:2x, logs/build-probe-loop.log).
# `ENGINE=… [INSIDE=1] stages-loop.sh` runs E-10 (every scene) and the idle cell on it.
E8=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-8/E8
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
P6=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p8/E8/wt
O=$WT/.e8out/builds; E=${ENGINE:-chromium}
for n in E-10 idle; do
  L=$E8/logs/probe-loop-$E-$n.log
  if [[ $n == E-10 ]]; then cmd=(node $H/e10-continuity.mjs --build $O/probe-loop --wt $WT --engine $E --out $E8/json/probe-loop); else cmd=(node $P6/C-A6/probe/ca6-probe.mjs --build $O/probe-loop --engine $E --out $E8/json/probe-loop-idle --only idle); fi
  { echo "# $(date '+%F %T') start · load $(sysctl -n vm.loadavg)"; echo "# cmd: $cmd"; } > $L
  if [[ -n $INSIDE ]]; then $cmd >> $L 2>&1; else $HOME/.claude/guard/guarded --timeout 60 -- $cmd >> $L 2>&1; fi
  echo "# $(date '+%F %T') end · exit $? · load $(sysctl -n vm.loadavg)" >> $L
  echo "probe-loop-$E-$n · $(grep -E ' (PASS|FAIL|UNMEASURED) · ' $L | tail -1 | cut -c1-200)"
done
