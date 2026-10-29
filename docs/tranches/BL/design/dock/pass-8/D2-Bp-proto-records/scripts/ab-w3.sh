#!/bin/bash
# ab-w3.sh (D2 pass 8, B′ prototype): the WebKit W3 cells that went red in the bp8 battery at load 35-46, read on bp8 and
# bp7 (pass 7's B′) alternating, three rounds, in ONE --exclusive webkit slot, each run logging its load. Same harness,
# same cells, same session: a red both builds share at matched load is the machine's; a red only bp8 reads is the patch's.
#   THEME=light|dark bash ab-w3.sh
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p8/Bp-proto; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs; R=$D/pass-8/D2-Bp-proto-records/ab-w3; mkdir -p $R
T=${THEME:-light}
CELLS='^(first-expand|warm-expand|warm-collapse|reversal|swap-long|retarget·80|wide·collapsed-rest)(·control)?$'
(echo "queued $(date) $(uptime)"; ~/.claude/guard/guarded --exclusive webkit --timeout 60 -- env DOCK_HARNESS_THEME=$T bash -c "echo admitted \$(date) \$(uptime); for k in 1 2 3; do for b in bp8 bp7; do echo \"== \$b r\$k \$(uptime)\"; node $H/w3-morph.mjs --build $OUT/builds/\$b --adapter $AD --engine webkit --out $OUT/ab-w3-$T/\$b-r\$k --cells '$CELLS' 2>&1 | grep -E '^(PASS|FAIL|OWNER-BLOCKED|UNMEASURED)'; done; done"; echo "exit $? $(date) $(uptime)") > $R/ab-w3-webkit-$T.log 2>&1
