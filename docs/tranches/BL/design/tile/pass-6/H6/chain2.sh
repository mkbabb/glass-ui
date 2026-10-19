#!/bin/zsh
# H6 chain 2. chain.sh queued once per WebKit stage, and the machine-wide WebKit lock was held elsewhere for 3 h 26 min
# at its first stage (stub-dp-webkit.log). This chain waits for the stage chain.sh left queued (stub f webkit; never
# cancelled), runs every Chromium stage, then the WebKit reads in six holds instead of nine. Serial throughout.
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-6/H6
L=$H/logs/chain.log
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile; HN=$T/harness
O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p6/h6/out; B=$O/builds
stamp() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
st() { echo "$(date '+%F %T') start $* · load $(sysctl -n vm.loadavg)" >> $L; $H/run-h6.sh "$@"; echo "$(date '+%F %T') exit $? ${@[1,2]} · load $(sysctl -n vm.loadavg)" >> $L; }
echo "$(stamp) CHAIN2 · harness $(cd $HN && node -e 'import("./lib.mjs").then(m=>console.log(m.HARNESS.rev, m.HARNESS.hash, m.HARNESS.files))')" >> $L
until grep -q "^exit" $H/logs/stub-f-webkit.log; do sleep 20; done
echo "$(date '+%F %T') exit (from stub-f-webkit.log) stub f webkit · load $(sysctl -n vm.loadavg)" >> $L
st reads dp chromium
st reads f chromium
st selftest chromium h6 --only CANON,FACT,ATTACK,CORNER,REPORT
st selftest chromium t12 --only T-1,T-2
st selftest chromium t3 --only T-3
st selftest chromium t457 --only T-4,T-5,T-7
st selftest chromium t6 --only T-6
st selftest chromium w --only W-A,W-B,W-C,W-D,W-E
R="node $HN/fact-split.mjs --build $B/dp-atk-src --out $O --engine webkit; node $HN/fact-split.mjs --build $B/dp-atk-src-dev --out $O --engine webkit; node $HN/attack.mjs --build $B/dp-atk-src-dev --out $O --engine webkit; node $HN/corner-refusal.mjs --build $B/dp-atk-src --out $O --engine webkit; node $HN/report-h46.mjs --build $B/dp-src --out $O --engine webkit"
st wk A "$R; ${R//dp-/f-}; node $HN/selftest.mjs --out $O/selftest --engines webkit --only CANON,FACT,ATTACK,CORNER,REPORT"
BAT() { echo "for w in t1-corner-stops t2-one-line-stadium t3-selected-separates t4-ring-whole t5-one-of-n-keys t6-engagement t7-no-consumer-paint wb-choice-card we-one-line; do node $HN/\$w.mjs --build $B/$1-src --out $O --engine webkit; done"; }
st wk B "$(BAT dp); node $HN/selftest.mjs --out $O/selftest --engines webkit --only W-A,W-B,W-C,W-D,W-E"
st wk C "$(BAT f); node $HN/selftest.mjs --out $O/selftest --engines webkit --only T-8"
st wk D "node $HN/selftest.mjs --out $O/selftest --engines webkit --only T-1,T-2,T-4,T-5,T-7"
st wk E "node $HN/selftest.mjs --out $O/selftest --engines webkit --only T-3"
st wk F "node $HN/selftest.mjs --out $O/selftest --engines webkit --only T-6"
echo "$(stamp) CHAIN2-DONE" >> $L
