#!/usr/bin/env bash
# check-selftest.sh: runs check-overflow.mjs on the base and v6 builds of the fold and stress
# pages, as a site would run it on its own pages (from a project that has Playwright: the
# tree), then once with a --click selector that matches nothing, which must exit 2. A preview
# already up on its port is used; one this call starts stops with it.
#   ~/.claude/guard/guarded --timeout 30 -- tools/check-selftest.sh
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
TREE="$ROOT/trees/v11.1.1"
OUT="$ROOT/record/check"
mkdir -p "$OUT"
SRVS=""
trap 'for p in $SRVS; do kill "$p" 2>/dev/null; done' EXIT
serve() { # port outdir
    if curl -s -o /dev/null "http://127.0.0.1:$1/ovf.html"; then return 0; fi
    ( cd "$TREE" && exec node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir "$2" --host 127.0.0.1 --port "$1" --strictPort ) > "$ROOT/trees/serve-$1.log" 2>&1 &
    SRVS="$SRVS $!"
    for _ in $(seq 1 60); do curl -s -o /dev/null "http://127.0.0.1:$1/ovf.html" && return 0; sleep 1; done
    echo "server $1 did not come up"
}
# BASE_PORT and CURE_PORT pick other ports (a preview already up on them is reused).
B="${BASE_PORT:-5391}" C="${CURE_PORT:-5393}"
serve "$B" dist-base
serve "$C" dist-cure6
cd "$TREE"
for p in "$B:base" "$C:cure6"; do
    port="${p%%:*}"; tag="${p#*:}"
    # The fold page has no Filters trigger, so it is read in a call of its own.
    echo "== $tag fold"
    node "$ROOT/check-overflow.mjs" --url "http://127.0.0.1:$port/ovf.html?fold" \
        --cells 390t-light,1440-light --json "$OUT/check-$tag.fold.chromium.json"
    echo "== $tag fold exit $?"
    echo "== $tag stress"
    node "$ROOT/check-overflow.mjs" --url "http://127.0.0.1:$port/ovf.html" \
        --click '[data-testid=ovf-open-filters]' \
        --cells 390t-light,1440-light --json "$OUT/check-$tag.stress.chromium.json"
    echo "== $tag stress exit $?"
done
echo "== a --click selector that matches nothing (expect exit 2)"
node "$ROOT/check-overflow.mjs" --url "http://127.0.0.1:$C/ovf.html" \
    --click '[data-testid=dock-filter-pullout]' --cells 1440-light
echo "== no-match exit $?"
echo "== a menu, then its submenu (--then; expect a reading with both open)"
node "$ROOT/check-overflow.mjs" --url "http://127.0.0.1:$C/ovf.html" \
    --click '[data-testid=ovf-open-menu]' --then '[data-testid=ovf-sub]' --cells 1440-light
echo "== then exit $?"
echo "== a --then step that finds nothing (expect exit 2)"
node "$ROOT/check-overflow.mjs" --url "http://127.0.0.1:$C/ovf.html" \
    --click '[data-testid=ovf-open-menu]' --then '[data-testid=no-such-item]' --cells 1440-light
echo "== then-miss exit $?"
