#!/usr/bin/env bash
# ladder7.sh: MEASURE-7 step 5, RU-57's ladder read with full ink and RU-56's fills in source (on the worktree's dev
# server): every rung (level 1, 0.85, 0.7, 0.55, 0.4; m7/states/ladder-*.css, one tier at the base rung) and the control
# row (v11.0.2's veil with full ink, ladder-today.css), ink7 at 1440 on every composition and at 390 on four (dials, nav,
# chrome, transport), Chromium then WebKit 2287, each against its engine's v11.0.2 reading. G-15 excludes rungs; the
# default is the first rung from the glass end GREEN on ink whose plate reading is above v11.0.2's and below level 0.4's
# (RU-57 as amended). Logs: logs/m7-ink-ladder<rung>[-390].<engine>.json, logs/m7-tokens.log.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"
# Two halves, one dev server each (the server is clamped to 58 min; each half is about 40 min in both engines).
for half in "today 1 085" "07 055 04"; do
  C=""; K=""
  for r in $half; do
    for e in chromium webkit; do
      X="--engine $e"
      s="node m7/ink7.mjs 5402 ladder$r $X --css m7/states/ladder-$r.css --label ladder-$r --base ../logs/m7-ink-base1102.$e.json >> ../logs/m7-tokens.log 2>&1; node m7/ink7.mjs 5402 ladder$r-390 $X --w 390 --pages dials,nav,chrome,transport --css m7/states/ladder-$r.css --label ladder-$r-390 >> ../logs/m7-tokens.log 2>&1;"
      if [ $e = chromium ]; then C="$C $s"; else K="$K $s"; fi
    done
  done
  echo "== $(date '+%H:%M:%S') ladder $half (load $(sysctl -n vm.loadavg))" >> "$L/m7-tokens.log"
  "$H/m7/cure7.sh" ladder "$C" "$K"
done
echo "== $(date '+%H:%M:%S') ladder done" >> "$L/m7-tokens.log"
