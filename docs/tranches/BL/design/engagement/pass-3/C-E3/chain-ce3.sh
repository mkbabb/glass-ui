#!/bin/zsh
# C-E3 queues. Chromium stages each wrap their own guarded call (run-ce3.sh); the WebKit parts queue on the one lock.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/C-E3
G=~/.claude/guard/guarded
cd $D
case $1 in
  wk) for p in a b; do print -- "# queue wk-ce3 $p $(date '+%F %T') load $(sysctl -n vm.loadavg)"; $G --exclusive webkit --timeout 90 -- zsh wk-ce3.sh $p; print -- "# wk part $p exit $? $(date '+%F %T')"; done ;;
  ch) zsh run-ce3.sh bat-veil-chromium-E-3,E-10,E-11 bat-noveil-chromium-E-3,E-10,E-11 bat-p-anchor-chromium-E-10 \
        bat-p-char-chromium-E-3 bat-p-script-chromium-E-3 bat-p-tabhand-chromium-E-3 bat-p-mod-chromium-E-3 \
        probe-veil-chromium-shots probe-noveil-chromium-shots probe-p-scrubveil-chromium probe-p-vis-chromium ce3-veil-chromium ce3-noveil-chromium \
        bat-veil-chromium-E-1,E-2,E-4,E-5,E-6,E-7,E-8,E-9 cap-veil-chromium cap-noveil-chromium ;;
esac
