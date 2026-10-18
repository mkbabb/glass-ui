#!/bin/zsh
# H4 (D5 pass 4) phases. Each phase is one process; the caller wraps it in ~/.claude/guard/guarded
# (WebKit phases under --exclusive webkit, all WebKit phases in ONE acquisition: `zsh run-h4.sh wk-all`).
#   zsh run-h4.sh <phase> [<phase> ...]
#   phases: reads-chromium  reads-webkit  st-chromium  st-webkit  wk-all
set -u
H4=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-4/H4
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p4/H4/out
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p4/H4/wt
mkdir -p $H4/logs $H4/json
stamp() { print -- "## $(date '+%Y-%m-%d %H:%M:%S') load $(sysctl -n vm.loadavg) · $*" }
one() { # <engine> <label> <witness-file> [args]
  local e=$1 l=$2 w=$3; shift 3
  local log=$H4/logs/read-$l-$e-${w%.mjs}.log
  stamp "start $l $e $w" | tee $log
  node $H/$w --build $O/builds/$l --wt $W --engine $e --out $H4/json/$l "$@" >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end $l $e $w" >> $log; tail -2 $log | head -1
}
reads() { # <engine>
  local e=$1
  one $e head e12-floor.mjs
  one $e a3light e12-floor.mjs
  one $e e3noveil e12-floor.mjs
  one $e head e10-continuity.mjs
  one $e e3noveil e10-continuity.mjs
  one $e a3light e10-continuity.mjs
  one $e head e1-census.mjs
  one $e a3light e1-census.mjs
  one $e head e5-touch.mjs
  one $e a3light e5-touch.mjs
}
reads-wk() { # the WebKit reads: HEAD on every changed witness; the off-HEAD checks that carry the new cells
  one webkit head e12-floor.mjs
  one webkit a3light e12-floor.mjs
  one webkit e3noveil e12-floor.mjs
  one webkit head e10-continuity.mjs
  one webkit a3light e10-continuity.mjs
  one webkit e3noveil e10-continuity.mjs
  one webkit head e1-census.mjs
  one webkit a3light e1-census.mjs
  one webkit head e5-touch.mjs
  stamp "ambient-probe webkit" > $H4/logs/ambient-probe-head-webkit.log
  node $H4/ambient-probe.mjs --build $O/builds/head --engine webkit >> $H4/logs/ambient-probe-head-webkit.log 2>&1; tail -4 $H4/logs/ambient-probe-head-webkit.log
}
st() { # <engine>
  local e=$1
  stamp "selftest $e start" | tee $H4/logs/selftest-$e.log
  node $H/selftest.mjs --engines $e --out $H4/json/selftest >> $H4/logs/selftest-$e.log 2>&1
  print -- "exit $?" >> $H4/logs/selftest-$e.log; stamp "selftest $e end" >> $H4/logs/selftest-$e.log; tail -3 $H4/logs/selftest-$e.log
}
for p in "$@"; do
  case $p in
    reads-chromium) reads chromium ;;
    reads-webkit) reads webkit ;;
    st-chromium) st chromium ;;
    st-webkit) st webkit ;;
    wk-all) st webkit; reads-wk ;;
    *) print "unknown phase $p" ;;
  esac
done
# acquisition 2 (the first's 2 h 07 min queue left no room for the whole WebKit self-test under the guard): the changed
# witnesses' full self-test (E-1 completed in acquisition 1: logs/selftest-webkit-acq1.log), and the unchanged
# witnesses' clean fixture plus the capture's, as the regression read of the additive fixture edits
wk2() {
  one webkit head e5-touch.mjs   # re-read: the acquisition-1 read hung at the 1500 s default deadline (logs/read-head-webkit-e5-touch-hung1500.log)
  stamp "selftest webkit acq2 start" | tee $H4/logs/selftest-webkit.log
  node $H/selftest.mjs --engines webkit --only E-5,E-10,E-12 --out $H4/json/selftest >> $H4/logs/selftest-webkit.log 2>&1
  print -- "exit $?" >> $H4/logs/selftest-webkit.log; stamp "selftest webkit acq2 end" >> $H4/logs/selftest-webkit.log
  stamp "clean fixture webkit start" | tee $H4/logs/clean-webkit.log
  node $H/run.mjs --fixture --engines webkit --only E-2,E-3,E-4,E-6,E-7,E-8,E-9,E-11 >> $H4/logs/clean-webkit.log 2>&1
  print -- "exit $?" >> $H4/logs/clean-webkit.log
  node $H/capture.mjs --fixture --engines webkit --out $H4/json/cap-clean >> $H4/logs/clean-webkit.log 2>&1
  print -- "cap exit $?" >> $H4/logs/clean-webkit.log; stamp "clean fixture webkit end" >> $H4/logs/clean-webkit.log
}
[[ "${1:-}" == wk2 ]] && wk2
# acquisition 3: what acquisition 2's 150 min ceiling cut (E-12's three MIGRATION plants), then the unchanged witnesses'
# clean fixture and the capture's, as the regression read of the additive fixture edits
wk3() {
  stamp "selftest webkit acq3 start" | tee $H4/logs/selftest-webkit-acq3.log
  node $H/selftest.mjs --engines webkit --only E-12 --faults e12-wheelchain,e12-wheelrow,e12-anchorlost --out $H4/json/selftest >> $H4/logs/selftest-webkit-acq3.log 2>&1
  print -- "exit $?" >> $H4/logs/selftest-webkit-acq3.log; stamp "selftest webkit acq3 end" >> $H4/logs/selftest-webkit-acq3.log
  stamp "clean fixture webkit start" | tee $H4/logs/clean-webkit.log
  for w in E-3 E-4 E-6 E-7 E-8 E-9 E-11 E-2; do node $H/run.mjs --fixture --engines webkit --only $w >> $H4/logs/clean-webkit.log 2>&1; stamp "clean $w done" >> $H4/logs/clean-webkit.log; done
  node $H/capture.mjs --fixture --engine webkit --out $H4/json/cap-clean >> $H4/logs/clean-webkit.log 2>&1
  print -- "cap exit $?" >> $H4/logs/clean-webkit.log; stamp "clean fixture webkit end" >> $H4/logs/clean-webkit.log
}
[[ "${1:-}" == wk3 ]] && wk3
