#!/bin/zsh
# C-E2: the H2 battery (unmodified) replayed on P-E2's builds, one run at a time, every run through the guard.
#   run-ce2.sh <build-label> <tag> <engine> [run.mjs args...]
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/C-E2
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p2/C-E2/wt
GUARD=~/.claude/guard/guarded
lab=$1; tag=$2; e=$3; shift 3
X=(); [ $e = webkit ] && X=(--exclusive webkit)
cd $H
{ echo "# $lab $tag $e start $(date '+%F %T') load $(sysctl -n vm.loadavg)"
  $GUARD $X --timeout 150 -- node run.mjs --build $W/.ce2-out/builds/$lab --wt $W --engines $e --out $D/json/$lab-$tag-$e --verbose "$@"
  echo "# $lab $tag $e end exit $? $(date '+%F %T') load $(sysctl -n vm.loadavg)"; } > $D/logs/$lab-$tag-$e.log 2>&1
