#!/bin/zsh
# H5 (D5 pass 5) phases. The caller wraps each phase in ~/.claude/guard/guarded; `wk` runs under
# `guarded --exclusive webkit`, every WebKit stage in that one admission.
#   zsh run-h5.sh <build|read1|cap|st|clean> <args>   or   zsh run-h5.sh phase <phase-file>
set -u
H5=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-5/H5
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p5/H5/out
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p5/H5/wt
L=$H5/logs; J=$H5/json
mkdir -p $L $J
stamp() { print -- "## $(date '+%Y-%m-%d %H:%M:%S') load $(sysctl -n vm.loadavg) · $*" }
read1() { # <label> <engine> <witness-file> [args]: one witness on one build (the args, if any, name the log)
  local b=$1 e=$2 w=$3; shift 3; local tag=${${(j:_:)@}//[^A-Za-z0-9_,]/}; local log=$L/read-$b-$e-${w%.mjs}${tag:+-$tag}.log
  stamp "start $b $e $w $*" | tee $log
  node $H/$w --build $O/builds/$b --wt $W --engine $e --out $J/$b "$@" >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end $b $e $w" >> $log; grep -E "^(E-[0-9]+|CAP) " $log
}
cap() { # <label> <engine> <scenes>: the ladder cell (fine pointer) on a build
  local b=$1 e=$2 sc=$3; local log=$L/read-$b-$e-capture-ladder.log
  stamp "start cap $b $e $sc" | tee $log
  node $H/capture.mjs --build $O/builds/$b --label $b --engine $e --pointers fine --scenes $sc --frames $O/cap/$b/frames --sheets $O/cap/$b/sheets --no-sheets >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end cap $b $e" >> $log; grep -E "ladder|^CAP " $log
}
st() { # <engine> <only> [tag]: one witness's whole self-test (clean + every plant); the tag names a re-run's log
  local e=$1 only=$2 tag=${3:-}; local log=$L/selftest-$e-${only//,/_}${tag:+-$tag}.log
  stamp "selftest $e $only $tag" | tee $log
  node $H/selftest.mjs --engines $e --only $only --out $J/selftest >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end selftest $e $only" >> $log; tail -3 $log | head -1
}
stf() { # <engine> <witness> <faults,…> <tag>: a subset of one witness's plants (no clean run), so each call fits 90 min
  local e=$1 only=$2 fl=$3 tag=$4; local log=$L/selftest-$e-$only-$tag.log
  stamp "selftest $e $only faults $fl" | tee $log
  node $H/selftest.mjs --engines $e --only $only --faults $fl --out $J/selftest >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end selftest $e $only $tag" >> $log; tail -3 $log | head -1
}
clean() { # <engine> <witness id>: an unchanged witness's clean fixture (the regression read of the fixture and lib edits)
  local e=$1 w=$2 log=$L/clean-$1.log
  stamp "clean $e $w" | tee -a $log
  node $H/run.mjs --fixture --engines $e --only $w >> $log 2>&1; print -- "exit $? $w" >> $log; tail -2 $log | head -1
}
applylight() { stamp "apply P-A4-light.patch" | tee $L/apply.log; git -C $W apply $H5/../../pass-4/P-A4-light.patch >> $L/apply.log 2>&1; print -- "exit $?" >> $L/apply.log; git -C $W diff --shortstat >> $L/apply.log; tail -2 $L/apply.log; }
plant() { stamp "plant P7+P9" | tee -a $L/apply.log; zsh $H5/plant-p7p9.sh >> $L/apply.log 2>&1; print -- "exit $?" >> $L/apply.log; tail -4 $L/apply.log; }
build() { stamp "build $1" | tee $L/build-$1.log; node $H/build.mjs $W --label $1 --out $O >> $L/build-$1.log 2>&1; print -- "exit $?" >> $L/build-$1.log; tail -2 $L/build-$1.log; }
# any function above, by name: zsh run-h5.sh <fn> <args>; or a phase file of such lines: zsh run-h5.sh phase <file>
if [[ ${1:-} == phase ]]; then while read -r line; do [[ -z $line || $line == \#* ]] && continue; eval "$line"; done < $2; else "$@"; fi
