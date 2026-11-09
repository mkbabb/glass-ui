#!/bin/bash
# run13b.sh (D2 pass 13, BUILDER): run13.sh's order from its Chromium queues on, after run13 was stopped in a pre-queue gate
# (2026-11-05 04:51) so the queue slots hold their gate 30 min. Build, patch, trace, PR, F7 and the Chromium battery had run.
set -u
G=/Users/mkbabb/Programming/glass-ui; S=$G/docs/tranches/BL/design/dock/pass-13/D2-Bp-build-records/scripts
R=$S/../v2; L() { echo "$(date '+%F %T') run13b: $* · $(uptime | sed 's/.*load/load/')" >> $R/chain.log; }
L "resume at the Chromium queues"
STEPS=q COLS="chromium-light chromium-dark" bash $S/chain.sh
STEPS=cost bash $S/chain.sh
STEPS=wk bash $S/chain.sh
STEPS=q COLS="webkit-light webkit-dark" bash $S/chain.sh
STEPS="digest hend" bash $S/chain.sh
L "RUN13-DONE"
