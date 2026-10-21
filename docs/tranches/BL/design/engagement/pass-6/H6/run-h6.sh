#!/bin/zsh
# H6 (D5 pass 6) phases. The caller wraps each phase in ~/.claude/guard/guarded; a WebKit phase file runs under ONE
# `guarded --exclusive webkit` acquisition (chain.sh <file> webkit).
#   zsh run-h6.sh <fn> <args>   or   zsh run-h6.sh phase <phase-file>
set -u
H6=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6/H6
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p6/H6/out
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p6/H6/wt
L=$H6/logs; J=$H6/json
mkdir -p $L $J
stamp() { print -- "## $(date '+%Y-%m-%d %H:%M:%S') load $(sysctl -n vm.loadavg) · $*" }
build() { stamp "build $1" | tee $L/build-$1.log; node $H/build.mjs $W --label $1 --out $O >> $L/build-$1.log 2>&1; print -- "exit $?" >> $L/build-$1.log; tail -2 $L/build-$1.log; }
read1() { # <label> <engine> <witness-file> [args]: one witness on one build
  local b=$1 e=$2 w=$3; shift 3; local tag=${${(j:_:)@}//[^A-Za-z0-9_,]/}; local log=$L/read-$b-$e-${w%.mjs}${tag:+-$tag}.log
  stamp "start $b $e $w $*" | tee $log
  node $H/$w --build $O/builds/$b --wt $W --engine $e --out $J/$b "$@" >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end $b $e $w" >> $log; grep -E "^(E-[0-9]+|CAP) " $log
}
cap() { # <label> <engine> <scenes>: the ladder cells (fine pointer) on a build
  local b=$1 e=$2 sc=$3; local log=$L/read-$b-$e-capture-ladder.log
  stamp "start cap $b $e $sc" | tee $log
  node $H/capture.mjs --build $O/builds/$b --label $b --engine $e --pointers fine --scenes $sc --frames $O/cap/$b/frames --sheets $O/cap/$b/sheets --no-sheets >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end cap $b $e" >> $log; grep -E "ladder|^CAP " $log
}
fx() { # <engine> <witness-file> [args]: one witness on the fixture (a development read, not the self-test)
  local e=$1 w=$2; shift 2; local tag=${${(j:_:)@}//[^A-Za-z0-9_,]/}; local log=$L/dev-fixture-$e-${w%.mjs}${tag:+-$tag}.log
  stamp "fixture $e $w $*" | tee $log
  node $H/$w --fixture --engine $e "$@" >> $log 2>&1; print -- "exit $?" >> $log; stamp "end" >> $log; grep -E "^\s+(FAIL|UNMEASURED)|^(E-[0-9]+|CAP) " $log | head -40
}
st() { # <engine> <only> [tag]: one witness's whole self-test (clean + every plant)
  local e=$1 only=$2 tag=${3:-}; local log=$L/selftest-$e-${only//,/_}${tag:+-$tag}.log
  stamp "selftest $e $only $tag" | tee $log
  node $H/selftest.mjs --engines $e --only $only --out $J/selftest >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end selftest $e $only" >> $log; grep -E "^(OK|BROKEN|UNREAD|N/A)|^selftest:" $log | grep -v "^OK" ; tail -3 $log | head -1
}
stf() { # <engine> <witness> <faults,…> <tag>: a subset of one witness's plants (no clean run)
  local e=$1 only=$2 fl=$3 tag=$4; local log=$L/selftest-$e-$only-$tag.log
  stamp "selftest $e $only faults $fl" | tee $log
  node $H/selftest.mjs --engines $e --only $only --faults $fl --out $J/selftest >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end selftest $e $only $tag" >> $log; grep -E "^(BROKEN|UNREAD|N/A)" $log; tail -3 $log | head -1
}
clean() { # <engine> <witness id>: an unchanged witness's clean fixture (the regression read of the fixture and lib edits)
  local e=$1 w=$2 log=$L/clean-$1.log
  stamp "clean $e $w" | tee -a $log
  node $H/run.mjs --fixture --engines $e --only $w >> $log 2>&1; print -- "exit $? $w" >> $log; tail -2 $log | head -1
}
if [[ ${1:-} == phase ]]; then while read -r line; do [[ -z $line || $line == \#* ]] && continue; eval "$line"; done < $2; else "$@"; fi
