#!/bin/zsh
# H7 chain 2, serial after chain 1 (it waits for CHAIN-DONE), same harness hash. (1) UNIT's self-test: chain 1's unit
# stage ran the driver without its worktree argument and stopped at usage (exit 2; logs/explore/unit-selftest-noarg.log).
# (2) Cure v2 (h7-cure2.patch): the flush plate rule narrowed to the option, read where v1 was. (3) The extended probe
# (the trigger's children) in Chromium on D′, cure v1 and cure v2. (4) Chromium T-6 control `t6-rung`, BROKEN once in
# chain 1 (87/88, the f1 keyboard-commit cell), re-run twice. (5) One WebKit hold: cure v2's FACT ×2 and probe.
R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-7/H7/run-h7.sh
L=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-7/H7/logs
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile; HN=$T/harness; PR=$T/pass-7/H7/probes
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p7/h7; O=$W/out; B=$O/builds
until grep -q CHAIN-DONE $L/chain.log; do sleep 60; done
s() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · start $*" >> $L/chain.log; $R "$@"; local rc=$?; echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg) · exit $rc · $1 $2 $3" >> $L/chain.log; }
echo "$(date '+%F %T') CHAIN2 · harness $(cd $HN && node -e 'import("./lib.mjs").then(m=>console.log(m.HARNESS.rev, m.HARNESS.hash, m.HARNESS.files))')" >> $L/chain.log
s unit
s cure v2
s reads dp-cure2 chromium
mv $L/probe-b3-dp-atk-src-chromium.log $L/probe-b3-dp-atk-src-chromium-v0.log; mv $L/probe-b3-dp-cure-atk-src-chromium.log $L/probe-b3-dp-cure-atk-src-chromium-v0.log
s probe dp-atk-src chromium; s probe dp-cure-atk-src chromium; s probe dp-cure2-atk-src chromium
s selftest chromium t6rung-r1 --only T-6 --faults t6-rung
s selftest chromium t6rung-r2 --only T-6 --faults t6-rung
s wk G "for f in src src-dev; do node $HN/fact-split.mjs --build $B/dp-cure2-atk-\$f --out $O --engine webkit; done; node $PR/b3-mobile.mjs --build $B/dp-cure2-atk-src --out $O --engine webkit"
s hash
echo "$(date '+%F %T') CHAIN2-DONE" >> $L/chain.log
