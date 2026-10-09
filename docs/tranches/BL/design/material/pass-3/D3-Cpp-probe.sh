#!/bin/sh
# D3 pass 3 · C″ spec probe runs over a floor v2 specimen build (D3-Cpp-spec.md §2). Usage:
#   D3_OUT=<scratch>/out sh D3-Cpp-probe.sh <fv2 dist>
# Captures (Chromium gate, Playwright WebKit information):
#   cpp     static licence, ?claim=honest: ladder over aurora (c1 publication literal), black, white, paper; the claim scene
#   cpp0    the same build, unclaimed (?claim=none drops only the claim/field scenes' claim; no query elsewhere)
#   reach   the C′ reach licence (light), ladder over aurora and black, Chromium light only: the -strong row on floor v2
#   strong  the -strong licence (light), the same cells
# then M-2, M-3, M-4, M-6 and T on each, logs beside the captures and copied into Cpp-records/.
set -e
DIST=$1; H=$(cd "$(dirname "$0")/../harness" && pwd); P=$(cd "$(dirname "$0")" && pwd); R=$P/Cpp-records
PUB='[data-glass-ground="field"] { --glass-ground-lo: 0.4117; --glass-ground-hi: 0.7825; }'
mkdir -p "$D3_OUT/inj"
{ cat "$P/D3-Cpp-probe.css"; echo "$PUB"; } > "$D3_OUT/inj/static.css"
{ cat "$D3_OUT/inj/static.css"; echo 'html:not(.dark) { --cpp-ink-l: 0.3061; }'; } > "$D3_OUT/inj/reach.css"
{ cat "$D3_OUT/inj/static.css"; echo 'html:not(.dark) { --cpp-ink-l: 0.4096; }'; } > "$D3_OUT/inj/strong.css"
ld() { uptime | sed 's/.*load averages*: //'; }
cap() { name=$1; shift; echo "capture $name start $(date +%T) load $(ld)"; node "$H/capture.mjs" "$DIST" --out "$D3_OUT/caps/$name" "$@"; echo "capture $name end $(date +%T) load $(ld)"; }
cap cpp  --engines chromium,webkit --themes light,dark --grounds aurora,black,white,paper --scenes ladder,claim --inject "$D3_OUT/inj/static.css" --query claim=honest
cap cpp0 --engines chromium,webkit --themes light,dark --grounds aurora,black,white,paper --scenes ladder,claim --inject "$D3_OUT/inj/static.css" --query claim=none
cap reach  --engines chromium --themes light --grounds aurora,black,white --scenes ladder --inject "$D3_OUT/inj/reach.css" --query claim=honest
cap strong --engines chromium --themes light --grounds aurora,black,white --scenes ladder --inject "$D3_OUT/inj/strong.css" --query claim=honest
for c in cpp cpp0 reach strong; do
  mkdir -p "$R/$c"
  for w in m2-text-contrast m3-non-text m4-dock-register m6-separable-ladder t-transmission; do
    node "$H/$w.mjs" "$D3_OUT/caps/$c" --gate chromium,webkit --verbose > "$R/$c/$w.log" 2>&1 || true
    echo "$c $w: $(tail -1 "$R/$c/$w.log")"
  done
done
