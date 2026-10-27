#!/bin/zsh
# F5‴ sitting r2 (2026-10-27): the browser chain, in order, one heavy run at a time.
# Chromium: each stage its own guarded call (run-f5ppp.sh). WebKit: ONE `guarded --exclusive webkit` acquisition, queued
# after the Chromium phase, all WebKit stages inside it (wk-inner, no nested guard). READS=8 per probe arm (≥ 8, §P5-8.2).
S=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6/F5ppp
L=$S/r2/logs; G=~/.claude/guard/guarded
export READS=8
case ${1:-all} in
  chromium|all)
    zsh $S/run-f5ppp.sh probe-f5pp12-chromium probe-f5ppp-chromium bat-f5ppp-chromium bat-f5pp-chromium-E-1,E-4 ;|
  webkit|all)
    print -- "# webkit queued $(date '+%F %T') load $(sysctl -n vm.loadavg)"
    $G --exclusive webkit --timeout 90 -- env WK_STAGES="${WK_STAGES:-probe:f5pp12 probe:f5ppp bat:f5ppp bat:f5pp:E-1,E-4}" READS=8 zsh $S/run-f5ppp.sh wk-inner
    print -- "# webkit guarded exit $? $(date '+%F %T') load $(sysctl -n vm.loadavg)" ;;
esac
