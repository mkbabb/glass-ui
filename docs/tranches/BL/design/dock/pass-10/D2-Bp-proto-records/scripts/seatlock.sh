#!/bin/bash
# seatlock.sh <cmd…>: one heavy run at a time in this seat, across a WebKit queue that may admit at any time.
L=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D2/p10/Bp-build/seat.lock
until mkdir "$L" 2>/dev/null; do sleep 3; done
trap 'rmdir "$L" 2>/dev/null' EXIT
"$@"
