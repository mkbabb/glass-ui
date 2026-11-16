#!/usr/bin/env bash
# build6.sh <tree-dir> <out-dir-name>: build.sh with MEASURE-6's composition mount (dock-comp.vue and
# m6/comp/, RU-44's G-15 pages) copied in beside dock-wi8.vue and registered. Run under the guard.
set -euo pipefail
HERE="$(cd "$(dirname "$0")/.." && pwd)"
TREE="$(cd "$1" && pwd)"
APP="/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/audit/animation/harness/app"
rm -rf "$TREE/demo/__anim"; mkdir -p "$TREE/demo/__anim"; cp -R "$APP/." "$TREE/demo/__anim/"
mkdir -p "$TREE/demo/__anim/mounts/comp"
cp "$HERE/m6/comp/"*.vue "$TREE/demo/__anim/mounts/comp/"
cp "$HERE/m6/dock-comp.vue" "$TREE/demo/__anim/mounts/dock-comp.vue"
sed -i '' 's|    dock: { mount: "hand" },|    dock: { mount: "hand" },\n    "dock-comp": { mount: "hand" },|' "$TREE/demo/__anim/registry.ts"
grep -q '"dock-comp"' "$TREE/demo/__anim/registry.ts" || { echo "registry patch failed" >&2; exit 3; }
# build.sh copies the app again and adds dock-wi8; keep our additions by running its tail here
cp "$HERE/dock-wi8.vue" "$TREE/demo/__anim/mounts/dock-wi8.vue"
sed -i '' 's|    dock: { mount: "hand" },|    dock: { mount: "hand" },\n    "dock-wi8": { mount: "hand" },|' "$TREE/demo/__anim/registry.ts"
if [ ! -f "$TREE/demo/main.demo.ts" ]; then mv "$TREE/demo/main.ts" "$TREE/demo/main.demo.ts"; fi
cat > "$TREE/demo/main.ts" <<'EOT'
const params = new URLSearchParams(window.location.search);
const c = params.get("c");
if (c) void import("./__anim/entry").then((m) => m.boot(c, params));
else void import("./main.demo");
EOT
cd "$TREE"
node node_modules/vite/bin/vite.js build --config demo/vite.demo-dist.config.ts --outDir "$2" --emptyOutDir
echo "built: $TREE/$2"
