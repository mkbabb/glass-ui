#!/bin/zsh
# C-A5 chain, in order, one heavy run at a time: the Chromium stages (one guarded call each), then ONE
# `guarded --exclusive webkit --timeout 90` acquisition for every WebKit stage, then the candidate's gates.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-5/C-A5
G=~/.claude/guard/guarded
print -- "## chain start $(date '+%F %T') load $(sysctl -n vm.loadavg)"
zsh $D/run-ca5.sh chromium
print -- "## queue webkit acquisition $(date '+%F %T') load $(sysctl -n vm.loadavg)"
$G --exclusive webkit --timeout 90 -- zsh $D/run-ca5.sh wk-inner; print -- "## webkit acquisition ended · guarded exit $? · $(date '+%F %T') load $(sysctl -n vm.loadavg)"
zsh $D/run-ca5.sh gates
print -- "## chain end $(date '+%F %T') load $(sysctl -n vm.loadavg)"
