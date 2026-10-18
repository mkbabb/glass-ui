#!/bin/zsh
# the second chain: chain.sh ran tsc and the unit suite BEFORE each state's library build, so the cases that read the
# built dist/ (Row 8, the published roster, boot-graph's build arm) and the test project's `@mkbabb/glass-ui/fourier-math`
# self-reference had no dist to read. Here each state builds the library first, then typechecks and runs the suite, so
# the tallies compare with FLOOR-V3's (which built first). Ends at HEAD + floor v4.
R=${0:A:h}/run-fv4.sh; C=${0:A:h}/logs/chain.log
st() { echo "$(date '+%F %T') $* · load $(sysctl -n vm.loadavg)" >> $C; }
step() { st "start $*"; $R "$@"; st "exit $? $*"; }
st "CHAIN2"
for x in fv4 dp f; do
  step state $x
  step libbuild $x-2
  step tsc $x-2
  step unit $x-2
done
step state fv4
st "CHAIN2-DONE"
