#!/usr/bin/env bash
# S4's Chromium run on the candidate tree's dev server: the level witness, its selector plant, then the fill union
# (current 10, 12, 14, 16 % with hover 8 %) on the six pages that carry marks.
set -uo pipefail
T=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.s8-cand
node s8/level8.mjs 5433 s4
python3 s8/darkplant.py $T apply; sleep 3; node s8/level8.mjs 5433 s4-plant; python3 s8/darkplant.py $T revert; sleep 2
s8/s4fill.sh $T 5433 chromium nav,rail,figure-tools,dials,canvas-tools,action-row 10:8 12:8 14:8 16:8
