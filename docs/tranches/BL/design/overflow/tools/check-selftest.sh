#!/usr/bin/env bash
# check-selftest.sh: runs check-overflow.mjs on the base and v4 builds of the stress and fold
# pages, as a site would run it on its own pages (from a project that has Playwright: the
# tree). Both previews are children of this call and stop with it.
#   ~/.claude/guard/guarded --timeout 20 -- tools/check-selftest.sh
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
TREE="$ROOT/trees/v11.1.1"
OUT="$ROOT/record/check"
mkdir -p "$OUT"
SRVS=""
trap 'for p in $SRVS; do kill "$p" 2>/dev/null; done' EXIT
serve() { # port outdir
    ( cd "$TREE" && exec node node_modules/vite/bin/vite.js preview --config demo/vite.demo-dist.config.ts --outDir "$2" --host 127.0.0.1 --port "$1" --strictPort ) > "$ROOT/trees/serve-$1.log" 2>&1 &
    SRVS="$SRVS $!"
    for _ in $(seq 1 60); do curl -s -o /dev/null "http://127.0.0.1:$1/ovf.html" && return 0; sleep 1; done
    echo "server $1 did not come up"
}
serve 5391 dist-base
serve 5395 dist-cure4
cd "$TREE"
for p in 5391:base 5395:cure4; do
    port="${p%%:*}"; tag="${p#*:}"
    echo "== $tag"
    node "$ROOT/check-overflow.mjs" \
        --url "http://127.0.0.1:$port/ovf.html?fold" \
        --url "http://127.0.0.1:$port/ovf.html" --click '[data-testid=ovf-open-filters]' \
        --cells 390t-light,1440-light --json "$OUT/check-$tag.chromium.json"
    echo "== $tag exit $?"
done
