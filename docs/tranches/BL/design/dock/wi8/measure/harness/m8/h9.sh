#!/usr/bin/env bash
# h9.sh: MEASURE-8 H9 (RU-80, RU-54's memory). cost8 on the dev server (5402, the current source) on the GPU lane, the 4x
# run five times, without and then with g14-fitmemory (the fit's memory removed: every sync decides again), the plant
# reverted after and the source checked clean. Logs: logs/m8-cost.h9-build.chromium.json, m8-cost.h9-fitmemory.chromium.json.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; G=~/.claude/guard/guarded
cd "$H"
[ -s "$L/m8-cost.h9-build.chromium.json" ] || $G --cpu-cores 0 --timeout 40 -- node m8/cost8.mjs 5402 h9-build --reps 5 >> "$L/m8-h9.log" 2>&1
python3 m8/plants8.py g14-fitmemory apply >> "$L/m8-h9.log" 2>&1
sleep 3
$G --cpu-cores 0 --timeout 40 -- node m8/cost8.mjs 5402 h9-fitmemory --reps 5 >> "$L/m8-h9.log" 2>&1
python3 m8/plants8.py g14-fitmemory revert >> "$L/m8-h9.log" 2>&1
(cd "$W" && git diff --quiet -- src) || { echo "SOURCE NOT CLEAN after g14-fitmemory" >> "$L/m8-h9.log"; exit 3; }
