#!/bin/zsh
# H6 chain: every stage of run-h6.sh in order, serial, one heavy run at a time. chain.log holds each stage's start and exit.
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-6/H6
L=$H/logs/chain.log
stamp() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
st() { echo "$(date '+%F %T') start $* · load $(sysctl -n vm.loadavg)" >> $L; $H/run-h6.sh "$@"; echo "$(date '+%F %T') exit $? $* · load $(sysctl -n vm.loadavg)" >> $L; }
echo "$(stamp) CHAIN at $(cd /Users/mkbabb/Programming/glass-ui && git rev-parse --short HEAD) · harness $(cd $H/../../harness && node -e 'import("./lib.mjs").then(m=>console.log(m.HARNESS.rev, m.HARNESS.hash, m.HARNESS.files))')" >> $L
st xscript
st unit
st route dp
st build dp
st stub dp webkit
st route f
st build f
st stub f chromium
st stub f webkit
st reads dp chromium
st reads f chromium
st selftest chromium h6 --only CANON,FACT,ATTACK,CORNER,REPORT
st selftest chromium t12 --only T-1,T-2
st selftest chromium t3 --only T-3
st selftest chromium t457 --only T-4,T-5,T-7
st selftest chromium t6 --only T-6
st selftest chromium w --only W-A,W-B,W-C,W-D,W-E
st reads dp webkit
st reads f webkit
st selftest webkit h6 --only CANON,FACT,ATTACK,CORNER,REPORT
st selftest webkit t12 --only T-1,T-2
st selftest webkit t3 --only T-3
st selftest webkit t457 --only T-4,T-5,T-7
st selftest webkit t6 --only T-6
st selftest webkit w --only W-A,W-B,W-C,W-D,W-E
st selftest webkit t8 --only T-8
echo "$(stamp) CHAIN-DONE" >> $L
