#!/bin/bash
# run.sh (D2 pass 14, FRESH CRITIC of D2-B′): builds, then the seat's order, one chain.sh step group at a time (each takes the
# seat lock). A chain step that stops (exit 3 DISK-STOP, 4 the build differs, 5 the guard refused) ends the run.
set -u
S=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/pass-14/D2-Bp-crit-records/scripts; R=$S/..
L() { echo "$(date '+%F %T') run: $* · $(uptime | sed 's/.*load/load/')" >> $R/chain.log; }
L "start pid $$ pgid $(ps -o pgid= $$ | tr -d ' ')"
if [ -n "${SKIPBUILD:-}" ]; then grep -q BUILDS-DONE $R/apply.log || exit 1; L "SKIPBUILD: builds of record are the BUILDS-DONE in apply.log"; x=0; else bash $S/build.sh; x=$?; fi; [ $x = 0 ] || { L "BUILD STOPPED (exit $x)"; exit $x; }
grep -q FAILED $R/apply.log && { L "BUILD FAILED; stop"; exit 1; }
L "builds done: $(grep 'scene chunk' $R/apply.log | awk '{print $3, $4}' | tr '\n' ' ')"
st() { STEPS="$1" bash $S/chain.sh; local x=$?; case $x in 3|4|5) L "STOPPED at '$1' (exit $x)"; exit $x;; esac; return 0; }
st "pr f7"
st rr
st batc
st wk
st "fmlow digest"
st q
st cost
st "digest hend"
L "RUN-DONE"
