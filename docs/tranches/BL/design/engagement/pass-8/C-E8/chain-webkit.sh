#!/bin/zsh
# C-E8 WebKit phase: ONE `guarded --exclusive webkit --timeout 90` acquisition; stages run bare inside it.
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-8/C-E8
echo "# $(date '+%F %T') webkit queued · load $(sysctl -n vm.loadavg)"
$HOME/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh -c "ENGINE=webkit INSIDE=1 $C/stages.sh $*"
echo "# $(date '+%F %T') webkit released · exit $? · load $(sysctl -n vm.loadavg)"
