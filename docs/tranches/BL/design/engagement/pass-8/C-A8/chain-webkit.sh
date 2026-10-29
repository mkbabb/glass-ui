#!/bin/zsh
# C-A8 WebKit phase: ONE `guarded --exclusive webkit --timeout 90` acquisition; stages run bare inside it (stages.sh).
# Ordered so the rows' cells come first; a second acquisition runs only what the 90-min cap cut (recorded).
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-8/C-A8
echo "# $(date '+%F %T') webkit queued · load $(sysctl -n vm.loadavg)"
$HOME/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh -c "touch $C/logs/wk-running; ENGINE=webkit INSIDE=1 $C/stages.sh $* ; ENGINE=webkit INSIDE=1 $C/stages-extra.sh feather-re feather-re; rm -f $C/logs/wk-running"
echo "# $(date '+%F %T') webkit released · exit $? · load $(sysctl -n vm.loadavg)"
rm -f $C/logs/wk-running
