#!/usr/bin/env bash
# build.sh <tree-dir>: copy the witness page into <tree>/harness and build it against the
# tree's own src/ (harness/dist). Run under the guard:
#   ~/.claude/guard/guarded --timeout 15 -- tools/build.sh trees/red
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
TREE="$(cd "$1" && pwd)"
[ -f "$TREE/package.json" ] || { echo "not a tree: $TREE" >&2; exit 2; }
rm -rf "$TREE/harness"
cp -R "$HERE/harness" "$TREE/harness"
cd "$TREE"
node node_modules/vite/bin/vite.js build --config harness/vite.config.ts --logLevel warn
echo "built: $TREE/harness/dist"
