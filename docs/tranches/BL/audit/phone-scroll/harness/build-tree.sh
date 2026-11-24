#!/usr/bin/env bash
# build-tree.sh <tree-dir>
# Copies the phone-scroll page (app/) into <tree>/demo/__phone/, wraps the tree's demo
# entry so /?ps=1 boots the page and every other URL boots the demo unchanged, then
# builds the demo (dist-demo/). The demo builds from src/ through the @glass alias, so no
# library build is needed.
# Run under the guard:  ~/.claude/guard/guarded --timeout 20 -- ./build-tree.sh <tree>
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
TREE="$(cd "$1"; pwd)"
[ -f "$TREE/package.json" ] || { echo "not a tree: $TREE" >&2; exit 2; }
[ -e "$TREE/node_modules" ] || { echo "no node_modules in $TREE" >&2; exit 2; }

rm -rf "$TREE/demo/__phone"
mkdir -p "$TREE/demo/__phone"
cp -R "$HERE/app/." "$TREE/demo/__phone/"

if [ ! -f "$TREE/demo/main.demo.ts" ]; then
    mv "$TREE/demo/main.ts" "$TREE/demo/main.demo.ts"
fi
cat > "$TREE/demo/main.ts" <<'EOF'
// phone-scroll wrapper (docs/tranches/BL/audit/phone-scroll/harness/build-tree.sh). The
// demo's own entry is main.demo.ts, unchanged; ?ps=1 boots the phone-scroll page instead.
const params = new URLSearchParams(window.location.search);
if (params.get("ps")) void import("./__phone/entry").then((m) => m.boot());
else void import("./main.demo");
EOF

cd "$TREE"
node node_modules/vite/bin/vite.js build --config demo/vite.demo-dist.config.ts
echo "built: $TREE/dist-demo"
