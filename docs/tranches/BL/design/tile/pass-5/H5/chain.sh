#!/bin/zsh
# the H5 self-test and WebKit chain, serial: each part one guarded call under the 90-min cap; each WebKit part its own
# --exclusive webkit hold. logs/chain.log records each part's start and exit.
R=${0:A:h}/run-h5.sh; C=${0:A:h}/logs/chain.log
HN=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/harness; O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p5/h5/out
st() { echo "$(date '+%F %T') $* · load $(sysctl -n vm.loadavg)" >> $C; }
part() { st "start $*"; $R selftest "$@"; st "exit $? $1 $2"; }
part chromium h5 --only CANON,FACT,ATTACK,REPORT,CORNER
part chromium t3 --only T-3
part chromium t457 --only T-4,T-5,T-7
part chromium t6 --only T-6
part chromium w --only W-A,W-B,W-C,W-D,W-E
part webkit h5 --only CANON,FACT,ATTACK,REPORT,CORNER
part webkit t12 --only T-1,T-2
part webkit t3 --only T-3
part webkit t457 --only T-4,T-5,T-7
part webkit t6 --only T-6
part webkit w --only W-A,W-B,W-C,W-D,W-E
part webkit t8 --only T-8
st "start webkit-reads"; $R webkit-reads; st "exit $? webkit-reads"
st "start unit"; $R unit; st "exit $? unit"
st "start xscript"; { node $HN/transcribe.mjs --selftest --out $O; node $HN/transcribe.mjs --routes ${0:A:h}/routes/D4-Dp,${0:A:h}/routes/D4-F --out $O; node $HN/transcribe.mjs --routes ${0:A:h}/../../pass-4/D4-Dp-spec/route,${0:A:h}/../../pass-4/D4-F-spec/route --out $O; } > ${0:A:h}/logs/xscript.log 2>&1; st "exit $? xscript"
st "CHAIN-DONE"
