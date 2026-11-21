#!/usr/bin/env bash
# s4run.sh <engine>: S4's witness on the candidate tree's dev server (port 5433, run under devtree.sh), and S3's fold cell,
# which the 11-19 22:22 stop cut. In order: the level token (level8) and C7-3's selector plant (darkplant); the carried run
# mark's glide on the first and a later change of page (mark8) and RU-66's plant (markplant: the move removed); G-15 on
# the six pages that carry marks at the step taken (ink8 against v11.0.2's base, H5's log), and RU-56's plant read again
# there (bakedplant: the :root plates restored); S3's fold (fold8) and RU-79's plant (foldplant: the phone rule restored).
# Each plant is applied to the candidate tree only and reverted before the next read.
set -uo pipefail
E="$1"; T=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.s8-cand
node s8/level8.mjs 5433 s4f --engine "$E"
python3 s8/darkplant.py $T apply; sleep 3; node s8/level8.mjs 5433 s4f-plant --engine "$E"; python3 s8/darkplant.py $T revert; sleep 2
node s8/mark8.mjs 5433 s4f --engine "$E"
python3 s8/markplant.py $T - apply; sleep 3; node s8/mark8.mjs 5433 s4f-plant --engine "$E"; python3 s8/markplant.py $T - revert; sleep 2
node m8/ink8.mjs 5433 s8-s4-final --engine "$E" --pages nav,rail,figure-tools,dials,canvas-tools,action-row --base "../logs/m8-ink-base.$E.json"
python3 s8/bakedplant.py $T apply; sleep 3
node m8/ink8.mjs 5433 s8-s4-final-baked --engine "$E" --pages nav,rail,figure-tools,dials,canvas-tools,action-row --base "../logs/m8-ink-base.$E.json"
python3 s8/bakedplant.py $T revert; sleep 2
node s8/fold8.mjs 5433 s3 --engine "$E"
python3 s8/foldplant.py $T 969137aac apply; sleep 3; node s8/fold8.mjs 5433 s3-plant --engine "$E"; python3 s8/foldplant.py $T 969137aac revert
echo "s4run $E done"
