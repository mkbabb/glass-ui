#!/bin/zsh
# H7 chain 3 (2026-10-20, after the 14:33 reboot; same harness hash). The 01:06 zone hold stopped chain 1 inside WebKit
# hold C after T-1, T-2, T-4 and T-5 (wk-C.log) and before chain 2 began. This chain runs what is left, serial:
# hold C2 (T-7, the one part C did not reach), D (T-3), E (T-6), then chain 2's stages as chain2.sh lists them, then the
# closing hash. The driver's `reads` stage, dropped by the 22:52 edit, is restored in run-h7.sh.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-7/H7/run-h7.sh
L=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-7/H7/logs
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile; HN=$T/harness; PR=$T/pass-7/H7/probes
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p7/h7; O=$W/out; B=$O/builds
s() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · start $*" >> $L/chain.log; $R "$@"; local rc=$?; echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · exit $rc · $1 $2 $3" >> $L/chain.log; }
echo "$(date '+%F %T') CHAIN3 · harness $(cd $HN && node -e 'import("./lib.mjs").then(m=>console.log(m.HARNESS.rev, m.HARNESS.hash, m.HARNESS.files))')" >> $L/chain.log
s wk C2 "node $HN/selftest.mjs --out $O/selftest --engines webkit --only T-7"
s wk D "node $HN/selftest.mjs --out $O/selftest --engines webkit --only T-3"
s wk E "node $HN/selftest.mjs --out $O/selftest --engines webkit --only T-6"
s unit
s cure v2
s reads dp-cure2 chromium
for p in dp-atk-src dp-cure-atk-src; do [[ -f $L/probe-b3-$p-chromium.log && ! -f $L/probe-b3-$p-chromium-v0.log ]] && mv $L/probe-b3-$p-chromium.log $L/probe-b3-$p-chromium-v0.log; done
s probe dp-atk-src chromium; s probe dp-cure-atk-src chromium; s probe dp-cure2-atk-src chromium
s selftest chromium t6rung-r1 --only T-6 --faults t6-rung
s selftest chromium t6rung-r2 --only T-6 --faults t6-rung
s wk G "for f in src src-dev; do node $HN/fact-split.mjs --build $B/dp-cure2-atk-\$f --out $O --engine webkit; done; node $PR/b3-mobile.mjs --build $B/dp-cure2-atk-src --out $O --engine webkit"
s hash
echo "$(date '+%F %T') CHAIN3-DONE" >> $L/chain.log
