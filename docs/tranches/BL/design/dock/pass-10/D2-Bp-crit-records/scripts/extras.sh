#!/bin/bash
# extras.sh (D2 pass 10, fresh critic; a reading, enters no row): the reversal stub seen in this seat's phase reads (C·d morph rev-c
# at 0.25 r2 and 0.85 r1: "n" painted 63-70 % by a hard edge at 888 px, load 6.1-6.5), read on bp10 and bp8 alternating, Chromium,
# both themes, 4 runs per phase, at the phases around both. One guarded slot, after the chain.
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p10/Bp-crit; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; AD=$D/pass-3/adapter-floor-v2.mjs; REC=$D/pass-10/D2-Bp-crit-records; S=$REC/scripts; X=$REC/revstub
mkdir -p $X
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
export OUT AD S X
L "start revstub chromium"
$HOME/.claude/guard/guarded --timeout 60 -- bash -c 'echo "admitted $(date) $(uptime)"; for t in dark light; do TH=""; [ $t = dark ] && TH="--theme dark"; for k in 1 2; do for b in bp10 bp8; do node $S/phase2.mjs --build $OUT/builds/$b --adapter $AD --engine chromium $TH --scene morph --mode rev-c --points 0.2,0.25,0.3,0.8,0.85,0.9 --runs 2 --json $X/$b-chromium-$t-k$k.json > $X/$b-chromium-$t-k$k.log 2>&1; done; done; done; echo "end $(date) $(uptime)"' > $X/slot.log 2>&1
L "end revstub chromium exit $?"
L "EXTRAS-DONE"
