#!/bin/zsh
# P-E8 WebKit phase: ONE `guarded --exclusive webkit --timeout 90` acquisition; stages run bare inside it (stages.sh, then
# the probe's loop variant, stages-loop.sh). A second acquisition runs only the stages the 90-min cap cut (recorded).
E8=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-8/E8
echo "# $(date '+%F %T') webkit queued · load $(sysctl -n vm.loadavg)"
$HOME/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh -c "ENGINE=webkit INSIDE=1 $E8/stages.sh $* ; ENGINE=webkit INSIDE=1 $E8/stages-loop.sh"
echo "# $(date '+%F %T') webkit released · exit $? · load $(sysctl -n vm.loadavg)"
