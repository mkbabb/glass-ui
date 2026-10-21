#!/bin/zsh
# H7 counted chain: every read H7.md cites, under one harness hash, serial. Q-13 is ruled D′ (INBOUND O-103), so it reads
# floor v5 (no writer), D′ on floor v5, the B-1 plant on each, and the candidate cure (h7-cure.patch) on D′. Chromium
# first, then Playwright WebKit in five `--exclusive webkit` holds (each under the guard's 90-min cap). Every stage and
# its load go to logs/chain.log.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-7/H7/run-h7.sh
L=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-7/H7/logs
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile; HN=$T/harness; PR=$T/pass-7/H7/probes
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p7/h7; O=$W/out; B=$O/builds
s() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · start $*" >> $L/chain.log; $R "$@"; local rc=$?; echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · exit $rc · $1 $2 $3" >> $L/chain.log; }
echo "$(date '+%F %T') CHAIN · harness $(cd $HN && node -e 'import("./lib.mjs").then(m=>console.log(m.HARNESS.rev, m.HARNESS.hash, m.HARNESS.files))')" >> $L/chain.log
s hash
s sheetself; s xscript; s unit
s route fv5; s sheet fv5; s build fv5; s plant fv5
s route dp; s sheet dp; s build dp; s plant dp; s cure
s reads fv5 chromium; s reads dp chromium; s reads dp-cure chromium
s probe dp-atk-src chromium; s probe dp-cure-atk-src chromium
s selftest chromium h7 --only FACT,REPORT
s selftest chromium canon --only CANON,ATTACK,CORNER
s selftest chromium t12 --only T-1,T-2
s selftest chromium t3 --only T-3
s selftest chromium t457 --only T-4,T-5,T-7
s selftest chromium t6 --only T-6
s selftest chromium w --only W-A,W-B,W-C,W-D,W-E
RD="for x in fv5 dp dp-cure; do node $HN/fact-split.mjs --build $B/\$x-atk-src --out $O --engine webkit; node $HN/fact-split.mjs --build $B/\$x-atk-src-dev --out $O --engine webkit; done; for x in fv5 dp; do node $HN/fact-split.mjs --build $B/\$x-plant-atk-src --out $O --engine webkit; done; node $HN/report-h46.mjs --build $B/dp-src --out $O --engine webkit; node $PR/b3-mobile.mjs --build $B/dp-atk-src --out $O --engine webkit; node $PR/b3-mobile.mjs --build $B/dp-cure-atk-src --out $O --engine webkit"
s wk A "$RD"
s wk B "node $HN/selftest.mjs --out $O/selftest --engines webkit --only FACT,REPORT,CANON,ATTACK,CORNER,T-8,W-A,W-B,W-C,W-D,W-E"
s wk C "node $HN/selftest.mjs --out $O/selftest --engines webkit --only T-1,T-2,T-4,T-5,T-7"
s wk D "node $HN/selftest.mjs --out $O/selftest --engines webkit --only T-3"
s wk E "node $HN/selftest.mjs --out $O/selftest --engines webkit --only T-6"
s hash
echo "$(date '+%F %T') CHAIN-DONE" >> $L/chain.log
