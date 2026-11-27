#!/usr/bin/env bash
# build-tree.sh <tree-dir>
# Copies the witness page (app/) into <tree>/demo/__am/, wraps the tree's demo entry so
# /?am=<mode> boots the page and every other URL boots the demo unchanged, then builds the
# demo (dist-demo/). The demo builds from src/ through the @glass alias.
# Run under the guard:  ~/.claude/guard/guarded --timeout 20 -- ./build-tree.sh <tree>
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
TREE="$(cd "$1"; pwd)"
[ -f "$TREE/package.json" ] || { echo "not a tree: $TREE" >&2; exit 2; }
[ -e "$TREE/node_modules" ] || { echo "no node_modules in $TREE" >&2; exit 2; }

rm -rf "$TREE/demo/__am"
mkdir -p "$TREE/demo/__am"
cp -R "$HERE/app/." "$TREE/demo/__am/"

if [ ! -f "$TREE/demo/main.demo.ts" ]; then
    mv "$TREE/demo/main.ts" "$TREE/demo/main.demo.ts"
fi
cat > "$TREE/demo/main.ts" <<'EOT'
// Witness wrapper (design/atlas-minor/tools/harness/build-tree.sh). The demo's own entry is
// main.demo.ts, unchanged; ?am= boots the witness page instead.
const params = new URLSearchParams(window.location.search);
if (params.get("am")) void import("./__am/entry").then((m) => m.boot());
else void import("./main.demo");
EOT

cd "$TREE"
node node_modules/vite/bin/vite.js build --config demo/vite.demo-dist.config.ts
echo "built: $TREE/dist-demo"
