#!/usr/bin/env bash
# build.sh <tree> <outdir>: copies this witness page into <tree> (demo/__sci4, sci4.html,
# vite.sci4.config.ts) and builds the demo with /sci4.html as a second entry. Run under the guard.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
TREE="$(cd "$1" && pwd)"
[ -d "$TREE/.git" ] || { echo "$TREE is not its own git root" >&2; exit 2; }
mkdir -p "$TREE/demo/__sci4"
cp "$HERE/main.ts" "$HERE/Sci4.vue" "$TREE/demo/__sci4/"
cp "$HERE/sci4.html" "$HERE/vite.sci4.config.ts" "$TREE/"
cd "$TREE"
node node_modules/vite/bin/vite.js build --config vite.sci4.config.ts --outDir "$2" --emptyOutDir
echo "built: $TREE/$2"
