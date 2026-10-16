#!/bin/zsh
# run-cp.sh <rep> [engines...]: the four bake-off cells (probe/cp.mjs) on both builds, through the guard.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/CP
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p2/CP/wt
GUARD=~/.claude/guard/guarded
R=$1; shift; ENG=(${=${*:-chromium webkit}})
mkdir -p $D/json/rep$R
xw() { [[ $1 == webkit ]] && echo "--exclusive webkit"; }
stamp() { echo "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
for e in $ENG; do for b in css waapi; do
  stamp "cp $b $e rep $R start"; $GUARD $(xw $e) --light --timeout 12 -- node $D/probe/cp.mjs --build $WT/.cp-out/builds/$b --label $b --engine $e --out $D/json/rep$R; stamp "cp $b $e rep $R end exit $?"
done
  stamp "cp css-prm $e rep $R start"; $GUARD $(xw $e) --light --timeout 8 -- node $D/probe/cp.mjs --build $WT/.cp-out/builds/css-prm --label css-prm --engine $e --cells c4 --out $D/json/rep$R; stamp "cp css-prm $e rep $R end exit $?"
done
