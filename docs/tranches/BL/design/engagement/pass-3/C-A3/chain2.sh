#!/bin/zsh
# C-A3 chain 2: Chromium probes + capture on light; then the WebKit light battery in one exclusive acquisition.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/C-A3
A=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/A3/probe
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p3/C-A3/wt/.ca3-out/builds
G=~/.claude/guard/guarded
stamp() { print -- "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
mkdir -p $D/glance/frames
{ stamp "a3-probe light chromium"; cd $A && $G --timeout 30 -- node a3-probe.mjs --build $O/light --engine chromium --label ca3-light; print "# exit $?"; stamp end; } > $D/logs/a3probe-light-chromium.log 2>&1
{ stamp "ca3-probe light chromium"; cd $D/probe && $G --timeout 30 -- node ca3-probe.mjs --build $O/light --engine chromium; print "# exit $?"; stamp end; } > $D/logs/ca3probe-light-chromium.log 2>&1
{ stamp "capture light chromium"; cd $H && $G --timeout 60 -- node capture.mjs --build $O/light --label ca3-light --frames $D/glance/frames --sheets $D/glance --engine chromium; print "# exit $?"; stamp end; } > $D/logs/cap-light-chromium.log 2>&1
print "chromium side done $(date)"
zsh $D/run-ca3.sh bat-light-webkit-E-1,E-2,E-3,E-8,E-9,E-10,E-11
print "# chain2 done $(date '+%F %T')"
