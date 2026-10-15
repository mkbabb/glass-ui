#!/bin/zsh
# H2 (D5 pass 2) driver, the reading of record: the self-test on the final harness in both engines, the HEAD baseline,
# E-1 on P-A (the adoption read against pass 1's known drift), and the CK-25 capture set on HEAD. Serialized (the
# harness lock serializes them anyway). Every log lands under this directory; each stage line carries its load.
#   run-h2.sh <build-root>   (<build-root>/builds/{head,pa} from build.mjs)
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/H2
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p2/H2/wt
B=$1
stamp() { echo "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
cd $H
mkdir -p $D/logs $D/final/selftest-json $D/final/baseline $D/final/pa-e1 $D/glance/frames
{ stamp "selftest chromium start"; node selftest.mjs --engines chromium --out $D/final/selftest-json; stamp "selftest chromium end exit $?"; } > $D/logs/final-selftest-chromium.log 2>&1
{ stamp "selftest webkit start"; node selftest.mjs --engines webkit --out $D/final/selftest-json; stamp "selftest webkit end exit $?"; } > $D/logs/final-selftest-webkit.log 2>&1
{ stamp "baseline head start"; node run.mjs --build $B/builds/head --wt $WT --out $D/final/baseline --verbose; stamp "baseline head end exit $?"; } > $D/logs/final-baseline-head.log 2>&1
{ stamp "E-1 on P-A start"; for e in chromium webkit; do node e1-census.mjs --build $B/builds/pa --engine $e --out $D/final/pa-e1; done; stamp "E-1 on P-A end"; } > $D/logs/final-pa-e1.log 2>&1
{ stamp "capture head start"; node capture.mjs --build $B/builds/head --label head --frames $D/glance/frames --sheets $D/glance; stamp "capture head end exit $?"; } > $D/logs/final-capture-head.log 2>&1
stamp "run-h2 done" >> $D/logs/final-capture-head.log
