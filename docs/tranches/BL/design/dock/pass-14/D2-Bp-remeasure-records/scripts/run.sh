#!/bin/bash
# run.sh (D2 pass 14, RE-MEASURE seat of D2-B′): the seat's order, one chain.sh step group at a time (each takes the seat lock).
# Waits for build.sh's BUILDS-DONE first. A chain step that stops (exit 3 DISK-STOP, 4 the build differs) ends the run.
set -u
S=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/pass-14/D2-Bp-remeasure-records/scripts; R=$S/..
L() { echo "$(date '+%F %T') run: $* · $(uptime | sed 's/.*load/load/')" >> $R/chain.log; }
L "start pid $$"
until grep -q BUILDS-DONE $R/apply.log; do grep -q FAILED $R/apply.log && { L "BUILD FAILED; stop"; exit 1; }; sleep 20; done
L "builds done: $(grep 'scene chunk' $R/apply.log | awk '{print $3, $4}' | tr '\n' ' ')"
st() { STEPS="$1" bash $S/chain.sh; local x=$?; [ $x = 3 ] || [ $x = 4 ] && { L "STOPPED at '$1' (exit $x)"; exit $x; }; return 0; }
st "pr f7"
st batc
st wk
st "fmlow digest"
st q
st cost
st "digest hend"
L "RUN-DONE"
