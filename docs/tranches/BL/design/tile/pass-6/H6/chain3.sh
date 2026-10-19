#!/bin/zsh
# H6 chain 3, under the final hash. chain2 was stopped in a Chromium self-test part: the H6-3 fixture plant read PASS
# because the fixture's tab laid its two block rows side by side (an inline-flex row); the fixture tab is now block flow.
# The builds are unchanged (scenes.mjs and attack-route/ did not move), so every read is re-run on them under the new
# hash; nothing is rebuilt. Chromium first, then the WebKit reads in six holds. Serial throughout.
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-6/H6
L=$H/logs/chain.log
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile; HN=$T/harness
O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p6/h6/out; B=$O/builds
stamp() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
st() { echo "$(date '+%F %T') start $* · load $(sysctl -n vm.loadavg)" >> $L; $H/run-h6.sh "$@"; echo "$(date '+%F %T') exit $? ${@[1,2]} · load $(sysctl -n vm.loadavg)" >> $L; }
echo "$(stamp) CHAIN3 · harness $(cd $HN && node -e 'import("./lib.mjs").then(m=>console.log(m.HARNESS.rev, m.HARNESS.hash, m.HARNESS.files))')" >> $L
st xscript
st unit
st reads dp chromium
st reads f chromium
st stubreads chromium
st selftest chromium h6 --only CANON,FACT,ATTACK,CORNER,REPORT
st selftest chromium t12 --only T-1,T-2
st selftest chromium t3 --only T-3
st selftest chromium t457 --only T-4,T-5,T-7
st selftest chromium t6 --only T-6
st selftest chromium w --only W-A,W-B,W-C,W-D,W-E
R="node $HN/fact-split.mjs --build $B/dp-atk-src --out $O --engine webkit; node $HN/fact-split.mjs --build $B/dp-atk-src-dev --out $O --engine webkit; node $HN/attack.mjs --build $B/dp-atk-src-dev --out $O --engine webkit; node $HN/corner-refusal.mjs --build $B/dp-atk-src --out $O --engine webkit; node $HN/report-h46.mjs --build $B/dp-src --out $O --engine webkit"
S="node $HN/fact-split.mjs --build $B/dp-stub-atk-src --out $O/stub --engine webkit; node $HN/fact-split.mjs --build $B/dp-stub-atk-src-dev --out $O/stub --engine webkit"
st wk A "$R; ${R//dp-/f-}; $S; ${S//dp-/f-}"
st wk B "node $HN/selftest.mjs --out $O/selftest --engines webkit --only CANON,FACT,ATTACK,CORNER,REPORT,W-A,W-B,W-C,W-D,W-E,T-8"
BAT() { echo "for w in t1-corner-stops t2-one-line-stadium t3-selected-separates t4-ring-whole t5-one-of-n-keys t6-engagement t7-no-consumer-paint wb-choice-card we-one-line; do node $HN/\$w.mjs --build $B/$1-src --out $O --engine webkit; done"; }
st wk C "$(BAT dp); $(BAT f)"
st wk D "node $HN/selftest.mjs --out $O/selftest --engines webkit --only T-1,T-2,T-4,T-5,T-7"
st wk E "node $HN/selftest.mjs --out $O/selftest --engines webkit --only T-3"
st wk F "node $HN/selftest.mjs --out $O/selftest --engines webkit --only T-6"
echo "$(stamp) CHAIN3-DONE" >> $L
