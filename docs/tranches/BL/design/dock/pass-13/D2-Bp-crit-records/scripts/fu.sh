#!/bin/bash
# fu.sh (D2 pass 13, FRESH CRITIC): the follow-up after run.sh. Every red cell the A/Bs and attacks read is re-read, bp13 and bp12
# alternating, 8 rounds per theme, each read started at load <= 11 (q/chromium-fu.q: lead-add, lead-remove, swap-long, the
# [terminal] and [faces] reds; q/webkit-fu.q: swap-short, the [blank] reds). Readings beside the rows; they turn no row.
S=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/pass-13/D2-Bp-crit-records/scripts
STEPS=q COLS="chromium-fu webkit-fu" bash $S/chain.sh
STEPS=hend bash $S/chain.sh
echo "$(date '+%F %T') fu: FU-DONE · $(uptime | sed 's/.*load/load/')" >> $S/../chain.log
