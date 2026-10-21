#!/bin/zsh
# H7 chain 4 (2026-10-20), after chain 3's CHAIN3-DONE, same harness hash. The table showed hold C was cut by the 01:06 zone
# hold INSIDE T-5, after its clean run and six plants (Playwright WebKit T-5: 7 runs against Chromium's 10). Hold C3 runs
# the three plants C never reached, then the closing hash.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-7/H7/run-h7.sh
L=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-7/H7/logs
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile; HN=$T/harness
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p7/h7; O=$W/out
until grep -q CHAIN3-DONE $L/chain.log; do sleep 30; done
s() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · start $*" >> $L/chain.log; $R "$@"; local rc=$?; echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · exit $rc · $1 $2 $3" >> $L/chain.log; }
echo "$(date '+%F %T') CHAIN4 · harness $(cd $HN && node -e 'import("./lib.mjs").then(m=>console.log(m.HARNESS.rev, m.HARNESS.hash, m.HARNESS.files))')" >> $L/chain.log
s wk C3 "node $HN/selftest.mjs --out $O/selftest --engines webkit --only T-5 --faults t5-multi,t5-consumer,t5-retired"
s hash
echo "$(date '+%F %T') CHAIN4-DONE" >> $L/chain.log
