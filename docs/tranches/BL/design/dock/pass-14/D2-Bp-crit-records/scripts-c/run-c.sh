#!/bin/bash
# run-c.sh (D2 pass 14, COMPLETION critic): the seat's order after the builds (build.sh, run first by hand, BUILDS-DONE in
# c/apply.log). A step that stops (3 DISK-STOP, 4 the build differs, 5 the guard refused, 6 a battery slot with no end)
# ends the run.
set -u
SC=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/pass-14/D2-Bp-crit-records/scripts-c; RC=$SC/../c
L() { echo "$(date '+%F %T') run: $* · $(uptime | sed 's/.*load/load/')" >> $RC/chain.log; }
L "start pid $$ pgid $(ps -o pgid= $$ | tr -d ' ')"
grep -q BUILDS-DONE $RC/apply.log || { L "no BUILDS-DONE"; exit 1; }
grep -q FAILED $RC/apply.log && { L "BUILD FAILED; stop"; exit 1; }
st() { STEPS="$1" bash $SC/chain-c.sh; local x=$?; case $x in 3|4|5|6) L "STOPPED at '$1' (exit $x)"; exit $x;; esac; return 0; }
for s in ${RUNSTEPS:-"pr f7" rrwd bat q cost "digest hend"}; do st "$s"; done
L "RUN-DONE"
