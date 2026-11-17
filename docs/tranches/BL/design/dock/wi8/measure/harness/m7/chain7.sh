#!/usr/bin/env bash
# chain7.sh [from]: MEASURE-7 step 8 after the token and add commits. The whole pass on one build (m7/pass7.sh); G-14 in
# the three projects (m5/g14.sh, tag m7p, against master's snapshot m3-g14-base by m6/g14cmp.py); every plant on the
# dev server (m6/devserve.sh, m7/plantrun7.sh, one server per eight plants: the guard clamps a server to 90 min) and
# G-14's restated groups under their plants (m5/g14plantrun.sh); the budget (names, lines, G-16). `from` skips the
# stages before it (pass, owner, g14, plants, g14plants, budget). The owner's frames (owner7's glyph, hover and seatset,
# owner8's sets, many-strip) are shot on the pass's build and composed by strips7.py into the main checkout's fold/. Log: logs/m7-chain.log.
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; G=~/.claude/guard/guarded
APP="/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/audit/animation/harness/app"
c() { echo "== $(date '+%H:%M:%S') $1 (load $(sysctl -n vm.loadavg))" >> "$L/m7-chain.log"; }
FROM="${1:-pass}"; on=0
at() { [ "$FROM" = "$1" ] && on=1; [ $on = 1 ]; }
if at pass; then c "pass"; "$H/m7/pass7.sh" all; fi
if at owner; then
  c "owner frames"
  for E in chromium webkit; do X=""; [ $E = webkit ] && X="--exclusive webkit"
    (cd "$H" && $G $X --timeout 60 -- ./session2.sh sh -c "for s in glyph hover seatset; do node m7/owner7.mjs 5401 ../owner-m7 --engine $E --only \$s; done; node m7/owner8.mjs 5401 ../owner-m7 --engine $E; node m5/many-strip.mjs 5401 ../owner-m7 $E" > "$L/m7p-owner-$E.log" 2>&1)
  done
  (cd "$H" && node m7/names.mjs v11.1.0 HEAD > "$L/m7p-names.txt" 2>&1)
  (cd "$H" && python3 m7/strips7.py ../crops-m7p ../owner-m7 /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/wi8/fold ../logs /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/wi8/fold "$(cd "$W" && git rev-parse --short HEAD)" > "$L/m7p-strips.txt" 2>&1)
fi
if at g14; then rm -rf "$W/dist-wi8"; c "g14"; "$H/m5/g14.sh" "$W" m7p 5413 both; python3 "$H/m6/g14cmp.py" "$L" m7p > "$L/m7p-g14cmp.txt" 2>&1; fi
if at plants; then
  c "plants"
  rm -rf "$W/demo/__anim"; mkdir -p "$W/demo/__anim/mounts/comp"; cp -R "$APP/." "$W/demo/__anim/"
  cp "$H/m6/comp/"*.vue "$H/m7/comp/"*.vue "$W/demo/__anim/mounts/comp/"; cp "$H/m6/dock-comp.vue" "$W/demo/__anim/mounts/dock-comp.vue"; cp "$H/dock-wi8.vue" "$W/demo/__anim/mounts/dock-wi8.vue"
  sed -i '' 's|    dock: { mount: "hand" },|    dock: { mount: "hand" },\n    "dock-comp": { mount: "hand" },\n    "dock-wi8": { mount: "hand" },|' "$W/demo/__anim/registry.ts"
  ALLP=($(python3 "$H/m7/plants7.py" x list | python3 -c 'import json,sys;print(" ".join(json.load(sys.stdin)))'))
  for ((k=0; k<${#ALLP[@]}; k+=8)); do
    rm -f "$L/m7-devserve.log"; (cd "$H" && $G --light --timeout 88 -- "$H/m6/devserve.sh" 5402 86 > "$L/m7-devserve.log" 2>&1 &)
    for i in $(seq 1 300); do grep -q "dev up" "$L/m7-devserve.log" 2>/dev/null && break; sleep 2; done
    "$H/m7/plantrun7.sh" "${ALLP[@]:k:8}"
    pkill -f "m6/devserve.sh 5402"; sleep 3; pkill -f "port 5402 --strictPort"
  done
fi
if at g14plants; then c "g14 plants"; "$H/m7/g14plantrun7.sh"; fi
if at budget; then
  c "budget"
  (cd "$H" && node m7/names.mjs v11.1.0 HEAD > "$L/m7p-names.txt" 2>&1; m7/lines.sh v11.0.2 v11.1.0 HEAD > "$L/m7p-lines.txt" 2>&1)
  { "$H/m7/g16.sh" v11.0.2 "$W/.v11.0.2" keep; "$H/m7/g16.sh" HEAD "$W/.g16-cand"; } > "$L/m7p-g16.txt" 2>&1
fi
c "done"
