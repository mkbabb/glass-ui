#!/bin/zsh
# C-E3: Playwright WebKit stages inside ONE `guarded --exclusive webkit` acquisition per part, queued, never skipped:
#   ~/.claude/guard/guarded --exclusive webkit --timeout 90 -- zsh wk-ce3.sh <part>
# Each witness/probe is its own node process (fresh WebKit per process; lib.mjs relaunches every 60 navigations, H3-1).
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/C-E3
cd $D
print -- "# wk-ce3 $1 admitted $(date '+%F %T') load $(sysctl -n vm.loadavg)"
# wait (inside the acquisition) for the builds stage to finish: run-ce3.sh builds ends with "worktree vs HEAD"
while ! grep -q "worktree vs HEAD (builds2)" $D/builds2.out 2>/dev/null; do sleep 10; done
while ! grep -q "worktree vs HEAD" $D/builds.out 2>/dev/null; do sleep 10; done
print -- "# builds ready $(date "+%F %T")"
case $1 in
  a) zsh run-ce3.sh bat-veil-webkit-E-3,E-10,E-11 bat-noveil-webkit-E-3,E-10,E-11 bat-p-anchor-webkit-E-10 \
       bat-p-char-webkit-E-3 bat-p-script-webkit-E-3 bat-p-tabhand-webkit-E-3 bat-p-mod-webkit-E-3 \
       probe-veil-webkit probe-noveil-webkit probe-p-scrubveil-webkit probe-p-vis-webkit ce3-veil-webkit ce3-noveil-webkit \
       bat-veil-webkit-E-1,E-2,E-4,E-5,E-6,E-7,E-8,E-9 ;;
  b) zsh run-ce3.sh cap-veil-webkit cap-noveil-webkit probe-veil-webkit-shots
     for l in veil noveil; do { print -- "# $(date "+%F %T") load $(sysctl -n vm.loadavg)"; cd $D/probe && node ce3-scroll.mjs --build /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p3/C-E3/wt/.ce3-out/builds/probe-$l --engine webkit --label $l; print -- "# exit $?"; cd $D; } > $D/logs/ce3-scroll-$l-webkit.log 2>&1; print -- "ce3-scroll $l webkit: $(grep "^ce3-scroll" $D/logs/ce3-scroll-$l-webkit.log)"; done
     { print -- "# $(date "+%F %T") load $(sysctl -n vm.loadavg)"; cd $D/probe && node ce3-rbutton.mjs --build /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p3/C-E3/wt/.ce3-out/builds/probe-veil --engine webkit --label veil; print -- "# exit $?"; cd $D; } > $D/logs/ce3-rbutton-veil-webkit.log 2>&1; print -- "rbutton webkit: $(grep "^ce3-rbutton" $D/logs/ce3-rbutton-veil-webkit.log)" ;;
  c) P3=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3; B=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p3/C-E3/wt/.ce3-out/builds
     { print -- "# $(date "+%F %T") load $(sysctl -n vm.loadavg)"; cd $P3/A3/probe && node a3-probe.mjs --build $B/veil --engine webkit --label ce3-veil; print -- "# exit $?"; } > $D/logs/a3probe-veil-webkit.log 2>&1; print -- "a3probe webkit: $(grep "^a3-probe" $D/logs/a3probe-veil-webkit.log)"
     { print -- "# $(date "+%F %T") load $(sysctl -n vm.loadavg)"; cd $P3/C-A3/probe && node ca3-probe.mjs --build $B/veil --engine webkit; print -- "# exit $?"; } > $D/logs/ca3probe-veil-webkit.log 2>&1; print -- "ca3probe webkit: done"; cd $D ;;
esac
print -- "# wk-ce3 $1 done $(date '+%F %T') load $(sysctl -n vm.loadavg)"
