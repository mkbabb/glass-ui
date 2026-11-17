#!/usr/bin/env bash
# proto14.sh: MEASURE-8 H7, Q14's prototype frames (RU-83: "the prototype's frames are cropped to the row, not the
# viewport"). RU-61's prototype (m7/ru61.patch, MEASURE-7 step 6) applied to the worktree's source, m8/owner9.mjs --label
# proto --only q14 read on the dev server (5402) in both engines, the patch reverted and the source checked clean.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; G=~/.claude/guard/guarded
(cd "$W" && git apply "$H/m7/ru61.patch") || { echo "ru61.patch did not apply" >> "$L/m8-proto14.log"; exit 2; }
sleep 3
cd "$H"
$G --timeout 20 -- node m8/owner9.mjs 5402 ../logs/m8-owner --engine chromium --label proto --only q14 >> "$L/m8-proto14.log" 2>&1
$G --exclusive webkit --timeout 25 -- node m8/owner9.mjs 5402 ../logs/m8-owner --engine webkit --label proto --only q14 >> "$L/m8-proto14.log" 2>&1
(cd "$W" && git apply -R "$H/m7/ru61.patch")
(cd "$W" && git diff --quiet -- src) || { echo "SOURCE NOT CLEAN after ru61.patch" >> "$L/m8-proto14.log"; exit 3; }
