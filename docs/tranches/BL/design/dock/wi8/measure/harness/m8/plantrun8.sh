#!/usr/bin/env bash
# plantrun8.sh <plant>...: MEASURE-8's counter-tests (m7/plantrun7.sh with m8/plants8.py and MEASURE-8's instruments):
#   g2-facehalf  H1 (RU-70): p3 fold cells, judged by m8/judge8.mjs (op60 and the interpolated fade, both engines)
#   g4-ghost     H4 (RU-81): the seat-set cells, judged by m6/read6.mjs (join) and m8/judge8.mjs (G-4's seat fades)
#   g8-exempt, g8-trigger  H2 (RU-72): m8/trig8.mjs (the trigger clause with the reading at every press)
#   g11-rest     H4 (RU-74, RU-81): m8/cost8.mjs, the trigger and rest clauses in Chromium (GPU lane), the rest clause in WebKit
#   g15-baked, g15-onestep  H5 (RU-82, RU-68): m8/ink8.mjs against each engine's v11.0.2 base (logs/m8-ink-base.<engine>.json)
#   g13-tabsvg   H12 (RU-65, RU-86): m8/census8.mjs
# As before: the plants are read on the worktree's dev server (m6/devserve.sh, 127.0.0.1:5402, which reads src/ live with
# the hold build's flag); for each plant, apply it, read its cells in Chromium and in WebKit 2287 (each WebKit run under
# `--exclusive webkit`), revert it, check the source clean, judge. One guarded browser run at a time.
# Output: logs/m8-plant-<plant>.txt; rows: rows/plant8-<plant>/.
set -u
H="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"; L="$H/../logs"; R="$H/../rows"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; G=~/.claude/guard/guarded
probe_cells() { case "$1" in
  g2-facehalf) echo "p3-fold-pill-fine p3-fold-rim-coarse p3-fold-ctl-te-parent-coarse";;
  g4-ghost) echo "p3-seatset-fine p3-seatset-coarse";;
  *) echo "";; esac; }
side_cmd() { case "$1" in
  g8-exempt|g8-trigger) echo "node m8/trig8.mjs 5402 plant8-$1 --engine $2";;
  g11-rest) [ "$2" = chromium ] && echo "node m8/cost8.mjs 5402 plant8-g11 --reps 1" || echo "node m8/cost8.mjs 5402 plant8-g11 --engine webkit";;
  g15-baked|g15-onestep) echo "node m8/ink8.mjs 5402 plant8-$1 --engine $2 --pages nav,dials,action-row,loose --base ../logs/m8-ink-base.$2.json";;
  g13-tabsvg) echo "node m8/census8.mjs 5402 plant8-tabsvg --engine $2";;
  *) echo "";; esac; }
judge() { local P="$1" F; F=$(ls "$R/plant8-$P"/*.rows.json 2>/dev/null); case "$P" in
  g2-facehalf) for E in chromium webkit; do echo "-- $E"; node "$H/m8/judge8.mjs" $(ls "$R/plant8-$P"/*.$E.*.rows.json 2>/dev/null) 2>&1 | tail -40; done;;
  g4-ghost) node "$H/m6/read6.mjs" $F; node "$H/m8/judge8.mjs" $F | tail -30;;
  esac; }
for P in "$@"; do
  log="$L/m8-plant-$P.txt"; echo "== $P $(date '+%H:%M:%S') (load $(sysctl -n vm.loadavg))" > "$log"
  python3 "$H/m8/plants8.py" "$P" apply >> "$log" 2>&1 || { echo "apply failed" >> "$log"; continue; }
  sleep 3
  cells=$(probe_cells "$P"); rm -rf "$R/plant8-$P"; : > "$H/../lists/plant8.txt"; for c in $cells; do echo "proto $c" >> "$H/../lists/plant8.txt"; done
  for E in chromium webkit; do
    cmd=""; [ -n "$cells" ] && cmd="m6/run7.sh $E ../lists/plant8.txt plant8-$P 5402"
    s=$(side_cmd "$P" "$E"); [ -n "$s" ] && cmd="${cmd:+$cmd; }$s"
    [ -z "$cmd" ] && continue
    if [ "$E" = webkit ]; then (cd "$H" && $G --exclusive webkit --timeout 40 -- sh -c "$cmd") >> "$log" 2>&1
    else (cd "$H" && $G --timeout 40 --cpu-cores 0 -- sh -c "$cmd") >> "$log" 2>&1; fi
    echo "$E rc=$?" >> "$log"
  done
  python3 "$H/m8/plants8.py" "$P" revert >> "$log" 2>&1
  (cd "$W" && git diff --quiet -- src) || { echo "SOURCE NOT CLEAN after $P" >> "$log"; exit 3; }
  [ -n "$cells" ] && { echo "-- judge" >> "$log"; judge "$P" >> "$log" 2>&1; }
  for f in "$R/plant8-$P"/*.rows.json; do [ -f "$f" ] && gzip -f "$f"; done
  echo "== done $(date '+%H:%M:%S')" >> "$log"
done
