#!/usr/bin/env bash
# S4's WebKit 2287 run on the candidate tree's dev server: the level witness and its selector plant, the fill union
# (current 10, 12, 14, 16 % with hover 8 %) on the six pages that carry marks, then S3's fold cell (RU-79) and its
# plant (the phone rule restored), which read only the posture and so do not depend on S4's level.
set -uo pipefail
T=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.s8-cand
node s8/level8.mjs 5433 s4 --engine webkit
python3 s8/darkplant.py $T apply; sleep 3; node s8/level8.mjs 5433 s4-plant --engine webkit; python3 s8/darkplant.py $T revert; sleep 2
s8/s4fill.sh $T 5433 webkit nav,rail,figure-tools,dials,canvas-tools,action-row 10:8 12:8 14:8 16:8
node s8/fold8.mjs 5433 s3 --engine webkit
python3 s8/foldplant.py $T 969137aac apply; sleep 3; node s8/fold8.mjs 5433 s3-plant --engine webkit; python3 s8/foldplant.py $T 969137aac revert
