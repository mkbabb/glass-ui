#!/usr/bin/env bash
# build.sh <tree-dir>: copies this slim page and its mounts into <tree>/slim and builds
# it into <tree>/slim-dist. Library source is never touched.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
TREE="$(cd "$1" && pwd)"
HARNESS="$HERE/../../../../../audit/animation/harness/app"
rm -rf "$TREE/slim" && mkdir -p "$TREE/slim/mounts"
cp "$HERE/index.html" "$HERE/main.ts" "$HERE/vite.slim.config.ts" "$TREE/slim/"
cp "$HARNESS/anim.css" "$TREE/slim/anim.css"
cp "$HARNESS/mounts/dock.vue" "$TREE/slim/mounts/dock.vue"
cp "$HERE/../../mounts/fourier-dock.vue" "$TREE/slim/mounts/fourier-dock.vue"
cp "$HERE/group-dock.vue" "$TREE/slim/mounts/group-dock.vue"
cp "$HERE/tip-dock.vue" "$TREE/slim/mounts/tip-dock.vue"
cd "$TREE"
node node_modules/vite/bin/vite.js build --config slim/vite.slim.config.ts --logLevel warn
echo "built: $TREE/slim-dist"
