#!/bin/bash
# run.sh (D2 pass 13, FRESH CRITIC): the seat's order, one chain.sh step group at a time (each takes the seat lock).
set -u
S=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/pass-13/D2-Bp-crit-records/scripts; R=$S/..
L() { echo "$(date '+%F %T') run: $* · $(uptime | sed 's/.*load/load/')" >> $R/chain.log; }
L "start pid $$"
STEPS="pr f7" bash $S/chain.sh
STEPS=batc bash $S/chain.sh
STEPS=wk bash $S/chain.sh
STEPS="fmlow digest" bash $S/chain.sh
STEPS=q COLS="chromium-light chromium-dark webkit-light webkit-dark" bash $S/chain.sh
STEPS=cost bash $S/chain.sh
STEPS="digest hend" bash $S/chain.sh
L "RUN-DONE"
