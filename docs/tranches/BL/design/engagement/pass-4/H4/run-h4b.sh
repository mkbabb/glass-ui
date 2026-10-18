#!/bin/zsh
# H4 resume (D5 pass 4, after the 11:57 system sleep). The review cured E-5's guard (one 90 s guard per hold) and
# dropped the `constellation` scene, so the HEAD build was rebuilt (scene app 3c135d6264f8) and every changed witness
# is re-read at HEAD on it. The caller wraps each phase in ~/.claude/guard/guarded; `wk` runs under
# `guarded --exclusive webkit`, all WebKit stages in that one admission.
#   zsh run-h4b.sh chromium | wk
set -u
H4=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-4/H4
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p4/H4/out
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p4/H4/wt
L=$H4/logs/final; J=$H4/json/final
mkdir -p $L $J/selftest $J/head
stamp() { print -- "## $(date '+%Y-%m-%d %H:%M:%S') load $(sysctl -n vm.loadavg) · $*" }
head1() { # <engine> <witness-file>
  local e=$1 w=$2 log=$L/head-$1-${2%.mjs}.log
  stamp "start head $e $w" | tee $log
  node $H/$w --build $O/builds/head --wt $W --engine $e --out $J/head >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end head $e $w" >> $log; grep -E "^E-[0-9]+ $e " $log
}
st() { # <engine> <only> [selftest args]
  local e=$1 only=$2; shift 2; local log=$L/selftest-$e-${only//,/_}${1:+-faults}.log
  stamp "selftest $e $only $*" | tee $log
  node $H/selftest.mjs --engines $e --only $only --out $J/selftest "$@" >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end selftest $e $only" >> $log; tail -4 $log | head -2
}
clean() { # <engine> <witness id>: the unchanged witness's clean fixture (the regression read of the additive fixture edits)
  local e=$1 w=$2 log=$L/clean-$1.log
  stamp "clean $e $w" | tee -a $log
  node $H/run.mjs --fixture --engines $e --only $w >> $log 2>&1; print -- "exit $? $w" >> $log
}
case ${1:-} in
  chromium)
    st chromium E-5
    head1 chromium e12-floor.mjs; head1 chromium e10-continuity.mjs; head1 chromium e1-census.mjs; head1 chromium e5-touch.mjs ;;
  wk)
    print -- "admitted $(date '+%F %T') load $(sysctl -n vm.loadavg)" | tee -a $L/wk-admission.log
    st webkit E-5
    st webkit E-12 --faults e12-wheelchain,e12-wheelrow,e12-anchorlost
    head1 webkit e12-floor.mjs; head1 webkit e10-continuity.mjs; head1 webkit e1-census.mjs; head1 webkit e5-touch.mjs
    for w in E-2 E-3 E-4 E-6 E-7 E-8 E-9 E-11; do clean webkit $w; done
    stamp "capture clean webkit" | tee -a $L/clean-webkit.log
    node $H/capture.mjs --fixture --engine webkit --out $J/cap-clean >> $L/clean-webkit.log 2>&1; print -- "cap exit $?" >> $L/clean-webkit.log
    print -- "released $(date '+%F %T') load $(sysctl -n vm.loadavg)" | tee -a $L/wk-admission.log ;;
  *) print "usage: run-h4b.sh chromium|wk" ;;
esac
