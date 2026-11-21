#!/usr/bin/env bash
# s4fill.sh <tree-dir> <port> <engine> <pages|all> <cur:hov>...: S4's fill reading (RU-68 as amended). Run from the
# harness directory under devtree.sh, so the tree's dev server is up on <port>. For each step, fillstep.py writes the
# current and hover percentages into the tree's dock.css, the server is given 3 s to serve them, and ink8 reads G-15
# against v11.0.2's base (H5's logs/m8-ink-base.<engine>.json). <pages>: a comma list, or `all` for every page.
# Log per step: logs/m8-ink-s8-s4-c<cur>h<hov>[-<suffix>].<engine>.json (S4SUFFIX names a variant, e.g. a plant).
set -uo pipefail
T="$1"; P="$2"; E="$3"; PG="$4"; shift 4
PAGES=(); [ "$PG" != all ] && PAGES=(--pages "$PG")
for st in "$@"; do
  c="${st%%:*}"; h="${st##*:}"
  python3 s8/fillstep.py "$T" "$c" "$h" || exit 3
  sleep 3
  node m8/ink8.mjs "$P" "s8-s4-c${c}h${h}${S4SUFFIX:+-$S4SUFFIX}" --engine "$E" "${PAGES[@]}" --base "../logs/m8-ink-base.$E.json"
  echo "step c$c h$h rc=$?"
done
