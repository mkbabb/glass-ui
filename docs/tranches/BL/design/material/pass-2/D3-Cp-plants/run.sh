#!/bin/sh
# D3 pass 2 · C′ mechanism-removal plants (REGISTRY §7.3 "Every route", §7.5).
# Each plant removes one piece of the C′ mechanism from the route build and re-captures only the cells its green
# lives on (Chromium, the gate); the witness that read that green must turn RED.
#   D3_OUT=<scratch>/out sh run.sh <route-specimen-dist>
# The route build is `harness/build.mjs <worktree with floor.patch + D3-Cp-proto.patch> --label cp`.
set -u
DIST="$1"; P=$(cd "$(dirname "$0")" && pwd); H="$P/../../harness"; C="$D3_OUT/caps"
cap() { name="$1"; shift; rm -rf "$C/pl-$name"; node "$H/capture.mjs" "$DIST" --out "$C/pl-$name" --engines chromium --quiet "$@"; }
# A witness reads only the cells its plant captured (--cells): a missing cell is a FAIL row, and a plant must red
# for its own reason.
wit() { echo "== $1 · $2"; node "$H/$2.mjs" "$C/pl-$1" --cells "$3" | tail -1; }

# 2 · the dead solve → H-7 (M-4 every plate); M-2 alone stays blind
cap deadsolve --grounds paper,aurora --scenes ladder,dialog --inject "$P/deadsolve.css" --query claim=honest
wit deadsolve m4-dock-register "^chromium (light|dark) (paper|aurora) "; wit deadsolve m2-text-contrast "^chromium (light|dark) (paper|aurora) (ladder|dialog)"
# 4 · the solved ink removed under a claim → M-2
cap inkstatic --grounds aurora,black,stripes --scenes ladder --inject "$P/inkstatic.css" --query claim=honest
wit inkstatic m2-text-contrast "^chromium (light|dark) (aurora|black|stripes) ladder"
# 5 · the dark lift removed → M-6 (dark page separation)
cap nolift --themes dark --grounds paper --scenes ladder,dialog --inject "$P/nolift.css" --query claim=honest
wit nolift m6-separable-ladder "^chromium dark paper "
# 6 · Q-8 c removed (lagged tones only) → M-2m on the worsening step
cap lagonly --grounds aurora,aurora50 --scenes ladder --motion --inject "$P/lagonly.css" --query claim=honest
wit lagonly m2-motion "^chromium "
# 7 · the well's leaf solve removed → M-2 on well placeholders
cap noleaf --grounds aurora,black,stripes --scenes ladder --inject "$P/noleaf.css" --query claim=honest
wit noleaf m2-text-contrast "^chromium (light|dark) (aurora|black|stripes) ladder"
# 3 · the publication removed → the claimed field falls to the any-input tones (T_c1 falls; read T)
cap unpublished --grounds aurora,black,white --scenes ladder --inject "$P/unpublished.css" --query claim=honest
wit unpublished t-transmission "^chromium "
# 1 · honesty: a false claim (the hostile band hidden) and pass 1's page default (<html> claims the page) → M-2
cap fieldfalse --grounds aurora,aurora50 --scenes hostile --query claim=field-false
wit fieldfalse m2-text-contrast "^chromium (light|dark) (aurora|aurora50) hostile"
cap rootpage --grounds aurora,aurora50,black,white --scenes ladder,hostile --query claim=root-page
wit rootpage m2-text-contrast "^chromium (light|dark) (aurora|aurora50|black|white) (ladder|hostile)"
