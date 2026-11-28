#!/usr/bin/env bash
# build.sh <tree> <outdir>: copies the witness page into <tree> (demo/__sci, sci.html,
# vite.sci.config.ts) and builds the demo with /sci.html as a second entry. The tree must
# be its own git root (see ../../build-tree.sh). Run under the guard.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
TREE="$(cd "$1" && pwd)"
[ -d "$TREE/.git" ] || { echo "$TREE is not its own git root" >&2; exit 2; }
mkdir -p "$TREE/demo/__sci"
cp "$HERE/main.ts" "$HERE/Witness.vue" "$TREE/demo/__sci/"
cp "$HERE/sci.html" "$HERE/vite.sci.config.ts" "$TREE/"
cd "$TREE"
node node_modules/vite/bin/vite.js build --config vite.sci.config.ts --outDir "$2" --emptyOutDir
echo "built: $TREE/$2"
