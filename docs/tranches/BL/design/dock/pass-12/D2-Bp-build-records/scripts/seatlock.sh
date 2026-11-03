#!/bin/bash
# seatlock.sh <cmd…>: one heavy run at a time for this seat. Takes the seat lock (a directory, atomic mkdir) and runs the command;
# a WebKit slot the guard admits while a Chromium run of this seat holds the lock waits inside the slot (seatwait) until it is free.
L=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p12/Bp-build/seat.lock
until mkdir $L 2>/dev/null; do sleep 5; done
trap 'rmdir $L 2>/dev/null' EXIT
"$@"
