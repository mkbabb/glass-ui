#!/usr/bin/env bash
# S4's Chromium run, resumed after the 01:59 stop (the c16 step was cut mid-run): the fill union's c16 h8 on the six
# pages that carry marks, then S3's fold cell (RU-79) and its plant (the phone rule restored), which the 22:22 stop cut.
set -uo pipefail
T=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.s8-cand
s8/s4fill.sh $T 5433 chromium nav,rail,figure-tools,dials,canvas-tools,action-row 16:8
python3 s8/fillstep.py $T 20 10
node s8/fold8.mjs 5433 s3
python3 s8/foldplant.py $T 969137aac apply; sleep 3; node s8/fold8.mjs 5433 s3-plant; python3 s8/foldplant.py $T 969137aac revert
