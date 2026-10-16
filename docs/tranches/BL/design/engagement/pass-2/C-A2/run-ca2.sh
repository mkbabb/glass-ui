#!/bin/zsh
# C-A2 (D5 pass 2 critic of P-A2): the H2 battery replayed on P-A2's two arms, every stage through the guard.
#   run-ca2.sh <label> <wt|wtg> <tag> [run.mjs args...]     e.g. run-ca2.sh light-h wt full --engines chromium
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/C-A2
B=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p2/C-A2
GUARD=~/.claude/guard/guarded
lab=$1; w=$2; tag=$3; shift 3
X=(); [[ "$*" == *webkit* ]] && X=(--exclusive webkit)
cd $H
{ echo "# $lab $tag start $(date '+%F %T') load $(sysctl -n vm.loadavg)"
  $GUARD --light $X --timeout 120 -- node run.mjs --build $B/wt/.ca2-out/builds/$lab --wt $B/$w --out $D/json/$lab-$tag --verbose "$@"
  echo "# $lab $tag end exit $? $(date '+%F %T') load $(sysctl -n vm.loadavg)"; } > $D/logs/$lab-$tag.log 2>&1
