#!/bin/bash
# tests-visual.sh <wt> <sub> — DERIVE (pass 5, B-S16 + B-S11 in tests-visual): the zone seat's
# tools (authored/splits/tests-visual/, splits/tests-visual.md), run in its landing order on the
# chain's tree and landed as recorded steps. Each sub-step derives from the tree as it stands:
#   program   carve.mjs: the Playwright program row (testDir/testMatch, the WebKit anchors, the
#             tsconfig excludes, the slotted blob spec, the R-8 deletion, the walker skip)
#   engine    rebase.mjs --split: the carve's moves the floor engine can respell, applied by the
#             engine (image check + FD-5), frozen as a move list
#   rebase    rebase.mjs --row: the moves the engine cannot respell (residue) or respells wrong
#             (carve.json rowMoves), as one exact-text row
#   split     split.mjs: B-S11's eight splits, in place in their modules
#   cite      cite.mjs: comments that cite a carved file by its old path (non-shipped)
#   citeship  the same, in shipped files (their own row, P4-R3)
# The seat's verification (rebase --check against a mirror, conserve.mjs, playwright --list) is
# read on the probe tree and recorded in results/pass5/; it writes nothing the chain carries.
set -eo pipefail
W=$(cd "$1" && pwd); SUB=$2
K=$(cd "$(dirname "$0")/.." && pwd)
TV="$K/authored/splits/tests-visual"
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
cd "$W"
case "$SUB" in
 program)
  node "$TV/carve.mjs" --root "$W" --carve "$TV/carve.json" --splits "$TV/splits.json" --out-program "$T/program.json" --out-moves "$T/moves.json" >/dev/null
  cp "$T/moves.json" "$K/frozen/S43b-pending-carve.json"
  node "$K/derive/land-row.mjs" --root "$W" --row "$T/program.json" --id S43a --out frozen/S43a-tv-program.json ;;
 engine)
  node "$TV/rebase.mjs" --root "$W" --carve "$TV/carve.json" --moves "$K/frozen/S43b-pending-carve.json" --split --out-moves "$T/engine.json" --out-residue "$T/rest.json" >/dev/null
  cp "$T/engine.json" "$K/frozen/S43b-pending.json"; cp "$T/rest.json" "$K/frozen/S43c-pending-moves.json"
  (cd "$K" && node derive/apply-moves.mjs --root "$W" --authored frozen/S43b-pending.json --id S43b --out frozen/S43b-tv-engine-moves.json | tail -3)
  rm -f "$K/frozen/S43b-pending.json" "$K/frozen/S43b-pending-carve.json" ;;
 rebase)
  node "$TV/rebase.mjs" --root "$W" --carve "$TV/carve.json" --moves "$K/frozen/S43c-pending-moves.json" --row --out-row "$T/rebase.json" >/dev/null
  node "$K/derive/land-row.mjs" --root "$W" --row "$T/rebase.json" --id S43c --out frozen/S43c-tv-rebase.json
  rm -f "$K/frozen/S43c-pending-moves.json" ;;
 split)
  node "$TV/split.mjs" --root "$W" --spec "$TV/splits.json" --out "$T/split.json" >/dev/null
  node "$K/derive/land-row.mjs" --root "$W" --row "$T/split.json" --id S43d --out frozen/S43d-tv-splits.json ;;
 cite)
  node "$TV/cite.mjs" --root "$W" --carve "$TV/carve.json" --out "$T/cite.json" --out-shipped "$K/frozen/S43f-pending.json" >/dev/null
  node "$K/derive/land-row.mjs" --root "$W" --row "$T/cite.json" --id S43e --out frozen/S43e-tv-cite.json ;;
 citeship)
  node "$K/derive/land-row.mjs" --root "$W" --row "$K/frozen/S43f-pending.json" --id S43f --out frozen/S43f-tv-cite-shipped.json
  rm -f "$K/frozen/S43f-pending.json" ;;
 *) echo "tests-visual.sh: unknown sub-step $SUB"; exit 2 ;;
esac
